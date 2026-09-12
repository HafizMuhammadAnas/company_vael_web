import type { LeadFieldConfig } from "@/components/forms/LeadForm";
import { CONTACT_FORM_FIELDS } from "@/content/contact";
import { CONSULT_FORM_FIELDS } from "@/content/consultation";
import { PROPOSAL_FORM_FIELDS } from "@/content/requestProposal";
import type { LeadFormType, LeadStatus } from "@/types/lead";

export const FORM_TYPE_LABELS: Record<LeadFormType, string> = {
  contact: "Contact Us",
  consultation: "Consultation",
  proposal: "Proposal Request",
};

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

const FORM_FIELDS: Record<LeadFormType, LeadFieldConfig[]> = {
  contact: CONTACT_FORM_FIELDS,
  consultation: CONSULT_FORM_FIELDS,
  proposal: PROPOSAL_FORM_FIELDS,
};

/** Payload-only field names in display order for each form type. */
export const PAYLOAD_FIELD_ORDER: Record<LeadFormType, string[]> = {
  contact: ["message"],
  consultation: [
    "project_type",
    "contact_method",
    "description",
    "preferred_time",
  ],
  proposal: [
    "project_name",
    "project_type",
    "description",
    "target_users",
    "key_requirements",
    "existing_system",
    "technology_requirements",
    "timeline",
    "budget",
  ],
};

const PAYLOAD_LABELS: Record<string, string> = {};

for (const fields of Object.values(FORM_FIELDS)) {
  for (const field of fields) {
    if (field.type === "file" || field.type === "checkbox") continue;
    if (field.name in { full_name: 1, email: 1, phone: 1, company: 1, country: 1 }) continue;
    PAYLOAD_LABELS[field.name] = field.label;
  }
}

export function getPayloadFieldLabel(key: string): string {
  return PAYLOAD_LABELS[key] ?? key.replace(/_/g, " ");
}

export function getOrderedPayloadEntries(
  formType: LeadFormType,
  payload: Record<string, string>,
): Array<[string, string]> {
  const order = PAYLOAD_FIELD_ORDER[formType] ?? [];
  const keys = Object.keys(payload);
  const sorted = [...order.filter((key) => key in payload), ...keys.filter((key) => !order.includes(key))];
  return sorted.map((key) => [key, payload[key] ?? ""]);
}

export function formatFormType(formType: LeadFormType): string {
  return FORM_TYPE_LABELS[formType] ?? formType;
}

export function formatStatus(status: LeadStatus): string {
  return STATUS_LABELS[status] ?? status;
}
