import { apiClient } from "@/services/apiClient";
import type {
  GoogleReview,
  GoogleReviewSettings,
  GoogleReviewStats,
  PaginatedGoogleReviews,
  PublicGoogleReviewsBlock,
  ReviewFormValues,
  ReviewSettingsFormValues,
} from "@/types/googleReview";

export async function fetchReviewStats(): Promise<GoogleReviewStats> {
  const { data } = await apiClient.get<GoogleReviewStats>("/admin/reviews/stats");
  return data;
}

export async function fetchReviewSettings(): Promise<GoogleReviewSettings> {
  const { data } = await apiClient.get<GoogleReviewSettings>("/admin/reviews/settings");
  return data;
}

export async function updateReviewSettings(
  values: ReviewSettingsFormValues,
): Promise<GoogleReviewSettings> {
  const { data } = await apiClient.patch<GoogleReviewSettings>("/admin/reviews/settings", values);
  return data;
}

export async function fetchReviews(params: {
  is_active?: boolean | "";
  q?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<PaginatedGoogleReviews> {
  const { data } = await apiClient.get<PaginatedGoogleReviews>("/admin/reviews", {
    params: {
      is_active: params.is_active === "" || params.is_active === undefined ? undefined : params.is_active,
      q: params.q || undefined,
      page: params.page ?? 1,
      page_size: params.page_size ?? 20,
    },
  });
  return data;
}

export async function fetchReview(id: number): Promise<GoogleReview> {
  const { data } = await apiClient.get<GoogleReview>(`/admin/reviews/${id}`);
  return data;
}

export async function createReview(values: ReviewFormValues): Promise<GoogleReview> {
  const { data } = await apiClient.post<GoogleReview>("/admin/reviews", values);
  return data;
}

export async function updateReview(id: number, values: ReviewFormValues): Promise<GoogleReview> {
  const { data } = await apiClient.patch<GoogleReview>(`/admin/reviews/${id}`, values);
  return data;
}

export async function deleteReview(id: number): Promise<void> {
  await apiClient.delete(`/admin/reviews/${id}`);
}

export async function fetchPublicReviews(): Promise<PublicGoogleReviewsBlock> {
  const { data } = await apiClient.get<PublicGoogleReviewsBlock>("/public/reviews");
  return data;
}
