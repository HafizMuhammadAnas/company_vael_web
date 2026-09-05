/**
 * Shared TypeScript shapes for marketing content blocks.
 *
 * Annotate page content exports with these types so missing fields, wrong
 * CTA shapes, and FAQ drift fail at compile time — not on the live site.
 */

import type { CtaLink } from "./ctas";

export type { CtaLink };

/** Page `<title>` + meta description. */
export interface SeoMeta {
  title: string;
  description: string;
}

/**
 * Inner-page hero (PageHero).
 * `heading` is intentionally not used — heroes use `title`.
 */
export interface PageHero {
  label: string;
  title: string;
  supporting: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  tags?: string[];
}

/** Homepage hero — accent word split + orbit terms. */
export interface HomeHero {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  titleRest: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  microcopy?: string;
  orbitTerms?: string[];
}

/**
 * Closing CTA band (FinalCtaSection).
 * `label` is optional in the UI but preferred for consistency.
 */
export interface FinalCta {
  label?: string;
  heading: string;
  supporting: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

/** Single FAQ Q&A pair. */
export interface FaqItem {
  q: string;
  a: string;
}

/** FAQ section used on solution / industry pages. */
export interface FaqSection {
  label: string;
  heading: string;
  items: FaqItem[];
  cta?: CtaLink;
}

/** Category on the global /faqs page. */
export interface FaqCategory {
  id: string;
  label: string;
  sectionLabel: string;
  heading: string;
  items: FaqItem[];
}

/** Common section chrome — label + heading (+ optional supporting). */
export interface SectionChrome {
  label: string;
  heading: string;
  supporting?: string;
}

/** Title + body card (principles, why points, audiences). */
export interface TitleTextItem {
  title: string;
  text: string;
  num?: string;
  tags?: string[];
  href?: string;
  cta?: string;
  to?: string;
}

/** Service / capability card with longer description + bullet items. */
export interface ServiceCard {
  title: string;
  description: string;
  items?: string[];
  examples?: string[];
  capabilities?: string[];
}

/** Numbered process / delivery step. */
export interface ProcessStep {
  num: string;
  title: string;
  text: string;
  activitiesLabel?: string;
  activities?: string[];
  output?: string;
}

/** Tech stack category. */
export interface TechCategory {
  title: string;
  items: string[];
}

/** Challenge → next-step row (solutions finder). */
export interface ChallengeItem {
  question: string;
  cta: string;
  to: string;
}

/** Linked teaser card (industries, who-we-help). */
export interface LinkCardItem {
  title: string;
  text?: string;
  to?: string;
  cta?: string;
}

/** Selected-work gallery card (demonstrations / write-up teasers). */
export interface WorkCardItem {
  title: string;
  category?: string;
  description: string;
  capabilities?: string[];
  technology?: string;
  to?: string;
  cta?: string;
}

/** Selected-work section with optional empty state or cards. */
export interface WorkSection extends SectionChrome {
  note?: string;
  emptyState?: string;
  cards?: WorkCardItem[];
  cta?: CtaLink;
}

/** Narrative intro with paragraphs + optional highlight cards. */
export interface NarrativeSection extends SectionChrome {
  paragraphs?: string[];
  cards?: TitleTextItem[];
  highlight?: string;
}

/** FAQ-style section of title/text cards (no Q&A). */
export interface CardSection extends SectionChrome {
  cards: TitleTextItem[] | ServiceCard[] | LinkCardItem[];
  note?: string;
  cta?: CtaLink;
  footerCta?: CtaLink;
}

/** Process / journey section. */
export interface ProcessSection extends SectionChrome {
  steps: ProcessStep[];
  cta?: CtaLink;
  footerCta?: CtaLink;
}

/** Tech stacks section. */
export interface TechSection extends SectionChrome {
  categories: TechCategory[];
}
