"""create careers + industries tables and seed content

Revision ID: 20260927_0008
Revises: 20260917_0007
Create Date: 2026-09-27

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260927_0008"
down_revision: Union[str, None] = "20260917_0007"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_WHY_CARDS = [
    {"title": "Engineering", "text": "Work across modern software engineering and application development."},
    {
        "title": "AI & Emerging Technology",
        "text": "Explore practical applications of AI, machine learning, and intelligent automation.",
    },
    {"title": "Learning", "text": "Continue developing your technical and problem-solving skills."},
    {
        "title": "Ownership",
        "text": "Take responsibility for the work you build and the outcomes you contribute to.",
    },
    {
        "title": "Collaboration",
        "text": "Work with people across technology, product, design, and business.",
    },
    {
        "title": "Growth",
        "text": "Grow alongside an AI-first digital engineering company being built from the ground up.",
    },
]

_LOOK_QUALITIES = [
    "Curiosity",
    "Ownership",
    "Problem Solving",
    "Continuous Learning",
    "Communication",
    "Technical Excellence",
    "Teamwork",
    "Adaptability",
]

_EMPTY_STATE = [
    "We don't have any public openings at the moment.",
    "If you believe you could contribute to VAELKODE, you can still introduce yourself and share your background with us.",
]

_INDUSTRIES = [
    ("real-estate", "Real Estate", "Real Estate", "building", "neon", 10),
    ("education", "Education", "Education", "book", "violet", 20),
    ("healthcare", "Healthcare", "Healthcare", "heart", "pink", 30),
    ("agriculture", "Agriculture", "Agriculture", "sprout", "neon", 40),
    ("finance", "Finance", "Finance", "chart", "violet", 50),
    ("logistics", "Logistics", "Logistics", "truck", "blue", 60),
    ("retail", "Retail & commerce", "Retail", "shopping", "pink", 70),
]


def upgrade() -> None:
    op.create_table(
        "career_settings",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("seo_title", sa.String(length=255), nullable=False),
        sa.Column("seo_description", sa.Text(), nullable=False),
        sa.Column("hero_label", sa.String(length=120), nullable=False, server_default="Careers"),
        sa.Column("hero_title", sa.String(length=255), nullable=False),
        sa.Column("hero_supporting", sa.Text(), nullable=False),
        sa.Column("why_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("why_heading", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("why_cards", sa.JSON(), nullable=False),
        sa.Column("look_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("look_heading", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("look_supporting", sa.Text(), nullable=False),
        sa.Column("look_qualities", sa.JSON(), nullable=False),
        sa.Column("opportunities_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("opportunities_heading", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("empty_state", sa.JSON(), nullable=False),
        sa.Column("profile_cta_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("profile_cta_href", sa.String(length=500), nullable=False, server_default=""),
        sa.Column("final_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("final_heading", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("final_supporting", sa.Text(), nullable=False),
        sa.Column("final_cta_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("final_cta_to", sa.String(length=255), nullable=False, server_default="/contact"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "career_jobs",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=160), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("department", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("location", sa.String(length=200), nullable=False, server_default=""),
        sa.Column("employment_type", sa.String(length=64), nullable=False, server_default="Full-time"),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("requirements", sa.JSON(), nullable=False),
        sa.Column("apply_href", sa.String(length=500), nullable=False, server_default=""),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="draft"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("1")),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_career_jobs_slug", "career_jobs", ["slug"])
    op.create_index("ix_career_jobs_status_active_sort", "career_jobs", ["status", "is_active", "sort_order"])

    op.create_table(
        "industry_settings",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("label", sa.String(length=120), nullable=False, server_default="Industries"),
        sa.Column("heading", sa.String(length=255), nullable=False),
        sa.Column("supporting", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "industries",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=80), nullable=False),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("short", sa.String(length=80), nullable=False, server_default=""),
        sa.Column("icon_key", sa.String(length=32), nullable=False, server_default="building"),
        sa.Column("accent_key", sa.String(length=32), nullable=False, server_default="neon"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("1")),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_industries_slug", "industries", ["slug"])
    op.create_index("ix_industries_active_sort", "industries", ["is_active", "sort_order"])

    career_settings = sa.table(
        "career_settings",
        sa.column("seo_title", sa.String),
        sa.column("seo_description", sa.Text),
        sa.column("hero_label", sa.String),
        sa.column("hero_title", sa.String),
        sa.column("hero_supporting", sa.Text),
        sa.column("why_label", sa.String),
        sa.column("why_heading", sa.String),
        sa.column("why_cards", sa.JSON),
        sa.column("look_label", sa.String),
        sa.column("look_heading", sa.String),
        sa.column("look_supporting", sa.Text),
        sa.column("look_qualities", sa.JSON),
        sa.column("opportunities_label", sa.String),
        sa.column("opportunities_heading", sa.String),
        sa.column("empty_state", sa.JSON),
        sa.column("profile_cta_label", sa.String),
        sa.column("profile_cta_href", sa.String),
        sa.column("final_label", sa.String),
        sa.column("final_heading", sa.String),
        sa.column("final_supporting", sa.Text),
        sa.column("final_cta_label", sa.String),
        sa.column("final_cta_to", sa.String),
    )
    op.bulk_insert(
        career_settings,
        [
            {
                "seo_title": "Careers | VAELKODE",
                "seo_description": (
                    "Build what comes next with VAELKODE. An AI-first digital engineering company "
                    "focused on software engineering, AI, digital products, and practical technology solutions."
                ),
                "hero_label": "Careers",
                "hero_title": "Build What Comes Next With VAELKODE.",
                "hero_supporting": (
                    "We're building an AI-first digital engineering company focused on software engineering, "
                    "AI, digital products, and practical technology solutions. As VAELKODE grows, we'll look "
                    "for people who enjoy solving hard problems, keep learning, and want to build technology "
                    "with a real purpose."
                ),
                "why_label": "Why Work With Us",
                "why_heading": "Work on Problems That Matter.",
                "why_cards": _WHY_CARDS,
                "look_label": "What We Look For",
                "look_heading": "People Who Build, Learn, and Solve.",
                "look_supporting": (
                    "We value people who are curious, responsible, collaborative, and willing to "
                    "understand a problem before jumping to a solution."
                ),
                "look_qualities": _LOOK_QUALITIES,
                "opportunities_label": "Current Opportunities",
                "opportunities_heading": "Current Opportunities",
                "empty_state": _EMPTY_STATE,
                "profile_cta_label": "Send Your Profile",
                "profile_cta_href": "mailto:careers@vaelkode.com",
                "final_label": "Grow With Us",
                "final_heading": "Interested in Growing With VAELKODE?",
                "final_supporting": (
                    "Follow VAELKODE as we grow and create new opportunities across engineering, AI, "
                    "product, design, and technology."
                ),
                "final_cta_label": "Contact VAELKODE",
                "final_cta_to": "/contact",
            }
        ],
    )

    industry_settings = sa.table(
        "industry_settings",
        sa.column("label", sa.String),
        sa.column("heading", sa.String),
        sa.column("supporting", sa.Text),
    )
    op.bulk_insert(
        industry_settings,
        [
            {
                "label": "Industries",
                "heading": "Sectors where we know the pitfalls.",
                "supporting": (
                    "Domain depth shortens discovery. We work best with industries that run on process, "
                    "compliance, data — and strong automation potential."
                ),
            }
        ],
    )

    industries = sa.table(
        "industries",
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("short", sa.String),
        sa.column("icon_key", sa.String),
        sa.column("accent_key", sa.String),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        industries,
        [
            {
                "slug": slug,
                "title": title,
                "short": short,
                "icon_key": icon_key,
                "accent_key": accent_key,
                "is_active": True,
                "sort_order": sort_order,
            }
            for slug, title, short, icon_key, accent_key, sort_order in _INDUSTRIES
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_industries_active_sort", table_name="industries")
    op.drop_index("ix_industries_slug", table_name="industries")
    op.drop_table("industries")
    op.drop_table("industry_settings")
    op.drop_index("ix_career_jobs_status_active_sort", table_name="career_jobs")
    op.drop_index("ix_career_jobs_slug", table_name="career_jobs")
    op.drop_table("career_jobs")
    op.drop_table("career_settings")
