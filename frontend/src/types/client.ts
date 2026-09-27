export interface Client {
  id: number;
  slug: string;
  name: string;
  logo_url: string;
  logo_alt: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedClients {
  items: Client[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface ClientStats {
  total: number;
  active: number;
  inactive: number;
}

export interface ClientFilters {
  is_active?: boolean | "";
  q?: string;
  page?: number;
  page_size?: number;
}

export interface ClientFormValues {
  slug: string;
  name: string;
  logo_url: string;
  logo_alt: string;
  is_active: boolean;
  sort_order: number;
}
