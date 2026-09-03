"""Lead capture models — contact, consultation, and proposal form submissions."""

from __future__ import annotations

from typing import Any

from sqlalchemy import JSON, BigInteger, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin

# Stored as strings; validated in the service layer.
LEAD_FORM_TYPES = frozenset({"contact", "consultation", "proposal"})
LEAD_STATUSES = frozenset({"new", "read", "archived"})


class Lead(Base, TimestampMixin):
    """A form submission from the public marketing site."""

    __tablename__ = "leads"
    __table_args__ = (
        Index("ix_leads_form_type_created_at", "form_type", "created_at"),
        Index("ix_leads_status_created_at", "status", "created_at"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)

    form_type: Mapped[str] = mapped_column(String(32), nullable=False)
    status: Mapped[str] = mapped_column(String(16), nullable=False, default="new")

    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    company: Mapped[str | None] = mapped_column(String(200), nullable=True)
    country: Mapped[str | None] = mapped_column(String(120), nullable=True)

    # Form-specific fields (description, timeline, budget, contact_method, etc.)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)

    privacy_consent: Mapped[bool] = mapped_column(nullable=False, default=False)

    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(512), nullable=True)

    attachments: Mapped[list[LeadAttachment]] = relationship(
        back_populates="lead",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class LeadAttachment(Base, TimestampMixin):
    """File uploaded with a proposal (or other) lead submission."""

    __tablename__ = "lead_attachments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    lead_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("leads.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_filename: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    content_type: Mapped[str | None] = mapped_column(String(127), nullable=True)
    size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    storage_path: Mapped[str] = mapped_column(Text, nullable=False)

    lead: Mapped[Lead] = relationship(back_populates="attachments")
