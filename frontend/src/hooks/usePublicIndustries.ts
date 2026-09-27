import { useQuery } from "@tanstack/react-query";

import { INDUSTRIES } from "@/content/home";
import { fetchPublicIndustries } from "@/services/industries";

export function usePublicIndustries() {
  const query = useQuery({
    queryKey: ["public-industries"],
    queryFn: fetchPublicIndustries,
    staleTime: 60_000,
    retry: 1,
  });

  if (query.isSuccess && query.data.industries.length > 0) {
    const s = query.data.settings;
    return {
      label: s.label,
      heading: s.heading,
      supporting: s.supporting,
      cards: query.data.industries.map((item) => ({
        title: item.title,
        short: item.short || item.title,
        iconKey: item.icon_key,
        accentKey: item.accent_key,
        slug: item.slug,
      })),
      source: "api" as const,
      isLoading: false,
      isError: false,
    };
  }

  return {
    label: INDUSTRIES.label,
    heading: INDUSTRIES.heading,
    supporting: INDUSTRIES.supporting,
    cards: INDUSTRIES.cards.map((card, i) => ({
      title: card.title,
      short: card.short,
      iconKey: ["building", "book", "heart", "sprout", "chart", "truck", "shopping"][i] ?? "building",
      accentKey: ["neon", "violet", "pink", "neon", "violet", "blue", "pink"][i] ?? "neon",
      slug: card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    })),
    source: "fallback" as const,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
