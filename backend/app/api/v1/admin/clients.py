from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.client import ClientCreate, ClientOut, ClientStats, ClientUpdate, PaginatedClients
from app.services.client_service import ClientService

router = APIRouter(tags=["admin-clients"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/clients/stats", response_model=ClientStats)
def client_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> ClientStats:
    return ClientService(db).get_stats()


@router.get("/clients", response_model=PaginatedClients)
def list_clients(
    is_active: bool | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedClients:
    return ClientService(db).list_clients(
        is_active=is_active,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/clients/{client_id}", response_model=ClientOut)
def get_client(
    client_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> ClientOut:
    return ClientService(db).get_client(client_id)


@router.post("/clients", response_model=ClientOut, status_code=201)
async def create_client(
    slug: str = Form(...),
    name: str = Form(...),
    logo_url: str = Form(default=""),
    logo_alt: str = Form(default=""),
    is_active: bool = Form(default=True),
    sort_order: int = Form(default=0),
    logo: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> ClientOut:
    if (not logo or not logo.filename) and not logo_url.strip():
        raise HTTPException(status_code=400, detail="Provide a logo file or logo_url.")
    body = ClientCreate(
        slug=slug,
        name=name,
        logo_url=logo_url.strip() or "pending",
        logo_alt=logo_alt,
        is_active=is_active,
        sort_order=sort_order,
    )
    return ClientService(db).create_client(body, logo=logo)


@router.patch("/clients/{client_id}", response_model=ClientOut)
async def update_client(
    client_id: int,
    slug: str | None = Form(default=None),
    name: str | None = Form(default=None),
    logo_url: str | None = Form(default=None),
    logo_alt: str | None = Form(default=None),
    is_active: bool | None = Form(default=None),
    sort_order: int | None = Form(default=None),
    logo: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> ClientOut:
    body = ClientUpdate(
        slug=slug,
        name=name,
        logo_url=logo_url,
        logo_alt=logo_alt,
        is_active=is_active,
        sort_order=sort_order,
    )
    return ClientService(db).update_client(client_id, body, logo=logo)


@router.delete("/clients/{client_id}", status_code=204)
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    ClientService(db).delete_client(client_id)
