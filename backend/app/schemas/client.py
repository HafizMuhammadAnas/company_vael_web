from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ClientCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=120)
    name: str = Field(min_length=1, max_length=200)
    logo_url: str = Field(min_length=1)
    logo_alt: str = Field(default="", max_length=255)
    is_active: bool = True
    sort_order: int = 0


class ClientUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=120)
    name: str | None = Field(default=None, min_length=1, max_length=200)
    logo_url: str | None = Field(default=None, min_length=1)
    logo_alt: str | None = Field(default=None, max_length=255)
    is_active: bool | None = None
    sort_order: int | None = None


class ClientOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    logo_url: str
    logo_alt: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedClients(BaseModel):
    items: list[ClientOut]
    total: int
    page: int
    page_size: int
    pages: int


class ClientStats(BaseModel):
    total: int
    active: int
    inactive: int
