"""create projects table + seed existing portfolio entries

Revision ID: 20260916_0003
Revises: 20260830_0002
Create Date: 2026-09-16

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260916_0003"
down_revision: Union[str, None] = "20260830_0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_SEED = [
    {
        "slug": "solara-grid",
        "title": "Solara Grid",
        "industry": "Energy",
        "service": "Custom Website",
        "location": "Islamabad, Pakistan",
        "image_url": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Solara Grid website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 10,
    },
    {
        "slug": "cinemark-premiere",
        "title": "Cinemark Premiere",
        "industry": "Entertainment",
        "service": "Custom Website",
        "location": "Karachi, Pakistan",
        "image_url": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Cinemark Premiere website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 20,
    },
    {
        "slug": "northline-university",
        "title": "Northline University",
        "industry": "Education",
        "service": "Institutional Site",
        "location": "Rawalpindi, Pakistan",
        "image_url": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Northline University website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 30,
    },
    {
        "slug": "harbor-residences",
        "title": "Harbor Residences",
        "industry": "Real Estate",
        "service": "Marketing Site",
        "location": "Lahore, Pakistan",
        "image_url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Harbor Residences website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 40,
    },
    {
        "slug": "meridian-clinic",
        "title": "Meridian Clinic",
        "industry": "Healthcare",
        "service": "Patient Portal Site",
        "location": "Dubai, UAE",
        "image_url": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Meridian Clinic website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 50,
    },
    {
        "slug": "atelier-commerce",
        "title": "Atelier Commerce",
        "industry": "Retail",
        "service": "E-commerce",
        "location": "London, United Kingdom",
        "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Atelier Commerce website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 60,
    },
    {
        "slug": "ledger-ops",
        "title": "Ledger Ops",
        "industry": "Finance",
        "service": "Corporate Website",
        "location": "Liverpool, United Kingdom",
        "image_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Ledger Ops website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 70,
    },
    {
        "slug": "greenfield-logistics",
        "title": "Greenfield Logistics",
        "industry": "Logistics",
        "service": "Operations Site",
        "location": "Manchester, United Kingdom",
        "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&h=2800&q=80",
        "image_alt": "Greenfield Logistics website homepage preview",
        "live_url": "https://example.com",
        "sort_order": 80,
    },
]


def upgrade() -> None:
    op.create_table(
        "projects",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("industry", sa.String(length=120), nullable=False),
        sa.Column("service", sa.String(length=120), nullable=False),
        sa.Column("location", sa.String(length=200), nullable=False),
        sa.Column("image_url", sa.Text(), nullable=False),
        sa.Column("image_alt", sa.String(length=255), nullable=False, server_default=""),
        sa.Column("live_url", sa.String(length=500), nullable=False),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="draft"),
        sa.Column("featured", sa.Boolean(), nullable=False, server_default=sa.text("0")),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_projects_slug", "projects", ["slug"])
    op.create_index("ix_projects_status_sort", "projects", ["status", "sort_order"])
    op.create_index("ix_projects_featured_sort", "projects", ["featured", "sort_order"])

    projects = sa.table(
        "projects",
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("industry", sa.String),
        sa.column("service", sa.String),
        sa.column("location", sa.String),
        sa.column("image_url", sa.Text),
        sa.column("image_alt", sa.String),
        sa.column("live_url", sa.String),
        sa.column("status", sa.String),
        sa.column("featured", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        projects,
        [
            {
                **row,
                "status": "published",
                "featured": False,
            }
            for row in _SEED
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_projects_featured_sort", table_name="projects")
    op.drop_index("ix_projects_status_sort", table_name="projects")
    op.drop_index("ix_projects_slug", table_name="projects")
    op.drop_table("projects")
