export type ProjectStatus = "draft" | "published";

export interface Project {
  id: number;
  slug: string;
  title: string;
  industry: string;
  service: string;
  location: string;
  image_url: string;
  image_alt: string;
  live_url: string;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedProjects {
  items: Project[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface ProjectStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}

export interface ProjectFilters {
  status?: ProjectStatus | "";
  q?: string;
  page?: number;
  page_size?: number;
}

export interface ProjectFormValues {
  slug: string;
  title: string;
  industry: string;
  service: string;
  location: string;
  image_url: string;
  image_alt: string;
  live_url: string;
  status: ProjectStatus;
  featured: boolean;
  sort_order: number;
}
