from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class InsightCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=160)
    title: str = Field(min_length=1, max_length=255)
    category: str = Field(min_length=1, max_length=120)
    tags: list[str] = Field(default_factory=list)
    description: str = ""
    body: str = ""
    read_time: str = Field(default="5 min", max_length=32)
    cover: str = Field(default="mesh", max_length=32)
    status: str = Field(default="draft", max_length=16)
    featured: bool = False
    published_date: date | None = None
    sort_order: int = 0


class InsightUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=160)
    title: str | None = Field(default=None, min_length=1, max_length=255)
    category: str | None = Field(default=None, min_length=1, max_length=120)
    tags: list[str] | None = None
    description: str | None = None
    body: str | None = None
    read_time: str | None = Field(default=None, max_length=32)
    cover: str | None = Field(default=None, max_length=32)
    status: str | None = Field(default=None, max_length=16)
    featured: bool | None = None
    published_date: date | None = None
    sort_order: int | None = None


class InsightOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    category: str
    tags: list[str]
    description: str
    body: str
    read_time: str
    cover: str
    status: str
    featured: bool
    published_date: date | None
    sort_order: int
    created_at: datetime
    updated_at: datetime


class InsightListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    category: str
    tags: list[str]
    description: str
    read_time: str
    cover: str
    status: str
    featured: bool
    published_date: date | None
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedInsights(BaseModel):
    items: list[InsightListItem]
    total: int
    page: int
    page_size: int
    pages: int


class InsightStats(BaseModel):
    total: int
    published: int
    coming_soon: int
    draft: int
    featured: int
