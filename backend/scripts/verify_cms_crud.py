"""Live CRUD smoke check for all CMS modules against a running API."""

from __future__ import annotations

import sys
from typing import Any

import httpx

BASE = "http://127.0.0.1:8000/api/v1"
EMAIL = "admin@vaelkode.com"
PASSWORD = "ChangeMe123!"

results: list[tuple[str, bool, str]] = []


def ok(name: str, detail: str = "") -> None:
    results.append((name, True, detail))
    print(f"  PASS  {name}" + (f" — {detail}" if detail else ""))


def fail(name: str, detail: str) -> None:
    results.append((name, False, detail))
    print(f"  FAIL  {name} — {detail}")


def check(name: str, cond: bool, detail: str = "") -> bool:
    if cond:
        ok(name, detail)
    else:
        fail(name, detail or "assertion failed")
    return cond


def main() -> int:
    client = httpx.Client(base_url=BASE, timeout=30.0)

    print("\n== Auth ==")
    login = client.post("/auth/login", json={"email": EMAIL, "password": PASSWORD})
    if login.status_code != 200:
        fail("login", f"{login.status_code} {login.text}")
        return 1
    token = login.json()["access_token"]
    h = {"Authorization": f"Bearer {token}"}
    ok("login")

    # ── Projects ──────────────────────────────────────────────
    print("\n== Projects ==")
    check("projects stats", client.get("/admin/projects/stats", headers=h).status_code == 200)
    check("projects list", client.get("/admin/projects", headers=h).status_code == 200)
    check("projects public", client.get("/public/projects").status_code == 200)

    create = client.post(
        "/admin/projects",
        headers=h,
        data={
            "slug": "e2e-crud-project",
            "title": "E2E CRUD Project",
            "industry": "Technology",
            "service": "Web Development",
            "location": "Remote",
            "live_url": "https://example.com/e2e-project",
            "image_url": "/portfolio/placeholder.webp",
            "image_alt": "E2E",
            "status": "draft",
            "featured": "false",
            "sort_order": "999",
        },
    )
    if not check("projects create", create.status_code == 201, create.text[:200]):
        return _summary()
    pid = create.json()["id"]
    check("projects get", client.get(f"/admin/projects/{pid}", headers=h).status_code == 200)

    # draft should not appear on public published list (if API filters)
    pub_before = client.get("/public/projects").json()
    pub_slugs = {i.get("slug") for i in pub_before.get("items", [])}
    check("projects draft hidden from public", "e2e-crud-project" not in pub_slugs)

    patch = client.patch(
        f"/admin/projects/{pid}",
        headers=h,
        data={"status": "published", "title": "E2E CRUD Project Updated"},
    )
    check("projects update/publish", patch.status_code == 200 and patch.json()["status"] == "published", patch.text[:200])

    pub_after = client.get("/public/projects").json()
    pub_slugs = {i.get("slug") for i in pub_after.get("items", [])}
    check("projects published visible", "e2e-crud-project" in pub_slugs)

    check("projects delete", client.delete(f"/admin/projects/{pid}", headers=h).status_code == 204)
    check("projects get after delete", client.get(f"/admin/projects/{pid}", headers=h).status_code == 404)

    # ── Clients ───────────────────────────────────────────────
    print("\n== Clients ==")
    check("clients stats", client.get("/admin/clients/stats", headers=h).status_code == 200)
    check("clients list", client.get("/admin/clients", headers=h).status_code == 200)
    check("clients public", client.get("/public/clients").status_code == 200)

    create = client.post(
        "/admin/clients",
        headers=h,
        data={
            "slug": "e2e-crud-client",
            "name": "E2E CRUD Client",
            "logo_url": "/clients/placeholder.svg",
            "logo_alt": "E2E Client",
            "is_active": "false",
            "sort_order": "999",
        },
    )
    if not check("clients create", create.status_code == 201, create.text[:200]):
        return _summary()
    cid = create.json()["id"]
    check("clients get", client.get(f"/admin/clients/{cid}", headers=h).status_code == 200)

    pub = client.get("/public/clients").json()
    names = {i.get("name") for i in pub.get("items", [])}
    check("clients inactive hidden", "E2E CRUD Client" not in names)

    patch = client.patch(
        f"/admin/clients/{cid}",
        headers=h,
        data={"is_active": "true", "name": "E2E CRUD Client Live"},
    )
    check("clients update/activate", patch.status_code == 200 and patch.json()["is_active"] is True, patch.text[:200])

    pub = client.get("/public/clients").json()
    names = {i.get("name") for i in pub.get("items", [])}
    check("clients active visible", "E2E CRUD Client Live" in names)

    check("clients delete", client.delete(f"/admin/clients/{cid}", headers=h).status_code == 204)
    check("clients get after delete", client.get(f"/admin/clients/{cid}", headers=h).status_code == 404)

    # ── Insights ──────────────────────────────────────────────
    print("\n== Insights ==")
    check("insights stats", client.get("/admin/insights/stats", headers=h).status_code == 200)
    check("insights list", client.get("/admin/insights", headers=h).status_code == 200)
    check("insights public", client.get("/public/insights").status_code == 200)

    create = client.post(
        "/admin/insights",
        headers=h,
        json={
            "slug": "e2e-crud-insight",
            "title": "E2E CRUD Insight",
            "category": "Software Engineering",
            "tags": ["Testing"],
            "description": "CRUD check",
            "body": "Body paragraph.",
            "read_time": "3 min",
            "cover": "nodes",
            "status": "draft",
            "featured": False,
            "sort_order": 999,
        },
    )
    if not check("insights create", create.status_code == 201, create.text[:200]):
        return _summary()
    iid = create.json()["id"]
    check("insights get", client.get(f"/admin/insights/{iid}", headers=h).status_code == 200)
    check("insights draft detail 404", client.get("/public/insights/e2e-crud-insight").status_code == 404)

    patch = client.patch(f"/admin/insights/{iid}", headers=h, json={"status": "published"})
    check("insights publish", patch.status_code == 200 and patch.json()["status"] == "published", patch.text[:200])
    check("insights public detail", client.get("/public/insights/e2e-crud-insight").status_code == 200)

    check("insights delete", client.delete(f"/admin/insights/{iid}", headers=h).status_code == 204)
    check("insights gone", client.get("/public/insights/e2e-crud-insight").status_code == 404)

    # ── Google reviews ────────────────────────────────────────
    print("\n== Google reviews ==")
    check("reviews stats", client.get("/admin/reviews/stats", headers=h).status_code == 200)
    check("reviews list", client.get("/admin/reviews", headers=h).status_code == 200)
    settings = client.get("/admin/reviews/settings", headers=h)
    check("reviews settings get", settings.status_code == 200)
    original_heading = settings.json()["heading"] if settings.status_code == 200 else ""

    create = client.post(
        "/admin/reviews",
        headers=h,
        json={
            "author": "E2E CRUD Reviewer",
            "relative_time": "just now",
            "rating": 5,
            "text": "CRUD verification review.",
            "initials": "EC",
            "is_active": False,
            "sort_order": 999,
        },
    )
    if not check("reviews create", create.status_code == 201, create.text[:200]):
        return _summary()
    rid = create.json()["id"]
    check("reviews get", client.get(f"/admin/reviews/{rid}", headers=h).status_code == 200)

    authors = {i["author"] for i in client.get("/public/reviews").json()["reviews"]}
    check("reviews inactive hidden", "E2E CRUD Reviewer" not in authors)

    patch = client.patch(f"/admin/reviews/{rid}", headers=h, json={"is_active": True})
    check("reviews activate", patch.status_code == 200 and patch.json()["is_active"] is True)

    authors = {i["author"] for i in client.get("/public/reviews").json()["reviews"]}
    check("reviews active visible", "E2E CRUD Reviewer" in authors)

    patch_s = client.patch(
        "/admin/reviews/settings",
        headers=h,
        json={"heading": "E2E settings heading"},
    )
    check("reviews settings update", patch_s.status_code == 200 and patch_s.json()["heading"] == "E2E settings heading")
    # restore
    client.patch("/admin/reviews/settings", headers=h, json={"heading": original_heading})

    check("reviews delete", client.delete(f"/admin/reviews/{rid}", headers=h).status_code == 204)

    # ── FAQs ──────────────────────────────────────────────────
    print("\n== FAQs ==")
    check("faqs stats", client.get("/admin/faqs/stats", headers=h).status_code == 200)
    cats = client.get("/admin/faqs/categories", headers=h)
    check("faqs categories list", cats.status_code == 200 and len(cats.json()) >= 1)
    check("faqs items list", client.get("/admin/faqs/items", headers=h).status_code == 200)
    check("faqs public", client.get("/public/faqs").status_code == 200)

    general = next(c for c in cats.json() if c["slug"] == "general")
    create_cat = client.post(
        "/admin/faqs/categories",
        headers=h,
        json={
            "slug": "e2e-crud-cat",
            "label": "E2E Cat",
            "section_label": "E2E Cat",
            "heading": "E2E Category",
            "is_active": True,
            "sort_order": 999,
        },
    )
    if not check("faqs category create", create_cat.status_code == 201, create_cat.text[:200]):
        return _summary()
    cat_id = create_cat.json()["id"]

    create = client.post(
        "/admin/faqs/items",
        headers=h,
        json={
            "category_id": general["id"],
            "question": "E2E CRUD FAQ question?",
            "answer": "CRUD verification answer.",
            "is_active": False,
            "sort_order": 999,
        },
    )
    if not check("faqs item create", create.status_code == 201, create.text[:200]):
        return _summary()
    fid = create.json()["id"]
    check("faqs item get", client.get(f"/admin/faqs/items/{fid}", headers=h).status_code == 200)

    questions = {
        i["question"] for c in client.get("/public/faqs").json()["categories"] for i in c["items"]
    }
    check("faqs inactive hidden", "E2E CRUD FAQ question?" not in questions)

    patch = client.patch(f"/admin/faqs/items/{fid}", headers=h, json={"is_active": True})
    check("faqs item activate", patch.status_code == 200 and patch.json()["is_active"] is True)

    questions = {
        i["question"] for c in client.get("/public/faqs").json()["categories"] for i in c["items"]
    }
    check("faqs item visible", "E2E CRUD FAQ question?" in questions)

    by_slug = client.get("/public/faqs/general")
    check("faqs public by slug", by_slug.status_code == 200 and by_slug.json()["id"] == "general")

    check("faqs item delete", client.delete(f"/admin/faqs/items/{fid}", headers=h).status_code == 204)
    check("faqs category delete", client.delete(f"/admin/faqs/categories/{cat_id}", headers=h).status_code == 204)

    return _summary()


def _summary() -> int:
    passed = sum(1 for _, good, _ in results if good)
    failed = sum(1 for _, good, _ in results if not good)
    print(f"\n{'=' * 40}")
    print(f"Result: {passed} passed, {failed} failed (of {len(results)})")
    if failed:
        print("\nFailed checks:")
        for name, good, detail in results:
            if not good:
                print(f"  - {name}: {detail}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
