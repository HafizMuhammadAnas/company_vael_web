import io

from fastapi.testclient import TestClient


def test_health(client: TestClient) -> None:
    response = client.get("/api/v1/public/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_create_contact_lead(client: TestClient, contact_payload: dict[str, str]) -> None:
    response = client.post("/api/v1/public/leads", json=contact_payload)
    assert response.status_code == 201, response.text
    body = response.json()
    assert body["ok"] is True
    assert isinstance(body["id"], int)


def test_create_consultation_lead(client: TestClient) -> None:
    payload = {
        "form_type": "consultation",
        "full_name": "Consult User",
        "email": "test-consult@example.com",
        "description": "We want to discuss an AI automation initiative.",
        "contact_method": "Email",
        "preferred_time": "Weekday mornings",
        "privacy_consent": "yes",
    }
    response = client.post("/api/v1/public/leads", json=payload)
    assert response.status_code == 201, response.text


def test_create_proposal_lead_with_attachment(client: TestClient) -> None:
    data = {
        "form_type": "proposal",
        "full_name": "Proposal User",
        "email": "test-proposal@example.com",
        "company": "Proposal Ltd",
        "country": "United Kingdom",
        "description": "Detailed proposal request for a logistics platform.",
        "privacy_consent": "yes",
    }
    files = [
        ("attachments", ("scope.pdf", io.BytesIO(b"%PDF-1.4 test"), "application/pdf")),
    ]
    response = client.post("/api/v1/public/leads", data=data, files=files)
    assert response.status_code == 201, response.text


def test_rejects_missing_description(client: TestClient) -> None:
    payload = {
        "form_type": "contact",
        "full_name": "No Description",
        "email": "test-nodesc@example.com",
        "privacy_consent": "yes",
    }
    response = client.post("/api/v1/public/leads", json=payload)
    assert response.status_code == 422
    detail = response.json()["detail"]
    assert detail["errors"]["description"]


def test_rejects_missing_privacy_consent(client: TestClient) -> None:
    payload = {
        "form_type": "contact",
        "full_name": "No Consent",
        "email": "test-noconsent@example.com",
        "description": "Valid description here.",
        "privacy_consent": "no",
    }
    response = client.post("/api/v1/public/leads", json=payload)
    assert response.status_code == 422
    assert "privacy_consent" in response.json()["detail"]["errors"]


def test_rejects_invalid_form_type(client: TestClient) -> None:
    payload = {
        "form_type": "newsletter",
        "full_name": "Bad Type",
        "email": "test-badtype@example.com",
        "description": "Valid description here.",
        "privacy_consent": "yes",
    }
    response = client.post("/api/v1/public/leads", json=payload)
    assert response.status_code == 422
    assert "form_type" in response.json()["detail"]["errors"]


def test_rejects_disallowed_file_type(client: TestClient) -> None:
    data = {
        "form_type": "proposal",
        "full_name": "Bad File",
        "email": "test-badfile@example.com",
        "company": "Test Co",
        "country": "UK",
        "description": "Proposal with invalid attachment.",
        "privacy_consent": "yes",
    }
    files = [
        ("attachments", ("script.exe", io.BytesIO(b"MZ"), "application/octet-stream")),
    ]
    response = client.post("/api/v1/public/leads", data=data, files=files)
    assert response.status_code == 400
