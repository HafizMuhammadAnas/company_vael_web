export type LeadFormType = "contact" | "consultation" | "proposal";
export type LeadStatus = "new" | "read" | "archived";

export interface LeadAttachment {
  id: number;
  original_filename: string;
  content_type: string | null;
  size_bytes: number;
  created_at: string;
}

export interface LeadListItem {
  id: number;
  form_type: LeadFormType;
  status: LeadStatus;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  created_at: string;
  attachment_count: number;
}

export interface LeadDetail {
  id: number;
  form_type: LeadFormType;
  status: LeadStatus;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  payload: Record<string, string>;
  privacy_consent: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
  attachments: LeadAttachment[];
}

export interface PaginatedLeads {
  items: LeadListItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface LeadStats {
  total: number;
  new: number;
  read: number;
  archived: number;
  contact: number;
  consultation: number;
  proposal: number;
  attachments: number;
}

export interface LeadFilters {
  form_type?: LeadFormType | "";
  status?: LeadStatus | "";
  q?: string;
  page?: number;
  page_size?: number;
}
