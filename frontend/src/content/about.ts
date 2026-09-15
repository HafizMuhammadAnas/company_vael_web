/**
 * VAELKODE /about. Lean, visual-first.
 * No invented headcount, years, clients, awards, ROI, or case results.
 * Avoid em dashes; keep a plain, spoken tone.
 */

import { COMPANY } from "@/constants/company";
import { CTA, FINAL_PAIR_CONTACT } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";

export const ABOUT_SEO: SeoMeta = {
  title: "About VAELKODE | AI-First Digital Engineering",
  description:
    "VAELKODE is a UK-registered AI-first digital engineering company. We turn real business problems into software, AI systems, and digital platforms.",
};

export const ABOUT_HERO: PageHero = {
  label: "About",
  title: "Technology your organization can actually run.",
  supporting:
    "AI-first digital engineering for software, platforms, and intelligent workflows. We scope the work clearly and build carefully.",
  primaryCta: CTA.workWithVaelkode,
  secondaryCta: CTA.exploreSolutions,
};

export const ABOUT_SITUATIONS = {
  label: "Sound familiar?",
  heading: "Problems we take on.",
  items: [
    {
      title: "Tools that don't match the work",
      text: "Off-the-shelf software forces workarounds. Custom needs get ignored until the pain is expensive.",
    },
    {
      title: "Ideas stuck before the first release",
      text: "You know what should exist, but scope and the first shippable version stay unclear.",
    },
    {
      title: "Manual work that should be automated",
      text: "Documents, approvals, and reporting still eat hours that should go to judgment work.",
    },
    {
      title: "Systems that are hard to change",
      text: "Releases are stressful, environments drift, and every improvement feels risky.",
    },
    {
      title: "Too many vendors, little ownership",
      text: "Strategy, design, build, and infrastructure sit apart, so accountability gets lost.",
    },
    {
      title: "AI interest without a clear use case",
      text: "Pressure to \"do AI\" without a problem, data path, or success definition.",
    },
  ],
};

export const ABOUT_WHO = {
  label: "Who we are",
  heading: "Built around the problem,",
  accent: "not the pitch.",
  lede: `${COMPANY.name} designs and builds practical digital solutions: software, web and mobile, AI workflows, cloud delivery, and consulting.`,
  highlight: "We start with the problem, design a fitting solution, and build it properly.",
  facts: [
    { label: "Legal name", value: COMPANY.legal.registeredName },
    { label: "Office", value: COMPANY.legal.registeredOffice },
    { label: "Director", value: COMPANY.legal.director },
    { label: "Contact", value: COMPANY.contact.email },
  ],
};

export const ABOUT_CAPABILITIES = {
  label: "What we deliver",
  heading: "Six service lines,",
  accent: "plain outcomes.",
  cards: [
    {
      short: "Software",
      title: "Custom software",
      outcome: "One clear system of work",
      to: "/solutions/custom-software",
      text: "Applications and platforms shaped around how you work.",
    },
    {
      short: "Web",
      title: "Web & platforms",
      outcome: "A digital front door that works",
      to: "/solutions/web-development",
      text: "Sites, portals, stores, and web apps.",
    },
    {
      short: "Mobile",
      title: "Mobile products",
      outcome: "Workflows in people's hands",
      to: "/solutions/mobile-development",
      text: "iOS, Android, and cross-platform apps.",
    },
    {
      short: "AI",
      title: "AI & automation",
      outcome: "Less repetitive work",
      to: "/solutions/ai-automation",
      text: "Automation where value is clear.",
    },
    {
      short: "Cloud",
      title: "Cloud & DevOps",
      outcome: "Calmer releases",
      to: "/solutions/cloud-devops",
      text: "Environments, CI/CD, and monitoring.",
    },
    {
      short: "Advice",
      title: "Consulting",
      outcome: "Clarity before you spend",
      to: "/solutions/technology-consulting",
      text: "Discovery, architecture, and roadmaps.",
    },
  ],
};

export const ABOUT_WHO_WE_HELP = {
  label: "Who we work with",
  heading: "Teams that need technology for real work.",
  cards: [
    { title: "Founders & new products", text: "An MVP real enough to learn from." },
    { title: "Growing operations", text: "Software that fits how the team works." },
    {
      title: "Established organizations",
      text: "Careful modernization rather than a big-bang rewrite.",
    },
    { title: "In-house tech teams", text: "Specialist capacity for AI, cloud, or delivery." },
  ],
};

export const ABOUT_APPROACH = {
  label: "How we work",
  heading: "Four clear steps",
  accent: "from first talk to launch.",
  steps: [
    { num: "01", title: "Understand", output: "Shared problem definition" },
    { num: "02", title: "Design", output: "Approach + first release" },
    { num: "03", title: "Build", output: "Working software to review" },
    { num: "04", title: "Improve", output: "Live system + next moves" },
  ],
  cta: { label: "See the full process", to: "/about/process" },
};

/** Vision / mission twin. */
export const ABOUT_VISION = {
  label: "Vision",
  heading: "Technology that makes complex work simpler.",
};

export const ABOUT_MISSION = {
  label: "Mission",
  heading: "Turn real challenges into practical digital solutions.",
};

export const ABOUT_FINAL: FinalCta = {
  label: "Next step",
  heading: "Tell us the challenge.",
  supporting:
    "Starting a product, modernizing a system, or clarifying a decision? Begin with the problem and we'll help map the next step.",
  ...FINAL_PAIR_CONTACT,
};
