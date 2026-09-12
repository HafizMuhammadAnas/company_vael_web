import io

from fastapi.testclient import TestClient


def test_list_leads_requires_auth(client: TestClient) -> None:
    response = client.get("/api/v1/admin/leads")
    assert response.status_code == 401


def test_lead_stats(
    client: TestClient,
    auth_headers: dict[str, str],
    contact_payload: dict[str, str],
) -> None:
    client.post("/api/v1/public/leads", json=contact_payload)

    response = client.get("/api/v1/admin/leads/stats", headers=auth_headers)
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["total"] >= 1
    assert body["contact"] >= 1
    assert body["new"] >= 1
    assert "consultation" in body
    assert "proposal" in body
    assert "attachments" in body


def test_list_leads(
    client: TestClient,
    auth_headers: dict[str, str],
    contact_payload: dict[str, str],
) -> None:
    create = client.post("/api/v1/public/leads", json=contact_payload)
    assert create.status_code == 201

    response = client.get("/api/v1/admin/leads", headers=auth_headers)
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["total"] >= 1
    assert len(body["items"]) >= 1
    assert body["items"][0]["form_type"] in {"contact", "consultation", "proposal"}


def test_list_leads_filter_by_form_type(
    client: TestClient,
    auth_headers: dict[str, str],
    contact_payload: dict[str, str],
) -> None:
    client.post("/api/v1/public/leads", json=contact_payload)

    response = client.get(
        "/api/v1/admin/leads",
        params={"form_type": "contact"},
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert all(item["form_type"] == "contact" for item in response.json()["items"])


def test_get_lead_detail(
    client: TestClient,
    auth_headers: dict[str, str],
    contact_payload: dict[str, str],
) -> None:
    create = client.post("/api/v1/public/leads", json=contact_payload)
    lead_id = create.json()["id"]

    response = client.get(f"/api/v1/admin/leads/{lead_id}", headers=auth_headers)
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["id"] == lead_id
    assert body["email"] == contact_payload["email"]
    assert body["payload"]["message"] == contact_payload["message"]


def test_update_lead_status(
    client: TestClient,
    auth_headers: dict[str, str],
    contact_payload: dict[str, str],
) -> None:
    create = client.post("/api/v1/public/leads", json=contact_payload)
    lead_id = create.json()["id"]

    response = client.patch(
        f"/api/v1/admin/leads/{lead_id}",
        json={"status": "read"},
        headers=auth_headers,
    )
    assert response.status_code == 200, response.text
    assert response.json()["status"] == "read"


def test_download_attachment(
    client: TestClient,
    auth_headers: dict[str, str],
) -> None:
    data = {
        "form_type": "proposal",
        "full_name": "Attachment User",
        "email": "test-attachment@example.com",
        "company": "Attach Co",
        "country": "United Kingdom",
        "description": "Proposal with attachment for admin download.",
        "privacy_consent": "yes",
    }
    files = [
        ("attachments", ("scope.pdf", io.BytesIO(b"%PDF-1.4 test"), "application/pdf")),
    ]
    create = client.post("/api/v1/public/leads", data=data, files=files)
    assert create.status_code == 201
    lead_id = create.json()["id"]

    detail = client.get(f"/api/v1/admin/leads/{lead_id}", headers=auth_headers)
    attachment_id = detail.json()["attachments"][0]["id"]

    response = client.get(
        f"/api/v1/admin/leads/{lead_id}/attachments/{attachment_id}",
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")
