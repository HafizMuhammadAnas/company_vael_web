from sqlalchemy import func, or_
from sqlalchemy.orm import Session, selectinload

from app.models.lead import Lead, LeadAttachment


class LeadRepository:
    def __init__(self, db: Session) -> None:
        self._db = db

    def create(self, lead: Lead) -> Lead:
        self._db.add(lead)
        self._db.commit()
        self._db.refresh(lead)
        return lead

    def add_attachment(self, attachment: LeadAttachment) -> LeadAttachment:
        self._db.add(attachment)
        self._db.commit()
        self._db.refresh(attachment)
        return attachment

    def list_leads(
        self,
        *,
        form_type: str | None = None,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 10,
    ) -> tuple[list[Lead], int]:
        query = self._db.query(Lead)
        if form_type:
            query = query.filter(Lead.form_type == form_type)
        if status:
            query = query.filter(Lead.status == status)
        if q:
            term = f"%{q.strip()}%"
            query = query.filter(
                or_(
                    Lead.full_name.like(term),
                    Lead.email.like(term),
                    Lead.company.like(term),
                    Lead.phone.like(term),
                )
            )

        total = query.count()
        leads = (
            query.options(selectinload(Lead.attachments))
            .order_by(Lead.created_at.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )
        return leads, total

    def get_by_id(self, lead_id: int) -> Lead | None:
        return (
            self._db.query(Lead)
            .options(selectinload(Lead.attachments))
            .filter(Lead.id == lead_id)
            .first()
        )

    def get_attachment(self, lead_id: int, attachment_id: int) -> LeadAttachment | None:
        return (
            self._db.query(LeadAttachment)
            .filter(
                LeadAttachment.lead_id == lead_id,
                LeadAttachment.id == attachment_id,
            )
            .first()
        )

    def update_status(self, lead: Lead, status: str) -> Lead:
        lead.status = status
        self._db.commit()
        self._db.refresh(lead)
        return lead

    def get_stats(self) -> dict[str, int]:
        total = self._db.query(func.count(Lead.id)).scalar() or 0

        status_counts = dict(
            self._db.query(Lead.status, func.count(Lead.id)).group_by(Lead.status).all()
        )
        form_counts = dict(
            self._db.query(Lead.form_type, func.count(Lead.id)).group_by(Lead.form_type).all()
        )
        attachments = self._db.query(func.count(LeadAttachment.id)).scalar() or 0

        return {
            "total": total,
            "new": status_counts.get("new", 0),
            "read": status_counts.get("read", 0),
            "archived": status_counts.get("archived", 0),
            "contact": form_counts.get("contact", 0),
            "consultation": form_counts.get("consultation", 0),
            "proposal": form_counts.get("proposal", 0),
            "attachments": attachments,
        }
