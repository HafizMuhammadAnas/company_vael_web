export interface FaqCategory {
  id: number;
  slug: string;
  label: string;
  section_label: string;
  heading: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  item_count: number;
}

export interface FaqItem {
  id: number;
  category_id: number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category_slug?: string | null;
  category_label?: string | null;
}

export interface PaginatedFaqItems {
  items: FaqItem[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface FaqStats {
  categories: number;
  items: number;
  active_items: number;
  inactive_items: number;
}

export interface PublicFaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface PublicFaqCategory {
  id: string;
  label: string;
  section_label: string;
  heading: string;
  sort_order: number;
  items: PublicFaqItem[];
}

export interface PublicFaqBlock {
  categories: PublicFaqCategory[];
}

export interface FaqCategoryFormValues {
  slug: string;
  label: string;
  section_label: string;
  heading: string;
  is_active: boolean;
  sort_order: number;
}

export interface FaqItemFormValues {
  category_id: number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
}
