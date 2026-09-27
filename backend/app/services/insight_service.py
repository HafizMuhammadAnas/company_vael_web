"""Insight service — validation and DTO mapping."""

from __future__ import annotations

import json
import re
from datetime import date

from fastapi import HTTPException, status

from app.models.insight import INSIGHT_COVERS, INSIGHT_STATUSES, Insight
from app.repositories.insight_repository import InsightRepository
from app.schemas.insight import (
    InsightCreate,
    InsightListItem,
    InsightOut,
    InsightStats,
    InsightUpdate,
    PaginatedInsights,
)

_SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


class InsightService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = InsightRepository(db)

    def get_stats(self) -> InsightStats:
        return InsightStats(**self.repo.stats())

    def list_insights(
        self,
        *,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        public_index: bool = False,
    ) -> PaginatedInsights:
        page = max(1, page)
        page_size = min(max(1, page_size), 100)
        items, total = self.repo.list(
            status=status,
            q=q,
            page=page,
            page_size=page_size,
            public_index=public_index,
        )
        pages = max(1, (total + page_size - 1) // page_size) if total else 1
        return PaginatedInsights(
            items=[self._list_item(i) for i in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_insight(self, insight_id: int) -> InsightOut:
        insight = self.repo.get(insight_id)
        if not insight:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Insight not found.")
        return self._out(insight)

    def get_published_by_slug(self, slug: str) -> InsightOut:
        insight = self.repo.get_by_slug(slug)
        if not insight or insight.status != "published":
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Insight not found.")
        return self._out(insight)

    def create_insight(self, body: InsightCreate) -> InsightOut:
        self._validate_status(body.status)
        self._validate_cover(body.cover)
        slug = self._normalize_slug(body.slug)
        self._ensure_unique_slug(slug)

        insight = Insight(
            slug=slug,
            title=body.title.strip(),
            category=body.category.strip(),
            tags=self._normalize_tags(body.tags),
            description=body.description.strip(),
            body=body.body.strip(),
            read_time=body.read_time.strip() or "5 min",
            cover=body.cover,
            status=body.status,
            featured=body.featured,
            published_date=body.published_date or self._default_date(body.status),
            sort_order=body.sort_order,
        )
        insight = self.repo.create(insight)
        return self._out(insight)

    def update_insight(self, insight_id: int, body: InsightUpdate) -> InsightOut:
        insight = self.repo.get(insight_id)
        if not insight:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Insight not found.")

        data = body.model_dump(exclude_unset=True)

        if "status" in data and data["status"] is not None:
            self._validate_status(data["status"])
        if "cover" in data and data["cover"] is not None:
            self._validate_cover(data["cover"])
        if "slug" in data and data["slug"] is not None:
            slug = self._normalize_slug(data["slug"])
            self._ensure_unique_slug(slug, exclude_id=insight.id)
            data["slug"] = slug
        if "tags" in data and data["tags"] is not None:
            data["tags"] = self._normalize_tags(data["tags"])

        for key in ("title", "category", "description", "body", "read_time"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()

        for key, value in data.items():
            setattr(insight, key, value)

        if insight.status == "published" and insight.published_date is None:
            insight.published_date = date.today()

        insight = self.repo.save(insight)
        return self._out(insight)

    def delete_insight(self, insight_id: int) -> None:
        insight = self.repo.get(insight_id)
        if not insight:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Insight not found.")
        self.repo.delete(insight)

    def _default_date(self, status_value: str) -> date | None:
        return date.today() if status_value == "published" else None

    def _validate_status(self, value: str) -> None:
        if value not in INSIGHT_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Allowed: {', '.join(sorted(INSIGHT_STATUSES))}.",
            )

    def _validate_cover(self, value: str) -> None:
        if value not in INSIGHT_COVERS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid cover. Allowed: {', '.join(sorted(INSIGHT_COVERS))}.",
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
                detail="An insight with this slug already exists.",
            )

    def _normalize_tags(self, tags: list[str] | None) -> list[str]:
        if not tags:
            return []
        cleaned: list[str] = []
        for tag in tags:
            value = tag.strip()
            if value and value not in cleaned:
                cleaned.append(value)
        return cleaned

    def _tags(self, insight: Insight) -> list[str]:
        raw = insight.tags
        if isinstance(raw, list):
            return [str(t) for t in raw]
        if isinstance(raw, str):
            try:
                parsed = json.loads(raw)
                if isinstance(parsed, list):
                    return [str(t) for t in parsed]
            except json.JSONDecodeError:
                return [t.strip() for t in raw.split(",") if t.strip()]
        return []

    def _out(self, insight: Insight) -> InsightOut:
        return InsightOut(
            id=insight.id,
            slug=insight.slug,
            title=insight.title,
            category=insight.category,
            tags=self._tags(insight),
            description=insight.description or "",
            body=insight.body or "",
            read_time=insight.read_time,
            cover=insight.cover,
            status=insight.status,
            featured=insight.featured,
            published_date=insight.published_date,
            sort_order=insight.sort_order,
            created_at=insight.created_at,
            updated_at=insight.updated_at,
        )

    def _list_item(self, insight: Insight) -> InsightListItem:
        return InsightListItem(
            id=insight.id,
            slug=insight.slug,
            title=insight.title,
            category=insight.category,
            tags=self._tags(insight),
            description=insight.description or "",
            read_time=insight.read_time,
            cover=insight.cover,
            status=insight.status,
            featured=insight.featured,
            published_date=insight.published_date,
            sort_order=insight.sort_order,
            created_at=insight.created_at,
            updated_at=insight.updated_at,
        )


def parse_tags_field(raw: str | None) -> list[str]:
    if not raw:
        return []
    raw = raw.strip()
    if not raw:
        return []
    if raw.startswith("["):
        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                return [str(t).strip() for t in parsed if str(t).strip()]
        except json.JSONDecodeError:
            pass
    return [t.strip() for t in raw.split(",") if t.strip()]
