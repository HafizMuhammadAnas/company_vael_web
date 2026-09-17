"""Google reviews models — curated homepage social proof."""

from __future__ import annotations

from sqlalchemy import BigInteger, Boolean, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class GoogleReviewSettings(Base, TimestampMixin):
    """Singleton-style settings row for the Google reviews block."""

    __tablename__ = "google_review_settings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    heading: Mapped[str] = mapped_column(Text, nullable=False)
    summary_label: Mapped[str] = mapped_column(String(64), nullable=False, default="EXCELLENT")
    rating: Mapped[float] = mapped_column(Float, nullable=False, default=5.0)
    review_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    profile_url: Mapped[str] = mapped_column(String(500), nullable=False, default="")


class GoogleReview(Base, TimestampMixin):
    """A single curated Google-style review card."""

    __tablename__ = "google_reviews"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    author: Mapped[str] = mapped_column(String(160), nullable=False)
    relative_time: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    rating: Mapped[int] = mapped_column(Integer, nullable=False, default=5)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    initials: Mapped[str] = mapped_column(String(8), nullable=False, default="")
    avatar_src: Mapped[str] = mapped_column(String(500), nullable=False, default="")
    avatar_color: Mapped[str] = mapped_column(String(32), nullable=False, default="#4285F4")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
