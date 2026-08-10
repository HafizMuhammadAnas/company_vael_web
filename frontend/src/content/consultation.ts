/**
 * VAELKODE /consultation — lead-qualification page.
 */
import type { LeadFieldConfig } from "@/components/forms/LeadForm";

export const CONSULT_SEO = {
  title: "Book a Consultation | VAELKODE",
  description:
    "Schedule an initial conversation with VAELKODE to discuss your idea, technology challenge, existing system, or digital project.",
};

export const CONSULT_HERO = {
  label: "Book a Consultation",
  title: "Let's Explore Your Project.",
  supporting:
    "Schedule an initial conversation with VAELKODE to discuss your idea, technology challenge, existing system, or digital project.",
};

export const CONSULT_DISCUSS = {
  label: "What We Can Discuss",
  heading: "A Focused Conversation About Your Project.",
  points: [
    { num: "01", title: "Your Objective", text: "What are you trying to achieve?" },
    { num: "02", title: "The Problem", text: "What isn't working today?" },
    { num: "03", title: "Users", text: "Who will use the solution?" },
    { num: "04", title: "Technology", text: "What systems, platforms, or technologies are already involved?" },
    { num: "05", title: "Scope", text: "What are you considering building or improving?" },
    { num: "06", title: "Next Steps", text: "What would a successful engagement look like?" },
  ],
};

export const CONSULT_FORM_FIELDS: LeadFieldConfig[] = [
  { name: "full_name", label: "Full Name", placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com", required: true, half: true },
  { name: "company", label: "Company", placeholder: "Company / Organization", half: true },
  { name: "country", label: "Country", placeholder: "Where are you based?", half: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "Phone or WhatsApp number", half: true },
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
    name: "description",
    label: "Brief Project Description",
    type: "textarea",
    placeholder: "Briefly describe your idea, problem, or project.",
    required: true,
  },
  {
    name: "contact_method",
    label: "Preferred Contact Method",
    type: "select",
    placeholder: "Select a contact method",
    options: ["Email", "Phone Call", "WhatsApp", "Video Call"],
    half: true,
  },
  {
    name: "preferred_time",
    label: "Preferred Date / Time",
    placeholder: "e.g. Weekday mornings, next week",
    half: true,
  },
  {
    name: "additional",
    label: "Additional Information",
    type: "textarea",
    placeholder: "Anything else that would help us prepare for the conversation.",
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
  heading: "Consultation Request",
  submitLabel: "Request Consultation",
  trust: "Your information will only be used to prepare for and respond to your consultation request.",
};

export const CONSULT_FINAL = {
  label: "Prefer a Detailed Proposal?",
  heading: "Already Have a Defined Project?",
  supporting:
    "If your requirements are already fairly clear, you can share them in detail and request a proposal instead.",
  primaryCta: { label: "Request a Proposal", to: "/request-proposal" },
};
