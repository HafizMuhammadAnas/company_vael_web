from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.client import PaginatedClients
from app.services.client_service import ClientService

router = APIRouter(tags=["public-clients"])


@router.get("/clients", response_model=PaginatedClients)
def list_active_clients(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=100, ge=1, le=100),
    db: Session = Depends(get_db),
) -> PaginatedClients:
    """Active client logos for the marketing site marquee."""
    return ClientService(db).list_clients(
        page=page,
        page_size=page_size,
        active_only=True,
    )
