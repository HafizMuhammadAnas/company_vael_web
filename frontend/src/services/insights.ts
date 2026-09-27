import { apiClient } from "@/services/apiClient";
import type {
  Insight,
  InsightFilters,
  InsightFormValues,
  InsightListItem,
  InsightStats,
  PaginatedInsights,
} from "@/types/insight";

function tagsFromForm(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function toPayload(values: InsightFormValues) {
  return {
    slug: values.slug,
    title: values.title,
    category: values.category,
    tags: tagsFromForm(values.tags),
    description: values.description,
    body: values.body,
    read_time: values.read_time,
    cover: values.cover,
    status: values.status,
    featured: values.featured,
    published_date: values.published_date.trim() || null,
    sort_order: values.sort_order,
  };
}

export async function fetchInsightStats(): Promise<InsightStats> {
  const { data } = await apiClient.get<InsightStats>("/admin/insights/stats");
  return data;
}

export async function fetchInsights(filters: InsightFilters = {}): Promise<PaginatedInsights> {
  const { data } = await apiClient.get<PaginatedInsights>("/admin/insights", {
    params: {
      status: filters.status || undefined,
      q: filters.q || undefined,
      page: filters.page ?? 1,
      page_size: filters.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchInsight(id: number): Promise<Insight> {
  const { data } = await apiClient.get<Insight>(`/admin/insights/${id}`);
  return data;
}

export async function createInsight(values: InsightFormValues): Promise<Insight> {
  const { data } = await apiClient.post<Insight>("/admin/insights", toPayload(values));
  return data;
}

export async function updateInsight(id: number, values: InsightFormValues): Promise<Insight> {
  const { data } = await apiClient.patch<Insight>(`/admin/insights/${id}`, toPayload(values));
  return data;
}

export async function deleteInsight(id: number): Promise<void> {
  await apiClient.delete(`/admin/insights/${id}`);
}

export async function fetchPublicInsights(pageSize = 50): Promise<InsightListItem[]> {
  const { data } = await apiClient.get<PaginatedInsights>("/public/insights", {
    params: { page: 1, page_size: pageSize },
  });
  return data.items;
}

export async function fetchPublicInsight(slug: string): Promise<Insight> {
  const { data } = await apiClient.get<Insight>(`/public/insights/${slug}`);
  return data;
}
