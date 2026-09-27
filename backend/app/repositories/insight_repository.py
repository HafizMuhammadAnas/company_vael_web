"""Insight repository — SQLAlchemy data access."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.insight import Insight


class InsightRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, insight_id: int) -> Insight | None:
        return self.db.get(Insight, insight_id)

    def get_by_slug(self, slug: str) -> Insight | None:
        return self.db.scalar(select(Insight).where(Insight.slug == slug))

    def list(
        self,
        *,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        public_index: bool = False,
    ) -> tuple[list[Insight], int]:
        stmt = select(Insight)
        count_stmt = select(func.count()).select_from(Insight)

        if public_index:
            stmt = stmt.where(Insight.status.in_(("coming-soon", "published")))
            count_stmt = count_stmt.where(Insight.status.in_(("coming-soon", "published")))
        elif status:
            stmt = stmt.where(Insight.status == status)
            count_stmt = count_stmt.where(Insight.status == status)

        if q:
            like = f"%{q.strip()}%"
            filt = or_(
                Insight.title.ilike(like),
                Insight.category.ilike(like),
                Insight.slug.ilike(like),
                Insight.description.ilike(like),
            )
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(Insight.sort_order.asc(), Insight.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create(self, insight: Insight) -> Insight:
        self.db.add(insight)
        self.db.commit()
        self.db.refresh(insight)
        return insight

    def save(self, insight: Insight) -> Insight:
        self.db.add(insight)
        self.db.commit()
        self.db.refresh(insight)
        return insight

    def delete(self, insight: Insight) -> None:
        self.db.delete(insight)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(Insight)) or 0)
        published = int(
            self.db.scalar(
                select(func.count()).select_from(Insight).where(Insight.status == "published")
            )
            or 0
        )
        coming_soon = int(
            self.db.scalar(
                select(func.count()).select_from(Insight).where(Insight.status == "coming-soon")
            )
            or 0
        )
        draft = int(
            self.db.scalar(
                select(func.count()).select_from(Insight).where(Insight.status == "draft")
            )
            or 0
        )
        featured = int(
            self.db.scalar(
                select(func.count()).select_from(Insight).where(Insight.featured.is_(True))
            )
            or 0
        )
        return {
            "total": total,
            "published": published,
            "coming_soon": coming_soon,
            "draft": draft,
            "featured": featured,
        }
