import {
  Compass,
  Lightbulb,
  Map,
  Route,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/elevated/Elevate";
import { ConsultingHeroVisual } from "@/components/sections/solutions/hero";
import { ConsultingProcessSection } from "@/components/sections/solutions/consulting/ConsultingProcess";
import {
  ServiceCardsSection,
  ServiceClientsSection,
  ServiceFaqCtaSection,
  ServiceTestimonialsSection,
} from "@/components/sections/solutions/ServiceJourney";
import {
  TC_FAQ,
  TC_FINAL,
  TC_HERO,
  TC_SEO,
  TC_SUB_SERVICES,
} from "@/content/technologyConsulting";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [Compass, Search, Map, Scale, Route, Lightbulb, ShieldCheck];

/**
 * Visitor journey:
 * Hero → logos → consulting services → advisory decision map →
 * Google reviews → FAQ + CTA.
 */
export function TechnologyConsultingPage() {
  useDocumentMeta(TC_SEO.title, TC_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="consulting">
      <PageHero
        domain="consulting"
        label={TC_HERO.label}
        title={TC_HERO.title}
        supporting={TC_HERO.supporting}
        primaryCta={TC_HERO.primaryCta}
        secondaryCta={{ label: "Start a conversation", to: "#start-project" }}
        visual={<ConsultingHeroVisual />}
        visualLabel="Consulting engagement map"
      />

      <ServiceClientsSection />
      <ServiceCardsSection
        data={TC_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={[
          "workshop",
          "techArch",
          "buildBuy",
          "consultRoadmap",
          "audit",
          "vendor",
          "scoping",
        ]}
      />
      <ConsultingProcessSection />
      <ServiceTestimonialsSection />
      <ServiceFaqCtaSection faq={TC_FAQ} finalCta={TC_FINAL} />
    </DomainShell>
  );
}
