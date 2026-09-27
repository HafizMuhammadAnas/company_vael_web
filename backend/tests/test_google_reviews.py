from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.google_review import GoogleReview
from app.models.user import User


def test_public_reviews_returns_settings_and_active_only(
    client: TestClient,
    db: Session,
) -> None:
    response = client.get("/api/v1/public/reviews")
    assert response.status_code == 200, response.text
    body = response.json()
    assert "settings" in body
    assert "reviews" in body
    assert body["settings"]["heading"]
    assert body["settings"]["rating"] >= 1
    assert all(item["is_active"] is True for item in body["reviews"])


def test_review_admin_crud_and_settings(
    client: TestClient,
    auth_headers: dict[str, str],
    db: Session,
    admin_user: User,
) -> None:
    db.query(GoogleReview).filter(GoogleReview.author == "E2E Review Author").delete()
    db.commit()

    create = client.post(
        "/api/v1/admin/reviews",
        headers=auth_headers,
        json={
            "author": "E2E Review Author",
            "relative_time": "just now",
            "rating": 5,
            "text": "End-to-end coverage for Google reviews CMS.",
            "initials": "EA",
            "avatar_color": "#4285F4",
            "is_active": False,
            "sort_order": 99,
        },
    )
    assert create.status_code == 201, create.text
    review_id = create.json()["id"]
    assert create.json()["is_active"] is False

    public_before = client.get("/api/v1/public/reviews")
    assert public_before.status_code == 200
    authors_before = {item["author"] for item in public_before.json()["reviews"]}
    assert "E2E Review Author" not in authors_before

    activate = client.patch(
        f"/api/v1/admin/reviews/{review_id}",
        headers=auth_headers,
        json={"is_active": True},
    )
    assert activate.status_code == 200, activate.text
    assert activate.json()["is_active"] is True

    public_after = client.get("/api/v1/public/reviews")
    assert public_after.status_code == 200
    authors_after = {item["author"] for item in public_after.json()["reviews"]}
    assert "E2E Review Author" in authors_after

    settings = client.get("/api/v1/admin/reviews/settings", headers=auth_headers)
    assert settings.status_code == 200, settings.text
    original_heading = settings.json()["heading"]

    patch_settings = client.patch(
        "/api/v1/admin/reviews/settings",
        headers=auth_headers,
        json={"heading": "E2E reviews heading", "review_count": 80},
    )
    assert patch_settings.status_code == 200, patch_settings.text
    assert patch_settings.json()["heading"] == "E2E reviews heading"
    assert patch_settings.json()["review_count"] == 80

    public_settings = client.get("/api/v1/public/reviews")
    assert public_settings.json()["settings"]["heading"] == "E2E reviews heading"

    # restore heading so seed content stays intact for local browsing
    client.patch(
        "/api/v1/admin/reviews/settings",
        headers=auth_headers,
        json={"heading": original_heading},
    )

    stats = client.get("/api/v1/admin/reviews/stats", headers=auth_headers)
    assert stats.status_code == 200
    assert stats.json()["active"] >= 1

    delete = client.delete(f"/api/v1/admin/reviews/{review_id}", headers=auth_headers)
    assert delete.status_code == 204

    public_gone = client.get("/api/v1/public/reviews")
    authors_gone = {item["author"] for item in public_gone.json()["reviews"]}
    assert "E2E Review Author" not in authors_gone


def test_review_rejects_invalid_rating(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    response = client.post(
        "/api/v1/admin/reviews",
        headers=auth_headers,
        json={
            "author": "Bad Rating",
            "text": "Should fail validation.",
            "rating": 9,
        },
    )
    assert response.status_code == 422
