"""Industry Pydantic schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class IndustrySettingsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    label: str
    heading: str
    supporting: str
    updated_at: datetime


class IndustrySettingsUpdate(BaseModel):
    label: str | None = Field(default=None, max_length=120)
    heading: str | None = Field(default=None, max_length=255)
    supporting: str | None = None


class IndustryCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=80)
    title: str = Field(min_length=1, max_length=120)
    short: str = Field(default="", max_length=80)
    icon_key: str = Field(default="building", max_length=32)
    accent_key: str = Field(default="neon", max_length=32)
    is_active: bool = True
    sort_order: int = 0


class IndustryUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=80)
    title: str | None = Field(default=None, min_length=1, max_length=120)
    short: str | None = Field(default=None, max_length=80)
    icon_key: str | None = Field(default=None, max_length=32)
    accent_key: str | None = Field(default=None, max_length=32)
    is_active: bool | None = None
    sort_order: int | None = None


class IndustryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    short: str
    icon_key: str
    accent_key: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedIndustries(BaseModel):
    items: list[IndustryOut]
    total: int
    page: int
    page_size: int
    pages: int


class IndustryStats(BaseModel):
    total: int
    active: int
    inactive: int


class PublicIndustriesBlock(BaseModel):
    settings: IndustrySettingsOut
    industries: list[IndustryOut]
