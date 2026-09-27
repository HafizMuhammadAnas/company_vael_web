from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.project import PaginatedProjects
from app.services.project_service import ProjectService

router = APIRouter(tags=["public-projects"])


@router.get("/projects", response_model=PaginatedProjects)
def list_published_projects(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
) -> PaginatedProjects:
    """Published portfolio projects for the marketing site."""
    return ProjectService(db).list_projects(
        page=page,
        page_size=page_size,
        published_only=True,
    )
