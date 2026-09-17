"""FAQ repository."""

from __future__ import annotations

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, selectinload

from app.models.faq import FaqCategory, FaqItem


class FaqRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    # ── categories ──────────────────────────────────────────────

    def get_category(self, category_id: int) -> FaqCategory | None:
        return self.db.get(FaqCategory, category_id)

    def get_category_by_slug(self, slug: str) -> FaqCategory | None:
        return self.db.scalar(select(FaqCategory).where(FaqCategory.slug == slug))

    def list_categories(
        self,
        *,
        is_active: bool | None = None,
        active_only: bool = False,
    ) -> list[FaqCategory]:
        stmt = select(FaqCategory)
        if active_only:
            stmt = stmt.where(FaqCategory.is_active.is_(True))
        elif is_active is not None:
            stmt = stmt.where(FaqCategory.is_active.is_(is_active))
        return list(
            self.db.scalars(stmt.order_by(FaqCategory.sort_order.asc(), FaqCategory.id.asc())).all()
        )

    def create_category(self, category: FaqCategory) -> FaqCategory:
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def save_category(self, category: FaqCategory) -> FaqCategory:
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def delete_category(self, category: FaqCategory) -> None:
        self.db.delete(category)
        self.db.commit()

    def count_items_for_category(self, category_id: int) -> int:
        return int(
            self.db.scalar(
                select(func.count()).select_from(FaqItem).where(FaqItem.category_id == category_id)
            )
            or 0
        )

    # ── items ───────────────────────────────────────────────────

    def get_item(self, item_id: int) -> FaqItem | None:
        return self.db.get(FaqItem, item_id)

    def list_items(
        self,
        *,
        category_id: int | None = None,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
        active_only: bool = False,
    ) -> tuple[list[FaqItem], int]:
        stmt = select(FaqItem).options(selectinload(FaqItem.category))
        count_stmt = select(func.count()).select_from(FaqItem)

        if category_id is not None:
            stmt = stmt.where(FaqItem.category_id == category_id)
            count_stmt = count_stmt.where(FaqItem.category_id == category_id)

        if active_only:
            stmt = stmt.where(FaqItem.is_active.is_(True))
            count_stmt = count_stmt.where(FaqItem.is_active.is_(True))
        elif is_active is not None:
            stmt = stmt.where(FaqItem.is_active.is_(is_active))
            count_stmt = count_stmt.where(FaqItem.is_active.is_(is_active))

        if q:
            like = f"%{q.strip()}%"
            filt = or_(FaqItem.question.ilike(like), FaqItem.answer.ilike(like))
            stmt = stmt.where(filt)
            count_stmt = count_stmt.where(filt)

        total = int(self.db.scalar(count_stmt) or 0)
        items = list(
            self.db.scalars(
                stmt.order_by(FaqItem.sort_order.asc(), FaqItem.id.asc())
                .offset((page - 1) * page_size)
                .limit(page_size)
            ).all()
        )
        return items, total

    def list_public_categories_with_items(self) -> list[FaqCategory]:
        stmt = (
            select(FaqCategory)
            .where(FaqCategory.is_active.is_(True))
            .options(selectinload(FaqCategory.items))
            .order_by(FaqCategory.sort_order.asc(), FaqCategory.id.asc())
        )
        return list(self.db.scalars(stmt).all())

    def create_item(self, item: FaqItem) -> FaqItem:
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def save_item(self, item: FaqItem) -> FaqItem:
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def delete_item(self, item: FaqItem) -> None:
        self.db.delete(item)
        self.db.commit()

    def stats(self) -> dict[str, int]:
        categories = int(self.db.scalar(select(func.count()).select_from(FaqCategory)) or 0)
        items = int(self.db.scalar(select(func.count()).select_from(FaqItem)) or 0)
        active_items = int(
            self.db.scalar(
                select(func.count()).select_from(FaqItem).where(FaqItem.is_active.is_(True))
            )
            or 0
        )
        return {
            "categories": categories,
            "items": items,
            "active_items": active_items,
            "inactive_items": items - active_items,
        }
