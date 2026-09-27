from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.google_review import PublicGoogleReviewsBlock
from app.services.google_review_service import GoogleReviewService

router = APIRouter(tags=["public-google-reviews"])


@router.get("/reviews", response_model=PublicGoogleReviewsBlock)
def get_public_reviews(db: Session = Depends(get_db)) -> PublicGoogleReviewsBlock:
    """Active Google reviews + summary settings for the homepage."""
    return GoogleReviewService(db).public_block()
