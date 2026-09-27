import { apiClient } from "@/services/apiClient";
import type {
  CareerJob,
  CareerJobFormValues,
  CareerSettings,
  CareerSettingsFormValues,
  CareerStats,
  PaginatedCareerJobs,
  PublicCareersBlock,
} from "@/types/career";

export async function fetchCareerStats(): Promise<CareerStats> {
  const { data } = await apiClient.get<CareerStats>("/admin/careers/stats");
  return data;
}

export async function fetchCareerSettings(): Promise<CareerSettings> {
  const { data } = await apiClient.get<CareerSettings>("/admin/careers/settings");
  return data;
}

export async function updateCareerSettings(
  values: CareerSettingsFormValues,
): Promise<CareerSettings> {
  const { data } = await apiClient.patch<CareerSettings>("/admin/careers/settings", values);
  return data;
}

export async function fetchCareerJobs(params: {
  status?: string;
  is_active?: boolean | "";
  q?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<PaginatedCareerJobs> {
  const { data } = await apiClient.get<PaginatedCareerJobs>("/admin/careers/jobs", {
    params: {
      status: params.status || undefined,
      is_active:
        params.is_active === "" || params.is_active === undefined ? undefined : params.is_active,
      q: params.q || undefined,
      page: params.page ?? 1,
      page_size: params.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchCareerJob(id: number): Promise<CareerJob> {
  const { data } = await apiClient.get<CareerJob>(`/admin/careers/jobs/${id}`);
  return data;
}

export async function createCareerJob(values: CareerJobFormValues): Promise<CareerJob> {
  const { data } = await apiClient.post<CareerJob>("/admin/careers/jobs", values);
  return data;
}

export async function updateCareerJob(id: number, values: CareerJobFormValues): Promise<CareerJob> {
  const { data } = await apiClient.patch<CareerJob>(`/admin/careers/jobs/${id}`, values);
  return data;
}

export async function deleteCareerJob(id: number): Promise<void> {
  await apiClient.delete(`/admin/careers/jobs/${id}`);
}

export async function fetchPublicCareers(): Promise<PublicCareersBlock> {
  const { data } = await apiClient.get<PublicCareersBlock>("/public/careers");
  return data;
}
