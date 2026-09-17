"""create faq categories + items tables and seed approved FAQs

Revision ID: 20260917_0007
Revises: 20260917_0006
Create Date: 2026-09-17

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260917_0007"
down_revision: Union[str, None] = "20260917_0006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# (slug, label, section_label, heading, sort_order)
_SEED_CATEGORIES = [
    ("general", "General", "General", "General Questions", 10),
    ("ai-automation", "AI & Automation", "AI & Automation", "AI & Intelligent Automation", 20),
    ("custom-software", "Custom Software", "Custom Software", "Custom Software Development", 30),
    ("web-development", "Web Development", "Web Development", "Web & Digital Platforms", 40),
    ("mobile-development", "Mobile Development", "Mobile Development", "Mobile Applications", 50),
    ("cloud-devops", "Cloud & DevOps", "Cloud & DevOps", "Cloud & DevOps Engineering", 60),
    ("technology-consulting", "Technology Consulting", "Technology Consulting", "Technology Consulting", 70),
]

# (category_slug, question, answer, sort_order)
_SEED_ITEMS = [
    (
        "general",
        "What types of projects does VAELKODE work on?",
        "We work on AI solutions, custom software, web and mobile applications, cloud infrastructure, automation, and technology transformation initiatives. The appropriate approach depends on the organization's goals, requirements, and technical environment.",
        10,
    ),
    (
        "general",
        "Can VAELKODE work with an existing software system?",
        "Yes. Existing applications can be assessed, integrated, modernized, extended, or migrated depending on their architecture and business requirements.",
        20,
    ),
    (
        "general",
        "Do I need to know exactly what technology I need?",
        "No. You can start with the business problem or objective. We can help evaluate the requirements and recommend an appropriate technical approach.",
        30,
    ),
    (
        "general",
        "Does VAELKODE only build new software?",
        "No. We can also help organizations improve existing systems through modernization, integration, automation, optimization, and cloud transformation.",
        40,
    ),
    (
        "general",
        "Can AI be integrated into an existing application?",
        "In many cases, yes. AI capabilities can be integrated into existing workflows and applications when there is a clear business use case and appropriate data or system access.",
        50,
    ),
    (
        "general",
        "How do we start a project with VAELKODE?",
        "The process begins with a conversation about your objectives and challenges. From there, we can assess the requirements and determine the appropriate next steps.",
        60,
    ),
    (
        "ai-automation",
        "Does my business need AI?",
        "Not necessarily. We start with the business problem. If AI can create real value, we'll say so; if it can't, we'll say that too.",
        10,
    ),
    (
        "ai-automation",
        "Can you add AI to our existing software?",
        "Yes. AI can often plug into existing apps, workflows, APIs, and data systems without replacing the whole platform.",
        20,
    ),
    (
        "ai-automation",
        "Can you build a private AI solution?",
        "Yes, where the project requires it. Architecture depends on your data access, security, privacy, and infrastructure needs.",
        30,
    ),
    (
        "ai-automation",
        "What data do we need?",
        "It depends. Document and knowledge use-cases may work with what you already have; predictive models often need historical structured data.",
        40,
    ),
    (
        "ai-automation",
        "How long does an AI project take?",
        "It depends on the problem, data, integrations, and production scope. We start with discovery before locking a delivery timeline.",
        50,
    ),
    (
        "ai-automation",
        "Can you start with a proof of concept?",
        "Yes. A focused PoC is often the right way to test feasibility and value before a full production build.",
        60,
    ),
    (
        "custom-software",
        "When should we consider custom software?",
        "When off-the-shelf tools can't support your workflows, integrations, or growth plans without costly workarounds.",
        10,
    ),
    (
        "custom-software",
        "Can you build from an idea?",
        "Yes. We help turn a business problem or idea into requirements, architecture, and a clear first release.",
        20,
    ),
    (
        "custom-software",
        "Can you improve our existing application?",
        "Yes. We can modernize, integrate, extend, or migrate existing systems based on their condition and your goals.",
        30,
    ),
    (
        "custom-software",
        "Can you connect our existing systems?",
        "Yes. We design integrations between apps, APIs, databases, and third-party services where access is available.",
        40,
    ),
    (
        "custom-software",
        "How do you choose the technology?",
        "From the product's requirements: architecture, security, maintainability, and long-term fit, rather than a fixed stack preference.",
        50,
    ),
    (
        "custom-software",
        "Do you support the software after launch?",
        "Yes. Maintenance, updates, new features, and operational support can continue based on what the project needs.",
        60,
    ),
    (
        "web-development",
        "Do you build websites and web apps?",
        "Yes. From business and marketing sites to portals, stores, and fuller web applications.",
        10,
    ),
    (
        "web-development",
        "Can you work from an existing design?",
        "Yes. Brand guidelines, Figma files, or wireframes can be the foundation for development.",
        20,
    ),
    (
        "web-development",
        "Do you design and develop?",
        "Yes. Engagements can include UX/UI, frontend, backend, integrations, and launch.",
        30,
    ),
    (
        "web-development",
        "Can you redesign an existing site?",
        "Yes. We assess structure, content, performance, and experience, then rebuild what needs to change.",
        40,
    ),
    (
        "web-development",
        "Will it be mobile responsive?",
        "Yes. Responsive behavior is part of design and development across supported devices.",
        50,
    ),
    (
        "web-development",
        "Can you maintain the site after launch?",
        "Yes. Updates, improvements, security, and ongoing development can continue after go-live.",
        60,
    ),
    (
        "mobile-development",
        "Can you build for both iOS and Android?",
        "Yes. We choose native or cross-platform based on your product's requirements and long-term plan.",
        10,
    ),
    (
        "mobile-development",
        "Can you build the backend too?",
        "Yes. Apps can ship with APIs, auth, databases, integrations, and supporting infrastructure where needed.",
        20,
    ),
    (
        "mobile-development",
        "Can you connect to our existing software?",
        "Yes, through APIs or other integration paths where the required access is available.",
        30,
    ),
    (
        "mobile-development",
        "Should we build native or cross-platform?",
        "It depends on platform needs, device features, performance, and maintenance. We'll help you choose honestly.",
        40,
    ),
    (
        "mobile-development",
        "Can you build an MVP first?",
        "Yes. A focused first version is often the right way to validate the product before expanding.",
        50,
    ),
    (
        "mobile-development",
        "Can you maintain the app after launch?",
        "Yes. Bug fixes, OS updates, improvements, and new features under an agreed support model.",
        60,
    ),
    (
        "cloud-devops",
        "What is DevOps?",
        "Practices that bring development and operations closer so software is easier to build, test, deploy, and run.",
        10,
    ),
    (
        "cloud-devops",
        "Can you deploy our existing application?",
        "Yes. We assess architecture and dependencies, then deploy to an environment that fits the app.",
        20,
    ),
    (
        "cloud-devops",
        "Can you migrate us to the cloud?",
        "Yes. Assessment, planning, infrastructure, migration, testing, and production cutover where needed.",
        30,
    ),
    (
        "cloud-devops",
        "Can you set up CI/CD for our team?",
        "Yes. Pipelines can automate build, testing, packaging, and deployment for your stack.",
        40,
    ),
    (
        "cloud-devops",
        "Do we need Kubernetes?",
        "Not always. We introduce it only when the architecture and operations actually benefit, not by default.",
        50,
    ),
    (
        "cloud-devops",
        "Can you work with our existing team?",
        "Yes. Cloud and DevOps work can sit alongside your developers when roles and environments are clear.",
        60,
    ),
    (
        "technology-consulting",
        "What does technology consulting cover?",
        "Helping you understand the problem, compare approaches, make technical decisions, and leave with a practical plan.",
        10,
    ),
    (
        "technology-consulting",
        "Do we need to know the technology already?",
        "No. Start with the business problem or idea. We'll help figure out what guidance is useful.",
        20,
    ),
    (
        "technology-consulting",
        "Can you assess our existing software?",
        "Yes. Architecture, maintainability, integrations, data, infrastructure, and technical risk.",
        30,
    ),
    (
        "technology-consulting",
        "Can you help with build vs buy?",
        "Yes. We weigh requirements, available products, customization, integration, ownership, and long-term cost.",
        40,
    ),
    (
        "technology-consulting",
        "Can consulting lead into development?",
        "Yes. Where it fits, advice can continue into architecture, software, AI, web, mobile, or cloud delivery.",
        50,
    ),
    (
        "technology-consulting",
        "Can you work with our existing team?",
        "Yes. Engagements can complement your IT or development team based on roles and needs.",
        60,
    ),
]


def upgrade() -> None:
    op.create_table(
        "faq_categories",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=80), nullable=False),
        sa.Column("label", sa.String(length=120), nullable=False),
        sa.Column("section_label", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("heading", sa.String(length=255), nullable=False),
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
    op.create_index("ix_faq_categories_slug", "faq_categories", ["slug"])
    op.create_index("ix_faq_categories_active_sort", "faq_categories", ["is_active", "sort_order"])

    op.create_table(
        "faq_items",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("category_id", sa.BigInteger(), nullable=False),
        sa.Column("question", sa.String(length=500), nullable=False),
        sa.Column("answer", sa.Text(), nullable=False),
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
        sa.ForeignKeyConstraint(["category_id"], ["faq_categories.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_faq_items_category_id", "faq_items", ["category_id"])
    op.create_index("ix_faq_items_active_sort", "faq_items", ["is_active", "sort_order"])

    categories = sa.table(
        "faq_categories",
        sa.column("id", sa.BigInteger),
        sa.column("slug", sa.String),
        sa.column("label", sa.String),
        sa.column("section_label", sa.String),
        sa.column("heading", sa.String),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    items = sa.table(
        "faq_items",
        sa.column("category_id", sa.BigInteger),
        sa.column("question", sa.String),
        sa.column("answer", sa.Text),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )

    op.bulk_insert(
        categories,
        [
            {
                "slug": slug,
                "label": label,
                "section_label": section_label,
                "heading": heading,
                "is_active": True,
                "sort_order": sort_order,
            }
            for slug, label, section_label, heading, sort_order in _SEED_CATEGORIES
        ],
    )

    conn = op.get_bind()
    slug_to_id = {
        row[0]: row[1]
        for row in conn.execute(sa.text("SELECT slug, id FROM faq_categories")).fetchall()
    }

    op.bulk_insert(
        items,
        [
            {
                "category_id": slug_to_id[slug],
                "question": question,
                "answer": answer,
                "is_active": True,
                "sort_order": sort_order,
            }
            for slug, question, answer, sort_order in _SEED_ITEMS
        ],
    )


def downgrade() -> None:
    op.drop_index("ix_faq_items_active_sort", table_name="faq_items")
    op.drop_index("ix_faq_items_category_id", table_name="faq_items")
    op.drop_table("faq_items")
    op.drop_index("ix_faq_categories_active_sort", table_name="faq_categories")
    op.drop_index("ix_faq_categories_slug", table_name="faq_categories")
    op.drop_table("faq_categories")
