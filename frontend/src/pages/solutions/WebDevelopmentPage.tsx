import {
  Accessibility,
  BarChart3,
  Bell,
  Blocks,
  CreditCard,
  Database,
  Fingerprint,
  Gauge,
  Globe,
  KeyRound,
  LayoutDashboard,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Palette,
  Rocket,
  Scaling,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  Target,
  TestTube,
  TrendingUp,
  Users,
  Webhook,
  Workflow,
  Wrench,
} from "lucide-react";

import { PipelineDiagram } from "@/components/sections/Diagram";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
AudienceAtlas,
  ExplorerList,
  FaqConsole,
  JourneyRail,
  PrincipleDeck,
  ProseSection,
  StackExplorer,
  WorkGallery,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import { Button } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";
import {
  WEB_BUILD,
  WEB_CAPABILITIES,
  WEB_FAQ,
  WEB_FINAL,
  WEB_HERO,
  WEB_INDUSTRIES,
  WEB_INTEGRATIONS,
  WEB_INTRO,
  WEB_MODERN,
  WEB_MORE,
  WEB_PROCESS,
  WEB_QUALITY,
  WEB_SEO,
  WEB_TECH,
  WEB_WORK,
} from "@/content/webDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTRO_ICONS = [MessageSquare, Users, Target];
const BUILD_ICONS = [Globe, TrendingUp, LayoutDashboard, KeyRound, ShoppingCart, Sparkles];
const MODERN_ICONS = [Users, MonitorSmartphone, Gauge, Accessibility, Search, Target];
const CAPABILITY_ICONS = [
  Palette,
  Server,
  Webhook,
  Database,
  Fingerprint,
  Blocks,
  BarChart3,
  Rocket,
];
const INTEGRATION_ICONS = [CreditCard, Users, Bell, KeyRound, Webhook, Server];
const QUALITY_ICONS = [Gauge, Lock, Workflow, Wrench, Scaling, TestTube];

export function WebDevelopmentPage() {
  useDocumentMeta(WEB_SEO.title, WEB_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="web">
      <>
      <PageHero
        domain="web"
        label={WEB_HERO.label}
        title={WEB_HERO.title}
        supporting={WEB_HERO.supporting}
        primaryCta={WEB_HERO.primaryCta}
        secondaryCta={WEB_HERO.secondaryCta}
        tags={WEB_HERO.tags}
      />

      {/* 02 — Beyond a Website */}
      <PrincipleDeck
        label={WEB_INTRO.label}
        title={WEB_INTRO.heading}
        supporting={WEB_INTRO.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={WEB_INTRO.cards}
        icons={INTRO_ICONS}
        eyebrowPrefix="Goal"
        altBg
      />

      {/* 03 — What We Build */}
      <ExplorerList
        label={WEB_BUILD.label}
        title={WEB_BUILD.heading}
        supporting={WEB_BUILD.supporting}
        icons={BUILD_ICONS}
        items={WEB_BUILD.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.items,
        }))}
      />

      {/* 04 — What Makes a Modern Web Platform */}
      <PrincipleDeck
        label={WEB_MODERN.label}
        title={WEB_MODERN.heading}
        supporting={WEB_MODERN.supporting}
        items={WEB_MODERN.cards}
        icons={MODERN_ICONS}
        eyebrowPrefix="Pillar"
        altBg
      />

      {/* 05 — Web Development Capabilities */}
      <ExplorerList
        label={WEB_CAPABILITIES.label}
        title={WEB_CAPABILITIES.heading}
        supporting={WEB_CAPABILITIES.supporting}
        items={WEB_CAPABILITIES.cards}
        icons={CAPABILITY_ICONS}
      />

      {/* 06 — Web Design & Development Process */}
      <JourneyRail
        label={WEB_PROCESS.label}
        title={WEB_PROCESS.heading}
        supporting={WEB_PROCESS.supporting}
        steps={WEB_PROCESS.steps}
        layout="vertical"
        altBg
      />

      {/* 07 — From Website to Web Application */}
      <ProseSection label={WEB_MORE.label} title={WEB_MORE.heading} paragraphs={WEB_MORE.paragraphs}>
        <PipelineDiagram items={WEB_MORE.flow} numbered={false} />
        <div className={home.sectionCtas}>
          <Button variant="primary" to={WEB_MORE.cta.to}>
            {WEB_MORE.cta.label} →
          </Button>
        </div>
      </ProseSection>

      {/* 08 — Integrations */}
      <PrincipleDeck
        label={WEB_INTEGRATIONS.label}
        title={WEB_INTEGRATIONS.heading}
        supporting={WEB_INTEGRATIONS.supporting}
        items={WEB_INTEGRATIONS.cards}
        icons={INTEGRATION_ICONS}
        eyebrowPrefix="Integration"
        altBg
      />

      {/* 09 — Technology */}
      <StackExplorer
        label={WEB_TECH.label}
        title={WEB_TECH.heading}
        supporting={WEB_TECH.supporting}
        categories={WEB_TECH.categories}
      />

      {/* 10 — Performance, Security & Quality */}
      <ExplorerList
        label={WEB_QUALITY.label}
        title={WEB_QUALITY.heading}
        supporting={WEB_QUALITY.supporting}
        items={WEB_QUALITY.cards}
        icons={QUALITY_ICONS}
        altBg
      />

      {/* 11 — Industries */}
      <AudienceAtlas
        label={WEB_INDUSTRIES.label}
        title={WEB_INDUSTRIES.heading}
        supporting={WEB_INDUSTRIES.supporting}
        cards={WEB_INDUSTRIES.cards}
        footerCta={WEB_INDUSTRIES.cta}
      />

      {/* 12 — Selected Work (reuses approved homepage items) */}
      <WorkGallery
        label={WEB_WORK.label}
        title={WEB_WORK.heading}
        supporting={WEB_WORK.supporting}
        note={WEB_WORK.note}
        cards={FEATURED_WORK.cards}
        footerCta={WEB_WORK.cta}
        altBg
      />

      {/* 13 — FAQ */}
      <FaqConsole label={WEB_FAQ.label} title={WEB_FAQ.heading} items={WEB_FAQ.items} footerCta={WEB_FAQ.cta} />

      {/* 14 — Final CTA */}
      <FinalCtaSection
        label={WEB_FINAL.label}
        heading={WEB_FINAL.heading}
        supporting={WEB_FINAL.supporting}
        primaryCta={WEB_FINAL.primaryCta}
        secondaryCta={WEB_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
