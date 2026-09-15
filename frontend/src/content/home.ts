/**
 * VAELKODE homepage content. Plain-language, buyer-first.
 * No invented statistics, testimonials, client logos, or case-study results.
 */

import { CTA, DISCLAIMERS, FINAL_PAIR_TELL_US } from "@/content/shared";
import type { FaqSection, FinalCta, SeoMeta } from "@/content/shared";
import { SOL_FAQ } from "@/content/solutions";

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
  heading: "A partner who starts with your problem, then a clear path to launch.",
  supporting:
    "Practical conversation first. Then four steps you can follow — so you always know what we're building, where we are, and what you need to decide.",
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
  processLabel: "How we work",
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
    "Domain depth shortens discovery. We work best with industries that run on process, compliance, data — and strong automation potential.",
  cards: [
    { title: "Real Estate", short: "Real Estate" },
    { title: "Education", short: "Education" },
    { title: "Healthcare", short: "Healthcare" },
    { title: "Agriculture", short: "Agriculture" },
    { title: "Finance", short: "Finance" },
    { title: "Logistics", short: "Logistics" },
    { title: "Retail & commerce", short: "Retail" },
  ],
};

/** Homepage FAQ — same general answers as Solutions / /faqs. */
export const HOME_FAQ: FaqSection = {
  label: SOL_FAQ.label,
  heading: "Questions before we talk?",
  items: SOL_FAQ.items,
  cta: SOL_FAQ.cta,
};

export const FINAL_CTA: FinalCta = {
  label: "Next Step",
  heading: "Have a problem worth solving?",
  supporting:
    "Tell us what you're trying to fix or build. We'll help you figure out a sensible next step without the sales theatre.",
  ...FINAL_PAIR_TELL_US,
};
