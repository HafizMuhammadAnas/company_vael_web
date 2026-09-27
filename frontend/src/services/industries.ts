import { apiClient } from "@/services/apiClient";
import type {
  Industry,
  IndustryFormValues,
  IndustrySettings,
  IndustrySettingsFormValues,
  IndustryStats,
  PaginatedIndustries,
  PublicIndustriesBlock,
} from "@/types/industry";

export async function fetchIndustryStats(): Promise<IndustryStats> {
  const { data } = await apiClient.get<IndustryStats>("/admin/industries/stats");
  return data;
}

export async function fetchIndustrySettings(): Promise<IndustrySettings> {
  const { data } = await apiClient.get<IndustrySettings>("/admin/industries/settings");
  return data;
}

export async function updateIndustrySettings(
  values: IndustrySettingsFormValues,
): Promise<IndustrySettings> {
  const { data } = await apiClient.patch<IndustrySettings>("/admin/industries/settings", values);
  return data;
}

export async function fetchIndustries(params: {
  is_active?: boolean | "";
  q?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<PaginatedIndustries> {
  const { data } = await apiClient.get<PaginatedIndustries>("/admin/industries", {
    params: {
      is_active:
        params.is_active === "" || params.is_active === undefined ? undefined : params.is_active,
      q: params.q || undefined,
      page: params.page ?? 1,
      page_size: params.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchIndustry(id: number): Promise<Industry> {
  const { data } = await apiClient.get<Industry>(`/admin/industries/${id}`);
  return data;
}

export async function createIndustry(values: IndustryFormValues): Promise<Industry> {
  const { data } = await apiClient.post<Industry>("/admin/industries", values);
  return data;
}

export async function updateIndustry(id: number, values: IndustryFormValues): Promise<Industry> {
  const { data } = await apiClient.patch<Industry>(`/admin/industries/${id}`, values);
  return data;
}

export async function deleteIndustry(id: number): Promise<void> {
  await apiClient.delete(`/admin/industries/${id}`);
}

export async function fetchPublicIndustries(): Promise<PublicIndustriesBlock> {
  const { data } = await apiClient.get<PublicIndustriesBlock>("/public/industries");
  return data;
}
