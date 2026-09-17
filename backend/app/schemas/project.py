from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=120)
    title: str = Field(min_length=1, max_length=200)
    industry: str = Field(min_length=1, max_length=120)
    service: str = Field(min_length=1, max_length=120)
    location: str = Field(min_length=1, max_length=200)
    image_url: str = Field(min_length=1)
    image_alt: str = Field(default="", max_length=255)
    live_url: str = Field(min_length=1, max_length=500)
    status: str = Field(default="draft", max_length=16)
    featured: bool = False
    sort_order: int = 0


class ProjectUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=120)
    title: str | None = Field(default=None, min_length=1, max_length=200)
    industry: str | None = Field(default=None, min_length=1, max_length=120)
    service: str | None = Field(default=None, min_length=1, max_length=120)
    location: str | None = Field(default=None, min_length=1, max_length=200)
    image_url: str | None = Field(default=None, min_length=1)
    image_alt: str | None = Field(default=None, max_length=255)
    live_url: str | None = Field(default=None, min_length=1, max_length=500)
    status: str | None = Field(default=None, max_length=16)
    featured: bool | None = None
    sort_order: int | None = None


class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    industry: str
    service: str
    location: str
    image_url: str
    image_alt: str
    live_url: str
    status: str
    featured: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedProjects(BaseModel):
    items: list[ProjectOut]
    total: int
    page: int
    page_size: int
    pages: int


class ProjectStats(BaseModel):
    total: int
    published: int
    draft: int
    featured: int
