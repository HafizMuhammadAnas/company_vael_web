/**
 * VAELKODE /request-proposal. For prospects with a reasonably defined project.
 */

import type { PageHero, SeoMeta } from "@/content/shared";
import type { LeadFieldConfig } from "@/components/forms/LeadForm";

export const PROPOSAL_SEO: SeoMeta = {
  title: "Request a Proposal | VAELKODE",
  description:
    "Share your project requirements with VAELKODE so we can understand the scope, objectives, and expected outcome.",
};

export const PROPOSAL_HERO: PageHero = {
  label: "Request a Proposal",
  title: "Tell Us What You Need to Build.",
  supporting:
    "Share enough about scope, objectives, and expected outcome for our team to understand the project and respond thoughtfully.",
};

export const PROPOSAL_FORM_FIELDS: LeadFieldConfig[] = [
  { name: "full_name", label: "Full Name", placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Work Email", type: "email", placeholder: "you@company.com", required: true, half: true },
  {
    name: "company",
    label: "Company / Organization",
    placeholder: "Company / Organization",
    required: true,
    half: true,
  },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number", half: true },
  { name: "country", label: "Country", placeholder: "Where are you based?", required: true, half: true },
  { name: "project_name", label: "Project Name", placeholder: "What are you calling the project?", half: true },
  {
    name: "project_type",
    label: "Project Type",
    type: "select",
    placeholder: "Select a project type",
    options: [
      "Custom Software",
      "Web Platform",
      "Mobile Application",
      "AI / Automation",
      "Cloud / DevOps",
      "System Integration",
      "Technology Consulting",
      "Other",
    ],
  },
  {
    name: "description",
    label: "Project Description",
    type: "textarea",
    placeholder: "Describe the problem you're trying to solve and the solution you have in mind.",
    required: true,
  },
  { name: "target_users", label: "Target Users", type: "textarea", placeholder: "Who will use the system?" },
  {
    name: "key_requirements",
    label: "Key Requirements",
    type: "textarea",
    placeholder: "What are the most important features or capabilities?",
  },
  {
    name: "existing_system",
    label: "Existing System",
    type: "select",
    placeholder: "Select an option",
    options: [
      "No existing system",
      "Existing application",
      "Existing website",
      "Existing mobile application",
      "Multiple systems",
      "Other",
    ],
  },
  {
    name: "technology_requirements",
    label: "Technology Requirements / Preferences",
    type: "textarea",
    placeholder: "Are there specific technologies, platforms, integrations, or infrastructure requirements?",
    helper: "If you're unsure about the technology, leave this blank and describe what you need instead.",
  },
  {
    name: "timeline",
    label: "Expected Timeline",
    type: "select",
    placeholder: "Select a timeline",
    options: ["Not decided", "Within 1 month", "1–3 months", "3–6 months", "6+ months"],
    half: true,
  },
  {
    name: "budget",
    label: "Estimated Budget",
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
    name: "attachments",
    label: "Attach Supporting Documents",
    type: "file",
    multiple: true,
    accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,image/*",
    maxSizeMb: 25,
    helper:
      "You can upload requirements, specifications, diagrams, existing documentation, or other material that may help us understand your project. Accepted: PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, ZIP, images. Maximum 25 MB per file.",
  },
  {
    name: "privacy_consent",
    label:
      "I agree that VAELKODE may use the information and documents I provide to review my project and respond to my proposal request. I have read the Privacy Policy.",
    type: "checkbox",
    required: true,
  },
];

export const PROPOSAL_FORM = {
  heading: "Project Requirements",
  submitLabel: "Submit Proposal Request",
  trust: "Your information will only be used to review your project and prepare a response.",
};
