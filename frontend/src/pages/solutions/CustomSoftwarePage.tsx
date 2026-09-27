import {
  Boxes,
  Code2,
  Layers,
  Link2,
  RefreshCw,
  Settings,
  Workflow,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { SoftwareHeroVisual } from "@/components/sections/solutions/hero";
import {
  ServiceCardsSection,
  ServiceClientsSection,
  ServiceFaqCtaSection,
  ServiceProjectsSection,
} from "@/components/sections/solutions/ServiceJourney";
import { CustomSoftwareProcessSection } from "@/components/sections/solutions/software/CustomSoftwareProcess";
import {
  CS_FAQ,
  CS_FINAL,
  CS_HERO,
  CS_PROJECTS,
  CS_SEO,
  CS_SUB_SERVICES,
} from "@/content/customSoftware";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [Code2, Layers, Settings, Workflow, Link2, RefreshCw, Boxes];

/**
 * Visitor journey:
 * Hero → logos → software services → projects → process → FAQ + CTA.
 */
export function CustomSoftwarePage() {
  useDocumentMeta(CS_SEO.title, CS_SEO.description);
  useScrollReveal();
  const { projects } = usePublishedProjects();

  return (
    <DomainShell domain="software">
      <PageHero
        domain="software"
        label={CS_HERO.label}
        title={CS_HERO.title}
        supporting={CS_HERO.supporting}
        primaryCta={CS_HERO.primaryCta}
        secondaryCta={{ label: "Start your project", to: "#start-project" }}
        visual={<SoftwareHeroVisual />}
        visualLabel="Custom software building blocks"
      />

      <ServiceClientsSection />
      <ServiceCardsSection
        data={CS_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={["app", "portal", "admin", "workflow", "api", "migrate", "mvp"]}
      />
      <ServiceProjectsSection meta={CS_PROJECTS} projects={projects} />
      <CustomSoftwareProcessSection />
      <ServiceFaqCtaSection faqSlug="custom-software" faq={CS_FAQ} finalCta={CS_FINAL} />
    </DomainShell>
  );
}
