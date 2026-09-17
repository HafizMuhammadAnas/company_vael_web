from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class GoogleReviewSettingsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    heading: str
    summary_label: str
    rating: float
    review_count: int
    profile_url: str
    updated_at: datetime


class GoogleReviewSettingsUpdate(BaseModel):
    heading: str | None = None
    summary_label: str | None = Field(default=None, max_length=64)
    rating: float | None = Field(default=None, ge=1, le=5)
    review_count: int | None = Field(default=None, ge=0)
    profile_url: str | None = Field(default=None, max_length=500)


class GoogleReviewCreate(BaseModel):
    author: str = Field(min_length=1, max_length=160)
    relative_time: str = Field(default="", max_length=64)
    rating: int = Field(default=5, ge=1, le=5)
    text: str = Field(min_length=1)
    initials: str = Field(default="", max_length=8)
    avatar_src: str = Field(default="", max_length=500)
    avatar_color: str = Field(default="#4285F4", max_length=32)
    is_active: bool = True
    sort_order: int = 0


class GoogleReviewUpdate(BaseModel):
    author: str | None = Field(default=None, min_length=1, max_length=160)
    relative_time: str | None = Field(default=None, max_length=64)
    rating: int | None = Field(default=None, ge=1, le=5)
    text: str | None = Field(default=None, min_length=1)
    initials: str | None = Field(default=None, max_length=8)
    avatar_src: str | None = Field(default=None, max_length=500)
    avatar_color: str | None = Field(default=None, max_length=32)
    is_active: bool | None = None
    sort_order: int | None = None


class GoogleReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author: str
    relative_time: str
    rating: int
    text: str
    initials: str
    avatar_src: str
    avatar_color: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedGoogleReviews(BaseModel):
    items: list[GoogleReviewOut]
    total: int
    page: int
    page_size: int
    pages: int


class GoogleReviewStats(BaseModel):
    total: int
    active: int
    inactive: int


class PublicGoogleReviewsBlock(BaseModel):
    settings: GoogleReviewSettingsOut
    reviews: list[GoogleReviewOut]
