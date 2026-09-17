"""Client repository — SQLAlchemy data access."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.client import Client


class ClientRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, client_id: int) -> Client | None:
        return self.db.get(Client, client_id)

    def get_by_slug(self, slug: str) -> Client | None:
        return self.db.scalar(select(Client).where(Client.slug == slug))

    def list(
        self,
        *,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> tuple[list[Client], int]:
        stmt = select(Client)
        count_stmt = select(func.count()).select_from(Client)

        if active_only:
            stmt = stmt.where(Client.is_active.is_(True))
            count_stmt = count_stmt.where(Client.is_active.is_(True))
        elif is_active is not None:
            stmt = stmt.where(Client.is_active.is_(is_active))
            count_stmt = count_stmt.where(Client.is_active.is_(is_active))

        if q:
            like = f"%{q.strip()}%"
            filt = or_(Client.name.ilike(like), Client.slug.ilike(like))
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(Client.sort_order.asc(), Client.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def create(self, client: Client) -> Client:
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client

    def save(self, client: Client) -> Client:
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client

    def delete(self, client: Client) -> None:
        self.db.delete(client)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        total = int(self.db.scalar(select(func.count()).select_from(Client)) or 0)
        active = int(
            self.db.scalar(
                select(func.count()).select_from(Client).where(Client.is_active.is_(True))
            )
            or 0
        )
        return {"total": total, "active": active, "inactive": total - active}
