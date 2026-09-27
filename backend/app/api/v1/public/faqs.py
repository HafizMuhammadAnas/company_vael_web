from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.faq import PublicFaqBlock, PublicFaqCategory
from app.services.faq_service import FaqService

router = APIRouter(tags=["public-faqs"])


@router.get("/faqs", response_model=PublicFaqBlock)
def get_public_faqs(db: Session = Depends(get_db)) -> PublicFaqBlock:
    """Active FAQ categories with active items for /faqs and service pages."""
    return FaqService(db).public_block()


@router.get("/faqs/{slug}", response_model=PublicFaqCategory)
def get_public_faq_category(slug: str, db: Session = Depends(get_db)) -> PublicFaqCategory:
    return FaqService(db).public_category(slug)
