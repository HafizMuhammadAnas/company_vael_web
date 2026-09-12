/**
 * VAELKODE /solutions/custom-software. Custom Software Development.
 * Approved production copy. No invented client names, outcomes, statistics,
 * testimonials, certifications, or unsupported capabilities.
 */

import { COMPANY } from "@/constants/company";
import { CTA, DISCLAIMERS, FINAL_PAIR_TELL_US, consultationCta, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkSection } from "@/content/shared";


export const CS_SEO: SeoMeta = {
  title: "Custom Software Development Services | VAELKODE",
  description:
    "VAELKODE builds custom software, enterprise applications, business platforms, SaaS products, APIs, integrations, and digital systems tailored to your organization's needs.",
};

export const CS_HERO: PageHero = {
  label: "Custom Software Development",
  title: "Software built around how your business actually works.",
  supporting:
    "When off-the-shelf tools force workarounds, we design and build applications, portals, and platforms that fit your processes instead of the other way around.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss Your Software Project"),
  tags: [
    "Business apps",
    "Portals",
    "Internal tools",
    "Integrations",
    "SaaS products",
    "Modernization",
  ],
};

export const CS_SUB_SERVICES = {
  label: "Software services",
  heading: "What we can build for your business.",
  supporting: "Tell us the problem. We’ll recommend the smallest useful build, with stacks that fit.",
  items: [
    {
      title: "Custom web applications",
      text: "Business apps and SaaS-style products shaped around your users, data, and day-to-day workflows rather than a generic template.",
      highlights: ["Screens tailored to real tasks", "APIs and data model that fit", "Room to grow features later"],
      stacks: ["React", "TypeScript", "APIs", "PostgreSQL"],
    },
    {
      title: "Client & employee portals",
      text: "Secure places where customers or staff can log in, view information, and complete tasks without email ping-pong.",
      highlights: ["Sign-in and role-based access", "Self-service views and actions", "Notifications when work moves"],
      stacks: ["Auth", "Role-based access", "React", "APIs"],
    },
    {
      title: "Internal tools & admin systems",
      text: "Replace spreadsheet chaos with tools your team can run day to day. Search, filters, and clear ownership.",
      highlights: ["Admin tables and dashboards", "Permissions for the right people", "Fewer manual copy-paste steps"],
      stacks: ["Dashboards", "Workflows", "PostgreSQL"],
    },
    {
      title: "Workflow & operations platforms",
      text: "Systems that move work through approvals, statuses, and handoffs so everyone sees where things stand.",
      highlights: ["Status flows and handoffs", "Approval checkpoints", "Alerts when action is needed"],
      stacks: ["Approvals", "Status flows", "Notifications"],
    },
    {
      title: "API & system integrations",
      text: "Connect CRM, payments, ERPs, and other tools so data flows where it should, without brittle one-off scripts.",
      highlights: ["REST APIs and webhooks", "Sync between key systems", "Clear error handling"],
      stacks: ["REST APIs", "Webhooks", "CRM sync"],
    },
    {
      title: "Legacy modernization",
      text: "Improve or replace aging systems step by step. Keep what still works while you move risk out of the critical path.",
      highlights: ["Incremental migration plan", "APIs around old systems", "No risky big-bang rewrite"],
      stacks: ["Migration", "APIs", "Incremental rewrite"],
    },
    {
      title: "MVP product engineering",
      text: "Launch a first useful version fast, then grow features with real user feedback instead of building everything upfront.",
      highlights: ["Tight MVP scope", "Ship to real users early", "Iterate from feedback"],
      stacks: ["MVP scope", "React", "Cloud deploy"],
    },
  ],
};

export const CS_WHY = {
  label: "The Right Fit",
  heading: "Buy what fits, build what doesn't.",
  paragraphs: [
    "Off-the-shelf software can work well for common needs, but organizations often reach a point where existing tools no longer fit their processes, data, integrations, or growth plans.",
    "Custom software makes sense when adapting your operations to rigid packages costs more than building around how you actually work.",
  ],
  cards: [
    {
      title: "Fit Your Workflow",
      text: "Build processes around your organization's real requirements instead of bending operations to fit rigid software.",
    },
    {
      title: "Connect Your Systems",
      text: "Bring applications, data, users, and workflows together through integrations and purpose-built platforms.",
    },
    {
      title: "Build for Growth",
      text: "Create a technical foundation that can evolve as your organization, users, and requirements grow.",
    },
  ],
};

export const CS_BUILD = {
  label: "Software Solutions",
  heading: "From business applications to full digital platforms.",
  supporting:
    "We develop software across different levels of complexity, from focused internal tools to large, connected platforms supporting multiple users, departments, and workflows.",
  cards: [
    {
      title: "Enterprise Applications",
      description:
        "Purpose-built applications that support complex organizational processes, departments, users, and operational needs.",
      items: ["Role-Based Access", "Workflow Management", "Reporting", "Dashboards", "Data Management", "Integrations"],
    },
    {
      title: "Business Management Systems",
      description:
        "Centralize business operations in software shaped around your organization's workflows and information.",
      items: [
        "HR Management",
        "Operations Management",
        "Resource Management",
        "Document Management",
        "Workflow Systems",
        "Administrative Platforms",
      ],
    },
    {
      title: "SaaS Platforms",
      description:
        "Scalable software products that serve multiple organizations, teams, or user groups through a modern SaaS architecture.",
      items: [
        "Multi-Tenant Architecture",
        "User Management",
        "Subscription Infrastructure",
        "APIs",
        "Dashboards",
        "Cloud Deployment",
      ],
    },
    {
      title: "Internal Platforms",
      description:
        "Give teams purpose-built tools that improve how they work, manage information, and collaborate.",
      items: [
        "Employee Portals",
        "Administrative Portals",
        "Reporting Systems",
        "Approval Workflows",
        "Internal Dashboards",
        "Knowledge Systems",
      ],
    },
    {
      title: "Customer Portals",
      description:
        "Secure digital experiences where customers can access services, information, transactions, and support.",
      items: [
        "Customer Accounts",
        "Service Portals",
        "Application Tracking",
        "Document Submission",
        "Notifications",
        "Self-Service Workflows",
      ],
    },
    {
      title: "API & System Integration",
      description:
        "Connect applications and services so information can move reliably across your digital environment.",
      items: [
        "REST APIs",
        "Third-Party Integrations",
        "Data Synchronization",
        "Authentication",
        "Webhooks",
        "Enterprise Integrations",
      ],
    },
  ],
};

export const CS_PROBLEMS = {
  label: "Business Challenges",
  heading: "When existing systems no longer fit.",
  supporting:
    "Custom software becomes valuable when technology limits start getting in the way of how your organization operates.",
  cards: [
    {
      title: "Disconnected Systems",
      text: "Different applications hold different pieces of information, which leads to duplication and inefficient workflows.",
      solution: "System Integration",
    },
    {
      title: "Manual Processes",
      text: "Teams spend time on repetitive tasks that structured digital workflows could handle.",
      solution: "Workflow Automation",
    },
    {
      title: "Legacy Applications",
      text: "Existing software may be hard to maintain, integrate, scale, or adapt as requirements change.",
      solution: "Application Modernization",
    },
    {
      title: "Limited Visibility",
      text: "Decision-makers may lack centralized dashboards, reporting, or reliable access to operational information.",
      solution: "Business Intelligence & Reporting",
    },
    {
      title: "Growing Complexity",
      text: "As an organization grows, informal processes and disconnected tools get harder to manage.",
      solution: "Centralized Business Platform",
    },
    {
      title: "Unique Requirements",
      text: "Your business may have processes that standard commercial software simply can't support well.",
      solution: "Purpose-Built Software",
    },
  ],
};

export const CS_CAPABILITIES = {
  label: "Engineering Capabilities",
  heading: "Everything needed to build modern software.",
  supporting:
    "Our engineering covers the product lifecycle from architecture and user experience through development, integration, deployment, and ongoing improvement.",
  cards: [
    {
      title: "Product Architecture",
      text: "Define scalable technical foundations that support current needs and future growth.",
    },
    {
      title: "UX & Interface Development",
      text: "Design intuitive interfaces around the people who use the system.",
    },
    {
      title: "Backend Engineering",
      text: "Build reliable application logic, APIs, services, workflows, and integrations.",
    },
    {
      title: "Frontend Engineering",
      text: "Develop responsive, accessible interfaces for modern web applications.",
    },
    {
      title: "Database Engineering",
      text: "Structure and manage application data with performance, reliability, and security in mind.",
    },
    {
      title: "API Development",
      text: "Create interfaces that let applications and services communicate reliably.",
    },
    {
      title: "Authentication & Authorization",
      text: "Implement secure identity, access control, permissions, and role-based experiences.",
    },
    {
      title: "Reporting & Analytics",
      text: "Turn operational data into dashboards, reports, and useful business information.",
    },
  ],
};

export const CS_MODERNIZE = {
  label: "Modernize & Connect",
  heading: "You don't always need to start from scratch.",
  paragraphs: [
    "Existing systems often hold valuable business logic, historical data, and workflows. Replacing everything may not be the right answer.",
    "VAELKODE can help you assess, modernize, extend, and integrate existing applications when that approach makes better business and technical sense.",
  ],
  cards: [
    {
      title: "Modernization",
      text: "Improve outdated applications while preserving valuable functionality and business knowledge.",
    },
    {
      title: "Integration",
      text: "Connect existing platforms, APIs, databases, and services into a more connected digital environment.",
    },
    {
      title: "Migration",
      text: "Move applications and data to modern infrastructure or architectures when the existing environment limits growth.",
    },
    {
      title: "Extension",
      text: "Add new capabilities to existing systems without rebuilding the entire platform.",
    },
  ],
  cta: consultationCta("Discuss Your Existing System"),
};

export const CS_PRINCIPLES = {
  label: "How We Engineer",
  heading: "Built to be used, maintained, and evolved.",
  supporting:
    "Good software isn't only about getting the first version into production. It needs to stay understandable, secure, maintainable, and adaptable as the organization changes.",
  cards: [
    {
      num: "01",
      title: "Clear Architecture",
      text: "Structure applications so their responsibilities and dependencies stay clear as the system grows.",
    },
    {
      num: "02",
      title: "Reusable Engineering",
      text: "Use reusable components and patterns where they improve consistency and maintainability.",
    },
    {
      num: "03",
      title: "Security",
      text: "Consider authentication, authorization, data protection, application security, and infrastructure security throughout development.",
    },
    {
      num: "04",
      title: "Performance",
      text: "Build with performance in mind for users, data, integrations, and expected workloads.",
    },
    {
      num: "05",
      title: "Testing",
      text: "Validate important functionality with testing practices that fit the development lifecycle.",
    },
    {
      num: "06",
      title: "Documentation",
      text: "Keep the technical and operational documentation needed to support the product over time.",
    },
  ],
};

export const CS_TECH = {
  label: "Technology Stack",
  heading: "Modern engineering technologies.",
  supporting:
    "We select technologies based on the product's requirements, architecture, performance needs, team capabilities, and long-term maintainability.",
  categories: [
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { title: "Backend", items: ["Python", "FastAPI", "Django", "Laravel", "Node.js"] },
    { title: "Databases", items: ["PostgreSQL", "MySQL", "Redis"] },
    {
      title: "APIs & Integration",
      items: ["REST APIs", "Authentication", "Third-Party APIs", "Webhooks", "System Integration"],
    },
    { title: "Infrastructure", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"] },
    {
      title: "AI Integration",
      items: ["Machine Learning", "Generative AI", "LLMs", "AI APIs", "Intelligent Automation"],
    },
  ],
};

export const CS_PROCESS = {
  label: "How we work",
  headingBefore: "From idea to live software: ",
  headingAccent: "our process",
  supporting: "You'll always know where we are and what needs a decision.",
  steps: [
    {
      num: "01",
      title: "Discover",
      text: "Understand your business, users, workflows, and constraints.",
      milestone: "Shared brief",
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Plan",
      text: "Agree requirements, architecture, and a clear first release.",
      milestone: "First release agreed",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Build",
      text: "Design and develop in short cycles you can review.",
      milestone: "Demo reviews",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Launch & improve",
      text: "Ship carefully, then keep improving as priorities change.",
      milestone: "Go live",
      tone: "teal" as const,
    },
  ],
};

export const CS_PROJECTS = {
  label: "Selected projects",
  heading: "Platforms we're proud to show.",
  supporting:
    "Live work from our public digital portfolio and platforms. Hover a preview, then open the site.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
};

export const CS_WORK: WorkSection = {
  label: "Selected Work",
  heading: "Software built to solve real problems.",
  supporting:
    "Selected software solutions and digital platforms that show how we approach complex business and operational challenges.",
  note: DISCLAIMERS.technologyDemonstrations,
  cta: CTA.viewAllWork,
};

export const CS_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "When should we consider custom software?",
      a: "When off-the-shelf tools can’t support your workflows, integrations, or growth plans without costly workarounds.",
    },
    {
      q: "Can you build from an idea?",
      a: "Yes. We help turn a business problem or idea into requirements, architecture, and a clear first release.",
    },
    {
      q: "Can you improve our existing application?",
      a: "Yes. We can modernize, integrate, extend, or migrate existing systems based on their condition and your goals.",
    },
    {
      q: "Can you connect our existing systems?",
      a: "Yes. We design integrations between apps, APIs, databases, and third-party services where access is available.",
    },
    {
      q: "How do you choose the technology?",
      a: "From the product’s requirements: architecture, security, maintainability, and long-term fit, rather than a fixed stack preference.",
    },
    {
      q: "Do you support the software after launch?",
      a: "Yes. Maintenance, updates, new features, and operational support can continue based on what the project needs.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const CS_FINAL: FinalCta = {
  label: "Next step",
  heading: "Have a software challenge worth solving?",
  supporting: `Tell us about the platform you need, the app you want to modernize, or the idea you're ready to build. Email ${COMPANY.contact.email} or book a consultation and we’ll help you find the right approach.`,
  ...FINAL_PAIR_TELL_US,
};
