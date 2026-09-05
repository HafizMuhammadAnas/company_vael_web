import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Camera,
  Database,
  Eye,
  FileText,
  FlaskConical,
  Languages,
  Link2,
  Lock,
  Search,
  SearchCheck,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
AudienceAtlas,
  ExplorerList,
  FaqConsole,
  JourneyRail,
  PrincipleDeck,
  StackExplorer,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import {
  AI_APPROACH,
  AI_BUILD,
  AI_FAQ,
  AI_FINAL,
  AI_HERO,
  AI_INDUSTRIES,
  AI_INTEGRATION,
  AI_INTRO,
  AI_RESPONSIBLE,
  AI_SEO,
  AI_TECH,
  AI_USE_CASES,
  AI_WORK,
} from "@/content/aiAutomation";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTRO_ICONS = [SearchCheck, Sparkles, Link2];
const BUILD_ICONS = [Sparkles, Bot, FileText, Camera, Languages, TrendingUp];
const USE_CASE_ICONS = [Workflow, FileText, Search, BarChart3, Users, Link2];
const RESPONSIBLE_ICONS = [Users, Lock, FlaskConical, Eye, Shield, Activity];
const INTEGRATION_ICONS = [Boxes, BookOpen, Workflow, Webhook, Database];
const WORK_ICONS = [FileText, TrendingUp, BrainCircuit];

export function AiAutomationPage() {
  useDocumentMeta(AI_SEO.title, AI_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="ai">
      <>
      <PageHero
        domain="ai"
        label={AI_HERO.label}
        title={AI_HERO.title}
        supporting={AI_HERO.supporting}
        primaryCta={AI_HERO.primaryCta}
        secondaryCta={AI_HERO.secondaryCta}
        tags={AI_HERO.tags}
      />

      {/* 02 — The Opportunity */}
      <PrincipleDeck
        label={AI_INTRO.label}
        title={AI_INTRO.heading}
        supporting={AI_INTRO.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={AI_INTRO.cards}
        icons={INTRO_ICONS}
        eyebrowPrefix="Step"
        altBg
      />

      {/* 03 — What We Build */}
      <ExplorerList
        label={AI_BUILD.label}
        title={AI_BUILD.heading}
        supporting={AI_BUILD.supporting}
        icons={BUILD_ICONS}
        items={AI_BUILD.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.examples,
          href: AI_BUILD.cta.to,
          cta: card.cta,
        }))}
      />

      {/* 04 — Business Use Cases */}
      <PrincipleDeck
        label={AI_USE_CASES.label}
        title={AI_USE_CASES.heading}
        supporting={AI_USE_CASES.supporting}
        items={AI_USE_CASES.cards}
        icons={USE_CASE_ICONS}
        eyebrowPrefix="Use Case"
        altBg
      />

      {/* 05 — AI Across Industries */}
      <AudienceAtlas
        label={AI_INDUSTRIES.label}
        title={AI_INDUSTRIES.heading}
        supporting={AI_INDUSTRIES.supporting}
        cards={AI_INDUSTRIES.cards}
        footerCta={AI_INDUSTRIES.cta}
      />

      {/* 06 — AI Implementation Approach */}
      <JourneyRail
        label={AI_APPROACH.label}
        title={AI_APPROACH.heading}
        supporting={AI_APPROACH.supporting}
        steps={AI_APPROACH.steps}
        layout="vertical"
        altBg
      />

      {/* 07 — Responsible AI */}
      <PrincipleDeck
        label={AI_RESPONSIBLE.label}
        title={AI_RESPONSIBLE.heading}
        supporting={AI_RESPONSIBLE.supporting}
        items={AI_RESPONSIBLE.cards}
        icons={RESPONSIBLE_ICONS}
        eyebrowPrefix="Practice"
      />

      {/* 08 — AI Technology */}
      <StackExplorer
        label={AI_TECH.label}
        title={AI_TECH.heading}
        supporting={AI_TECH.supporting}
        categories={AI_TECH.categories}
        altBg
      />

      {/* 09 — AI Integration */}
      <ExplorerList
        label={AI_INTEGRATION.label}
        title={AI_INTEGRATION.heading}
        supporting={AI_INTEGRATION.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={AI_INTEGRATION.cards}
        icons={INTEGRATION_ICONS}
        footerCta={AI_INTEGRATION.cta}
      />

      {/* 10 — Selected AI Work (demonstrations, not client case studies) */}
      <ExplorerList
        label={AI_WORK.label}
        title={AI_WORK.heading}
        supporting={AI_WORK.supporting}
        note={AI_WORK.note}
        icons={WORK_ICONS}
        items={AI_WORK.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.capabilities,
        }))}
        altBg
      />

      {/* 11 — FAQ */}
      <FaqConsole label={AI_FAQ.label} title={AI_FAQ.heading} items={AI_FAQ.items} footerCta={AI_FAQ.cta} />

      {/* 12 — Final CTA */}
      <FinalCtaSection
        label={AI_FINAL.label}
        heading={AI_FINAL.heading}
        supporting={AI_FINAL.supporting}
        primaryCta={AI_FINAL.primaryCta}
        secondaryCta={AI_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
