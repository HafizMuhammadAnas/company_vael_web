"""Project service — validation, uploads, and DTO mapping."""

from __future__ import annotations

import mimetypes
import re
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings
from app.models.project import PROJECT_STATUSES, Project
from app.repositories.project_repository import ProjectRepository
from app.schemas.project import (
    PaginatedProjects,
    ProjectCreate,
    ProjectOut,
    ProjectStats,
    ProjectUpdate,
)

_SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
_IMAGE_EXTENSIONS = frozenset({".jpg", ".jpeg", ".png", ".webp", ".gif"})
_MAX_IMAGE_BYTES = 15 * 1024 * 1024


class ProjectService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = ProjectRepository(db)
        self._upload_root = Path(settings.PROJECT_UPLOAD_DIR)

    def get_stats(self) -> ProjectStats:
        return ProjectStats(**self.repo.stats())

    def list_projects(
        self,
        *,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        published_only: bool = False,
    ) -> PaginatedProjects:
        page = max(1, page)
        page_size = min(max(1, page_size), 100)
        items, total = self.repo.list(
            status=status,
            q=q,
            page=page,
            page_size=page_size,
            published_only=published_only,
        )
        pages = max(1, (total + page_size - 1) // page_size) if total else 1
        return PaginatedProjects(
            items=[ProjectOut.model_validate(p) for p in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_project(self, project_id: int) -> ProjectOut:
        project = self.repo.get(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        return ProjectOut.model_validate(project)

    def create_project(self, body: ProjectCreate, image: UploadFile | None = None) -> ProjectOut:
        self._validate_status(body.status)
        slug = self._normalize_slug(body.slug)
        self._ensure_unique_slug(slug)

        image_url = body.image_url.strip()
        project = Project(
            slug=slug,
            title=body.title.strip(),
            industry=body.industry.strip(),
            service=body.service.strip(),
            location=body.location.strip(),
            image_url=image_url or "/uploads/projects/placeholder.jpg",
            image_alt=(body.image_alt or body.title).strip(),
            live_url=body.live_url.strip(),
            status=body.status,
            featured=body.featured,
            sort_order=body.sort_order,
        )
        project = self.repo.create(project)

        if image is not None and image.filename:
            project.image_url = self._store_image(project.id, image)
            project = self.repo.save(project)

        return ProjectOut.model_validate(project)

    def update_project(
        self,
        project_id: int,
        body: ProjectUpdate,
        image: UploadFile | None = None,
    ) -> ProjectOut:
        project = self.repo.get(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")

        data = {
            key: value
            for key, value in body.model_dump(exclude_unset=True).items()
            if value is not None
        }

        if "status" in data:
            self._validate_status(data["status"])

        if "slug" in data:
            slug = self._normalize_slug(data["slug"])
            self._ensure_unique_slug(slug, exclude_id=project.id)
            data["slug"] = slug

        for key in ("title", "industry", "service", "location", "image_url", "image_alt", "live_url"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()

        for key, value in data.items():
            setattr(project, key, value)

        if image is not None and image.filename:
            project.image_url = self._store_image(project.id, image)

        project = self.repo.save(project)
        return ProjectOut.model_validate(project)

    def delete_project(self, project_id: int) -> None:
        project = self.repo.get(project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        self.repo.delete(project)

    def _validate_status(self, value: str) -> None:
        if value not in PROJECT_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Allowed: {', '.join(sorted(PROJECT_STATUSES))}.",
            )

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
                detail="A project with this slug already exists.",
            )

    def _store_image(self, project_id: int, upload: UploadFile) -> str:
        original = upload.filename or "image"
        ext = Path(original).suffix.lower()
        content_type = (upload.content_type or "").lower()

        if ext not in _IMAGE_EXTENSIONS:
            guessed = mimetypes.guess_extension(content_type) or ""
            if guessed == ".jpe":
                guessed = ".jpg"
            if guessed not in _IMAGE_EXTENSIONS:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Image must be JPG, PNG, WEBP, or GIF.",
                )
            ext = guessed

        raw = upload.file.read()
        if not raw:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty image file.")
        if len(raw) > _MAX_IMAGE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Image exceeds 15MB limit.",
            )

        folder = self._upload_root / str(project_id)
        folder.mkdir(parents=True, exist_ok=True)
        stored = f"{uuid.uuid4().hex}{ext}"
        path = folder / stored
        path.write_bytes(raw)

        # Public URL served by StaticFiles mount at /uploads
        return f"/uploads/projects/{project_id}/{stored}"
