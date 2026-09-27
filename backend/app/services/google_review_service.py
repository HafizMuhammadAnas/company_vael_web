"""Google reviews service."""

from __future__ import annotations

from fastapi import HTTPException, status

from app.models.google_review import GoogleReview, GoogleReviewSettings
from app.repositories.google_review_repository import GoogleReviewRepository
from app.schemas.google_review import (
    GoogleReviewCreate,
    GoogleReviewOut,
    GoogleReviewSettingsOut,
    GoogleReviewSettingsUpdate,
    GoogleReviewStats,
    GoogleReviewUpdate,
    PaginatedGoogleReviews,
    PublicGoogleReviewsBlock,
)


class GoogleReviewService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = GoogleReviewRepository(db)

    def get_stats(self) -> GoogleReviewStats:
        return GoogleReviewStats(**self.repo.stats())

    def get_settings(self) -> GoogleReviewSettingsOut:
        settings = self._require_settings()
        return GoogleReviewSettingsOut.model_validate(settings)

    def update_settings(self, body: GoogleReviewSettingsUpdate) -> GoogleReviewSettingsOut:
        settings = self._require_settings()
        data = body.model_dump(exclude_unset=True)
        for key in ("heading", "summary_label", "profile_url"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        for key, value in data.items():
            setattr(settings, key, value)
        settings = self.repo.save_settings(settings)
        return GoogleReviewSettingsOut.model_validate(settings)

    def list_reviews(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> PaginatedGoogleReviews:
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
        return PaginatedGoogleReviews(
            items=[GoogleReviewOut.model_validate(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_review(self, review_id: int) -> GoogleReviewOut:
        review = self.repo.get(review_id)
        if not review:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found.")
        return GoogleReviewOut.model_validate(review)

    def create_review(self, body: GoogleReviewCreate) -> GoogleReviewOut:
        review = GoogleReview(
            author=body.author.strip(),
            relative_time=body.relative_time.strip(),
            rating=body.rating,
            text=body.text.strip(),
            initials=(body.initials or body.author[:1]).strip().upper()[:8],
            avatar_src=body.avatar_src.strip(),
            avatar_color=body.avatar_color.strip() or "#4285F4",
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        review = self.repo.create(review)
        return GoogleReviewOut.model_validate(review)

    def update_review(self, review_id: int, body: GoogleReviewUpdate) -> GoogleReviewOut:
        review = self.repo.get(review_id)
        if not review:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found.")

        data = body.model_dump(exclude_unset=True)
        for key in ("author", "relative_time", "text", "initials", "avatar_src", "avatar_color"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        if "initials" in data and data["initials"]:
            data["initials"] = data["initials"].upper()[:8]
        for key, value in data.items():
            setattr(review, key, value)

        review = self.repo.save(review)
        return GoogleReviewOut.model_validate(review)

    def delete_review(self, review_id: int) -> None:
        review = self.repo.get(review_id)
        if not review:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found.")
        self.repo.delete(review)

    def public_block(self) -> PublicGoogleReviewsBlock:
        settings = self.get_settings()
        reviews = self.list_reviews(page=1, page_size=100, active_only=True).items
        return PublicGoogleReviewsBlock(settings=settings, reviews=reviews)

    def _require_settings(self) -> GoogleReviewSettings:
        settings = self.repo.get_settings()
        if not settings:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Google review settings are not configured.",
            )
        return settings
