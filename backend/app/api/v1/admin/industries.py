from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.industry import (
    IndustryCreate,
    IndustryOut,
    IndustrySettingsOut,
    IndustrySettingsUpdate,
    IndustryStats,
    IndustryUpdate,
    PaginatedIndustries,
)
from app.services.industry_service import IndustryService

router = APIRouter(tags=["admin-industries"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/industries/stats", response_model=IndustryStats)
def industry_stats(db: Session = Depends(get_db), _: User = Depends(_view_roles)) -> IndustryStats:
    return IndustryService(db).get_stats()


@router.get("/industries/settings", response_model=IndustrySettingsOut)
def get_industry_settings(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> IndustrySettingsOut:
    return IndustryService(db).get_settings()


@router.patch("/industries/settings", response_model=IndustrySettingsOut)
def update_industry_settings(
    body: IndustrySettingsUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> IndustrySettingsOut:
    return IndustryService(db).update_settings(body)


@router.get("/industries", response_model=PaginatedIndustries)
def list_industries(
    is_active: bool | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedIndustries:
    return IndustryService(db).list_industries(
        is_active=is_active,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/industries/{industry_id}", response_model=IndustryOut)
def get_industry(
    industry_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> IndustryOut:
    return IndustryService(db).get_industry(industry_id)


@router.post("/industries", response_model=IndustryOut, status_code=201)
def create_industry(
    body: IndustryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> IndustryOut:
    return IndustryService(db).create_industry(body)


@router.patch("/industries/{industry_id}", response_model=IndustryOut)
def update_industry(
    industry_id: int,
    body: IndustryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> IndustryOut:
    return IndustryService(db).update_industry(industry_id, body)


@router.delete("/industries/{industry_id}", status_code=204)
def delete_industry(
    industry_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    IndustryService(db).delete_industry(industry_id)
