import { useQuery } from "@tanstack/react-query";

import { INS_BLOG, type BlogPreview } from "@/content/insights";
import { fetchPublicInsight, fetchPublicInsights } from "@/services/insights";
import type { Insight, InsightListItem } from "@/types/insight";

function toPreview(item: InsightListItem): BlogPreview {
  return {
    category: item.category,
    tags: item.tags,
    title: item.title,
    description: item.description,
    readTime: item.read_time,
    cover: item.cover,
    status: item.status === "published" ? "published" : "coming-soon",
    publishedDate: item.published_date ?? undefined,
    slug: item.slug,
    featured: item.featured,
  };
}

/** Public insights index (published + coming soon). Falls back to static previews. */
export function usePublicInsights() {
  const query = useQuery({
    queryKey: ["public-insights"],
    queryFn: () => fetchPublicInsights(100),
    staleTime: 60_000,
    retry: 1,
  });

  const previews: BlogPreview[] = query.isSuccess
    ? query.data.map(toPreview)
    : INS_BLOG.previews;

  return {
    previews,
    isLoading: query.isLoading,
    isError: query.isError,
    source: query.isSuccess ? ("api" as const) : ("fallback" as const),
  };
}

export function usePublicInsight(slug: string | undefined) {
  return useQuery<Insight>({
    queryKey: ["public-insight", slug],
    queryFn: () => fetchPublicInsight(slug as string),
    enabled: Boolean(slug),
    retry: 1,
  });
}
