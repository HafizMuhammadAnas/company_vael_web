"""FAQ models — categories + Q&A items for /faqs and service pages."""

from __future__ import annotations

from sqlalchemy import BigInteger, Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin


class FaqCategory(Base, TimestampMixin):
    """A filterable FAQ group (General, AI, Web, …)."""

    __tablename__ = "faq_categories"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    label: Mapped[str] = mapped_column(String(120), nullable=False)
    section_label: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    heading: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    items: Mapped[list[FaqItem]] = relationship(
        "FaqItem",
        back_populates="category",
        cascade="all, delete-orphan",
        order_by="FaqItem.sort_order",
    )


class FaqItem(Base, TimestampMixin):
    """A single FAQ question/answer within a category."""

    __tablename__ = "faq_items"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    category_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("faq_categories.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    question: Mapped[str] = mapped_column(String(500), nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    category: Mapped[FaqCategory] = relationship("FaqCategory", back_populates="items")
