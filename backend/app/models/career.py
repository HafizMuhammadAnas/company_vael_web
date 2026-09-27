"""Careers models — page settings + optional job listings."""

from __future__ import annotations

from typing import Any

from sqlalchemy import JSON, BigInteger, Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin

CAREER_JOB_STATUSES = ("draft", "published")


class CareerSettings(Base, TimestampMixin):
    """Singleton settings for the /careers page."""

    __tablename__ = "career_settings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    seo_title: Mapped[str] = mapped_column(String(255), nullable=False)
    seo_description: Mapped[str] = mapped_column(Text, nullable=False)
    hero_label: Mapped[str] = mapped_column(String(120), nullable=False, default="Careers")
    hero_title: Mapped[str] = mapped_column(String(255), nullable=False)
    hero_supporting: Mapped[str] = mapped_column(Text, nullable=False)
    why_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    why_heading: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    why_cards: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=list)
    look_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    look_heading: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    look_supporting: Mapped[str] = mapped_column(Text, nullable=False, default="")
    look_qualities: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=list)
    opportunities_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    opportunities_heading: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    empty_state: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=list)
    profile_cta_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    profile_cta_href: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    final_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    final_heading: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    final_supporting: Mapped[str] = mapped_column(Text, nullable=False, default="")
    final_cta_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    final_cta_to: Mapped[str] = mapped_column(String(255), nullable=False, default="/contact")


class CareerJob(Base, TimestampMixin):
    """A single career opening (optional; page can show empty state)."""

    __tablename__ = "career_jobs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    department: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    location: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    employment_type: Mapped[str] = mapped_column(String(64), nullable=False, default="Full-time")
    summary: Mapped[str] = mapped_column(Text, nullable=False, default="")
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    requirements: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=list)
    apply_href: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="draft")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
