"""Industry service."""

from __future__ import annotations

import re

from fastapi import HTTPException, status

from app.models.industry import Industry
from app.repositories.industry_repository import IndustryRepository
from app.schemas.industry import (
    IndustryCreate,
    IndustryOut,
    IndustrySettingsOut,
    IndustrySettingsUpdate,
    IndustryStats,
    IndustryUpdate,
    PaginatedIndustries,
    PublicIndustriesBlock,
)

ALLOWED_ICONS = {"building", "book", "heart", "sprout", "chart", "truck", "shopping"}
ALLOWED_ACCENTS = {"neon", "violet", "pink", "blue"}


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower().strip())
    return slug.strip("-")[:80]


class IndustryService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = IndustryRepository(db)

    def get_stats(self) -> IndustryStats:
        return IndustryStats(**self.repo.stats())

    def get_settings(self) -> IndustrySettingsOut:
        return IndustrySettingsOut.model_validate(self._require_settings())

    def update_settings(self, body: IndustrySettingsUpdate) -> IndustrySettingsOut:
        settings = self._require_settings()
        data = body.model_dump(exclude_unset=True)
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = value.strip()
        for key, value in data.items():
            setattr(settings, key, value)
        return IndustrySettingsOut.model_validate(self.repo.save_settings(settings))

    def list_industries(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> PaginatedIndustries:
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
        return PaginatedIndustries(
            items=[IndustryOut.model_validate(i) for i in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_industry(self, industry_id: int) -> IndustryOut:
        industry = self.repo.get(industry_id)
        if not industry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found.")
        return IndustryOut.model_validate(industry)

    def create_industry(self, body: IndustryCreate) -> IndustryOut:
        slug = _slugify(body.slug)
        if not slug:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
        if self.repo.get_by_slug(slug):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
        icon = body.icon_key if body.icon_key in ALLOWED_ICONS else "building"
        accent = body.accent_key if body.accent_key in ALLOWED_ACCENTS else "neon"
        industry = Industry(
            slug=slug,
            title=body.title.strip(),
            short=(body.short or body.title).strip(),
            icon_key=icon,
            accent_key=accent,
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        return IndustryOut.model_validate(self.repo.create(industry))

    def update_industry(self, industry_id: int, body: IndustryUpdate) -> IndustryOut:
        industry = self.repo.get(industry_id)
        if not industry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found.")
        data = body.model_dump(exclude_unset=True)
        if "slug" in data and data["slug"] is not None:
            slug = _slugify(data["slug"])
            if not slug:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
            existing = self.repo.get_by_slug(slug)
            if existing and existing.id != industry.id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
            data["slug"] = slug
        if "icon_key" in data and data["icon_key"] not in ALLOWED_ICONS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid icon_key.")
        if "accent_key" in data and data["accent_key"] not in ALLOWED_ACCENTS:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid accent_key.")
        for key in ("title", "short"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        for key, value in data.items():
            setattr(industry, key, value)
        return IndustryOut.model_validate(self.repo.save(industry))

    def delete_industry(self, industry_id: int) -> None:
        industry = self.repo.get(industry_id)
        if not industry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Industry not found.")
        self.repo.delete(industry)

    def public_block(self) -> PublicIndustriesBlock:
        settings = self.get_settings()
        industries = self.list_industries(page=1, page_size=100, active_only=True).items
        return PublicIndustriesBlock(settings=settings, industries=industries)

    def _require_settings(self):
        settings = self.repo.get_settings()
        if not settings:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Industry settings are not configured.",
            )
        return settings
