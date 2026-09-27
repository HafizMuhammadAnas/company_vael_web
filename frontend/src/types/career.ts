export interface CareerSettings {
  id: number;
  seo_title: string;
  seo_description: string;
  hero_label: string;
  hero_title: string;
  hero_supporting: string;
  why_label: string;
  why_heading: string;
  why_cards: Array<{ title: string; text: string }>;
  look_label: string;
  look_heading: string;
  look_supporting: string;
  look_qualities: string[];
  opportunities_label: string;
  opportunities_heading: string;
  empty_state: string[];
  profile_cta_label: string;
  profile_cta_href: string;
  final_label: string;
  final_heading: string;
  final_supporting: string;
  final_cta_label: string;
  final_cta_to: string;
  updated_at: string;
}

export type CareerJobStatus = "draft" | "published";

export interface CareerJob {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  summary: string;
  description: string;
  requirements: string[];
  apply_href: string;
  status: CareerJobStatus;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedCareerJobs {
  items: CareerJob[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface CareerStats {
  total: number;
  published: number;
  draft: number;
}

export interface PublicCareersBlock {
  settings: CareerSettings;
  jobs: CareerJob[];
}

export type CareerSettingsFormValues = Omit<CareerSettings, "id" | "updated_at">;

export interface CareerJobFormValues {
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  summary: string;
  description: string;
  requirements: string[];
  apply_href: string;
  status: CareerJobStatus;
  is_active: boolean;
  sort_order: number;
}
