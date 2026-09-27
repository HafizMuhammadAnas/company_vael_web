"""Careers service."""

from __future__ import annotations

import re

from fastapi import HTTPException, status

from app.models.career import CAREER_JOB_STATUSES, CareerJob
from app.repositories.career_repository import CareerRepository
from app.schemas.career import (
    CareerJobCreate,
    CareerJobOut,
    CareerJobUpdate,
    CareerSettingsOut,
    CareerSettingsUpdate,
    CareerStats,
    PaginatedCareerJobs,
    PublicCareersBlock,
)


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower().strip())
    return slug.strip("-")[:160]


class CareerService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = CareerRepository(db)

    def get_stats(self) -> CareerStats:
        return CareerStats(**self.repo.stats())

    def get_settings(self) -> CareerSettingsOut:
        return CareerSettingsOut.model_validate(self._require_settings())

    def update_settings(self, body: CareerSettingsUpdate) -> CareerSettingsOut:
        settings = self._require_settings()
        data = body.model_dump(exclude_unset=True)
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = value.strip()
        for key, value in data.items():
            setattr(settings, key, value)
        return CareerSettingsOut.model_validate(self.repo.save_settings(settings))

    def list_jobs(
        self,
        *,
        status: str | None = None,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        published_only: bool = False,
    ) -> PaginatedCareerJobs:
        page = max(1, page)
        page_size = min(max(1, page_size), 100)
        items, total = self.repo.list_jobs(
            status=status,
            is_active=is_active,
            q=q,
            page=page,
            page_size=page_size,
            published_only=published_only,
        )
        pages = max(1, (total + page_size - 1) // page_size) if total else 1
        return PaginatedCareerJobs(
            items=[CareerJobOut.model_validate(i) for i in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_job(self, job_id: int) -> CareerJobOut:
        job = self.repo.get_job(job_id)
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        return CareerJobOut.model_validate(job)

    def create_job(self, body: CareerJobCreate) -> CareerJobOut:
        slug = _slugify(body.slug)
        if not slug:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
        if self.repo.get_job_by_slug(slug):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
        if body.status not in CAREER_JOB_STATUSES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status.")
        job = CareerJob(
            slug=slug,
            title=body.title.strip(),
            department=body.department.strip(),
            location=body.location.strip(),
            employment_type=body.employment_type.strip() or "Full-time",
            summary=body.summary.strip(),
            description=body.description.strip(),
            requirements=list(body.requirements or []),
            apply_href=body.apply_href.strip(),
            status=body.status,
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        return CareerJobOut.model_validate(self.repo.create_job(job))

    def update_job(self, job_id: int, body: CareerJobUpdate) -> CareerJobOut:
        job = self.repo.get_job(job_id)
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        data = body.model_dump(exclude_unset=True)
        if "slug" in data and data["slug"] is not None:
            slug = _slugify(data["slug"])
            if not slug:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
            existing = self.repo.get_job_by_slug(slug)
            if existing and existing.id != job.id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
            data["slug"] = slug
        if "status" in data and data["status"] not in CAREER_JOB_STATUSES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid status.")
        for key in ("title", "department", "location", "employment_type", "summary", "description", "apply_href"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        for key, value in data.items():
            setattr(job, key, value)
        return CareerJobOut.model_validate(self.repo.save_job(job))

    def delete_job(self, job_id: int) -> None:
        job = self.repo.get_job(job_id)
        if not job:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        self.repo.delete_job(job)

    def public_block(self) -> PublicCareersBlock:
        settings = self.get_settings()
        jobs = self.list_jobs(page=1, page_size=100, published_only=True).items
        return PublicCareersBlock(settings=settings, jobs=jobs)

    def _require_settings(self):
        settings = self.repo.get_settings()
        if not settings:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Career settings are not configured.",
            )
        return settings
