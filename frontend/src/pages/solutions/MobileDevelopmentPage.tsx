import {
  AppWindow,
  Code2,
  LayoutTemplate,
  Smartphone,
  Store,
  TabletSmartphone,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { MobileHeroVisual } from "@/components/sections/solutions/hero";
import { MobileProcessSection } from "@/components/sections/solutions/mobile/MobileProcess";
import {
  ServiceCardsSection,
  ServiceClientsSection,
  ServiceFaqCtaSection,
} from "@/components/sections/solutions/ServiceJourney";
import {
  MOB_FAQ,
  MOB_FINAL,
  MOB_HERO,
  MOB_SEO,
  MOB_SUB_SERVICES,
} from "@/content/mobileDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [Smartphone, TabletSmartphone, AppWindow, LayoutTemplate, Store, Code2];

/**
 * Visitor journey:
 * Hero → logos → mobile services → process → FAQ + CTA.
 */
export function MobileDevelopmentPage() {
  useDocumentMeta(MOB_SEO.title, MOB_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="mobile">
      <PageHero
        domain="mobile"
        label={MOB_HERO.label}
        title={MOB_HERO.title}
        supporting={MOB_HERO.supporting}
        primaryCta={MOB_HERO.primaryCta}
        secondaryCta={{ label: "Start your project", to: "#start-project" }}
        visual={<MobileHeroVisual />}
        visualLabel="Mobile product overview"
      />

      <ServiceClientsSection />
      <ServiceCardsSection
        data={MOB_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={["phones", "cross", "pwa", "appApi", "store", "maintain"]}
      />
      <MobileProcessSection />
      <ServiceFaqCtaSection faq={MOB_FAQ} finalCta={MOB_FINAL} />
    </DomainShell>
  );
}
