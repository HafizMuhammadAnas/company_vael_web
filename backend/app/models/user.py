"""Admin user model for CMS authentication."""

from __future__ import annotations

from sqlalchemy import BigInteger, Index, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin

USER_ROLES = frozenset({"admin", "editor", "viewer"})


class User(Base, TimestampMixin):
    """CMS user with role-based access."""

    __tablename__ = "users"
    __table_args__ = (Index("ix_users_role_is_active", "role", "is_active"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(16), nullable=False, default="admin")
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
