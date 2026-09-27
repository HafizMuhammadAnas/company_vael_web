"""Careers repository."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.career import CareerJob, CareerSettings


class CareerRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_settings(self) -> CareerSettings | None:
        return self.db.scalar(select(CareerSettings).order_by(CareerSettings.id.asc()).limit(1))

    def save_settings(self, settings: CareerSettings) -> CareerSettings:
        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)
        return settings

    def get_job(self, job_id: int) -> CareerJob | None:
        return self.db.get(CareerJob, job_id)

    def get_job_by_slug(self, slug: str) -> CareerJob | None:
        return self.db.scalar(select(CareerJob).where(CareerJob.slug == slug))

    def list_jobs(
        self,
        *,
        status: str | None = None,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        published_only: bool = False,
    ) -> tuple[list[CareerJob], int]:
        stmt = select(CareerJob)
        count_stmt = select(func.count()).select_from(CareerJob)

        if published_only:
            stmt = stmt.where(CareerJob.status == "published", CareerJob.is_active.is_(True))
            count_stmt = count_stmt.where(CareerJob.status == "published", CareerJob.is_active.is_(True))
        else:
            if status is not None:
                stmt = stmt.where(CareerJob.status == status)
                count_stmt = count_stmt.where(CareerJob.status == status)
            if is_active is not None:
                stmt = stmt.where(CareerJob.is_active.is_(is_active))
                count_stmt = count_stmt.where(CareerJob.is_active.is_(is_active))

        if q:
            like = f"%{q.strip()}%"
            filt = or_(CareerJob.title.ilike(like), CareerJob.slug.ilike(like), CareerJob.department.ilike(like))
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(CareerJob.sort_order.asc(), CareerJob.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create_job(self, job: CareerJob) -> CareerJob:
        self.db.add(job)
        self.db.commit()
        self.db.refresh(job)
        return job

    def save_job(self, job: CareerJob) -> CareerJob:
        self.db.add(job)
        self.db.commit()
        self.db.refresh(job)
        return job

    def delete_job(self, job: CareerJob) -> None:
        self.db.delete(job)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(CareerJob)) or 0)
        published = int(
            self.db.scalar(
                select(func.count()).select_from(CareerJob).where(CareerJob.status == "published")
            )
            or 0
        )
        return {"total": total, "published": published, "draft": total - published}
