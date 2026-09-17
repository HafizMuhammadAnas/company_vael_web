import { apiClient } from "@/services/apiClient";
import type {
  Client,
  ClientFilters,
  ClientFormValues,
  ClientStats,
  PaginatedClients,
} from "@/types/client";

export async function fetchClientStats(): Promise<ClientStats> {
  const { data } = await apiClient.get<ClientStats>("/admin/clients/stats");
  return data;
}

export async function fetchClients(filters: ClientFilters = {}): Promise<PaginatedClients> {
  const { data } = await apiClient.get<PaginatedClients>("/admin/clients", {
    params: {
      is_active: filters.is_active === "" || filters.is_active === undefined ? undefined : filters.is_active,
      q: filters.q || undefined,
      page: filters.page ?? 1,
      page_size: filters.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchClient(id: number): Promise<Client> {
  const { data } = await apiClient.get<Client>(`/admin/clients/${id}`);
  return data;
}

function toFormData(values: ClientFormValues, logo?: File | null): FormData {
  const form = new FormData();
  form.append("slug", values.slug);
  form.append("name", values.name);
  form.append("logo_url", values.logo_url || "");
  form.append("logo_alt", values.logo_alt || "");
  form.append("is_active", String(values.is_active));
  form.append("sort_order", String(values.sort_order));
  if (logo) form.append("logo", logo);
  return form;
}

export async function createClient(values: ClientFormValues, logo?: File | null): Promise<Client> {
  const { data } = await apiClient.post<Client>("/admin/clients", toFormData(values, logo), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateClient(
  id: number,
  values: ClientFormValues,
  logo?: File | null,
): Promise<Client> {
  const { data } = await apiClient.patch<Client>(`/admin/clients/${id}`, toFormData(values, logo), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteClient(id: number): Promise<void> {
  await apiClient.delete(`/admin/clients/${id}`);
}

export async function fetchActiveClients(pageSize = 100): Promise<Client[]> {
  const { data } = await apiClient.get<PaginatedClients>("/public/clients", {
    params: { page: 1, page_size: pageSize },
  });
  return data.items;
}
