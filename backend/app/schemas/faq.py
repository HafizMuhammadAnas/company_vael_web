"""FAQ Pydantic schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class FaqCategoryCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=80)
    label: str = Field(min_length=1, max_length=120)
    section_label: str = Field(default="", max_length=120)
    heading: str = Field(min_length=1, max_length=255)
    is_active: bool = True
    sort_order: int = 0


class FaqCategoryUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=80)
    label: str | None = Field(default=None, min_length=1, max_length=120)
    section_label: str | None = Field(default=None, max_length=120)
    heading: str | None = Field(default=None, min_length=1, max_length=255)
    is_active: bool | None = None
    sort_order: int | None = None


class FaqCategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    label: str
    section_label: str
    heading: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime
    item_count: int = 0


class FaqItemCreate(BaseModel):
    category_id: int
    question: str = Field(min_length=1, max_length=500)
    answer: str = Field(min_length=1)
    is_active: bool = True
    sort_order: int = 0


class FaqItemUpdate(BaseModel):
    category_id: int | None = None
    question: str | None = Field(default=None, min_length=1, max_length=500)
    answer: str | None = Field(default=None, min_length=1)
    is_active: bool | None = None
    sort_order: int | None = None


class FaqItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: int
    question: str
    answer: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime
    category_slug: str | None = None
    category_label: str | None = None


class PaginatedFaqItems(BaseModel):
    items: list[FaqItemOut]
    total: int
    page: int
    page_size: int
    pages: int


class FaqStats(BaseModel):
    categories: int
    items: int
    active_items: int
    inactive_items: int


class PublicFaqItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    question: str
    answer: str
    sort_order: int


class PublicFaqCategory(BaseModel):
    id: str
    label: str
    section_label: str
    heading: str
    sort_order: int
    items: list[PublicFaqItem]


class PublicFaqBlock(BaseModel):
    categories: list[PublicFaqCategory]
