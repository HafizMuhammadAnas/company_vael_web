/**
 * VAELKODE /faqs. Central FAQ page.
 *
 * This module does NOT define any new answers. It aggregates the existing,
 * approved FAQ objects from each page's content file, so editing a question or
 * answer at its source automatically updates the global FAQ page.
 */

import { FINAL_PAIR_CONTACT } from "@/content/shared";
import type { FaqCategory, FinalCta, PageHero, SeoMeta } from "@/content/shared";

import { AI_FAQ } from "./aiAutomation";
import { CLOUD_FAQ } from "./cloudDevops";
import { CS_FAQ } from "./customSoftware";
import { MOB_FAQ } from "./mobileDevelopment";
import { SOL_FAQ } from "./solutions";
import { TC_FAQ } from "./technologyConsulting";
import { WEB_FAQ } from "./webDevelopment";

export const FAQ_SEO: SeoMeta = {
  title: "Frequently Asked Questions | VAELKODE",
  description:
    "Answers to common questions about VAELKODE: our technology services, development process, AI, cloud, consulting, and how we work with organizations to build digital solutions.",
};

export const FAQ_HERO: PageHero = {
  label: "Frequently Asked Questions",
  title: "Questions? Let's clear a few things up.",
  supporting:
    "Common questions about VAELKODE, our services, how we develop software, and how we work with organizations to build and improve digital solutions.",
};

export type { FaqItem, FaqCategory } from "@/content/shared";

/**
 * Categories map 1:1 to the source FAQ objects. `items` are referenced
 * directly. No copies. So there is a single source of truth per question.
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    sectionLabel: "General",
    heading: "General Questions",
    items: SOL_FAQ.items,
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    sectionLabel: "AI & Automation",
    heading: "AI & Intelligent Automation",
    items: AI_FAQ.items,
  },
  {
    id: "custom-software",
    label: "Custom Software",
    sectionLabel: "Custom Software",
    heading: "Custom Software Development",
    items: CS_FAQ.items,
  },
  {
    id: "web-development",
    label: "Web Development",
    sectionLabel: "Web Development",
    heading: "Web & Digital Platforms",
    items: WEB_FAQ.items,
  },
  {
    id: "mobile-development",
    label: "Mobile Development",
    sectionLabel: "Mobile Development",
    heading: "Mobile Applications",
    items: MOB_FAQ.items,
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    sectionLabel: "Cloud & DevOps",
    heading: "Cloud & DevOps Engineering",
    items: CLOUD_FAQ.items,
  },
  {
    id: "technology-consulting",
    label: "Technology Consulting",
    sectionLabel: "Technology Consulting",
    heading: "Technology Consulting",
    items: TC_FAQ.items,
  },
];

export const FAQ_FINAL: FinalCta = {
  label: "Still have questions?",
  heading: "Let's talk about your project.",
  supporting:
    "If you couldn't find what you needed, get in touch. Tell us what you're trying to build, improve, or solve, and we'll help you figure out the right next step.",
  ...FINAL_PAIR_CONTACT,
};
