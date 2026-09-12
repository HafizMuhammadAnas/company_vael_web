/**
 * Shared legal / attribution notes for work and demonstrations.
 *
 * Prefer production-facing language on public pages. Do not surface
 * "placeholder / demo / not yet approved" copy in the live UI.
 */

export const DISCLAIMERS = {
  /**
   * Case-study (project write-up) index and detail pages.
   * Keep visible near the top of those pages.
   */
  caseStudies:
    "These write-ups describe selected professional and technical delivery experience. They aren't client projects delivered under the VAELKODE brand.",

  /**
   * Work page. Selected projects section note.
   */
  selectedWork:
    "Selected technical work and professional delivery experience across AI, software engineering, enterprise platforms, automation, and computer vision. These aren't client projects delivered under the VAELKODE brand.",

  /**
   * Work hero supporting line. Includes brand attribution.
   */
  workHeroSupporting:
    "Selected professional and technical delivery experience across AI and intelligent automation, enterprise software, digital platforms, computer vision, cloud engineering, and data-driven solutions. These aren't client projects delivered under the VAELKODE brand.",

  /**
   * Homepage / custom software featured galleries.
   */
  technologyDemonstrations:
    "Selected solutions and technology demonstrations. These aren't client case studies.",

  /**
   * Web development work gallery.
   */
  digitalPlatformDemonstrations:
    "Selected solutions and digital platform demonstrations. These aren't client case studies.",

  /**
   * AI & automation work gallery.
   */
  aiDemonstrations:
    "AI solution demonstrations. These aren't client case studies or production deployments.",

  /**
   * Consulting deliverables caveat.
   */
  deliverablesDepend:
    "Possible deliverables; actual outputs depend on the engagement.",
} as const;

/** Aliases matching historical export names used by pages. */
export const CASE_STUDIES_NOTE = DISCLAIMERS.caseStudies;
