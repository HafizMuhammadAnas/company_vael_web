import { useQuery } from "@tanstack/react-query";

import {
  CAREERS_FINAL,
  CAREERS_HERO,
  CAREERS_LOOK_FOR,
  CAREERS_OPPORTUNITIES,
  CAREERS_SEO,
  CAREERS_WHY,
} from "@/content/careers";
import { fetchPublicCareers } from "@/services/careers";
import type { CareerJob } from "@/types/career";

export function usePublicCareers() {
  const query = useQuery({
    queryKey: ["public-careers"],
    queryFn: fetchPublicCareers,
    staleTime: 60_000,
    retry: 1,
  });

  if (query.isSuccess) {
    const s = query.data.settings;
    return {
      seo: { title: s.seo_title, description: s.seo_description },
      hero: {
        label: s.hero_label,
        title: s.hero_title,
        supporting: s.hero_supporting,
      },
      why: {
        label: s.why_label,
        heading: s.why_heading,
        cards: s.why_cards as Array<{ title: string; text: string }>,
      },
      lookFor: {
        label: s.look_label,
        heading: s.look_heading,
        supporting: s.look_supporting,
        qualities: s.look_qualities as string[],
      },
      opportunities: {
        label: s.opportunities_label,
        heading: s.opportunities_heading,
        emptyState: s.empty_state as string[],
        cta: { label: s.profile_cta_label, href: s.profile_cta_href },
      },
      finalCta: {
        label: s.final_label,
        heading: s.final_heading,
        supporting: s.final_supporting,
        primaryCta: { label: s.final_cta_label, to: s.final_cta_to },
      },
      jobs: query.data.jobs as CareerJob[],
      source: "api" as const,
      isLoading: false,
      isError: false,
    };
  }

  return {
    seo: CAREERS_SEO,
    hero: CAREERS_HERO,
    why: CAREERS_WHY,
    lookFor: CAREERS_LOOK_FOR,
    opportunities: CAREERS_OPPORTUNITIES,
    finalCta: CAREERS_FINAL,
    jobs: [] as CareerJob[],
    source: "fallback" as const,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
