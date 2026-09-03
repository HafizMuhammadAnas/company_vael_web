import { apiClient } from "@/services/apiClient";
import type { LeadDetail, LeadFilters, LeadStats, LeadStatus, PaginatedLeads } from "@/types/lead";

export async function fetchLeadStats(): Promise<LeadStats> {
  const { data } = await apiClient.get<LeadStats>("/admin/leads/stats");
  return data;
}

export async function fetchLeads(filters: LeadFilters = {}): Promise<PaginatedLeads> {
  const params: Record<string, string | number> = {
    page: filters.page ?? 1,
    page_size: filters.page_size ?? 10,
  };
  if (filters.form_type) params.form_type = filters.form_type;
  if (filters.status) params.status = filters.status;
  if (filters.q?.trim()) params.q = filters.q.trim();

  const { data } = await apiClient.get<PaginatedLeads>("/admin/leads", { params });
  return data;
}

export async function fetchLead(id: number): Promise<LeadDetail> {
  const { data } = await apiClient.get<LeadDetail>(`/admin/leads/${id}`);
  return data;
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<LeadDetail> {
  const { data } = await apiClient.patch<LeadDetail>(`/admin/leads/${id}`, { status });
  return data;
}

export async function downloadAttachment(leadId: number, attachmentId: number): Promise<void> {
  const response = await apiClient.get(`/admin/leads/${leadId}/attachments/${attachmentId}`, {
    responseType: "blob",
  });

  const disposition = response.headers["content-disposition"] as string | undefined;
  let filename = "download";
  if (disposition) {
    const match = /filename="?([^"]+)"?/.exec(disposition);
    if (match?.[1]) filename = match[1];
  }

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
