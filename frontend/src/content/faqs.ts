/**
 * VAELKODE /faqs — central FAQ page.
 *
 * This module does NOT define any new answers. It aggregates the existing,
 * approved FAQ objects from each page's content file, so editing a question or
 * answer at its source automatically updates the global FAQ page.
 */
import { AI_FAQ } from "./aiAutomation";
import { CLOUD_FAQ } from "./cloudDevops";
import { CS_FAQ } from "./customSoftware";
import { IND_FAQ } from "./industries";
import { MOB_FAQ } from "./mobileDevelopment";
import { SOL_FAQ } from "./solutions";
import { TC_FAQ } from "./technologyConsulting";
import { WEB_FAQ } from "./webDevelopment";

export const FAQ_SEO = {
  title: "Frequently Asked Questions | VAELKODE",
  description:
    "Answers to common questions about VAELKODE — our technology services, development process, AI, cloud, consulting, and how we work with organizations to build digital solutions.",
};

export const FAQ_HERO = {
  label: "Frequently Asked Questions",
  title: "Questions? Let's Make Things Clear.",
  supporting:
    "Find answers to common questions about VAELKODE, our technology services, development process, and how we work with organizations to build and improve digital solutions.",
};

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  /** Stable id used by the category filter. */
  id: string;
  /** Short label for the filter button. */
  label: string;
  /** Monospace eyebrow for the section. */
  sectionLabel: string;
  /** Section heading. */
  heading: string;
  items: FaqItem[];
}

/**
 * Categories map 1:1 to the source FAQ objects. `items` are referenced
 * directly — no copies — so there is a single source of truth per question.
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
  {
    id: "industries",
    label: "Industries",
    sectionLabel: "Industries",
    heading: "Industry & Business Solutions",
    items: IND_FAQ.items,
  },
];

export const FAQ_FINAL = {
  label: "Still Have Questions?",
  heading: "Let's Talk About Your Project.",
  supporting:
    "If you couldn't find the information you're looking for, you can contact VAELKODE directly. Tell us what you're trying to build, improve, or solve, and we'll help you determine the right next step.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Contact VAELKODE", to: "/contact" },
};
