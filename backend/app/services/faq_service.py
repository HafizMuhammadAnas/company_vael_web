"""FAQ service."""

from __future__ import annotations

import re

from fastapi import HTTPException, status

from app.models.faq import FaqCategory, FaqItem
from app.repositories.faq_repository import FaqRepository
from app.schemas.faq import (
    FaqCategoryCreate,
    FaqCategoryOut,
    FaqCategoryUpdate,
    FaqItemCreate,
    FaqItemOut,
    FaqItemUpdate,
    FaqStats,
    PaginatedFaqItems,
    PublicFaqBlock,
    PublicFaqCategory,
    PublicFaqItem,
)


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower().strip())
    return slug.strip("-")[:80]


class FaqService:
    def __init__(self, db) -> None:  # noqa: ANN001
        self.repo = FaqRepository(db)

    def get_stats(self) -> FaqStats:
        return FaqStats(**self.repo.stats())

    # ── categories ──────────────────────────────────────────────

    def list_categories(self, *, is_active: bool | None = None) -> list[FaqCategoryOut]:
        rows = self.repo.list_categories(is_active=is_active)
        return [self._category_out(row) for row in rows]

    def get_category(self, category_id: int) -> FaqCategoryOut:
        category = self.repo.get_category(category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ category not found.")
        return self._category_out(category)

    def create_category(self, body: FaqCategoryCreate) -> FaqCategoryOut:
        slug = _slugify(body.slug)
        if not slug:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
        if self.repo.get_category_by_slug(slug):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
        category = FaqCategory(
            slug=slug,
            label=body.label.strip(),
            section_label=(body.section_label or body.label).strip(),
            heading=body.heading.strip(),
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        return self._category_out(self.repo.create_category(category))

    def update_category(self, category_id: int, body: FaqCategoryUpdate) -> FaqCategoryOut:
        category = self.repo.get_category(category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ category not found.")

        data = body.model_dump(exclude_unset=True)
        if "slug" in data and data["slug"] is not None:
            slug = _slugify(data["slug"])
            if not slug:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug is required.")
            existing = self.repo.get_category_by_slug(slug)
            if existing and existing.id != category.id:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists.")
            data["slug"] = slug
        for key in ("label", "section_label", "heading"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        for key, value in data.items():
            setattr(category, key, value)
        return self._category_out(self.repo.save_category(category))

    def delete_category(self, category_id: int) -> None:
        category = self.repo.get_category(category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ category not found.")
        self.repo.delete_category(category)

    # ── items ───────────────────────────────────────────────────

    def list_items(
        self,
        *,
        category_id: int | None = None,
        is_active: bool | None = None,
        q: str | None = None,
        page: int = 1,
        page_size: int = 20,
    ) -> PaginatedFaqItems:
        page = max(1, page)
        page_size = min(max(1, page_size), 100)
        items, total = self.repo.list_items(
            category_id=category_id,
            is_active=is_active,
            q=q,
            page=page,
            page_size=page_size,
        )
        pages = max(1, (total + page_size - 1) // page_size) if total else 1
        return PaginatedFaqItems(
            items=[self._item_out(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    def get_item(self, item_id: int) -> FaqItemOut:
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ item not found.")
        return self._item_out(item)

    def create_item(self, body: FaqItemCreate) -> FaqItemOut:
        if not self.repo.get_category(body.category_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="FAQ category not found.")
        item = FaqItem(
            category_id=body.category_id,
            question=body.question.strip(),
            answer=body.answer.strip(),
            is_active=body.is_active,
            sort_order=body.sort_order,
        )
        return self._item_out(self.repo.create_item(item))

    def update_item(self, item_id: int, body: FaqItemUpdate) -> FaqItemOut:
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ item not found.")

        data = body.model_dump(exclude_unset=True)
        if "category_id" in data and data["category_id"] is not None:
            if not self.repo.get_category(data["category_id"]):
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="FAQ category not found.")
        for key in ("question", "answer"):
            if key in data and isinstance(data[key], str):
                data[key] = data[key].strip()
        for key, value in data.items():
            setattr(item, key, value)
        return self._item_out(self.repo.save_item(item))

    def delete_item(self, item_id: int) -> None:
        item = self.repo.get_item(item_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ item not found.")
        self.repo.delete_item(item)

    def public_block(self) -> PublicFaqBlock:
        categories = self.repo.list_public_categories_with_items()
        out: list[PublicFaqCategory] = []
        for cat in categories:
            items = [
                PublicFaqItem(
                    id=item.id,
                    question=item.question,
                    answer=item.answer,
                    sort_order=item.sort_order,
                )
                for item in sorted(cat.items, key=lambda i: (i.sort_order, i.id))
                if item.is_active
            ]
            if not items:
                continue
            out.append(
                PublicFaqCategory(
                    id=cat.slug,
                    label=cat.label,
                    section_label=cat.section_label or cat.label,
                    heading=cat.heading,
                    sort_order=cat.sort_order,
                    items=items,
                )
            )
        return PublicFaqBlock(categories=out)

    def public_category(self, slug: str) -> PublicFaqCategory:
        block = self.public_block()
        for cat in block.categories:
            if cat.id == slug:
                return cat
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ category not found.")

    def _category_out(self, category: FaqCategory) -> FaqCategoryOut:
        return FaqCategoryOut(
            id=category.id,
            slug=category.slug,
            label=category.label,
            section_label=category.section_label,
            heading=category.heading,
            is_active=category.is_active,
            sort_order=category.sort_order,
            created_at=category.created_at,
            updated_at=category.updated_at,
            item_count=self.repo.count_items_for_category(category.id),
        )

    def _item_out(self, item: FaqItem) -> FaqItemOut:
        category = item.category if getattr(item, "category", None) is not None else self.repo.get_category(
            item.category_id
        )
        return FaqItemOut(
            id=item.id,
            category_id=item.category_id,
            question=item.question,
            answer=item.answer,
            is_active=item.is_active,
            sort_order=item.sort_order,
            created_at=item.created_at,
            updated_at=item.updated_at,
            category_slug=category.slug if category else None,
            category_label=category.label if category else None,
        )
