from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.project import PaginatedProjects, ProjectCreate, ProjectOut, ProjectStats, ProjectUpdate
from app.services.project_service import ProjectService

router = APIRouter(tags=["admin-projects"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/projects/stats", response_model=ProjectStats)
def project_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> ProjectStats:
    return ProjectService(db).get_stats()


@router.get("/projects", response_model=PaginatedProjects)
def list_projects(
    status: str | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedProjects:
    return ProjectService(db).list_projects(
        status=status,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/projects/{project_id}", response_model=ProjectOut)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> ProjectOut:
    return ProjectService(db).get_project(project_id)


@router.post("/projects", response_model=ProjectOut, status_code=201)
async def create_project(
    slug: str = Form(...),
    title: str = Form(...),
    industry: str = Form(...),
    service: str = Form(...),
    location: str = Form(...),
    live_url: str = Form(...),
    image_url: str = Form(default=""),
    image_alt: str = Form(default=""),
    status: str = Form(default="draft"),
    featured: bool = Form(default=False),
    sort_order: int = Form(default=0),
    image: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> ProjectOut:
    body = ProjectCreate(
        slug=slug,
        title=title,
        industry=industry,
        service=service,
        location=location,
        image_url=image_url or "pending",
        image_alt=image_alt,
        live_url=live_url,
        status=status,
        featured=featured,
        sort_order=sort_order,
    )
    if (not image or not image.filename) and (not image_url or image_url == "pending"):
        from fastapi import HTTPException

        raise HTTPException(status_code=400, detail="Provide an image file or image_url.")
    if image_url and image_url != "pending":
        body.image_url = image_url
    return ProjectService(db).create_project(body, image=image)


@router.patch("/projects/{project_id}", response_model=ProjectOut)
async def update_project(
    project_id: int,
    slug: str | None = Form(default=None),
    title: str | None = Form(default=None),
    industry: str | None = Form(default=None),
    service: str | None = Form(default=None),
    location: str | None = Form(default=None),
    live_url: str | None = Form(default=None),
    image_url: str | None = Form(default=None),
    image_alt: str | None = Form(default=None),
    status: str | None = Form(default=None),
    featured: bool | None = Form(default=None),
    sort_order: int | None = Form(default=None),
    image: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> ProjectOut:
    body = ProjectUpdate(
        slug=slug,
        title=title,
        industry=industry,
        service=service,
        location=location,
        live_url=live_url,
        image_url=image_url,
        image_alt=image_alt,
        status=status,
        featured=featured,
        sort_order=sort_order,
    )
    return ProjectService(db).update_project(project_id, body, image=image)


@router.delete("/projects/{project_id}", status_code=204)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    ProjectService(db).delete_project(project_id)
