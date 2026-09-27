from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.career import (
    CareerJobCreate,
    CareerJobOut,
    CareerJobUpdate,
    CareerSettingsOut,
    CareerSettingsUpdate,
    CareerStats,
    PaginatedCareerJobs,
)
from app.services.career_service import CareerService

router = APIRouter(tags=["admin-careers"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/careers/stats", response_model=CareerStats)
def career_stats(db: Session = Depends(get_db), _: User = Depends(_view_roles)) -> CareerStats:
    return CareerService(db).get_stats()


@router.get("/careers/settings", response_model=CareerSettingsOut)
def get_career_settings(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> CareerSettingsOut:
    return CareerService(db).get_settings()


@router.patch("/careers/settings", response_model=CareerSettingsOut)
def update_career_settings(
    body: CareerSettingsUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> CareerSettingsOut:
    return CareerService(db).update_settings(body)


@router.get("/careers/jobs", response_model=PaginatedCareerJobs)
def list_career_jobs(
    status: str | None = Query(default=None),
    is_active: bool | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedCareerJobs:
    return CareerService(db).list_jobs(
        status=status,
        is_active=is_active,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/careers/jobs/{job_id}", response_model=CareerJobOut)
def get_career_job(
    job_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> CareerJobOut:
    return CareerService(db).get_job(job_id)


@router.post("/careers/jobs", response_model=CareerJobOut, status_code=201)
def create_career_job(
    body: CareerJobCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> CareerJobOut:
    return CareerService(db).create_job(body)


@router.patch("/careers/jobs/{job_id}", response_model=CareerJobOut)
def update_career_job(
    job_id: int,
    body: CareerJobUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> CareerJobOut:
    return CareerService(db).update_job(job_id, body)


@router.delete("/careers/jobs/{job_id}", status_code=204)
def delete_career_job(
    job_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    CareerService(db).delete_job(job_id)
