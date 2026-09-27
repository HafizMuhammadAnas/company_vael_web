"""Industry repository."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.industry import Industry, IndustrySettings


class IndustryRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_settings(self) -> IndustrySettings | None:
        return self.db.scalar(select(IndustrySettings).order_by(IndustrySettings.id.asc()).limit(1))

    def save_settings(self, settings: IndustrySettings) -> IndustrySettings:
        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)
        return settings

    def get(self, industry_id: int) -> Industry | None:
        return self.db.get(Industry, industry_id)

    def get_by_slug(self, slug: str) -> Industry | None:
        return self.db.scalar(select(Industry).where(Industry.slug == slug))

    def list(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> tuple[list[Industry], int]:
        stmt = select(Industry)
        count_stmt = select(func.count()).select_from(Industry)

        if active_only:
            stmt = stmt.where(Industry.is_active.is_(True))
            count_stmt = count_stmt.where(Industry.is_active.is_(True))
        elif is_active is not None:
            stmt = stmt.where(Industry.is_active.is_(is_active))
            count_stmt = count_stmt.where(Industry.is_active.is_(is_active))

        if q:
            like = f"%{q.strip()}%"
            filt = or_(Industry.title.ilike(like), Industry.slug.ilike(like), Industry.short.ilike(like))
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(Industry.sort_order.asc(), Industry.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create(self, industry: Industry) -> Industry:
        self.db.add(industry)
        self.db.commit()
        self.db.refresh(industry)
        return industry

    def save(self, industry: Industry) -> Industry:
        self.db.add(industry)
        self.db.commit()
        self.db.refresh(industry)
        return industry

    def delete(self, industry: Industry) -> None:
        self.db.delete(industry)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(Industry)) or 0)
        active = int(
            self.db.scalar(
                select(func.count()).select_from(Industry).where(Industry.is_active.is_(True))
            )
            or 0
        )
        return {"total": total, "active": active, "inactive": total - active}
