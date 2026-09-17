"""ORM models — import here so Alembic autogenerate sees all tables."""

from app.models.client import Client
from app.models.faq import FaqCategory, FaqItem
from app.models.google_review import GoogleReview, GoogleReviewSettings
from app.models.insight import INSIGHT_COVERS, INSIGHT_STATUSES, Insight
from app.models.lead import LEAD_FORM_TYPES, LEAD_STATUSES, Lead, LeadAttachment
from app.models.project import PROJECT_STATUSES, Project
from app.models.user import USER_ROLES, User

__all__ = [
    "Client",
    "FaqCategory",
    "FaqItem",
    "GoogleReview",
    "GoogleReviewSettings",
    "Insight",
    "INSIGHT_COVERS",
    "INSIGHT_STATUSES",
    "Lead",
    "LeadAttachment",
    "LEAD_FORM_TYPES",
    "LEAD_STATUSES",
    "Project",
    "PROJECT_STATUSES",
    "User",
    "USER_ROLES",
]
