"""Insight / blog article model — admin-managed content for /insights."""

from __future__ import annotations

from datetime import date
from typing import Any

from sqlalchemy import JSON, BigInteger, Boolean, Date, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin

INSIGHT_STATUSES = frozenset({"draft", "coming-soon", "published"})
INSIGHT_COVERS = frozenset({"mesh", "orbits", "circuits", "waves", "nodes", "book"})


class Insight(Base, TimestampMixin):
    """A blog / insights article."""

    __tablename__ = "insights"
    __table_args__ = (
        Index("ix_insights_status_sort", "status", "sort_order"),
        Index("ix_insights_featured_sort", "featured", "sort_order"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)

    slug: Mapped[str] = mapped_column(String(160), nullable=False, unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(120), nullable=False)
    tags: Mapped[list[Any]] = mapped_column(JSON, nullable=False, default=list)
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    body: Mapped[str] = mapped_column(Text, nullable=False, default="")
    read_time: Mapped[str] = mapped_column(String(32), nullable=False, default="5 min")
    cover: Mapped[str] = mapped_column(String(32), nullable=False, default="mesh")

    status: Mapped[str] = mapped_column(String(16), nullable=False, default="draft")
    featured: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    published_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
