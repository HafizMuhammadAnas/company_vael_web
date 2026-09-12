/**
 * VAELKODE homepage content. Plain-language, buyer-first.
 * No invented statistics, testimonials, client logos, or case-study results.
 */

import { CTA, DISCLAIMERS, FINAL_PAIR_TELL_US } from "@/content/shared";
import type { FinalCta, SeoMeta } from "@/content/shared";

export const HOME_SEO: SeoMeta = {
  title: "VAELKODE | Software, AI & Digital Solutions",
  description:
    "VAELKODE builds software, AI automation, web and mobile apps, and cloud systems that help organizations work faster and with less friction.",
};

export const HERO = {
  eyebrow: "Software · AI · Digital Products",
  titleBefore: "We build software",
  titleAccent: "that solves",
  titleRest: "real business problems.",
  description:
    "From websites and custom apps to AI automation and cloud systems. Scoped clearly, delivered honestly, measured by what works for your business.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: CTA.exploreSolutions,
  microcopy: "Tell us what you're trying to fix or build. We'll help you find the right next step.",
};

/**
 * Floating hero proof cards (right column).
 * Replace values/labels with approved figures when you have them , 
 * avoid inventing client ROI, uptime, or review counts here.
 */
export const HERO_STATS = [
  {
    id: "services",
    value: "6+",
    label: "Service lines",
    accent: "violet" as const,
  },
  {
    id: "delivery",
    value: "4",
    label: "Delivery steps",
    accent: "neon" as const,
  },
  {
    id: "focus",
    value: "AI",
    label: "First engineering",
    accent: "pink" as const,
  },
];


/** Kept for any residual imports; homepage no longer renders this section. */
export const CAPABILITIES = {
  label: "What We Do",
  heading: "Four ways we help.",
  supporting: "Straight answers about what we build and why it helps.",
  items: [
    {
      short: "AI",
      title: "AI & Automation",
      text: "Reduce manual work with intelligent systems that understand documents, data, and workflows.",
      tags: ["Automation", "Documents", "Assistants"],
    },
    {
      short: "Software",
      title: "Custom Software",
      text: "Build applications around how your business actually works.",
      tags: ["Apps", "Integrations", "Platforms"],
    },
    {
      short: "Cloud",
      title: "Cloud & DevOps",
      text: "Deploy and run software reliably with clear environments and release processes.",
      tags: ["Hosting", "Releases", "Monitoring"],
    },
    {
      short: "Advice",
      title: "Technology Consulting",
      text: "Get clarity before you build or buy. Architecture, roadmap, and options.",
      tags: ["Strategy", "Roadmaps"],
    },
  ],
};

export const PROBLEMS = {
  label: "Sound Familiar?",
  heading: "These are the problems we help fix.",
  supporting: [
    "If any of these feel like your week, you're in the right place. Pick one and we'll show you how we usually approach it.",
  ],
  cards: [
    {
      num: "01",
      title: "Too much manual work",
      text: "Your team repeats the same tasks in spreadsheets, email, and documents. And mistakes creep in.",
      shift: "We automate the busywork so people can focus on judgement.",
      cta: "See AI & Automation",
      to: "/solutions/ai-automation",
    },
    {
      num: "02",
      title: "Systems that don't talk",
      text: "Customer, finance, and operations tools each hold part of the truth. Nobody has the full picture.",
      shift: "We connect systems so information flows where it should.",
      cta: "See Custom Software",
      to: "/solutions/custom-software",
    },
    {
      num: "03",
      title: "Software that no longer fits",
      text: "Off-the-shelf tools force workarounds. Old apps are hard to change and costly to keep alive.",
      shift: "We modernize or replace what blocks you, one sensible step at a time.",
      cta: "See Consulting",
      to: "/solutions/technology-consulting",
    },
    {
      num: "04",
      title: "Hard to see what's going on",
      text: "Decisions wait on reports someone builds by hand. Leaders don't trust the numbers.",
      shift: "We put clear data and dashboards where people already work.",
      cta: "See AI & Analytics",
      to: "/solutions/ai-automation",
    },
    {
      num: "05",
      title: "Ready to grow, but the tech isn't",
      text: "A new product, channel, or team needs a foundation that won't break as you scale.",
      shift: "We build platforms that can grow with the business.",
      cta: "See Cloud & DevOps",
      to: "/solutions/cloud-devops",
    },
  ],
};

export const SOLUTIONS = {
  label: "What We Build",
  heading: "Clear services with plain outcomes.",
  supporting: "Choose what matches your need. Every page explains the problem we solve, what we deliver, and how we work.",
  cards: [
    {
      short: "Web",
      title: "Web Development",
      text: "Websites, portals, and web apps that look professional and work reliably.",
      tags: ["Sites", "Stores", "Portals"],
      cta: "Explore Web",
      to: "/solutions/web-development",
      x: 83,
      y: 22,
    },
    {
      short: "Software",
      title: "Custom Software",
      text: "Applications and platforms shaped around your processes, instead of forcing you into someone else's template.",
      tags: ["Business apps", "Integrations"],
      cta: "Explore Software",
      to: "/solutions/custom-software",
      x: 17,
      y: 24,
    },
    {
      short: "AI",
      title: "AI & Intelligent Automation",
      text: "Cut repetitive work. Process documents. Add assistants and smart workflows where they earn their place.",
      tags: ["Automation", "Documents", "Assistants"],
      cta: "Explore AI",
      to: "/solutions/ai-automation",
      x: 50,
      y: 50,
    },
    {
      short: "Mobile",
      title: "Mobile Apps",
      text: "iOS and Android apps for customers and field teams. Connected to the systems behind them.",
      tags: ["Customer apps", "Field tools"],
      cta: "Explore Mobile",
      to: "/solutions/mobile-development",
      x: 20,
      y: 78,
    },
    {
      short: "Cloud",
      title: "Cloud & DevOps",
      text: "Hosting, deployments, and monitoring so releases are calm and environments stay consistent.",
      tags: ["Hosting", "CI/CD", "Monitoring"],
      cta: "Explore Cloud",
      to: "/solutions/cloud-devops",
      x: 80,
      y: 76,
    },
    {
      short: "Advice",
      title: "Technology Consulting",
      text: "Clarity before you spend: assess options, design architecture, and plan what to build or buy.",
      tags: ["Strategy", "Roadmaps"],
      cta: "Explore Consulting",
      to: "/solutions/technology-consulting",
      x: 50,
      y: 94,
    },
  ],
};

export const WHY = {
  label: "Why VAELKODE",
  heading: "A partner who starts with your problem, not a tech pitch.",
  supporting: "We keep the conversation practical so you always know what we're building and why.",
  items: [
    {
      num: "01",
      title: "Business first",
      text: "We learn your goals, users, and constraints before we recommend technology.",
    },
    {
      num: "02",
      title: "Practical AI",
      text: "We use AI where it saves time or improves decisions. And say when it won't help.",
    },
    {
      num: "03",
      title: "Built to last",
      text: "Clean structure, security, and room to grow so the next change isn't a rewrite.",
    },
    {
      num: "04",
      title: "Clear communication",
      text: "Plain updates and visible progress. You stay in control of the decisions.",
    },
  ],
};

export const FEATURED_WORK = {
  label: "Selected Work",
  heading: "Examples of what this kind of engineering looks like.",
  supporting:
    "These are selected technology demonstrations that show how we approach the work. They are not invented client results.",
  note: DISCLAIMERS.technologyDemonstrations,
  cards: [
    {
      category: "AI & Automation",
      title: "Intelligent Document Processing",
      description:
        "Extract, classify, and structure information from business documents so teams spend less time on manual data entry.",
      capabilities: ["Document classification", "Data extraction", "Workflow automation"],
      technology: "AI · Python · Computer Vision · NLP",
      cta: "Explore AI solutions",
      to: "/solutions/ai-automation",
    },
    {
      category: "Custom Software",
      title: "Workforce Management Platform",
      description:
        "One place for employee records, workflows, reporting, and day-to-day operations instead of scattered tools.",
      capabilities: ["Employee management", "Workflows", "Reporting"],
      technology: "Web · API · Database",
      cta: "Explore custom software",
      to: "/solutions/custom-software",
    },
    {
      category: "Digital Platforms",
      title: "Business Management Platform",
      description:
        "Connect workflows, data, and reporting so operations run from a clearer digital foundation.",
      capabilities: ["Workflows", "Dashboards", "Integrations"],
      technology: "Web · APIs · Cloud",
      cta: "Explore consulting",
      to: "/solutions/technology-consulting",
    },
  ],
  primaryCta: CTA.viewPortfolio,
  secondaryCta: CTA.exploreSolutions,
};

export const INDUSTRIES = {
  label: "Industries",
  heading: "Sectors where we know the pitfalls.",
  supporting:
    "Domain depth shortens discovery. We work best with industries that run on process, compliance, and data.",
  cards: [
    { title: "Government & public sector", short: "Government" },
    { title: "Education", short: "Education" },
    { title: "Healthcare", short: "Healthcare" },
    { title: "Agriculture", short: "Agriculture" },
    { title: "Finance", short: "Finance" },
    { title: "Logistics", short: "Logistics" },
    { title: "Retail & commerce", short: "Retail" },
  ],
};

export const PROCESS = {
  label: "How We Work",
  heading: "Four clear steps from first talk to launch.",
  supporting: "You'll always know where we are, what's next, and what you need to decide.",
  steps: [
    {
      num: "01",
      title: "Discover",
      text: "We map the problem, users, and systems you already have.",
    },
    {
      num: "02",
      title: "Plan",
      text: "We agree scope, approach, and a clear path to a first useful release.",
    },
    {
      num: "03",
      title: "Build",
      text: "We design, develop, and test in short cycles you can see and review.",
    },
    {
      num: "04",
      title: "Launch & improve",
      text: "We go live carefully, then keep improving as your needs change.",
    },
  ],
};

/** Kept for Insights page / residual use; not shown on the slim homepage. */
export const TECHNOLOGY = {
  label: "Technology",
  heading: "Modern tools chosen for the job.",
  supporting: "We pick technology for fit, not for fashion.",
  categories: [
    {
      title: "Artificial Intelligence",
      items: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "LLM Technologies"],
    },
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { title: "Backend", items: ["Python", "FastAPI", "Django", "Laravel", "Node.js"] },
    {
      title: "Cloud & Infrastructure",
      items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
    },
    {
      title: "Data",
      items: ["PostgreSQL", "MySQL", "Redis", "Data Processing & Analytics"],
    },
  ],
};

/** Kept for /insights; not shown on the slim homepage. */
export const INSIGHTS = {
  label: "Insights",
  heading: "Practical ideas on software and AI.",
  supporting: "Short perspectives for people deciding what to build next.",
  articles: [
    {
      category: "Artificial Intelligence",
      title: "How Businesses Can Identify Practical AI Automation Opportunities",
      description:
        "Useful AI usually starts with repetitive, data-heavy work, not with picking a model first.",
      readTime: "6 min read",
      comingSoon: true,
    },
    {
      category: "Software Engineering",
      title: "When Should a Business Modernize a Legacy Application?",
      description:
        "How to tell when an old system is costing more than it saves, and what to do next.",
      readTime: "7 min read",
      comingSoon: true,
    },
    {
      category: "Digital Transformation",
      title: "From Manual Workflows to Intelligent Business Systems",
      description:
        "Digital change usually means better workflows and connected systems, not just new screens.",
      readTime: "6 min read",
      comingSoon: true,
    },
  ],
  cta: { label: "See What's Coming", to: "/insights" },
};

export const FINAL_CTA: FinalCta = {
  label: "Next Step",
  heading: "Have a problem worth solving?",
  supporting:
    "Tell us what you're trying to fix or build. We'll help you figure out a sensible next step without the sales theatre.",
  ...FINAL_PAIR_TELL_US,
};
