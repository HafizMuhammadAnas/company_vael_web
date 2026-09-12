/**
 * Shared TypeScript shapes for marketing content blocks.
 *
 * Annotate page exports with these types so missing CTAs, FAQ fields, or
 * SEO fields fail at compile time. Not on the live site.
 */

import type { CtaLink } from "./ctas";

/** Page `<title>` + meta description. */
export interface SeoMeta {
  title: string;
  description: string;
}

/** Inner-page hero (PageHero component). */
export interface PageHero {
  label: string;
  title: string;
  supporting: string;
  /** Optional second lede paragraph (Insights and similar). */
  intro?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  tags?: string[];
}

/** Closing CTA band (FinalCtaSection). */
export interface FinalCta {
  label: string;
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

/** FAQ section on a solution / industry page. */
export interface FaqSection {
  label: string;
  heading: string;
  items: FaqItem[];
  cta?: CtaLink;
}

/** Category group on the global /faqs page. */
export interface FaqCategory {
  id: string;
  label: string;
  sectionLabel: string;
  heading: string;
  items: FaqItem[];
}

/** Selected-work teaser (often empty-state until public projects exist). */
export interface WorkCard {
  title: string;
  description?: string;
  category?: string;
  capabilities?: string[];
  technology?: string;
  to?: string;
  cta?: string;
}

export interface WorkSection {
  label: string;
  heading: string;
  supporting?: string;
  note?: string;
  emptyState?: string;
  cta?: CtaLink;
  cards?: WorkCard[];
}

/** Work teaser with a guaranteed empty-state + CTA (common on solution pages). */
export interface WorkEmptySection {
  label: string;
  heading: string;
  supporting: string;
  emptyState: string;
  cta: CtaLink;
}

/** Work section with demonstration cards always present. */
export interface WorkShowcaseSection {
  label: string;
  heading: string;
  supporting?: string;
  note?: string;
  cards: WorkCard[];
  cta?: CtaLink;
}

/** Hero that always includes a primary CTA. */
export interface PageHeroWithCta extends PageHero {
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

/** Simple title + body card used across intro / principle decks. */
export interface TitleTextItem {
  title: string;
  text: string;
  num?: string;
  tags?: string[];
}

/** Explicit sub-service list under a main service class page. */
export interface SubServicesSection {
  label: string;
  heading: string;
  supporting: string;
  items: TitleTextItem[];
}

/**
 * Common labeled section chrome.
 * Prefer this (or a more specific interface) over untyped section objects.
 */
export interface SectionChrome {
  label: string;
  heading: string;
  supporting?: string;
}

/** Narrative intro with optional paragraphs and cards. */
export interface IntroSection extends SectionChrome {
  paragraphs?: string[];
  cards?: TitleTextItem[];
}

/** Challenge / signal row that links somewhere. */
export interface ChallengeItem {
  question: string;
  cta: string;
  to: string;
}

export interface ChallengeSection extends SectionChrome {
  items: ChallengeItem[];
}

/** Tech stack category (title + chip list). */
export interface TechCategory {
  title: string;
  items: string[];
}

export interface TechSection extends SectionChrome {
  categories: TechCategory[];
}

/** Process / journey step. */
export interface ProcessStep {
  num: string;
  title: string;
  text: string;
  activitiesLabel: string;
  activities: string[];
  output?: string;
}

export interface ProcessSection extends SectionChrome {
  steps: ProcessStep[];
  footerCta?: CtaLink;
}

/** Generic labeled link (nav chips, related capability links, etc.). */
export interface NavLink {
  label: string;
  to: string;
  title?: string;
  description?: string;
  cta?: string;
  anchor?: string;
}

/** Form chrome around LeadForm (heading + trust line). */
export interface FormChrome {
  heading: string;
  trust?: string;
  submitLabel?: string;
}
