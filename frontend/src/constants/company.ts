/**
 * VAELKODE — single source of truth for company information.
 *
 * Consume this object in the Footer, Contact page, Legal pages, and SEO
 * metadata. Do NOT duplicate these details in individual components, and do
 * not add invented statistics, client numbers, years of experience, locations,
 * testimonials, or other unapproved claims.
 */

export const COMPANY = {
  name: "VAELKODE",
  website: "vaelkode.com",
  websiteUrl: "https://vaelkode.com",

  positioning:
    "VAELKODE is a technology company focused on building software, digital platforms, intelligent systems, and technology solutions for real-world business and operational needs.",

  shortDescription:
    "VAELKODE combines software engineering, artificial intelligence, automation, cloud technologies, and technology consulting to help organizations build, improve, and modernize digital solutions.",

  /** Concise blurb for the footer brand column. */
  footerBlurb:
    "VAELKODE builds software, digital platforms, intelligent systems, and technology solutions around real business needs.",

  /** Longer standard description for use wherever a full intro is required. */
  about: [
    "VAELKODE is a technology company focused on building practical digital solutions around real business needs.",
    "We work across software development, web and mobile applications, artificial intelligence, intelligent automation, cloud and DevOps engineering, and technology consulting.",
    "Our approach starts with understanding the problem, the people involved, the existing processes and systems, and the desired outcome. We then design and build technology that is purposeful, maintainable, and aligned with the organization's requirements.",
    "Whether it is a new digital product, a custom business application, an existing system that needs improvement, or an opportunity to introduce AI and automation, VAELKODE focuses on turning technology challenges into practical solutions.",
  ],

  contact: {
    email: "hello@vaelkode.com",
    /** E.164 value for `tel:` / `mailto:` links. */
    phone: "+447774799808",
    /** Human-readable phone for display. */
    phoneDisplay: "+44 7774 799808",
  },

  /** Official UK Companies House record — public-facing details only. */
  legal: {
    registeredName: "VAELKODE LTD",
    companyNumber: "17284196",
    registeredIn: "United Kingdom",
    registeredOffice: "26 St. Anne Street, Liverpool, L3 3JP, United Kingdom",
    director: "Raahim Rana",
  },

  /** Default site-wide SEO metadata (mirrored in index.html). */
  seo: {
    title: "VAELKODE — Technology & Software Solutions",
    description:
      "VAELKODE builds software, digital platforms, AI solutions, and technology systems designed around real business and operational needs.",
  },
} as const;
