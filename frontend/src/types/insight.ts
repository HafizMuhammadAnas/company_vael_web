export type InsightStatus = "draft" | "coming-soon" | "published";
export type InsightCover = "mesh" | "orbits" | "circuits" | "waves" | "nodes" | "book";

export interface Insight {
  id: number;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  body: string;
  read_time: string;
  cover: InsightCover;
  status: InsightStatus;
  featured: boolean;
  published_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface InsightListItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  read_time: string;
  cover: InsightCover;
  status: InsightStatus;
  featured: boolean;
  published_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedInsights {
  items: InsightListItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface InsightStats {
  total: number;
  published: number;
  coming_soon: number;
  draft: number;
  featured: number;
}

export interface InsightFilters {
  status?: InsightStatus | "";
  q?: string;
  page?: number;
  page_size?: number;
}

export interface InsightFormValues {
  slug: string;
  title: string;
  category: string;
  tags: string;
  description: string;
  body: string;
  read_time: string;
  cover: InsightCover;
  status: InsightStatus;
  featured: boolean;
  published_date: string;
  sort_order: number;
}
