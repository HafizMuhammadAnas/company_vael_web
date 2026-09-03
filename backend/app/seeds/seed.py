"""Seed initial CMS admin user."""

from __future__ import annotations

import sys

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.user import User
from app.repositories.user_repository import UserRepository


def seed_admin() -> None:
    db = SessionLocal()
    try:
        repo = UserRepository(db)
        email = settings.FIRST_ADMIN_EMAIL.lower()
        existing = repo.get_by_email(email)
        if existing:
            print(f"Admin user already exists: {email}")
            return

        user = User(
            email=email,
            hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
            role="admin",
            is_active=True,
        )
        repo.create(user)
        print(f"Created admin user: {email}")
    finally:
        db.close()


def main() -> None:
    seed_admin()


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Seed failed: {exc}", file=sys.stderr)
        sys.exit(1)
