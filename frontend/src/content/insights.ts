/**
 * VAELKODE /insights. Single consolidated page with anchored #blog and
 * #resources sections.
 *
 * HONESTY RULES:
 *  - Do NOT publish fake articles or fake downloadable resources to fill space.
 *  - Blog articles and downloadable resources render as published only when real,
 *    approved items exist (`status: "published"`). Index previews may show
 *    planned topics with abstract covers and an explicit "Coming soon" state.
 */

import { CTA, FINAL_PAIR_CONTACT } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";

export const INSIGHTS_SEO: SeoMeta = {
  title: "Insights | VAELKODE",
  description:
    "Practical perspectives on artificial intelligence, software engineering, automation, cloud technologies, and digital transformation from VAELKODE.",
};

export const INS_HERO: PageHero = {
  label: "Insights",
  title: "Ideas, Knowledge & Perspectives on Technology",
  supporting:
    "Explore practical perspectives on artificial intelligence, software engineering, automation, cloud technologies, and digital transformation.",
  intro:
    "Insights is where we share useful notes on technology, engineering, and AI for teams making digital decisions.",
  primaryCta: CTA.discussTechChallenge,
};

/** In-page section anchors (optional deep links). Nav goes straight to /insights. */
export const INS_NAV = [
  { label: "All", to: "/insights" },
  { label: "Blog", to: "/insights#blog" },
  { label: "Resources", to: "/insights#resources" },
];

export interface Article {
  category: string;
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  slug: string;
}

/** Blog index card. Preview until a real published article exists. */
export interface BlogPreview {
  category: string;
  tags: string[];
  title: string;
  description?: string;
  readTime: string;
  /** CSS abstract cover key (no stock photos required). */
  cover: "mesh" | "orbits" | "circuits" | "waves" | "nodes" | "book";
  status: "coming-soon" | "published";
  publishedDate?: string;
  slug?: string;
  featured?: boolean;
}

export const INS_FEATURED = {
  label: "Featured",
  heading: "Featured Insights",
  description:
    "Practical perspectives from the intersection of AI, software engineering, automation, and modern digital technology.",
  /** Populate only with approved articles. Empty = honest "in preparation" state. */
  articles: [] as Article[],
  emptyState: [
    "Our first insights are currently being prepared.",
    "We're developing practical technical content covering AI, software engineering, automation, cloud technologies, and digital transformation.",
  ],
};

export const INS_BLOG = {
  id: "blog",
  label: "Blog",
  heading: "VAELKODE Insights: ideas from the engineering floor",
  description:
    "Practical articles exploring technology, engineering, artificial intelligence, and the changing digital landscape. The topics below are in preparation and aren't published posts yet.",
  categories: [
    "Artificial Intelligence",
    "Agentic AI",
    "Software Engineering",
    "Web & Digital Platforms",
    "Mobile Development",
    "Cloud & DevOps",
    "Automation",
    "Technology Strategy",
  ],
  /** Populate only with approved, written articles. */
  articles: [] as Article[],
  relatedHeading: "Some insights for you",
  banner: {
    text: "Planning a software or AI project? Start with a clear conversation.",
    cta: { label: "Book a consultation", to: "/consultation" },
  },
  /**
   * Index previews for layout. Clearly marked coming soon.
   * Replace with published Article entries (status: "published") when ready.
   */
  previews: [
    {
      category: "Artificial Intelligence",
      tags: ["Artificial Intelligence", "Automation"],
      title: "How AI Can Transform Document-Heavy Business Processes",
      description: "Where document work creates friction, and how AI can help without replacing judgment.",
      readTime: "8 min",
      cover: "mesh" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Agentic AI",
      tags: ["Agentic AI", "Software Engineering"],
      title: "Understanding Agentic AI and Its Role in Enterprise Workflows",
      description: "What “agents” actually mean in business systems, and when they're the wrong tool.",
      readTime: "9 min",
      cover: "orbits" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Cloud & DevOps",
      tags: ["Cloud & DevOps", "Technology Strategy"],
      title: "Why Deployment Architecture Matters for Modern Applications",
      description: "Calmer releases start with environments, pipelines, and ownership, not with more tools.",
      readTime: "7 min",
      cover: "circuits" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Software Engineering",
      tags: ["Software Engineering", "Technology Strategy"],
      title: "When Should a Business Build Custom Software?",
      description: "A practical frame for choosing build vs buy before you commit budget and people.",
      readTime: "10 min",
      cover: "nodes" as const,
      status: "coming-soon" as const,
      featured: true,
    },
    {
      category: "Technology Strategy",
      tags: ["Technology Strategy", "Software Engineering"],
      title: "Build vs Buy: Choosing the Right Technology for Your Business",
      description: "Trade-offs that matter: fit, speed, ownership, and long-term change.",
      readTime: "8 min",
      cover: "waves" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Artificial Intelligence",
      tags: ["Artificial Intelligence", "Software Engineering"],
      title: "How to Introduce AI Into an Existing Software System",
      description: "Start with the workflow and data you already have, then decide what belongs in production.",
      readTime: "11 min",
      cover: "book" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Web & Digital Platforms",
      tags: ["Web & Digital Platforms"],
      title: "What Makes a Business Website Worth Maintaining",
      description: "Clarity, performance, and a content model your team can actually run.",
      readTime: "6 min",
      cover: "mesh" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Automation",
      tags: ["Automation", "Artificial Intelligence"],
      title: "From Manual Handoffs to Reliable Workflow Automation",
      description: "Pick the bottlenecks that waste the most time, then automate the boring path.",
      readTime: "7 min",
      cover: "orbits" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Mobile Development",
      tags: ["Mobile Development", "Software Engineering"],
      title: "Native, Cross-Platform, or Progressive Web: Choosing for Your Product",
      description: "A clear look at platform choices without getting lost in framework debates.",
      readTime: "9 min",
      cover: "circuits" as const,
      status: "coming-soon" as const,
    },
    {
      category: "Cloud & DevOps",
      tags: ["Cloud & DevOps"],
      title: "Observability Basics for Growing Product Teams",
      description: "What to measure first so incidents are visible before customers tell you.",
      readTime: "8 min",
      cover: "nodes" as const,
      status: "coming-soon" as const,
    },
  ] satisfies BlogPreview[],
};

export const INS_RESOURCES = {
  id: "resources",
  label: "Resources",
  heading: "Technology Resources",
  description:
    "Practical resources to help you understand technology options, evaluate solutions, and make clearer digital decisions.",
  distinction: {
    blog: { title: "Blog", text: "Knowledge and opinions." },
    resources: { title: "Resources", text: "Practical tools and decision-making material." },
  },
  categories: [
    {
      title: "Technology Guides",
      text: "Practical guides for understanding software, AI, cloud, automation, and digital technologies.",
    },
    {
      title: "Business & Technology Checklists",
      text: "Structured checklists to help organizations evaluate technology projects and prepare for development.",
    },
    {
      title: "Project Planning",
      text: "Resources for defining requirements, planning software projects, and preparing for technical discussions.",
    },
    {
      title: "AI Readiness",
      text: "Practical resources for organizations evaluating where AI can create value within their existing processes and systems.",
    },
    {
      title: "Technology Decision Guides",
      text: "Frameworks and guidance for evaluating technologies, architectures, and implementation approaches.",
    },
  ],
  /** Planned resources. Shown as "Coming Soon" until the material is created. */
  items: [
    {
      order: "01",
      title: "Software Project Planning Checklist",
      description: "A practical checklist for organizations preparing to start a software development project.",
    },
    {
      order: "02",
      title: "AI Readiness Checklist",
      description: "A practical framework for identifying business processes where AI and automation may provide value.",
    },
    {
      order: "03",
      title: "Custom Software Requirements Checklist",
      description: "Key questions organizations should answer before starting development of a custom software solution.",
    },
    {
      order: "04",
      title: "Build vs Buy Technology Guide",
      description:
        "A practical framework for evaluating whether a business should build a custom solution or adopt an existing platform.",
    },
  ],
};

export const INS_TOPICS = {
  heading: "Explore Technology Topics",
  topics: [
    "AI & Machine Learning",
    "Agentic AI & LLMs",
    "Software Engineering",
    "Automation",
    "Cloud & DevOps",
    "Computer Vision",
    "Data & Analytics",
    "Digital Transformation",
    "Technology Strategy",
  ],
};

export const INS_WHY = {
  label: "Why We Share",
  heading: "Technology Should Be Understandable",
  paragraphs: [
    "Technology decisions can be difficult when organizations are faced with rapidly changing tools, platforms, and approaches.",
    "VAELKODE shares practical knowledge to help businesses understand their options, ask better questions, and make informed technology decisions.",
    "Our goal is not to promote technology for its own sake, but to explore where technology can solve meaningful problems.",
  ],
};

export const INS_CONNECT = {
  label: "Stay Connected",
  heading: "Stay Connected With VAELKODE",
  text: "Follow our latest technology perspectives and company updates.",
  /** Fallback shown when no real social profiles are configured yet. */
  fallback: { text: "Social channels are coming soon. In the meantime, you can reach us directly.", cta: CTA.contact },
};

export const INS_FINAL: FinalCta = {
  label: "Let's Build",
  heading: "Have a Technology Challenge?",
  supporting:
    "If you're exploring a new digital product, improving an existing system, or looking for ways to use AI and automation, let's discuss your requirements.",
  ...FINAL_PAIR_CONTACT,
};
