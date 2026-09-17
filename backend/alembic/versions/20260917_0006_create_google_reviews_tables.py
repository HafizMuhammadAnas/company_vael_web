"""create google reviews tables + seed homepage reviews

Revision ID: 20260917_0006
Revises: 20260917_0005
Create Date: 2026-09-17

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260917_0006"
down_revision: Union[str, None] = "20260917_0005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_SEED_REVIEWS = [
    ("Neil Griffiths", "1 year ago", 5, "N", "#4285F4", "Very good knowledgeable service that has really helped my business grow online. Clear advice and a site that converts.", 10),
    ("Helen Morgan", "10 months ago", 5, "H", "#EA4335", "Professional from the first call. They understood what we needed and delivered a clean website on schedule.", 20),
    ("Sam Patel", "8 months ago", 5, "S", "#34A853", "Great communication throughout the project. The team made technical choices easy to follow and the result looks excellent.", 30),
    ("Priya Nair", "6 months ago", 5, "P", "#FBBC05", "Our new site is faster, clearer, and much easier for customers to use. Would happily recommend VAELKODE.", 40),
    ("James Walker", "4 months ago", 5, "J", "#4285F4", "They translated a messy brief into a practical plan and a polished website, without the jargon, and with visible progress each week.", 50),
    ("Ayesha Khan", "2 months ago", 5, "A", "#EA4335", "Clear updates, strong design, and solid engineering. Launch felt calm and our team can manage the site themselves.", 60),
]


def upgrade() -> None:
    op.create_table(
        "google_review_settings",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("heading", sa.Text(), nullable=False),
        sa.Column("summary_label", sa.String(length=64), nullable=False, server_default="EXCELLENT"),
        sa.Column("rating", sa.Float(), nullable=False, server_default="5"),
        sa.Column("review_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("profile_url", sa.String(length=500), nullable=False, server_default=""),
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
    )

    op.create_table(
        "google_reviews",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("author", sa.String(length=160), nullable=False),
        sa.Column("relative_time", sa.String(length=64), nullable=False, server_default=""),
        sa.Column("rating", sa.Integer(), nullable=False, server_default="5"),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("initials", sa.String(length=8), nullable=False, server_default=""),
        sa.Column("avatar_src", sa.String(length=500), nullable=False, server_default=""),
        sa.Column("avatar_color", sa.String(length=32), nullable=False, server_default="#4285F4"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("1")),
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
    )
    op.create_index("ix_google_reviews_active_sort", "google_reviews", ["is_active", "sort_order"])

    settings = sa.table(
        "google_review_settings",
        sa.column("heading", sa.Text),
        sa.column("summary_label", sa.String),
        sa.column("rating", sa.Float),
        sa.column("review_count", sa.Integer),
        sa.column("profile_url", sa.String),
    )
    op.bulk_insert(
        settings,
        [
            {
                "heading": "We're proud of our 5-star Google rating, and we keep working to earn it.",
                "summary_label": "EXCELLENT",
                "rating": 5.0,
                "review_count": 76,
                "profile_url": "https://www.google.com/maps",
            }
        ],
    )

    reviews = sa.table(
        "google_reviews",
        sa.column("author", sa.String),
        sa.column("relative_time", sa.String),
        sa.column("rating", sa.Integer),
        sa.column("text", sa.Text),
        sa.column("initials", sa.String),
        sa.column("avatar_src", sa.String),
        sa.column("avatar_color", sa.String),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        reviews,
        [
            {
                "author": author,
                "relative_time": relative_time,
                "rating": rating,
                "text": text,
                "initials": initials,
                "avatar_src": "",
                "avatar_color": color,
                "is_active": True,
                "sort_order": sort_order,
            }
            for author, relative_time, rating, initials, color, text, sort_order in _SEED_REVIEWS
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_google_reviews_active_sort", table_name="google_reviews")
    op.drop_table("google_reviews")
    op.drop_table("google_review_settings")
