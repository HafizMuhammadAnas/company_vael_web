from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.insight import Insight
from app.models.user import User


def test_public_insights_lists_coming_soon_and_published(
    client: TestClient,
    db: Session,
) -> None:
    response = client.get("/api/v1/public/insights")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["total"] >= 1
    assert all(item["status"] in {"coming-soon", "published"} for item in body["items"])
    assert all(item["status"] != "draft" for item in body["items"])


def test_insight_admin_crud_and_public_detail(
    client: TestClient,
    auth_headers: dict[str, str],
    db: Session,
    admin_user: User,
) -> None:
    # cleanup leftovers from prior runs
    db.query(Insight).filter(Insight.slug == "e2e-published-insight").delete()
    db.commit()

    create = client.post(
        "/api/v1/admin/insights",
        headers=auth_headers,
        json={
            "slug": "e2e-published-insight",
            "title": "E2E Published Insight",
            "category": "Software Engineering",
            "tags": ["Software Engineering", "Testing"],
            "description": "End-to-end coverage for insights CMS.",
            "body": "First paragraph.\n\nSecond paragraph with more detail.",
            "read_time": "4 min",
            "cover": "nodes",
            "status": "draft",
            "featured": True,
            "sort_order": 1,
        },
    )
    assert create.status_code == 201, create.text
    insight_id = create.json()["id"]
    assert create.json()["status"] == "draft"

    # Draft must not appear on public detail
    missing = client.get("/api/v1/public/insights/e2e-published-insight")
    assert missing.status_code == 404

    publish = client.patch(
        f"/api/v1/admin/insights/{insight_id}",
        headers=auth_headers,
        json={"status": "published"},
    )
    assert publish.status_code == 200, publish.text
    assert publish.json()["status"] == "published"
    assert publish.json()["published_date"] is not None
    assert publish.json()["slug"] == "e2e-published-insight"

    detail = client.get("/api/v1/public/insights/e2e-published-insight")
    assert detail.status_code == 200, detail.text
    assert detail.json()["title"] == "E2E Published Insight"
    assert "First paragraph" in detail.json()["body"]

    index = client.get("/api/v1/public/insights")
    assert index.status_code == 200
    slugs = {item["slug"] for item in index.json()["items"]}
    assert "e2e-published-insight" in slugs

    stats = client.get("/api/v1/admin/insights/stats", headers=auth_headers)
    assert stats.status_code == 200
    assert stats.json()["published"] >= 1

    delete = client.delete(f"/api/v1/admin/insights/{insight_id}", headers=auth_headers)
    assert delete.status_code == 204

    gone = client.get("/api/v1/public/insights/e2e-published-insight")
    assert gone.status_code == 404


def test_insight_rejects_invalid_status(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    response = client.post(
        "/api/v1/admin/insights",
        headers=auth_headers,
        json={
            "slug": "bad-status-insight",
            "title": "Bad Status",
            "category": "Automation",
            "status": "live",
        },
    )
    assert response.status_code == 400
