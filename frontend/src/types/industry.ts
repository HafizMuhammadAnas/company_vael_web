export interface IndustrySettings {
  id: number;
  label: string;
  heading: string;
  supporting: string;
  updated_at: string;
}

export interface Industry {
  id: number;
  slug: string;
  title: string;
  short: string;
  icon_key: string;
  accent_key: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedIndustries {
  items: Industry[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface IndustryStats {
  total: number;
  active: number;
  inactive: number;
}

export interface PublicIndustriesBlock {
  settings: IndustrySettings;
  industries: Industry[];
}

export interface IndustrySettingsFormValues {
  label: string;
  heading: string;
  supporting: string;
}

export interface IndustryFormValues {
  slug: string;
  title: string;
  short: string;
  icon_key: string;
  accent_key: string;
  is_active: boolean;
  sort_order: number;
}
