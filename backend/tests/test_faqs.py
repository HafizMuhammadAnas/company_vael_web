from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.faq import FaqItem
from app.models.user import User


def test_public_faqs_returns_seeded_categories(client: TestClient) -> None:
    response = client.get("/api/v1/public/faqs")
    assert response.status_code == 200, response.text
    body = response.json()
    assert "categories" in body
    assert len(body["categories"]) >= 7
    slugs = {cat["id"] for cat in body["categories"]}
    assert "general" in slugs
    assert "ai-automation" in slugs
    for cat in body["categories"]:
        assert cat["items"]
        assert all("question" in item and "answer" in item for item in cat["items"])


def test_faq_admin_crud_and_public_visibility(
    client: TestClient,
    auth_headers: dict[str, str],
    db: Session,
    admin_user: User,
) -> None:
    db.query(FaqItem).filter(FaqItem.question == "E2E FAQ question?").delete()
    db.commit()

    categories = client.get("/api/v1/admin/faqs/categories", headers=auth_headers)
    assert categories.status_code == 200, categories.text
    general = next(c for c in categories.json() if c["slug"] == "general")

    create = client.post(
        "/api/v1/admin/faqs/items",
        headers=auth_headers,
        json={
            "category_id": general["id"],
            "question": "E2E FAQ question?",
            "answer": "End-to-end coverage for FAQs CMS.",
            "is_active": False,
            "sort_order": 999,
        },
    )
    assert create.status_code == 201, create.text
    item_id = create.json()["id"]
    assert create.json()["is_active"] is False

    public_before = client.get("/api/v1/public/faqs")
    questions_before = {
        item["question"] for cat in public_before.json()["categories"] for item in cat["items"]
    }
    assert "E2E FAQ question?" not in questions_before

    activate = client.patch(
        f"/api/v1/admin/faqs/items/{item_id}",
        headers=auth_headers,
        json={"is_active": True},
    )
    assert activate.status_code == 200, activate.text

    public_after = client.get("/api/v1/public/faqs")
    questions_after = {
        item["question"] for cat in public_after.json()["categories"] for item in cat["items"]
    }
    assert "E2E FAQ question?" in questions_after

    by_slug = client.get("/api/v1/public/faqs/general")
    assert by_slug.status_code == 200, by_slug.text
    assert by_slug.json()["id"] == "general"
    assert any(item["question"] == "E2E FAQ question?" for item in by_slug.json()["items"])

    stats = client.get("/api/v1/admin/faqs/stats", headers=auth_headers)
    assert stats.status_code == 200
    assert stats.json()["categories"] >= 7
    assert stats.json()["active_items"] >= 1

    delete = client.delete(f"/api/v1/admin/faqs/items/{item_id}", headers=auth_headers)
    assert delete.status_code == 204


def test_faq_category_slug_must_be_unique(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    response = client.post(
        "/api/v1/admin/faqs/categories",
        headers=auth_headers,
        json={
            "slug": "general",
            "label": "Duplicate",
            "heading": "Should fail",
        },
    )
    assert response.status_code == 400
