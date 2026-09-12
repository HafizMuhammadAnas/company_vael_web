/**
 * VAELKODE /contact — simple message page.
 * Contact details are sourced from COMPANY — do not hard-code alternate emails here.
 */

import { CTA } from "@/content/shared";
import type { FinalCta, PageHero, SeoMeta } from "@/content/shared";

import type { LeadFieldConfig } from "@/components/forms/LeadForm";
import { COMPANY } from "@/constants/company";

export const CONTACT_SEO: SeoMeta = {
  title: "Contact VAELKODE | Send a Message",
  description:
    "Contact VAELKODE for questions, partnerships, or project conversations. Email us or send a short message.",
};

export const CONTACT_HERO: PageHero = {
  label: "Contact",
  title: "Get in touch.",
  supporting: "Questions, partnerships, or a project idea? Send a short message and we'll reply.",
};

export const CONTACT_INFO = {
  heading: "Reach us",
  email: COMPANY.contact.email,
  phone: COMPANY.contact.phone,
  phoneDisplay: COMPANY.contact.phoneDisplay,
  helpLabel: "We help with",
  help: [
    "Software",
    "AI & automation",
    "Web & mobile",
    "Cloud & DevOps",
    "Consulting",
  ],
};

/** Public company / registration details (single source: COMPANY config). */
export const CONTACT_COMPANY = {
  label: "Company",
  rows: [
    { label: "Name", value: COMPANY.legal.registeredName },
    { label: "Number", value: COMPANY.legal.companyNumber },
    { label: "Registered in", value: COMPANY.legal.registeredIn },
    { label: "Office", value: COMPANY.legal.registeredOffice },
  ],
};

export const CONTACT_FORM_FIELDS: LeadFieldConfig[] = [
  { name: "full_name", label: "Full Name", placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, half: true },
  { name: "company", label: "Company", placeholder: "Company / Organization", half: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number", half: true },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "How can we help?",
    required: true,
  },
  {
    name: "privacy_consent",
    label:
      "I agree that VAELKODE may use the information I provide to respond to my enquiry. I have read the Privacy Policy.",
    type: "checkbox",
    required: true,
  },
];

export const CONTACT_FORM = {
  heading: "Send a message",
  hint: "We'll reply to the email you share.",
  badge: "Contact",
  submitLabel: "Send Message",
  trust: "Used only to reply to this message.",
  successTitle: "Message received.",
  successText: "We'll get back to you shortly.",
};

export const CONTACT_FINAL: FinalCta = {
  label: "Prefer a call?",
  heading: "Want a focused conversation?",
  supporting: "Book a consultation and we'll walk through the problem together.",
  primaryCta: CTA.bookConsultation,
};
