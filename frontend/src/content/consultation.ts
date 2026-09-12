/**
 * VAELKODE /consultation — lead-qualification page.
 */

import { CTA } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";

import type { LeadFieldConfig } from "@/components/forms/LeadForm";

export const CONSULT_SEO: SeoMeta = {
  title: "Book a Consultation | VAELKODE",
  description:
    "Book an initial conversation with VAELKODE about your idea, system, or digital project.",
};

export const CONSULT_HERO: PageHero = {
  label: "Consultation",
  title: "Let's explore the problem.",
  supporting: "A short conversation to understand your goal, constraints, and the right next step.",
};

export const CONSULT_DISCUSS = {
  label: "What we cover",
  heading: "Four things we clarify.",
  accent: "clarify.",
  points: [
    { num: "01", title: "Your goal" },
    { num: "02", title: "The problem" },
    { num: "03", title: "Users & systems" },
    { num: "04", title: "Next step" },
  ],
};

export const CONSULT_FORM_FIELDS: LeadFieldConfig[] = [
  { name: "full_name", label: "Full Name", placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com", required: true, half: true },
  { name: "company", label: "Company", placeholder: "Company / Organization", half: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "Phone or WhatsApp", half: true },
  {
    name: "project_type",
    label: "Project Type",
    type: "select",
    placeholder: "Select a project type",
    options: [
      "Custom Software",
      "Web / Digital Platform",
      "Mobile Application",
      "AI & Automation",
      "Cloud & DevOps",
      "Technology Consulting",
      "System Integration",
      "Other",
    ],
    half: true,
  },
  {
    name: "contact_method",
    label: "Preferred Contact",
    type: "select",
    placeholder: "How should we reach you?",
    options: ["Email", "Phone Call", "WhatsApp", "Video Call"],
    half: true,
  },
  {
    name: "description",
    label: "What should we discuss?",
    type: "textarea",
    placeholder: "A short note on the idea, problem, or project.",
    required: true,
  },
  {
    name: "preferred_time",
    label: "Preferred timing",
    placeholder: "e.g. Weekday mornings",
  },
  {
    name: "privacy_consent",
    label:
      "I agree that VAELKODE may use the information I provide to respond to my consultation request. I have read the Privacy Policy.",
    type: "checkbox",
    required: true,
  },
];

export const CONSULT_FORM = {
  heading: "Request a consultation",
  hint: "Share enough so we can prepare. The finer details can wait.",
  badge: "Book",
  submitLabel: "Request Consultation",
  trust: "Used only to prepare and reply to this request.",
};

export const CONSULT_FINAL: FinalCta = {
  label: "Already clear?",
  heading: "Need a detailed proposal instead?",
  supporting: "If requirements are already defined, request a proposal.",
  primaryCta: CTA.requestProposal,
};
