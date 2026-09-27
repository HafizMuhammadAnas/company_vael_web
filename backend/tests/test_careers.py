from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.career import CareerJob
from app.models.user import User


def test_public_careers_returns_settings(client: TestClient) -> None:
    response = client.get("/api/v1/public/careers")
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["settings"]["hero_title"]
    assert isinstance(body["jobs"], list)


def test_career_job_admin_crud_and_public_visibility(
    client: TestClient,
    auth_headers: dict[str, str],
    db: Session,
    admin_user: User,
) -> None:
    db.query(CareerJob).filter(CareerJob.slug == "e2e-career-job").delete()
    db.commit()

    create = client.post(
        "/api/v1/admin/careers/jobs",
        headers=auth_headers,
        json={
            "slug": "e2e-career-job",
            "title": "E2E Engineer",
            "department": "Engineering",
            "location": "Remote",
            "employment_type": "Full-time",
            "summary": "CRUD check role.",
            "description": "Full description.",
            "requirements": ["Python", "React"],
            "apply_href": "mailto:careers@vaelkode.com",
            "status": "draft",
            "is_active": True,
            "sort_order": 99,
        },
    )
    assert create.status_code == 201, create.text
    job_id = create.json()["id"]

    public_before = client.get("/api/v1/public/careers")
    assert all(j["slug"] != "e2e-career-job" for j in public_before.json()["jobs"])

    publish = client.patch(
        f"/api/v1/admin/careers/jobs/{job_id}",
        headers=auth_headers,
        json={"status": "published"},
    )
    assert publish.status_code == 200
    assert publish.json()["status"] == "published"

    public_after = client.get("/api/v1/public/careers")
    assert any(j["slug"] == "e2e-career-job" for j in public_after.json()["jobs"])

    settings = client.patch(
        "/api/v1/admin/careers/settings",
        headers=auth_headers,
        json={"hero_label": "Careers"},
    )
    assert settings.status_code == 200

    stats = client.get("/api/v1/admin/careers/stats", headers=auth_headers)
    assert stats.status_code == 200
    assert stats.json()["published"] >= 1

    delete = client.delete(f"/api/v1/admin/careers/jobs/{job_id}", headers=auth_headers)
    assert delete.status_code == 204


def test_career_job_rejects_invalid_status(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    response = client.post(
        "/api/v1/admin/careers/jobs",
        headers=auth_headers,
        json={"slug": "bad-status-job", "title": "Bad", "status": "live"},
    )
    assert response.status_code == 400
