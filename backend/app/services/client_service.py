"""Client service — validation, logo uploads, DTO mapping."""

from __future__ import annotations

import mimetypes
import re
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings
from app.models.client import Client
from app.repositories.client_repository import ClientRepository
from app.schemas.client import (
    ClientCreate,
    ClientOut,
    ClientStats,
    ClientUpdate,
    PaginatedClients,
)

_SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
_IMAGE_EXTENSIONS = frozenset({".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"})
_MAX_IMAGE_BYTES = 5 * 1024 * 1024


class ClientService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = ClientRepository(db)
        self._upload_root = Path(settings.CLIENT_UPLOAD_DIR)

    def get_stats(self) -> ClientStats:
        return ClientStats(**self.repo.stats())

    def list_clients(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> PaginatedClients:
        page = max(1, page)
        page_size = min(max(1, page_size), 100)
        items, total = self.repo.list(
            is_active=is_active,
            q=q,
            page=page,
            page_size=page_size,
            active_only=active_only,
        )
        pages = max(1, (total + page_size - 1) // page_size) if total else 1
        return PaginatedClients(
            items=[ClientOut.model_validate(c) for c in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_client(self, client_id: int) -> ClientOut:
        client = self.repo.get(client_id)
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found.")
        return ClientOut.model_validate(client)

    def create_client(self, body: ClientCreate, logo: UploadFile | None = None) -> ClientOut:
        slug = self._normalize_slug(body.slug)
        self._ensure_unique_slug(slug)

        client = Client(
            slug=slug,
            name=body.name.strip(),
            logo_url=body.logo_url.strip() or "pending",
            logo_alt=(body.logo_alt or body.name).strip(),
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        client = self.repo.create(client)

        if logo is not None and logo.filename:
            client.logo_url = self._store_logo(client.id, logo)
            client = self.repo.save(client)

        if client.logo_url == "pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Provide a logo file or logo_url.",
            )

        return ClientOut.model_validate(client)

    def update_client(
        self,
        client_id: int,
        body: ClientUpdate,
        logo: UploadFile | None = None,
    ) -> ClientOut:
        client = self.repo.get(client_id)
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found.")

        data = {
            key: value
            for key, value in body.model_dump(exclude_unset=True).items()
            if value is not None
        }

        if "slug" in data:
            slug = self._normalize_slug(data["slug"])
            self._ensure_unique_slug(slug, exclude_id=client.id)
            data["slug"] = slug

        for key in ("name", "logo_url", "logo_alt"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()

        for key, value in data.items():
            setattr(client, key, value)

        if logo is not None and logo.filename:
            client.logo_url = self._store_logo(client.id, logo)

        client = self.repo.save(client)
        return ClientOut.model_validate(client)

    def delete_client(self, client_id: int) -> None:
        client = self.repo.get(client_id)
        if not client:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found.")
        self.repo.delete(client)

    def _normalize_slug(self, slug: str) -> str:
        cleaned = slug.strip().lower().replace(" ", "-")
        cleaned = re.sub(r"[^a-z0-9-]", "", cleaned)
        cleaned = re.sub(r"-{2,}", "-", cleaned).strip("-")
        if not cleaned or not _SLUG_RE.match(cleaned):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Slug must be lowercase letters, numbers, and hyphens.",
            )
        return cleaned

    def _ensure_unique_slug(self, slug: str, exclude_id: int | None = None) -> None:
        existing = self.repo.get_by_slug(slug)
        if existing and existing.id != exclude_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A client with this slug already exists.",
            )

    def _store_logo(self, client_id: int, upload: UploadFile) -> str:
        original = upload.filename or "logo"
        ext = Path(original).suffix.lower()
        content_type = (upload.content_type or "").lower()

        if ext not in _IMAGE_EXTENSIONS:
            guessed = mimetypes.guess_extension(content_type) or ""
            if guessed == ".jpe":
                guessed = ".jpg"
            if content_type == "image/svg+xml":
                guessed = ".svg"
            if guessed not in _IMAGE_EXTENSIONS:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Logo must be SVG, PNG, JPG, WEBP, or GIF.",
                )
            ext = guessed

        raw = upload.file.read()
        if not raw:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty logo file.")
        if len(raw) > _MAX_IMAGE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Logo exceeds 5MB limit.",
            )

        folder = self._upload_root / str(client_id)
        folder.mkdir(parents=True, exist_ok=True)
        stored = f"{uuid.uuid4().hex}{ext}"
        path = folder / stored
        path.write_bytes(raw)
        return f"/uploads/clients/{client_id}/{stored}"
