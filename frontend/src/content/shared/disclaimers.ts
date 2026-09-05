/**
 * Shared legal / attribution notes for work, portfolio, and demonstrations.
 *
 * Keep wording here so index, detail, portfolio, and solution galleries
 * stay aligned — do not invent client case-study claims.
 */

export const DISCLAIMERS = {
  /**
   * Case-study (project write-up) index and detail pages.
   * Keep visible near the top of those pages.
   */
  caseStudies:
    "These write-ups describe selected professional and technical delivery experience. They are not client projects delivered under the VAELKODE brand.",

  /**
   * Portfolio page — broader project list framing.
   */
  portfolio:
    "These represent selected professional and technical projects. As VAELKODE completes client work, delivered VAELKODE projects will become the primary portfolio category.",

  /**
   * Work page — selected projects section note.
   */
  selectedWork:
    "Selected technical work and professional delivery experience across AI, software engineering, enterprise platforms, automation, and computer vision — not client projects delivered under the VAELKODE brand.",

  /**
   * Work hero supporting line — includes brand attribution.
   */
  workHeroSupporting:
    "Selected professional and technical delivery experience across AI and intelligent automation, enterprise software, digital platforms, computer vision, cloud engineering, and data-driven solutions — not client projects delivered under the VAELKODE brand.",

  /**
   * Homepage / custom software featured galleries.
   */
  technologyDemonstrations:
    "Selected solutions & technology demonstrations — not client case studies.",

  /**
   * Web development work gallery.
   */
  digitalPlatformDemonstrations:
    "Selected solutions & digital platform demonstrations — not client case studies.",

  /**
   * AI & automation work gallery.
   */
  aiDemonstrations:
    "AI solution demonstrations — not client case studies or production deployments.",

  /**
   * Consulting deliverables caveat.
   */
  deliverablesDepend:
    "Possible deliverables — actual outputs depend on the engagement.",
} as const;

/** Aliases matching historical export names used by pages. */
export const CASE_STUDIES_NOTE = DISCLAIMERS.caseStudies;
export const PORTFOLIO_NOTE = DISCLAIMERS.portfolio;
