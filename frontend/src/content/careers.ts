/**
 * VAELKODE /careers. Kept intentionally simple until active hiring.
 * No invented job openings.
 */

import { CTA } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";


export const CAREERS_SEO: SeoMeta = {
  title: "Careers | VAELKODE",
  description:
    "Build what comes next with VAELKODE. An AI-first digital engineering company focused on software engineering, AI, digital products, and practical technology solutions.",
};

export const CAREERS_HERO: PageHero = {
  label: "Careers",
  title: "Build What Comes Next With VAELKODE.",
  supporting:
    "We're building an AI-first digital engineering company focused on software engineering, AI, digital products, and practical technology solutions. As VAELKODE grows, we'll look for people who enjoy solving hard problems, keep learning, and want to build technology with a real purpose.",
};

export const CAREERS_WHY = {
  label: "Why Work With Us",
  heading: "Work on Problems That Matter.",
  cards: [
    { title: "Engineering", text: "Work across modern software engineering and application development." },
    {
      title: "AI & Emerging Technology",
      text: "Explore practical applications of AI, machine learning, and intelligent automation.",
    },
    { title: "Learning", text: "Continue developing your technical and problem-solving skills." },
    { title: "Ownership", text: "Take responsibility for the work you build and the outcomes you contribute to." },
    { title: "Collaboration", text: "Work with people across technology, product, design, and business." },
    { title: "Growth", text: "Grow alongside an AI-first digital engineering company being built from the ground up." },
  ],
};

export const CAREERS_LOOK_FOR = {
  label: "What We Look For",
  heading: "People Who Build, Learn, and Solve.",
  supporting:
    "We value people who are curious, responsible, collaborative, and willing to understand a problem before jumping to a solution.",
  qualities: [
    "Curiosity",
    "Ownership",
    "Problem Solving",
    "Continuous Learning",
    "Communication",
    "Technical Excellence",
    "Teamwork",
    "Adaptability",
  ],
};

export const CAREERS_OPPORTUNITIES = {
  label: "Current Opportunities",
  heading: "Current Opportunities",
  emptyState: [
    "We don't have any public openings at the moment.",
    "If you believe you could contribute to VAELKODE, you can still introduce yourself and share your background with us.",
  ],
  cta: { label: "Send Your Profile", href: "mailto:careers@vaelkode.com" },
};

export const CAREERS_FINAL: FinalCta = {
  label: "Grow With Us",
  heading: "Interested in Growing With VAELKODE?",
  supporting:
    "Follow VAELKODE as we grow and create new opportunities across engineering, AI, product, design, and technology.",
  primaryCta: CTA.contact,
};
