/**
 * VAELKODE /about/process. How an engagement actually works.
 * Approved production copy.
 */

import { CTA, FINAL_PAIR } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";

export const PROCESS_SEO: SeoMeta = {
  title: "Our Process | VAELKODE",
  description:
    "A clear path from problem to product: how VAELKODE discovers, analyzes, designs, builds, validates, launches, and evolves software projects.",
};

export const PROCESS_HERO: PageHero = {
  label: "Our Process",
  title: "A Clear Path From Problem to Product.",
  supporting:
    "Good software starts before the first line of code. We use this process to understand the problem, define the right solution, build it in a structured way, and keep improving it.",
  primaryCta: CTA.startProject,
};

export type ProcessStage = {
  num: string;
  title: string;
  text: string;
};

export const PROCESS_STAGES = {
  label: "Delivery Stages",
  title: "Follow the path. Know what's next.",
  supporting: "Seven stages from first conversation to ongoing improvement — plain and visible.",
  steps: [
    { num: "01", title: "Discover", text: "What you're trying to do, and why it matters." },
    { num: "02", title: "Analyze", text: "How things work today — and where they break." },
    { num: "03", title: "Design", text: "Shape the experience and the technical plan." },
    { num: "04", title: "Build", text: "Working software you can review as we go." },
    { num: "05", title: "Validate", text: "Prove it before anyone depends on it." },
    { num: "06", title: "Launch", text: "Go live carefully, with monitoring and handover." },
    { num: "07", title: "Evolve", text: "Keep improving as your needs change." },
  ] satisfies ProcessStage[],
};

export const PROCESS_ENGAGEMENT = {
  label: "Engagement Models",
  heading: "Different projects need different delivery models.",
  models: [
    { title: "Fixed Scope", text: "A good fit when requirements and deliverables are clearly defined." },
    {
      title: "Iterative Delivery",
      text: "A good fit when the product needs to evolve through regular feedback and releases.",
    },
    {
      title: "Dedicated Engineering Support",
      text: "A good fit when you need extra technical capacity alongside an existing team.",
    },
    {
      title: "Discovery First",
      text: "A good fit when the problem is clear but the exact solution still needs exploring.",
    },
  ],
};

export const PROCESS_FINAL: FinalCta = {
  label: "Let's Define the First Step",
  heading: "Have a Project in Mind? Let's Define the First Step.",
  supporting:
    "Tell us what you're trying to build or improve. We'll start by understanding the problem and mapping a practical path forward.",
  ...FINAL_PAIR,
};
