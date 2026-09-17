import { apiClient } from "@/services/apiClient";
import type {
  PaginatedProjects,
  Project,
  ProjectFilters,
  ProjectFormValues,
  ProjectStats,
} from "@/types/project";

export async function fetchProjectStats(): Promise<ProjectStats> {
  const { data } = await apiClient.get<ProjectStats>("/admin/projects/stats");
  return data;
}

export async function fetchProjects(filters: ProjectFilters = {}): Promise<PaginatedProjects> {
  const { data } = await apiClient.get<PaginatedProjects>("/admin/projects", {
    params: {
      status: filters.status || undefined,
      q: filters.q || undefined,
      page: filters.page ?? 1,
      page_size: filters.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchProject(id: number): Promise<Project> {
  const { data } = await apiClient.get<Project>(`/admin/projects/${id}`);
  return data;
}

function toFormData(values: ProjectFormValues, image?: File | null): FormData {
  const form = new FormData();
  form.append("slug", values.slug);
  form.append("title", values.title);
  form.append("industry", values.industry);
  form.append("service", values.service);
  form.append("location", values.location);
  form.append("live_url", values.live_url);
  form.append("image_url", values.image_url || "");
  form.append("image_alt", values.image_alt || "");
  form.append("status", values.status);
  form.append("featured", String(values.featured));
  form.append("sort_order", String(values.sort_order));
  if (image) form.append("image", image);
  return form;
}

export async function createProject(values: ProjectFormValues, image?: File | null): Promise<Project> {
  const { data } = await apiClient.post<Project>("/admin/projects", toFormData(values, image), {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateProject(
  id: number,
  values: ProjectFormValues,
  image?: File | null,
): Promise<Project> {
  const { data } = await apiClient.patch<Project>(
    `/admin/projects/${id}`,
    toFormData(values, image),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function deleteProject(id: number): Promise<void> {
  await apiClient.delete(`/admin/projects/${id}`);
}

export async function fetchPublishedProjects(pageSize = 50): Promise<Project[]> {
  const { data } = await apiClient.get<PaginatedProjects>("/public/projects", {
    params: { page: 1, page_size: pageSize },
  });
  return data.items;
}
