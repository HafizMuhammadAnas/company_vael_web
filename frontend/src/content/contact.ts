/**
 * VAELKODE /contact — primary client-acquisition page.
 * Contact details are sourced from COMPANY — do not hard-code alternate emails here.
 */
import type { LeadFieldConfig } from "@/components/forms/LeadForm";
import { COMPANY } from "@/constants/company";

export const CONTACT_SEO = {
  title: "Contact VAELKODE | Let's Talk About What You're Building",
  description:
    "Tell VAELKODE about your idea, technology challenge, or project. We'll review your requirements and determine the best way to start the conversation.",
};

export const CONTACT_HERO = {
  label: "Contact VAELKODE",
  title: "Let's Talk About What You're Building.",
  supporting:
    "Have an idea, a technology challenge, an existing system that needs improvement, or a project you want to bring to life? Tell us what you're working on. We'll review your requirements and determine the best way to start the conversation.",
};

export const CONTACT_INFO = {
  heading: "Let's Talk",
  email: COMPANY.contact.email,
  phone: COMPANY.contact.phone,
  phoneDisplay: COMPANY.contact.phoneDisplay,
  blocks: [
    {
      label: "General Inquiries",
      text: "For general questions, partnerships, or project discussions.",
    },
    {
      label: "Project Inquiries",
      text: "For software development, AI, digital platforms, or technology projects.",
    },
  ],
  helpLabel: "What We Can Help With",
  help: [
    "Custom software & digital platforms",
    "AI, automation & intelligent workflows",
    "Web & mobile applications",
    "Cloud, DevOps & modernization",
    "System integration",
    "Technology consulting",
  ],
};

/** Public company / registration details (single source: COMPANY config). */
export const CONTACT_COMPANY = {
  label: "Company Details",
  rows: [
    { label: "Registered Company Name", value: COMPANY.legal.registeredName },
    { label: "Company Registration Number", value: COMPANY.legal.companyNumber },
    { label: "Registered In", value: COMPANY.legal.registeredIn },
    { label: "Registered Office", value: COMPANY.legal.registeredOffice },
    { label: "Website", value: COMPANY.website },
  ],
};

export const CONTACT_FORM_FIELDS: LeadFieldConfig[] = [
  { name: "full_name", label: "Full Name", placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com", required: true, half: true },
  { name: "company", label: "Company", placeholder: "Company / Organization", half: true },
  { name: "country", label: "Country", placeholder: "Where are you based?", half: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number", half: true },
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
      "Existing System Improvement",
      "Other",
    ],
    half: true,
  },
  {
    name: "description",
    label: "Project Description",
    type: "textarea",
    placeholder: "Tell us about your project, problem, or requirement.",
    required: true,
  },
  {
    name: "timeline",
    label: "Timeline",
    type: "select",
    placeholder: "Select a timeline",
    options: ["Not sure yet", "Within 1 month", "1–3 months", "3–6 months", "6+ months"],
    half: true,
  },
  {
    name: "budget",
    label: "Budget",
    type: "select",
    placeholder: "Select a budget range",
    options: [
      "Not decided",
      "Under $10,000",
      "$10,000 – $25,000",
      "$25,000 – $50,000",
      "$50,000+",
      "Prefer to discuss",
    ],
    half: true,
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
  heading: "Contact Form",
  submitLabel: "Send Project Inquiry",
  trust:
    "Your information will only be used to respond to your inquiry and understand your project requirements.",
  successTitle: "Thank you. We've received your inquiry.",
  successText:
    "Our team will review the information you've provided and get back to you regarding the next steps.",
};

export const CONTACT_FINAL = {
  label: "Need a Starting Point?",
  heading: "Not Sure Where to Start?",
  supporting:
    "That's okay. You don't need a complete specification before contacting us. Tell us what you're trying to achieve, and we can start from there.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
};
