/**
 * VAELKODE /portfolio. Showcase grid content.
 * Swap project fields (title, image, location, liveUrl) when client work is ready.
 */

import { CTA } from "@/content/shared";
import type { SeoMeta } from "@/content/shared";

export const PORTFOLIO_SEO: SeoMeta = {
  title: "Portfolio | Projects We're Proud Of | VAELKODE",
  description:
    "Selected web and digital projects from VAELKODE. Hover a preview to scroll the full page, then open the live site.",
};

export const PORTFOLIO_HERO = {
  label: "Our Recent Work",
  titleBefore: "Projects We're",
  titleAccent: "Proud Of",
  supporting:
    "Browse live website previews across industries. Hover a card to scroll the full homepage, then open the live site.",
};

/**
 * Floating portfolio hero cards.
 * Numeric stats with `countTo` animate 0 → target on load.
 */
export const PORTFOLIO_HERO_STATS = [
  {
    id: "projects",
    value: "10+",
    countTo: 10,
    suffix: "+",
    label: "Selected projects",
    accent: "neon" as const,
  },
  {
    id: "industries",
    value: "auto-industries" as const,
    /** Resolved from PORTFOLIO_PROJECTS at render time. */
    countTo: "auto-industries" as const,
    suffix: "",
    label: "Industries covered",
    accent: "violet" as const,
  },
  {
    id: "previews",
    value: "Live",
    label: "Hover-to-scroll previews",
    accent: "pink" as const,
  },
] as const;

export interface PortfolioProject {
  id: string;
  /** Industry / sector label (shown first in red caps). */
  industry: string;
  /** Service type label. */
  service: string;
  title: string;
  location: string;
  /** Tall full-page homepage screenshot (hero at top). Must be taller than the card viewport to scroll. */
  image: string;
  imageAlt: string;
  /** External live site. Opens in a new tab. */
  liveUrl: string;
}

/**
 * Portfolio projects shown on /portfolio.
 *
 * `image` must be a tall full-page homepage capture (hero at top, rest of page below).
 * Default view shows the hero; hover scrolls the full image, leave resets to the top.
 * Temporary Unsplash URLs use tall crops so the scroll effect works until real captures are added.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "solara-grid",
    industry: "Energy",
    service: "Custom Website",
    title: "Solara Grid",
    location: "Islamabad, Pakistan",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Solara Grid website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "cinemark-premiere",
    industry: "Entertainment",
    service: "Custom Website",
    title: "Cinemark Premiere",
    location: "Karachi, Pakistan",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Cinemark Premiere website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "northline-university",
    industry: "Education",
    service: "Institutional Site",
    title: "Northline University",
    location: "Rawalpindi, Pakistan",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Northline University website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "harbor-residences",
    industry: "Real Estate",
    service: "Marketing Site",
    title: "Harbor Residences",
    location: "Lahore, Pakistan",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Harbor Residences website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "meridian-clinic",
    industry: "Healthcare",
    service: "Patient Portal Site",
    title: "Meridian Clinic",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Meridian Clinic website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "atelier-commerce",
    industry: "Retail",
    service: "E-commerce",
    title: "Atelier Commerce",
    location: "London, United Kingdom",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Atelier Commerce website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "ledger-ops",
    industry: "Finance",
    service: "Corporate Website",
    title: "Ledger Ops",
    location: "Liverpool, United Kingdom",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Ledger Ops website homepage preview",
    liveUrl: "https://example.com",
  },
  {
    id: "greenfield-logistics",
    industry: "Logistics",
    service: "Operations Site",
    title: "Greenfield Logistics",
    location: "Manchester, United Kingdom",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&h=2800&q=80",
    imageAlt: "Greenfield Logistics website homepage preview",
    liveUrl: "https://example.com",
  },
];

export const PORTFOLIO_FLOATING_CTA = {
  prompt: "Like what you see? Let's talk about building yours.",
  primary: CTA.bookConsultation,
  secondary: CTA.tellUsAboutProject,
};

/** Homepage “Projects We're Proud Of”. Reuses portfolio projects. */
export const HOME_PROUD_WORK = {
  title: "Projects We're Proud Of",
  viewAll: CTA.viewPortfolio,
} as const;
