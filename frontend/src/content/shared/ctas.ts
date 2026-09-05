/**
 * Shared CTA links — single source of truth for label + route pairs.
 *
 * Prefer these exports over re-typing `{ label, to }` in page content files.
 * Page-specific labels (e.g. "Discuss Your Infrastructure") can use
 * `contactCta("…")` / `consultationCta("…")` so the route stays consistent.
 */

export type CtaLink = { readonly label: string; readonly to: string };

/** Canonical routes used by marketing CTAs. */
export const CTA_ROUTES = {
  consultation: "/consultation",
  contact: "/contact",
  requestProposal: "/request-proposal",
  solutions: "/solutions",
  work: "/work",
  caseStudies: "/work/case-studies",
} as const;

/** Build a contact-page CTA with a custom label. */
export function contactCta(label: string): CtaLink {
  return { label, to: CTA_ROUTES.contact };
}

/** Build a consultation-page CTA with a custom label. */
export function consultationCta(label: string): CtaLink {
  return { label, to: CTA_ROUTES.consultation };
}

/** Build a work-page CTA with a custom label. */
export function workCta(label: string): CtaLink {
  return { label, to: CTA_ROUTES.work };
}

/** Named CTAs used across multiple pages. */
export const CTA = {
  bookConsultation: {
    label: "Book a Consultation",
    to: CTA_ROUTES.consultation,
  },
  bookAiConsultation: {
    label: "Book an AI Consultation",
    to: CTA_ROUTES.consultation,
  },
  requestProposal: {
    label: "Request a Proposal",
    to: CTA_ROUTES.requestProposal,
  },
  contact: {
    label: "Contact VAELKODE",
    to: CTA_ROUTES.contact,
  },
  exploreSolutions: {
    label: "Explore Our Solutions",
    to: CTA_ROUTES.solutions,
  },
  tellUsAboutProject: {
    label: "Tell Us About Your Project",
    to: CTA_ROUTES.contact,
  },
  discussYourProject: {
    label: "Discuss Your Project",
    to: CTA_ROUTES.consultation,
  },
  discussTechChallenge: {
    label: "Discuss Your Technology Challenge",
    to: CTA_ROUTES.consultation,
  },
  startProject: {
    label: "Start a Project",
    to: CTA_ROUTES.consultation,
  },
  workWithVaelkode: {
    label: "Work With VAELKODE",
    to: CTA_ROUTES.consultation,
  },
  viewAllWork: {
    label: "View All Work",
    to: CTA_ROUTES.work,
  },
  viewWriteUps: {
    label: "View Project Write-Ups",
    to: CTA_ROUTES.caseStudies,
  },
  viewAllWriteUps: {
    label: "View All Project Write-Ups",
    to: CTA_ROUTES.caseStudies,
  },
  viewAvailableWork: {
    label: "View Available Work",
    to: CTA_ROUTES.work,
  },
  exploreOurWork: {
    label: "Explore Our Work",
    to: CTA_ROUTES.work,
  },
} as const satisfies Record<string, CtaLink>;

/**
 * Standard closing CTA pair — consultation + proposal.
 * Used on most solution, industry, and process final sections.
 */
export const FINAL_PAIR = {
  primaryCta: CTA.bookConsultation,
  secondaryCta: CTA.requestProposal,
} as const;

/** Closing pair — consultation + contact. */
export const FINAL_PAIR_CONTACT = {
  primaryCta: CTA.bookConsultation,
  secondaryCta: CTA.contact,
} as const;

/** Closing pair — consultation + tell us about your project. */
export const FINAL_PAIR_TELL_US = {
  primaryCta: CTA.bookConsultation,
  secondaryCta: CTA.tellUsAboutProject,
} as const;
