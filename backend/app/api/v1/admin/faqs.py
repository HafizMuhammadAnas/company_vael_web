from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.user import User
from app.schemas.faq import (
    FaqCategoryCreate,
    FaqCategoryOut,
    FaqCategoryUpdate,
    FaqItemCreate,
    FaqItemOut,
    FaqItemUpdate,
    FaqStats,
    PaginatedFaqItems,
)
from app.services.faq_service import FaqService

router = APIRouter(tags=["admin-faqs"])

_view_roles = require_role("admin", "editor", "viewer")
_edit_roles = require_role("admin", "editor")


@router.get("/faqs/stats", response_model=FaqStats)
def faq_stats(
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> FaqStats:
    return FaqService(db).get_stats()


@router.get("/faqs/categories", response_model=list[FaqCategoryOut])
def list_faq_categories(
    is_active: bool | None = Query(default=None),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> list[FaqCategoryOut]:
    return FaqService(db).list_categories(is_active=is_active)


@router.get("/faqs/categories/{category_id}", response_model=FaqCategoryOut)
def get_faq_category(
    category_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> FaqCategoryOut:
    return FaqService(db).get_category(category_id)


@router.post("/faqs/categories", response_model=FaqCategoryOut, status_code=201)
def create_faq_category(
    body: FaqCategoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> FaqCategoryOut:
    return FaqService(db).create_category(body)


@router.patch("/faqs/categories/{category_id}", response_model=FaqCategoryOut)
def update_faq_category(
    category_id: int,
    body: FaqCategoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> FaqCategoryOut:
    return FaqService(db).update_category(category_id, body)


@router.delete("/faqs/categories/{category_id}", status_code=204)
def delete_faq_category(
    category_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    FaqService(db).delete_category(category_id)


@router.get("/faqs/items", response_model=PaginatedFaqItems)
def list_faq_items(
    category_id: int | None = Query(default=None),
    is_active: bool | None = Query(default=None),
    q: str | None = Query(default=None, max_length=200),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> PaginatedFaqItems:
    return FaqService(db).list_items(
        category_id=category_id,
        is_active=is_active,
        q=q,
        page=page,
        page_size=page_size,
    )


@router.get("/faqs/items/{item_id}", response_model=FaqItemOut)
def get_faq_item(
    item_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_view_roles),
) -> FaqItemOut:
    return FaqService(db).get_item(item_id)


@router.post("/faqs/items", response_model=FaqItemOut, status_code=201)
def create_faq_item(
    body: FaqItemCreate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> FaqItemOut:
    return FaqService(db).create_item(body)


@router.patch("/faqs/items/{item_id}", response_model=FaqItemOut)
def update_faq_item(
    item_id: int,
    body: FaqItemUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> FaqItemOut:
    return FaqService(db).update_item(item_id, body)


@router.delete("/faqs/items/{item_id}", status_code=204)
def delete_faq_item(
    item_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(_edit_roles),
) -> None:
    FaqService(db).delete_item(item_id)
