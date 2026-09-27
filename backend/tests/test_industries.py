from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.industry import Industry
from app.models.user import User


def test_public_industries_returns_seeded(client: TestClient) -> None:
    response = client.get("/api/v1/public/industries")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["settings"]["heading"]
    assert len(body["industries"]) >= 7
    assert all(item["is_active"] is True for item in body["industries"])


def test_industry_admin_crud_and_public_visibility(
    client: TestClient,
    auth_headers: dict[str, str],
    db: Session,
    admin_user: User,
) -> None:
    db.query(Industry).filter(Industry.slug == "e2e-industry").delete()
    db.commit()

    create = client.post(
        "/api/v1/admin/industries",
        headers=auth_headers,
        json={
            "slug": "e2e-industry",
            "title": "E2E Industry",
            "short": "E2E",
            "icon_key": "building",
            "accent_key": "neon",
            "is_active": False,
            "sort_order": 999,
        },
    )
    assert create.status_code == 201, create.text
    industry_id = create.json()["id"]

    public_before = client.get("/api/v1/public/industries")
    assert all(i["slug"] != "e2e-industry" for i in public_before.json()["industries"])

    activate = client.patch(
        f"/api/v1/admin/industries/{industry_id}",
        headers=auth_headers,
        json={"is_active": True},
    )
    assert activate.status_code == 200
    assert activate.json()["is_active"] is True

    public_after = client.get("/api/v1/public/industries")
    assert any(i["slug"] == "e2e-industry" for i in public_after.json()["industries"])

    settings = client.patch(
        "/api/v1/admin/industries/settings",
        headers=auth_headers,
        json={"label": "Industries"},
    )
    assert settings.status_code == 200

    stats = client.get("/api/v1/admin/industries/stats", headers=auth_headers)
    assert stats.status_code == 200
    assert stats.json()["active"] >= 1

    delete = client.delete(f"/api/v1/admin/industries/{industry_id}", headers=auth_headers)
    assert delete.status_code == 204


def test_industry_rejects_duplicate_slug(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    response = client.post(
        "/api/v1/admin/industries",
        headers=auth_headers,
        json={"slug": "real-estate", "title": "Dup"},
    )
    assert response.status_code == 400
