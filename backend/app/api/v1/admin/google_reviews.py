from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.google_review import (
    GoogleReviewCreate,
    GoogleReviewOut,
    GoogleReviewSettingsOut,
    GoogleReviewSettingsUpdate,
    GoogleReviewStats,
    GoogleReviewUpdate,
    PaginatedGoogleReviews,
)
from app.services.google_review_service import GoogleReviewService

router = APIRouter(tags=["admin-google-reviews"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/reviews/stats", response_model=GoogleReviewStats)
def review_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> GoogleReviewStats:
    return GoogleReviewService(db).get_stats()


@router.get("/reviews/settings", response_model=GoogleReviewSettingsOut)
def get_review_settings(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> GoogleReviewSettingsOut:
    return GoogleReviewService(db).get_settings()


@router.patch("/reviews/settings", response_model=GoogleReviewSettingsOut)
def update_review_settings(
    body: GoogleReviewSettingsUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> GoogleReviewSettingsOut:
    return GoogleReviewService(db).update_settings(body)


@router.get("/reviews", response_model=PaginatedGoogleReviews)
def list_reviews(
    is_active: bool | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedGoogleReviews:
    return GoogleReviewService(db).list_reviews(
        is_active=is_active,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/reviews/{review_id}", response_model=GoogleReviewOut)
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> GoogleReviewOut:
    return GoogleReviewService(db).get_review(review_id)


@router.post("/reviews", response_model=GoogleReviewOut, status_code=201)
def create_review(
    body: GoogleReviewCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> GoogleReviewOut:
    return GoogleReviewService(db).create_review(body)


@router.patch("/reviews/{review_id}", response_model=GoogleReviewOut)
def update_review(
    review_id: int,
    body: GoogleReviewUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> GoogleReviewOut:
    return GoogleReviewService(db).update_review(review_id, body)


@router.delete("/reviews/{review_id}", status_code=204)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    GoogleReviewService(db).delete_review(review_id)
