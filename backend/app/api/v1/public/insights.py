from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.insight import InsightOut, PaginatedInsights
from app.services.insight_service import InsightService

router = APIRouter(tags=["public-insights"])


@router.get("/insights", response_model=PaginatedInsights)
def list_public_insights(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
) -> PaginatedInsights:
    """Published + coming-soon insights for the public index."""
    return InsightService(db).list_insights(
        page=page,
        page_size=page_size,
        public_index=True,
    )


@router.get("/insights/{slug}", response_model=InsightOut)
def get_public_insight(
    slug: str,
    db: Session = Depends(get_db),
) -> InsightOut:
    """Published insight detail by slug."""
    return InsightService(db).get_published_by_slug(slug)
