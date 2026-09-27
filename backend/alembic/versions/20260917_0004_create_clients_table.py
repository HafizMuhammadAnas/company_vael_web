"""create clients table + seed existing logo marks

Revision ID: 20260917_0004
Revises: 20260916_0003
Create Date: 2026-09-17

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260917_0004"
down_revision: Union[str, None] = "20260916_0003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_SEED = [
    ("solara-grid", "Solara Grid", "/clients/solara-grid.svg", "Solara Grid logo", 10),
    ("cinemark-premiere", "Cinemark Premiere", "/clients/cinemark-premiere.svg", "Cinemark Premiere logo", 20),
    ("northline-university", "Northline University", "/clients/northline-university.svg", "Northline University logo", 30),
    ("harbor-residences", "Harbor Residences", "/clients/harbor-residences.svg", "Harbor Residences logo", 40),
    ("meridian-clinic", "Meridian Clinic", "/clients/meridian-clinic.svg", "Meridian Clinic logo", 50),
    ("atelier-commerce", "Atelier Commerce", "/clients/atelier-commerce.svg", "Atelier Commerce logo", 60),
    ("ledger-ops", "Ledger Ops", "/clients/ledger-ops.svg", "Ledger Ops logo", 70),
    ("greenfield-logistics", "Greenfield Logistics", "/clients/greenfield-logistics.svg", "Greenfield Logistics logo", 80),
]


def upgrade() -> None:
    op.create_table(
        "clients",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("logo_url", sa.Text(), nullable=False),
        sa.Column("logo_alt", sa.String(length=255), nullable=False, server_default=""),
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
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_clients_slug", "clients", ["slug"])
    op.create_index("ix_clients_active_sort", "clients", ["is_active", "sort_order"])

    clients = sa.table(
        "clients",
        sa.column("slug", sa.String),
        sa.column("name", sa.String),
        sa.column("logo_url", sa.Text),
        sa.column("logo_alt", sa.String),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        clients,
        [
            {
                "slug": slug,
                "name": name,
                "logo_url": logo_url,
                "logo_alt": logo_alt,
                "is_active": True,
                "sort_order": sort_order,
            }
            for slug, name, logo_url, logo_alt, sort_order in _SEED
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_clients_active_sort", table_name="clients")
    op.drop_index("ix_clients_slug", table_name="clients")
    op.drop_table("clients")
