"""Project repository — SQLAlchemy data access."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.project import Project


class ProjectRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, project_id: int) -> Project | None:
        return self.db.get(Project, project_id)

    def get_by_slug(self, slug: str) -> Project | None:
        return self.db.scalar(select(Project).where(Project.slug == slug))

    def list(
        self,
        *,
        status: str | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        published_only: bool = False,
    ) -> tuple[list[Project], int]:
        stmt = select(Project)
        count_stmt = select(func.count()).select_from(Project)

        if published_only:
            stmt = stmt.where(Project.status == "published")
            count_stmt = count_stmt.where(Project.status == "published")
        elif status:
            stmt = stmt.where(Project.status == status)
            count_stmt = count_stmt.where(Project.status == status)

        if q:
            like = f"%{q.strip()}%"
            filt = or_(
                Project.title.ilike(like),
                Project.industry.ilike(like),
                Project.service.ilike(like),
                Project.location.ilike(like),
                Project.slug.ilike(like),
            )
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(Project.sort_order.asc(), Project.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create(self, project: Project) -> Project:
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def save(self, project: Project) -> Project:
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def delete(self, project: Project) -> None:
        self.db.delete(project)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(Project)) or 0)
        published = int(
            self.db.scalar(
                select(func.count()).select_from(Project).where(Project.status == "published")
            )
            or 0
        )
        draft = int(
            self.db.scalar(
                select(func.count()).select_from(Project).where(Project.status == "draft")
            )
            or 0
        )
        featured = int(
            self.db.scalar(
                select(func.count()).select_from(Project).where(Project.featured.is_(True))
            )
            or 0
        )
        return {
            "total": total,
            "published": published,
            "draft": draft,
            "featured": featured,
        }
