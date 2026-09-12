# VAELKODE content voice & claims

Use this document when writing, editing, or reviewing marketing copy.
It keeps positioning consistent and stops unapproved claims from reaching production.

**Where copy lives**

| Source | Purpose |
|--------|---------|
| `frontend/src/constants/company.ts` | Company name, positioning, contact, legal, default SEO |
| `frontend/src/content/*.ts` | Page copy (one file per page/domain) |
| `frontend/src/content/shared/ctas.ts` | Shared CTA labels + routes |
| `frontend/src/content/shared/disclaimers.ts` | Shared honesty notes for write-ups / galleries (not for portfolio UI) |
| `frontend/src/content/shared/types.ts` | TypeScript shapes for SEO, heroes, FAQs, finals |

Prefer shared CTAs and disclaimers over re-typing the same phrase in a page file.

---

## Positioning (always)

- VAELKODE is an **AI-first digital engineering** company.
- Focus: software, digital platforms, intelligent systems, and technology solutions for **real business and operational needs**.
- Disciplines we may name: software engineering, web & mobile, AI & intelligent automation, cloud & DevOps, technology consulting.
- Company facts (name, email, phone, UK registration) come **only** from `COMPANY` in `company.ts`. Do not invent alternate numbers, addresses, or “HQ” claims.

Approved short framing (align new blurbs with this tone):

> VAELKODE is an AI-first digital engineering company building software, intelligent systems, and technology solutions around real business needs.

---

## Voice

| Do | Don't |
|----|--------|
| Practical, calm, client-readable | Hype, slogans that over-promise |
| Clear over clever | Engineering metaphors that need decoding |
| Problem → approach → outcome (qualitative) | Jargon walls and buzzword stacks |
| Short scannable sections | Encyclopedia pages with 10+ near-duplicate blocks |
| Requirements-driven (“depends on the project”) | Absolute guarantees |
| Clear next step (consultation / proposal / contact) | Fake urgency (“limited spots”, “act now”) |
| “You” / buyer situations first | “We” / capability catalogues first |
| “We help organizations…” | “We are the leading / #1 / world-class…” |

**Tone checklist**

- A non-technical buyer should understand the page in one pass.
- Prefer concrete verbs: build, integrate, automate, modernize, deploy, assess.
- Prefer short sentences and everyday words over abstract engineering language.
- Homepage and solution pages should answer: what you do, who it's for, what changes, what to do next.
- Keep solution pages distinct: Cloud = reliability/ops; Mobile = product UX; AI = decision/automation value — not copy-pasted intros.
- Default solution-page shape: Hero → problem/who it's for → what we build → how we work (≤4 steps) → work → FAQ → CTA.

---

## Claims — never invent

Do **not** add any of the following unless they are factual, approved, and sourced:

| Category | Examples to block |
|----------|-------------------|
| Metrics | Uptime %, cost savings, ROI, conversion lifts, “X users”, “Y deployments” |
| Social proof | Client logos, testimonials, reviews, star ratings, “trusted by…” |
| Scale theatre | Team size, years of experience, office count, “global presence” |
| Awards / certs | Partnership badges, ISO/vendor certifications not officially held |
| Guarantees | “Guaranteed”, “always”, “100% secure”, “zero downtime” |
| Case-study fiction | Named clients, confidential outcomes, fabricated project results |
| Careers filler | Fake open roles or invented benefits |
| Insights filler | Fake blog posts, fake downloadable resources |

If a section needs a number and none is approved: **omit the number** or use a neutral empty/honest state.

---

## Work, portfolio & write-ups

Public pages should read as a **live product**, not a staging/demo build. Do not show “placeholder”, “layout preview”, “when approved”, or similar development notes in the UI.

- **Portfolio (`/portfolio`)** — present projects as normal portfolio items. No on-page disclaimer strip.
- **Write-ups / other work galleries** — use `DISCLAIMERS` (`caseStudies`, `selectedWork`, `technologyDemonstrations`, etc.) only where that framing still applies.
- Do not invent metrics, fake client results, or a “Results” section with fabricated outcomes.
- Prefer “Project Write-Ups” language over “Case Studies” when describing write-up pages.

---

## AI & technical claims

- Describe capabilities as **possible and requirements-driven**, not as proven accuracy or production SLAs.
- No unsupported accuracy figures, hallucination rates, or “fully autonomous” promises.
- Prefer: “can help…”, “designed to…”, “where appropriate…”, “depending on data and requirements…”.

Cloud / security / compliance: same rule — no invented certifications, uptime, or absolute security guarantees.

---

## CTAs & routes

Import from `@/content/shared` instead of hardcoding label/route pairs:

- Consultation → `/consultation`
- Proposal → `/request-proposal`
- Contact → `/contact`
- Solutions → `/solutions`
- Work / write-ups → `/work`, `/work/case-studies`

Standard closing pairs: `FINAL_PAIR`, `FINAL_PAIR_CONTACT`, `FINAL_PAIR_TELL_US`.
Page-specific discuss labels: `contactCta("…")` / `consultationCta("…")`.

---

## Review checklist (PR / content pass)

Before merging copy changes, confirm:

1. **Positioning** — still AI-first digital engineering; no conflicting tagline.
2. **Facts** — contact/legal/SEO defaults still match `COMPANY` (or intentional SEO page variants).
3. **No invented claims** — no metrics, logos, testimonials, guarantees, fake jobs/articles.
4. **Production UI** — no placeholder/dev disclaimers on public pages (especially portfolio); write-ups still use honesty notes where needed.
5. **Shared CTAs** — new buttons use `CTA` / helpers, not one-off routes with drifted labels.
6. **Types** — new sections use shared types (`SeoMeta`, `PageHero`, `FinalCta`, `FaqSection`, …).
7. **Uniqueness** — solution page still sounds like its domain, not a paste of another page.
8. **Empty states** — if content is not ready, use an honest empty/in-preparation state.

---

## Ownership

| Role | Responsibility |
|------|----------------|
| Content / marketing owner | Approves wording and any new claims |
| Engineering | Structure, types, shared modules, wiring to UI |
| Prefer | Small PRs (“update Cloud FAQ”) over site-wide rewrites without review |

When in doubt: **leave it out** or ask for approval — do not invent.
