import {
  Accessibility,
  Activity,
  BarChart3,
  Bell,
  Boxes,
  Camera,
  Cloud,
  Compass,
  Database,
  Fingerprint,
  KeyRound,
  Link2,
  Lock,
  MapPin,
  MonitorSmartphone,
  Route,
  Server,
  ShieldAlert,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TestTube,
  TrendingUp,
  Users,
  Webhook,
  Workflow,
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
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import { Button } from "@/components/ui";
import {
  MOB_APPROACH,
  MOB_BACKEND,
  MOB_BUILD,
  MOB_CAPABILITIES,
  MOB_FAQ,
  MOB_FINAL,
  MOB_HERO,
  MOB_INDUSTRIES,
  MOB_INTRO,
  MOB_PROCESS,
  MOB_QUALITY,
  MOB_SEO,
  MOB_TECH,
  MOB_UX,
  MOB_WORK,
} from "@/content/mobileDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTRO_ICONS = [Users, Link2, TrendingUp];
const BUILD_ICONS = [Smartphone, Workflow, ShoppingCart, Boxes, MapPin, Sparkles];
const CAPABILITY_ICONS = [
  MonitorSmartphone,
  KeyRound,
  Webhook,
  Bell,
  Database,
  MapPin,
  Camera,
  BarChart3,
];
const BACKEND_ICONS = [Server, Boxes, Webhook, Cloud];
const UX_ICONS = [Compass, Smartphone, Route, MonitorSmartphone, Activity, Accessibility];
const APPROACH_ICONS = [Boxes, Smartphone];
const QUALITY_ICONS = [Fingerprint, Lock, Webhook, ShieldAlert, TestTube, Activity];

export function MobileDevelopmentPage() {
  useDocumentMeta(MOB_SEO.title, MOB_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="mobile">
      <>
      <PageHero
        domain="mobile"
        label={MOB_HERO.label}
        title={MOB_HERO.title}
        supporting={MOB_HERO.supporting}
        primaryCta={MOB_HERO.primaryCta}
        secondaryCta={MOB_HERO.secondaryCta}
        tags={MOB_HERO.tags}
      />

      {/* 02 — Mobile Products */}
      <PrincipleDeck
        label={MOB_INTRO.label}
        title={MOB_INTRO.heading}
        supporting={MOB_INTRO.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={MOB_INTRO.cards}
        icons={INTRO_ICONS}
        eyebrowPrefix="Principle"
        altBg
      />

      {/* 03 — Mobile Solutions */}
      <ExplorerList
        label={MOB_BUILD.label}
        title={MOB_BUILD.heading}
        supporting={MOB_BUILD.supporting}
        icons={BUILD_ICONS}
        items={MOB_BUILD.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.items,
        }))}
      />

      {/* 04 — Mobile Development Capabilities */}
      <PrincipleDeck
        label={MOB_CAPABILITIES.label}
        title={MOB_CAPABILITIES.heading}
        supporting={MOB_CAPABILITIES.supporting}
        items={MOB_CAPABILITIES.cards}
        icons={CAPABILITY_ICONS}
        eyebrowPrefix="Capability"
        altBg
      />

      {/* 05 — Mobile + Backend */}
      <ProseSection label={MOB_BACKEND.label} title={MOB_BACKEND.heading} paragraphs={MOB_BACKEND.paragraphs}>
        <PipelineDiagram items={MOB_BACKEND.flow} numbered={false} />
      </ProseSection>

      <ExplorerList
        label={MOB_BACKEND.label}
        title="Backend, Systems & Infrastructure."
        items={MOB_BACKEND.cards}
        icons={BACKEND_ICONS}
        altBg
      />

      {/* 06 — Mobile UX */}
      <ExplorerList
        label={MOB_UX.label}
        title={MOB_UX.heading}
        supporting={MOB_UX.supporting}
        items={MOB_UX.cards}
        icons={UX_ICONS}
      />

      {/* 07 — Technology Approach (Cross-Platform vs Native) */}
      <PrincipleDeck
        label={MOB_APPROACH.label}
        title={MOB_APPROACH.heading}
        supporting={MOB_APPROACH.supporting}
        icons={APPROACH_ICONS}
        eyebrowPrefix="Option"
        items={MOB_APPROACH.options.map((opt) => ({
          title: opt.title,
          text: opt.text,
          tags: opt.suitable,
        }))}
        altBg
      />

      {/* 08 — Technology */}
      <StackExplorer
        label={MOB_TECH.label}
        title={MOB_TECH.heading}
        supporting={MOB_TECH.supporting}
        categories={MOB_TECH.categories}
      />

      {/* 09 — Development Process */}
      <JourneyRail
        label={MOB_PROCESS.label}
        title={MOB_PROCESS.heading}
        supporting={MOB_PROCESS.supporting}
        steps={MOB_PROCESS.steps}
        layout="vertical"
        altBg
      />

      {/* 10 — Quality & Security */}
      <ExplorerList
        label={MOB_QUALITY.label}
        title={MOB_QUALITY.heading}
        supporting={MOB_QUALITY.supporting}
        items={MOB_QUALITY.cards}
        icons={QUALITY_ICONS}
      />

      {/* 11 — Industries & Use Cases */}
      <AudienceAtlas
        label={MOB_INDUSTRIES.label}
        title={MOB_INDUSTRIES.heading}
        supporting={MOB_INDUSTRIES.supporting}
        cards={MOB_INDUSTRIES.cards}
        footerCta={MOB_INDUSTRIES.cta}
        altBg
      />

      {/* 12 — Selected Work (neutral empty state — no fabricated mobile portfolio) */}
      <ProseSection label={MOB_WORK.label} title={MOB_WORK.heading} paragraphs={[MOB_WORK.supporting]}>
        <div className={home.emptyState}>{MOB_WORK.emptyState}</div>
        <div className={home.sectionCtas}>
          <Button variant="primary" to={MOB_WORK.cta.to}>
            {MOB_WORK.cta.label} →
          </Button>
        </div>
      </ProseSection>

      {/* 13 — FAQ */}
      <FaqConsole
        label={MOB_FAQ.label}
        title={MOB_FAQ.heading}
        items={MOB_FAQ.items}
        footerCta={MOB_FAQ.cta}
        altBg
      />

      {/* 14 — Final CTA */}
      <FinalCtaSection
        label={MOB_FINAL.label}
        heading={MOB_FINAL.heading}
        supporting={MOB_FINAL.supporting}
        primaryCta={MOB_FINAL.primaryCta}
        secondaryCta={MOB_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
