import {
  Activity,
  Boxes,
  Cloud,
  Container,
  GitBranch,
  Server,
  Shield,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/elevated/Elevate";
import { CloudHeroVisual } from "@/components/sections/solutions/hero";
import { CloudProcessSection } from "@/components/sections/solutions/cloud/CloudProcess";
import {
  ServiceCardsSection,
  ServiceClientsSection,
  ServiceFaqCtaSection,
  ServiceTestimonialsSection,
} from "@/components/sections/solutions/ServiceJourney";
import {
  CLOUD_FAQ,
  CLOUD_FINAL,
  CLOUD_HERO,
  CLOUD_SEO,
  CLOUD_SUB_SERVICES,
} from "@/content/cloudDevops";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [Cloud, GitBranch, Container, Server, Shield, Activity, Boxes];

/**
 * Visitor journey:
 * Hero → logos → cloud services → process → Google reviews → FAQ + CTA.
 */
export function CloudDevOpsPage() {
  useDocumentMeta(CLOUD_SEO.title, CLOUD_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="cloud">
      <PageHero
        domain="cloud"
        label={CLOUD_HERO.label}
        title={CLOUD_HERO.title}
        supporting={CLOUD_HERO.supporting}
        primaryCta={CLOUD_HERO.primaryCta}
        secondaryCta={{ label: "Start your project", to: "#start-project" }}
        visual={<CloudHeroVisual />}
        visualLabel="Cloud and delivery overview"
      />

      <ServiceClientsSection />
      <ServiceCardsSection
        data={CLOUD_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={["cloudSetup", "cloudMigrate", "cicd", "monitor", "secure", "cost", "envs"]}
      />
      <CloudProcessSection />
      <ServiceTestimonialsSection />
      <ServiceFaqCtaSection faq={CLOUD_FAQ} finalCta={CLOUD_FINAL} />
    </DomainShell>
  );
}
