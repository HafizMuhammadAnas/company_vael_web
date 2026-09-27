"""Industries models — homepage sector strip settings + cards."""

from __future__ import annotations

from sqlalchemy import BigInteger, Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class IndustrySettings(Base, TimestampMixin):
    """Singleton settings for the homepage industries block."""

    __tablename__ = "industry_settings"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    label: Mapped[str] = mapped_column(String(120), nullable=False, default="Industries")
    heading: Mapped[str] = mapped_column(String(255), nullable=False)
    supporting: Mapped[str] = mapped_column(Text, nullable=False)


class Industry(Base, TimestampMixin):
    """A single industry sector card."""

    __tablename__ = "industries"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    short: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    icon_key: Mapped[str] = mapped_column(String(32), nullable=False, default="building")
    accent_key: Mapped[str] = mapped_column(String(32), nullable=False, default="neon")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
