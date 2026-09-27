import { useQuery } from "@tanstack/react-query";

import { FAQ_CATEGORIES } from "@/content/faqs";
import type { FaqCategory as StaticFaqCategory, FaqSection } from "@/content/shared";
import { fetchPublicFaqCategory, fetchPublicFaqs } from "@/services/faqs";

function mapPublicToStatic(
  categories: Array<{
    id: string;
    label: string;
    section_label: string;
    heading: string;
    items: Array<{ question: string; answer: string }>;
  }>,
): StaticFaqCategory[] {
  return categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    sectionLabel: cat.section_label,
    heading: cat.heading,
    items: cat.items.map((item) => ({ q: item.question, a: item.answer })),
  }));
}

export function usePublicFaqs() {
  const query = useQuery({
    queryKey: ["public-faqs"],
    queryFn: fetchPublicFaqs,
    staleTime: 60_000,
    retry: 1,
  });

  if (query.isSuccess && query.data.categories.length > 0) {
    return {
      categories: mapPublicToStatic(query.data.categories),
      source: "api" as const,
      isLoading: false,
      isError: false,
    };
  }

  return {
    categories: FAQ_CATEGORIES,
    source: "fallback" as const,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

/** Single category as FaqSection for service/home pages. */
export function usePublicFaqSection(slug: string, fallback: FaqSection): FaqSection {
  const query = useQuery({
    queryKey: ["public-faq-category", slug],
    queryFn: () => fetchPublicFaqCategory(slug),
    staleTime: 60_000,
    retry: 1,
  });

  if (query.isSuccess) {
    return {
      label: query.data.section_label || query.data.label,
      heading: query.data.heading,
      items: query.data.items.map((item) => ({ q: item.question, a: item.answer })),
    };
  }

  return fallback;
}
