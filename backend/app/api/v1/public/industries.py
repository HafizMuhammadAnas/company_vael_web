from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.industry import PublicIndustriesBlock
from app.services.industry_service import IndustryService

router = APIRouter(tags=["public-industries"])


@router.get("/industries", response_model=PublicIndustriesBlock)
def get_public_industries(db: Session = Depends(get_db)) -> PublicIndustriesBlock:
    return IndustryService(db).public_block()
