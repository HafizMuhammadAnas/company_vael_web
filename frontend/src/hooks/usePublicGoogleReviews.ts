import { useQuery } from "@tanstack/react-query";

import { GOOGLE_REVIEWS, type GoogleReview as StaticReview } from "@/content/googleReviews";
import { fetchPublicReviews } from "@/services/googleReviews";

export function usePublicGoogleReviews() {
  const query = useQuery({
    queryKey: ["public-google-reviews"],
    queryFn: fetchPublicReviews,
    staleTime: 60_000,
    retry: 1,
  });

  if (query.isSuccess) {
    const { settings, reviews } = query.data;
    return {
      heading: settings.heading,
      summaryLabel: settings.summary_label,
      rating: settings.rating,
      reviewCount: settings.review_count,
      profileUrl: settings.profile_url,
      reviews: reviews.map(
        (review): StaticReview => ({
          id: String(review.id),
          author: review.author,
          relativeTime: review.relative_time,
          rating: review.rating,
          text: review.text,
          initials: review.initials || undefined,
          avatarSrc: review.avatar_src || undefined,
          avatarColor: review.avatar_color || undefined,
        }),
      ),
      source: "api" as const,
      isLoading: false,
      isError: false,
    };
  }

  return {
    heading: GOOGLE_REVIEWS.heading,
    summaryLabel: GOOGLE_REVIEWS.summaryLabel,
    rating: GOOGLE_REVIEWS.rating,
    reviewCount: GOOGLE_REVIEWS.reviewCount,
    profileUrl: GOOGLE_REVIEWS.profileUrl,
    reviews: GOOGLE_REVIEWS.reviews,
    source: "fallback" as const,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
