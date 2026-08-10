/**
 * VAELKODE /insights — single consolidated page with anchored #blog and
 * #resources sections.
 *
 * HONESTY RULES:
 *  - Do NOT publish fake articles or fake downloadable resources to fill space.
 *  - Blog articles and downloadable resources render only when real, approved
 *    items exist. Until then, honest "in preparation" / "coming soon" states
 *    are shown. Example topics are clearly framed as ideas, not publications.
 */

export const INSIGHTS_SEO = {
  title: "Insights | VAELKODE",
  description:
    "Practical perspectives on artificial intelligence, software engineering, automation, cloud technologies, and digital transformation from VAELKODE.",
};

export const INS_HERO = {
  label: "Insights",
  title: "Ideas, Knowledge & Perspectives on Technology",
  supporting:
    "Explore practical perspectives on artificial intelligence, software engineering, automation, cloud technologies, and digital transformation.",
  intro:
    "Our Insights section is built to share useful knowledge, technical thinking, and practical guidance for organizations navigating technology.",
  primaryCta: { label: "Discuss Your Technology Challenge", to: "/consultation" },
};

/** In-page navigation. "All" returns to the top; the others scroll to anchors. */
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
  heading: "Technology Blog",
  description:
    "Practical articles exploring technology, engineering, artificial intelligence, and the changing digital landscape.",
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
  /** Content directions — clearly framed as ideas, NOT published articles. */
  inPreparationLabel: "Topics in preparation",
  inPreparation: [
    { category: "AI & Intelligent Automation", title: "How AI Can Transform Document-Heavy Business Processes" },
    { category: "Agentic AI", title: "Understanding Agentic AI and Its Role in Enterprise Workflows" },
    { category: "Software Engineering", title: "When Should a Business Build Custom Software?" },
    { category: "Technology Strategy", title: "Build vs Buy: Choosing the Right Technology for Your Business" },
    { category: "Cloud & DevOps", title: "Why Deployment Architecture Matters for Modern Applications" },
    { category: "AI Integration", title: "How to Introduce AI Into an Existing Software System" },
  ],
};

export const INS_RESOURCES = {
  id: "resources",
  label: "Resources",
  heading: "Technology Resources",
  description:
    "Practical resources designed to help organizations understand technology options, evaluate solutions, and make better digital decisions.",
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
  /** Planned resources — shown as "Coming Soon" until the material is created. */
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
  fallback: { text: "Social channels are coming soon. In the meantime, reach us directly.", cta: { label: "Contact VAELKODE", to: "/contact" } },
};

export const INS_FINAL = {
  label: "Let's Build",
  heading: "Have a Technology Challenge?",
  supporting:
    "If you're exploring a new digital product, improving an existing system, or looking for ways to use AI and automation, let's discuss your requirements.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Contact VAELKODE", to: "/contact" },
};
