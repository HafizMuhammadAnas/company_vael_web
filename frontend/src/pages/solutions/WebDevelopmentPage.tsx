import {
  CalendarCheck,
  Code2,
  FileText,
  Gauge,
  Globe2,
  LayoutTemplate,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { WebHeroVisual } from "@/components/sections/solutions/hero";
import { ServiceCardsSection } from "@/components/sections/solutions/ServiceJourney";
import {
  WebClientsSection,
  WebFaqCtaSection,
  WebProcessSection,
  WebProjectsSection,
  WebQualitySection,
} from "@/components/sections/solutions/web/WebDevelopmentVisuals";
import { WEB_HERO, WEB_SEO, WEB_SUB_SERVICES } from "@/content/webDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [
  Globe2,
  LayoutTemplate,
  ShoppingCart,
  FileText,
  RefreshCw,
  Code2,
  Gauge,
  CalendarCheck,
];

/**
 * Visitor journey:
 * Hero → client logos → web services → projects → process →
 * quality checks → FAQ + CTA row.
 */
export function WebDevelopmentPage() {
  useDocumentMeta(WEB_SEO.title, WEB_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="web">
      <PageHero
        domain="web"
        label={WEB_HERO.label}
        title={WEB_HERO.title}
        supporting={WEB_HERO.supporting}
        primaryCta={WEB_HERO.primaryCta}
        secondaryCta={{ label: "Start your project", to: "#start-project" }}
        visual={<WebHeroVisual />}
        visualLabel="Web platforms overview"
      />

      <WebClientsSection />
      <ServiceCardsSection
        data={WEB_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={["sitemap", "funnel", "shop", "cms", "migrate", "arch", "vitals", "forms"]}
      />
      <WebProjectsSection />
      <WebProcessSection />
      <WebQualitySection />
      <WebFaqCtaSection />
    </DomainShell>
  );
}
