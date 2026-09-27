"""Google reviews repository."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.google_review import GoogleReview, GoogleReviewSettings


class GoogleReviewRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_settings(self) -> GoogleReviewSettings | None:
        return self.db.scalar(select(GoogleReviewSettings).order_by(GoogleReviewSettings.id.asc()).limit(1))

    def save_settings(self, settings: GoogleReviewSettings) -> GoogleReviewSettings:
        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)
        return settings

    def get(self, review_id: int) -> GoogleReview | None:
        return self.db.get(GoogleReview, review_id)

    def list(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> tuple[list[GoogleReview], int]:
        stmt = select(GoogleReview)
        count_stmt = select(func.count()).select_from(GoogleReview)

        if active_only:
            stmt = stmt.where(GoogleReview.is_active.is_(True))
            count_stmt = count_stmt.where(GoogleReview.is_active.is_(True))
        elif is_active is not None:
            stmt = stmt.where(GoogleReview.is_active.is_(is_active))
            count_stmt = count_stmt.where(GoogleReview.is_active.is_(is_active))

        if q:
            like = f"%{q.strip()}%"
            filt = or_(GoogleReview.author.ilike(like), GoogleReview.text.ilike(like))
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(GoogleReview.sort_order.asc(), GoogleReview.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create(self, review: GoogleReview) -> GoogleReview:
        self.db.add(review)
        self.db.commit()
        self.db.refresh(review)
        return review

    def save(self, review: GoogleReview) -> GoogleReview:
        self.db.add(review)
        self.db.commit()
        self.db.refresh(review)
        return review

    def delete(self, review: GoogleReview) -> None:
        self.db.delete(review)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(GoogleReview)) or 0)
        active = int(
            self.db.scalar(
                select(func.count()).select_from(GoogleReview).where(GoogleReview.is_active.is_(True))
            )
            or 0
        )
        return {"total": total, "active": active, "inactive": total - active}
