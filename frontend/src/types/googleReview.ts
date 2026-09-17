export interface GoogleReviewSettings {
  id: number;
  heading: string;
  summary_label: string;
  rating: number;
  review_count: number;
  profile_url: string;
  updated_at: string;
}

export interface GoogleReview {
  id: number;
  author: string;
  relative_time: string;
  rating: number;
  text: string;
  initials: string;
  avatar_src: string;
  avatar_color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedGoogleReviews {
  items: GoogleReview[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface GoogleReviewStats {
  total: number;
  active: number;
  inactive: number;
}

export interface PublicGoogleReviewsBlock {
  settings: GoogleReviewSettings;
  reviews: GoogleReview[];
}

export interface ReviewFormValues {
  author: string;
  relative_time: string;
  rating: number;
  text: string;
  initials: string;
  avatar_src: string;
  avatar_color: string;
  is_active: boolean;
  sort_order: number;
}

export interface ReviewSettingsFormValues {
  heading: string;
  summary_label: string;
  rating: number;
  review_count: number;
  profile_url: string;
}
