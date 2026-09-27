from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.career import PublicCareersBlock
from app.services.career_service import CareerService

router = APIRouter(tags=["public-careers"])


@router.get("/careers", response_model=PublicCareersBlock)
def get_public_careers(db: Session = Depends(get_db)) -> PublicCareersBlock:
    return CareerService(db).public_block()
