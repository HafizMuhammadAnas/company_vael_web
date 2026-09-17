from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.insight import (
    InsightCreate,
    InsightOut,
    InsightStats,
    InsightUpdate,
    PaginatedInsights,
)
from app.services.insight_service import InsightService

router = APIRouter(tags=["admin-insights"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/insights/stats", response_model=InsightStats)
def insight_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> InsightStats:
    return InsightService(db).get_stats()


@router.get("/insights", response_model=PaginatedInsights)
def list_insights(
    status: str | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedInsights:
    return InsightService(db).list_insights(
        status=status,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/insights/{insight_id}", response_model=InsightOut)
def get_insight(
    insight_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> InsightOut:
    return InsightService(db).get_insight(insight_id)


@router.post("/insights", response_model=InsightOut, status_code=201)
def create_insight(
    body: InsightCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> InsightOut:
    return InsightService(db).create_insight(body)


@router.patch("/insights/{insight_id}", response_model=InsightOut)
def update_insight(
    insight_id: int,
    body: InsightUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> InsightOut:
    return InsightService(db).update_insight(insight_id, body)


@router.delete("/insights/{insight_id}", status_code=204)
def delete_insight(
    insight_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    InsightService(db).delete_insight(insight_id)
