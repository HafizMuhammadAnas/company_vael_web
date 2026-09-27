import {
  Bot,
  Camera,
  FileText,
  Languages,
  Search,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { AiHeroVisual } from "@/components/sections/solutions/hero";
import { AiAutomationProcessSection } from "@/components/sections/solutions/ai/AiAutomationProcess";
import {
  ServiceCardsSection,
  ServiceClientsSection,
  ServiceFaqCtaSection,
  ServiceProjectsSection,
} from "@/components/sections/solutions/ServiceJourney";
import {
  AI_FAQ,
  AI_FINAL,
  AI_HERO,
  AI_PROJECTS,
  AI_SEO,
  AI_SUB_SERVICES,
} from "@/content/aiAutomation";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const SERVICE_ICONS = [Sparkles, Bot, FileText, Camera, Languages, TrendingUp, Search, Workflow];

/**
 * Visitor journey:
 * Hero → logos → AI services → projects → process → FAQ + CTA.
 */
export function AiAutomationPage() {
  useDocumentMeta(AI_SEO.title, AI_SEO.description);
  useScrollReveal();
  const { projects } = usePublishedProjects();

  return (
    <DomainShell domain="ai">
      <PageHero
        domain="ai"
        label={AI_HERO.label}
        title={AI_HERO.title}
        supporting={AI_HERO.supporting}
        primaryCta={AI_HERO.primaryCta}
        secondaryCta={{ label: "Start your project", to: "#start-project" }}
        visual={<AiHeroVisual />}
        visualLabel="AI capability map"
      />

      <ServiceClientsSection />
      <ServiceCardsSection
        data={AI_SUB_SERVICES}
        icons={SERVICE_ICONS}
        visuals={[
          "automation",
          "documents",
          "chatbot",
          "rag",
          "agents",
          "vision",
          "aiRoadmap",
          "aiEmbed",
        ]}
      />
      <ServiceProjectsSection meta={AI_PROJECTS} projects={projects} />
      <AiAutomationProcessSection />
      <ServiceFaqCtaSection faqSlug="ai-automation" faq={AI_FAQ} finalCta={AI_FINAL} />
    </DomainShell>
  );
}
