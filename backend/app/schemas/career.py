"""Careers Pydantic schemas."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class CareerSettingsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    seo_title: str
    seo_description: str
    hero_label: str
    hero_title: str
    hero_supporting: str
    why_label: str
    why_heading: str
    why_cards: list[Any]
    look_label: str
    look_heading: str
    look_supporting: str
    look_qualities: list[Any]
    opportunities_label: str
    opportunities_heading: str
    empty_state: list[Any]
    profile_cta_label: str
    profile_cta_href: str
    final_label: str
    final_heading: str
    final_supporting: str
    final_cta_label: str
    final_cta_to: str
    updated_at: datetime


class CareerSettingsUpdate(BaseModel):
    seo_title: str | None = Field(default=None, max_length=255)
    seo_description: str | None = None
    hero_label: str | None = Field(default=None, max_length=120)
    hero_title: str | None = Field(default=None, max_length=255)
    hero_supporting: str | None = None
    why_label: str | None = Field(default=None, max_length=120)
    why_heading: str | None = Field(default=None, max_length=255)
    why_cards: list[Any] | None = None
    look_label: str | None = Field(default=None, max_length=120)
    look_heading: str | None = Field(default=None, max_length=255)
    look_supporting: str | None = None
    look_qualities: list[Any] | None = None
    opportunities_label: str | None = Field(default=None, max_length=120)
    opportunities_heading: str | None = Field(default=None, max_length=255)
    empty_state: list[Any] | None = None
    profile_cta_label: str | None = Field(default=None, max_length=120)
    profile_cta_href: str | None = Field(default=None, max_length=500)
    final_label: str | None = Field(default=None, max_length=120)
    final_heading: str | None = Field(default=None, max_length=255)
    final_supporting: str | None = None
    final_cta_label: str | None = Field(default=None, max_length=120)
    final_cta_to: str | None = Field(default=None, max_length=255)


class CareerJobCreate(BaseModel):
    slug: str = Field(min_length=1, max_length=160)
    title: str = Field(min_length=1, max_length=200)
    department: str = Field(default="", max_length=120)
    location: str = Field(default="", max_length=200)
    employment_type: str = Field(default="Full-time", max_length=64)
    summary: str = Field(default="")
    description: str = Field(default="")
    requirements: list[str] = Field(default_factory=list)
    apply_href: str = Field(default="", max_length=500)
    status: str = Field(default="draft", max_length=16)
    is_active: bool = True
    sort_order: int = 0


class CareerJobUpdate(BaseModel):
    slug: str | None = Field(default=None, min_length=1, max_length=160)
    title: str | None = Field(default=None, min_length=1, max_length=200)
    department: str | None = Field(default=None, max_length=120)
    location: str | None = Field(default=None, max_length=200)
    employment_type: str | None = Field(default=None, max_length=64)
    summary: str | None = None
    description: str | None = None
    requirements: list[str] | None = None
    apply_href: str | None = Field(default=None, max_length=500)
    status: str | None = Field(default=None, max_length=16)
    is_active: bool | None = None
    sort_order: int | None = None


class CareerJobOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    department: str
    location: str
    employment_type: str
    summary: str
    description: str
    requirements: list[Any]
    apply_href: str
    status: str
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime


class PaginatedCareerJobs(BaseModel):
    items: list[CareerJobOut]
    total: int
    page: int
    page_size: int
    pages: int


class CareerStats(BaseModel):
    total: int
    published: int
    draft: int


class PublicCareersBlock(BaseModel):
    settings: CareerSettingsOut
    jobs: list[CareerJobOut]
