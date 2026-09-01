from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LeadCreateResponse(BaseModel):
    ok: bool = True
    id: int
    message: str = "Thank you. Your submission has been received."


class LeadErrorResponse(BaseModel):
    detail: str
    errors: dict[str, str] | None = None


class LeadSubmission(BaseModel):
    """Normalized lead payload after parsing JSON or multipart form data."""

    model_config = ConfigDict(extra="forbid")

    form_type: str
    full_name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    company: str | None = Field(default=None, max_length=200)
    country: str | None = Field(default=None, max_length=120)
    privacy_consent: bool
    payload: dict[str, str] = Field(default_factory=dict)


class LeadAttachmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    original_filename: str
    content_type: str | None
    size_bytes: int
    created_at: datetime


class LeadListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    form_type: str
    status: str
    full_name: str
    email: EmailStr
    phone: str | None
    company: str | None
    country: str | None
    created_at: datetime
    attachment_count: int = 0


class LeadDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    form_type: str
    status: str
    full_name: str
    email: EmailStr
    phone: str | None
    company: str | None
    country: str | None
    payload: dict[str, Any]
    privacy_consent: bool
    ip_address: str | None
    user_agent: str | None
    created_at: datetime
    updated_at: datetime
    attachments: list[LeadAttachmentOut]


class LeadStatusUpdate(BaseModel):
    status: str = Field(min_length=1, max_length=16)


class PaginatedLeads(BaseModel):
    items: list[LeadListItem]
    total: int
    page: int
    page_size: int
    pages: int


class LeadStats(BaseModel):
    """Summary counts for admin KPI cards."""

    total: int
    new: int
    read: int
    archived: int
    contact: int
    consultation: int
    proposal: int
    attachments: int
