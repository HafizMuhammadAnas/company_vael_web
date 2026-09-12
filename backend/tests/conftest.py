import os
from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.lead import Lead
from app.models.user import User

# Ensure test-friendly defaults before the app module is first imported.
os.environ.setdefault("LEADS_RATE_LIMIT", "1000/minute")
os.environ.setdefault("FIRST_ADMIN_EMAIL", "test-admin@example.com")
os.environ.setdefault("FIRST_ADMIN_PASSWORD", "TestAdmin123!")


@pytest.fixture(autouse=True)
def _reset_rate_limiter() -> Generator[None, None, None]:
    try:
        from app.core.limiter import limiter

        limiter.reset()
    except Exception:
        pass
    yield


@pytest.fixture(autouse=True)
def _test_env(tmp_path, monkeypatch) -> Generator[None, None, None]:
    monkeypatch.setenv("UPLOAD_DIR", str(tmp_path / "uploads"))
    monkeypatch.setenv("LEADS_RATE_LIMIT", "1000/minute")
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    from app.main import app

    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def db() -> Generator[Session, None, None]:
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def contact_payload() -> dict[str, str]:
    return {
        "form_type": "contact",
        "full_name": "Test User",
        "email": "test-contact@example.com",
        "company": "Test Co",
        "phone": "+44 7700 900000",
        "message": "I'd like to ask about your software services.",
        "privacy_consent": "yes",
    }


@pytest.fixture(autouse=True)
def _cleanup_leads(db: Session) -> Generator[None, None, None]:
    yield
    db.query(Lead).filter(Lead.email.like("%@example.com")).delete(synchronize_session=False)
    db.query(User).filter(User.email.like("%@example.com")).delete(synchronize_session=False)
    db.commit()


@pytest.fixture
def admin_user(db: Session) -> User:
    email = "test-admin@example.com"
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return existing

    user = User(
        email=email,
        hashed_password=hash_password("TestAdmin123!"),
        role="admin",
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture
def auth_headers(client: TestClient, admin_user: User) -> dict[str, str]:
    response = client.post(
        "/api/v1/auth/login",
        json={"email": admin_user.email, "password": "TestAdmin123!"},
    )
    assert response.status_code == 200, response.text
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
