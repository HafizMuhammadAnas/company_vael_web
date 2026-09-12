"""Lead submission business logic — validation, file handling, persistence."""

from __future__ import annotations

import mimetypes
import re
import uuid
from math import ceil
from pathlib import Path
from typing import Any

from fastapi import HTTPException, UploadFile, status
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.lead import LEAD_FORM_TYPES, LEAD_STATUSES, Lead, LeadAttachment
from app.repositories.lead_repository import LeadRepository
from app.schemas.lead import (
    LeadCreateResponse,
    LeadDetail,
    LeadListItem,
    LeadStats,
    LeadStatusUpdate,
    LeadSubmission,
    PaginatedLeads,
)

CORE_FIELDS = frozenset(
    {"form_type", "full_name", "email", "phone", "company", "country", "privacy_consent"}
)

ALLOWED_EXTENSIONS = frozenset(
    {
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".zip",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".svg",
        ".bmp",
        ".tif",
        ".tiff",
    }
)

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class LeadService:
    def __init__(self, db: Session) -> None:
        self._repo = LeadRepository(db)
        self._db = db
        self._upload_root = Path(settings.UPLOAD_DIR)
        self._max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024

    def submit(
        self,
        raw: dict[str, Any],
        files: list[UploadFile] | None = None,
        *,
        ip_address: str | None = None,
        user_agent: str | None = None,
    ) -> LeadCreateResponse:
        submission = self._parse_submission(raw)
        self._validate_submission(submission)

        uploads = files or []
        if len(uploads) > settings.MAX_UPLOAD_FILES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A maximum of {settings.MAX_UPLOAD_FILES} files is allowed.",
            )
        for upload in uploads:
            self._validate_upload(upload)

        lead = Lead(
            form_type=submission.form_type,
            status="new",
            full_name=submission.full_name.strip(),
            email=str(submission.email).strip().lower(),
            phone=_empty_to_none(submission.phone),
            company=_empty_to_none(submission.company),
            country=_empty_to_none(submission.country),
            payload=submission.payload,
            privacy_consent=submission.privacy_consent,
            ip_address=ip_address,
            user_agent=_truncate(user_agent, 512),
        )

        try:
            self._db.add(lead)
            self._db.flush()

            for upload in uploads:
                attachment = self._build_attachment(lead, upload)
                self._db.add(attachment)

            self._db.commit()
            self._db.refresh(lead)
        except Exception:
            self._db.rollback()
            raise

        return LeadCreateResponse(id=lead.id)

    def list_leads(
        self,
        *,
        form_type: str | None = None,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 10,
    ) -> PaginatedLeads:
        if page < 1:
            page = 1
        page_size = min(max(page_size, 1), 100)

        if form_type and form_type not in LEAD_FORM_TYPES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail=f"Invalid form_type. Allowed: {', '.join(sorted(LEAD_FORM_TYPES))}.",
            )
        if status and status not in LEAD_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail=f"Invalid status. Allowed: {', '.join(sorted(LEAD_STATUSES))}.",
            )

        leads, total = self._repo.list_leads(
            form_type=form_type,
            status=status,
            q=q,
            page=page,
            page_size=page_size,
        )
        pages = ceil(total / page_size) if total else 0
        items = [
            LeadListItem(
                id=lead.id,
                form_type=lead.form_type,
                status=lead.status,
                full_name=lead.full_name,
                email=lead.email,
                phone=lead.phone,
                company=lead.company,
                country=lead.country,
                created_at=lead.created_at,
                attachment_count=len(lead.attachments),
            )
            for lead in leads
        ]
        return PaginatedLeads(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_stats(self) -> LeadStats:
        return LeadStats(**self._repo.get_stats())

    def get_lead(self, lead_id: int) -> LeadDetail:
        lead = self._repo.get_by_id(lead_id)
        if lead is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found.")
        return LeadDetail.model_validate(lead)

    def update_status(self, lead_id: int, body: LeadStatusUpdate) -> LeadDetail:
        if body.status not in LEAD_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail=f"Invalid status. Allowed: {', '.join(sorted(LEAD_STATUSES))}.",
            )

        lead = self._repo.get_by_id(lead_id)
        if lead is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found.")

        lead = self._repo.update_status(lead, body.status)
        return LeadDetail.model_validate(lead)

    def get_attachment_path(self, lead_id: int, attachment_id: int) -> tuple[Path, str, str | None]:
        attachment = self._repo.get_attachment(lead_id, attachment_id)
        if attachment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Attachment not found.",
            )

        path = Path(attachment.storage_path)
        if not path.is_file():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Attachment file is missing on disk.",
            )

        return path, attachment.original_filename, attachment.content_type

    def _parse_submission(self, raw: dict[str, Any]) -> LeadSubmission:
        if not raw:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Request body is empty.",
            )

        normalized: dict[str, Any] = {}
        for key, value in raw.items():
            if value is None:
                normalized[key] = ""
            elif isinstance(value, (list, dict)):
                normalized[key] = str(value)
            else:
                normalized[key] = str(value).strip()

        form_type = normalized.get("form_type", "").lower()
        payload = {k: v for k, v in normalized.items() if k not in CORE_FIELDS and v}

        try:
            return LeadSubmission(
                form_type=form_type,
                full_name=normalized.get("full_name", ""),
                email=normalized.get("email", ""),
                phone=_empty_to_none(normalized.get("phone")),
                company=_empty_to_none(normalized.get("company")),
                country=_empty_to_none(normalized.get("country")),
                privacy_consent=_parse_bool(normalized.get("privacy_consent")),
                payload=payload,
            )
        except ValidationError as exc:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail={"message": "Invalid submission data.", "errors": exc.errors()},
            ) from exc

    def _validate_submission(self, submission: LeadSubmission) -> None:
        errors: dict[str, str] = {}

        if submission.form_type not in LEAD_FORM_TYPES:
            errors["form_type"] = "Invalid form type."

        if not submission.full_name.strip():
            errors["full_name"] = "Full name is required."

        email = str(submission.email)
        if not email or not EMAIL_RE.match(email):
            errors["email"] = "A valid email address is required."

        if not submission.privacy_consent:
            errors["privacy_consent"] = "Privacy consent is required."

        if submission.form_type == "contact":
            if not submission.payload.get("message", "").strip():
                errors["message"] = "Message is required."
        elif not submission.payload.get("description", "").strip():
            errors["description"] = "Project description is required."

        if submission.form_type == "proposal":
            if not submission.company:
                errors["company"] = "Company is required for proposal requests."
            if not submission.country:
                errors["country"] = "Country is required for proposal requests."

        if errors:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail={"message": "Validation failed.", "errors": errors},
            )

    def _validate_upload(self, upload: UploadFile) -> None:
        filename = upload.filename or "upload"
        ext = Path(filename).suffix.lower()
        content_type = (upload.content_type or "").lower()

        if ext not in ALLOWED_EXTENSIONS and not content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type not allowed: {filename}",
            )

        upload.file.seek(0, 2)
        size = upload.file.tell()
        upload.file.seek(0)

        if size == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File is empty: {filename}",
            )

        if size > self._max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds {settings.MAX_UPLOAD_SIZE_MB} MB limit: {filename}",
            )

    def _build_attachment(self, lead: Lead, upload: UploadFile) -> LeadAttachment:
        original = Path(upload.filename or "upload").name
        ext = Path(original).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            guessed = mimetypes.guess_extension(upload.content_type or "") or ""
            if guessed in ALLOWED_EXTENSIONS:
                ext = guessed

        stored_name = f"{uuid.uuid4().hex}{ext}"
        lead_dir = self._upload_root / str(lead.id)
        lead_dir.mkdir(parents=True, exist_ok=True)
        dest = lead_dir / stored_name

        upload.file.seek(0)
        dest.write_bytes(upload.file.read())

        return LeadAttachment(
            lead_id=lead.id,
            original_filename=_truncate(original, 255) or "upload",
            stored_filename=stored_name,
            content_type=_truncate(upload.content_type, 127),
            size_bytes=dest.stat().st_size,
            storage_path=str(dest.resolve()),
        )


def _parse_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    text = str(value or "").strip().lower()
    return text in {"1", "true", "yes", "on"}


def _empty_to_none(value: Any) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _truncate(value: str | None, limit: int) -> str | None:
    if value is None:
        return None
    return value[:limit]
