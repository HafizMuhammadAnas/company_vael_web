"""Shared FastAPI dependencies.

Database session dependency lives here. Authentication / RBAC dependencies
(get_current_user, require_role) are added in the auth phase.
"""

from app.db.session import get_db

__all__ = ["get_db"]
