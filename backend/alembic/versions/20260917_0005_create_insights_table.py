"""create insights table + seed coming-soon previews

Revision ID: 20260917_0005
Revises: 20260917_0004
Create Date: 2026-09-17

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260917_0005"
down_revision: Union[str, None] = "20260917_0004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_SEED = [
    {
        "slug": "ai-document-heavy-processes",
        "title": "How AI Can Transform Document-Heavy Business Processes",
        "category": "Artificial Intelligence",
        "tags": ["Artificial Intelligence", "Automation"],
        "description": "Where document work creates friction, and how AI can help without replacing judgment.",
        "read_time": "8 min",
        "cover": "mesh",
        "featured": False,
        "sort_order": 10,
    },
    {
        "slug": "agentic-ai-enterprise-workflows",
        "title": "Understanding Agentic AI and Its Role in Enterprise Workflows",
        "category": "Agentic AI",
        "tags": ["Agentic AI", "Software Engineering"],
        "description": "What agents actually mean in business systems, and when they're the wrong tool.",
        "read_time": "9 min",
        "cover": "orbits",
        "featured": False,
        "sort_order": 20,
    },
    {
        "slug": "deployment-architecture-matters",
        "title": "Why Deployment Architecture Matters for Modern Applications",
        "category": "Cloud & DevOps",
        "tags": ["Cloud & DevOps", "Technology Strategy"],
        "description": "Calmer releases start with environments, pipelines, and ownership, not with more tools.",
        "read_time": "7 min",
        "cover": "circuits",
        "featured": False,
        "sort_order": 30,
    },
    {
        "slug": "when-to-build-custom-software",
        "title": "When Should a Business Build Custom Software?",
        "category": "Software Engineering",
        "tags": ["Software Engineering", "Technology Strategy"],
        "description": "A practical frame for choosing build vs buy before you commit budget and people.",
        "read_time": "10 min",
        "cover": "nodes",
        "featured": True,
        "sort_order": 40,
    },
    {
        "slug": "build-vs-buy-technology",
        "title": "Build vs Buy: Choosing the Right Technology for Your Business",
        "category": "Technology Strategy",
        "tags": ["Technology Strategy", "Software Engineering"],
        "description": "Trade-offs that matter: fit, speed, ownership, and long-term change.",
        "read_time": "8 min",
        "cover": "waves",
        "featured": False,
        "sort_order": 50,
    },
    {
        "slug": "introduce-ai-existing-system",
        "title": "How to Introduce AI Into an Existing Software System",
        "category": "Artificial Intelligence",
        "tags": ["Artificial Intelligence", "Software Engineering"],
        "description": "Start with the workflow and data you already have, then decide what belongs in production.",
        "read_time": "11 min",
        "cover": "book",
        "featured": False,
        "sort_order": 60,
    },
    {
        "slug": "business-website-worth-maintaining",
        "title": "What Makes a Business Website Worth Maintaining",
        "category": "Web & Digital Platforms",
        "tags": ["Web & Digital Platforms"],
        "description": "Clarity, performance, and a content model your team can actually run.",
        "read_time": "6 min",
        "cover": "mesh",
        "featured": False,
        "sort_order": 70,
    },
    {
        "slug": "workflow-automation-handoffs",
        "title": "From Manual Handoffs to Reliable Workflow Automation",
        "category": "Automation",
        "tags": ["Automation", "Artificial Intelligence"],
        "description": "Pick the bottlenecks that waste the most time, then automate the boring path.",
        "read_time": "7 min",
        "cover": "orbits",
        "featured": False,
        "sort_order": 80,
    },
    {
        "slug": "native-cross-platform-pwa",
        "title": "Native, Cross-Platform, or Progressive Web: Choosing for Your Product",
        "category": "Mobile Development",
        "tags": ["Mobile Development", "Software Engineering"],
        "description": "A clear look at platform choices without getting lost in framework debates.",
        "read_time": "9 min",
        "cover": "circuits",
        "featured": False,
        "sort_order": 90,
    },
    {
        "slug": "observability-basics-product-teams",
        "title": "Observability Basics for Growing Product Teams",
        "category": "Cloud & DevOps",
        "tags": ["Cloud & DevOps"],
        "description": "What to measure first so incidents are visible before customers tell you.",
        "read_time": "8 min",
        "cover": "nodes",
        "featured": False,
        "sort_order": 100,
    },
]


def upgrade() -> None:
    op.create_table(
        "insights",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=160), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("category", sa.String(length=120), nullable=False),
        sa.Column("tags", sa.JSON(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("read_time", sa.String(length=32), nullable=False, server_default="5 min"),
        sa.Column("cover", sa.String(length=32), nullable=False, server_default="mesh"),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="draft"),
        sa.Column("featured", sa.Boolean(), nullable=False, server_default=sa.text("0")),
        sa.Column("published_date", sa.Date(), nullable=True),
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
    op.create_index("ix_insights_slug", "insights", ["slug"])
    op.create_index("ix_insights_status_sort", "insights", ["status", "sort_order"])
    op.create_index("ix_insights_featured_sort", "insights", ["featured", "sort_order"])

    insights = sa.table(
        "insights",
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("category", sa.String),
        sa.column("tags", sa.JSON),
        sa.column("description", sa.Text),
        sa.column("body", sa.Text),
        sa.column("read_time", sa.String),
        sa.column("cover", sa.String),
        sa.column("status", sa.String),
        sa.column("featured", sa.Boolean),
        sa.column("published_date", sa.Date),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        insights,
        [
            {
                **row,
                "body": "",
                "status": "coming-soon",
                "published_date": None,
            }
            for row in _SEED
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_insights_featured_sort", table_name="insights")
    op.drop_index("ix_insights_status_sort", table_name="insights")
    op.drop_index("ix_insights_slug", table_name="insights")
    op.drop_table("insights")
