from fastapi import APIRouter, Depends, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.lead import LeadDetail, LeadStats, LeadStatusUpdate, PaginatedLeads
from app.services.lead_service import LeadService

router = APIRouter(tags=["admin-leads"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/leads/stats", response_model=LeadStats)
def lead_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> LeadStats:
    return LeadService(db).get_stats()


@router.get("/leads", response_model=PaginatedLeads)
def list_leads(
    form_type: str | None = Query(default=None),
    status: str | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedLeads:
    return LeadService(db).list_leads(
        form_type=form_type,
        status=status,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/leads/{lead_id}", response_model=LeadDetail)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> LeadDetail:
    return LeadService(db).get_lead(lead_id)


@router.patch("/leads/{lead_id}", response_model=LeadDetail)
def update_lead_status(
    lead_id: int,
    body: LeadStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> LeadDetail:
    return LeadService(db).update_status(lead_id, body)


@router.get("/leads/{lead_id}/attachments/{attachment_id}")
def download_attachment(
    lead_id: int,
    attachment_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> FileResponse:
    path, filename, content_type = LeadService(db).get_attachment_path(lead_id, attachment_id)
    return FileResponse(
        path,
        filename=filename,
        media_type=content_type or "application/octet-stream",
    )
