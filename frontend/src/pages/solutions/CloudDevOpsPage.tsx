import {
  Activity,
  Bell,
  Blocks,
  Boxes,
  Cloud,
  Container,
  Eye,
  GitBranch,
  HeartPulse,
  KeyRound,
  Layers,
  Move,
  Network,
  RefreshCcw,
  Repeat,
  Rocket,
  ScrollText,
  Server,
  Settings,
  Shield,
  TestTube,
  Timer,
  Users,
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
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import { Button } from "@/components/ui";
import {
  CLOUD_CHALLENGES,
  CLOUD_CONTAINERS,
  CLOUD_CONTINUITY,
  CLOUD_FAQ,
  CLOUD_FINAL,
  CLOUD_HERO,
  CLOUD_IAC,
  CLOUD_INTRO,
  CLOUD_MONITORING,
  CLOUD_PIPELINE,
  CLOUD_PLATFORMS,
  CLOUD_PROCESS,
  CLOUD_SECURITY,
  CLOUD_SEO,
  CLOUD_SERVICES,
  CLOUD_WHO,
  CLOUD_WORK,
} from "@/content/cloudDevops";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTRO_ICONS = [Rocket, Container, Eye];
const SERVICE_ICONS = [Cloud, GitBranch, Container, Move, RefreshCcw, Activity];
const CHALLENGE_ICONS = [Workflow, Boxes, Timer, Eye, Layers, Cloud];
const CONTAINER_ICONS = [Blocks, TestTube, Rocket, Settings];
const PLATFORM_ICONS = [Cloud, Cloud, Cloud];
const IAC_ICONS = [Repeat, GitBranch, Boxes, Users];
const SECURITY_ICONS = [KeyRound, Shield, Network, Rocket, RefreshCcw];
const MONITORING_ICONS = [Activity, Server, ScrollText, Bell, HeartPulse];

export function CloudDevOpsPage() {
  useDocumentMeta(CLOUD_SEO.title, CLOUD_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="cloud">
      <>
      <PageHero
        domain="cloud"
        label={CLOUD_HERO.label}
        title={CLOUD_HERO.title}
        supporting={CLOUD_HERO.supporting}
        primaryCta={CLOUD_HERO.primaryCta}
        secondaryCta={CLOUD_HERO.secondaryCta}
        tags={CLOUD_HERO.tags}
      />

      {/* 02 — Beyond Development */}
      <PrincipleDeck
        label={CLOUD_INTRO.label}
        title={CLOUD_INTRO.heading}
        supporting={CLOUD_INTRO.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={CLOUD_INTRO.cards}
        icons={INTRO_ICONS}
        eyebrowPrefix="Outcome"
        altBg
      />

      {/* 03 — Cloud & DevOps Services */}
      <ExplorerList
        label={CLOUD_SERVICES.label}
        title={CLOUD_SERVICES.heading}
        supporting={CLOUD_SERVICES.supporting}
        icons={SERVICE_ICONS}
        items={CLOUD_SERVICES.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.items,
        }))}
      />

      {/* 04 — DevOps Challenges We Solve */}
      <PrincipleDeck
        label={CLOUD_CHALLENGES.label}
        title={CLOUD_CHALLENGES.heading}
        supporting={CLOUD_CHALLENGES.supporting}
        icons={CHALLENGE_ICONS}
        eyebrowPrefix="Challenge"
        items={CLOUD_CHALLENGES.cards.map((card) => ({
          title: card.title,
          text: card.text,
          tags: [card.approach],
        }))}
        altBg
      />

      {/* 05 — CI/CD Pipelines */}
      <ProseSection
        label={CLOUD_PIPELINE.label}
        title={CLOUD_PIPELINE.heading}
        paragraphs={[CLOUD_PIPELINE.supporting]}
      >
        <PipelineDiagram items={CLOUD_PIPELINE.flow} />
        <p className={home.supporting}>{CLOUD_PIPELINE.note}</p>
      </ProseSection>

      {/* 06 — Containers & Environments */}
      <ExplorerList
        label={CLOUD_CONTAINERS.label}
        title={CLOUD_CONTAINERS.heading}
        supporting={CLOUD_CONTAINERS.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={CLOUD_CONTAINERS.cards}
        icons={CONTAINER_ICONS}
        altBg
      />

      {/* 07 — Cloud Platforms */}
      <PrincipleDeck
        label={CLOUD_PLATFORMS.label}
        title={CLOUD_PLATFORMS.heading}
        supporting={CLOUD_PLATFORMS.supporting}
        icons={PLATFORM_ICONS}
        eyebrowPrefix="Platform"
        items={CLOUD_PLATFORMS.cards.map((card) => ({
          title: card.title,
          text: card.text,
          tags: CLOUD_PLATFORMS.capabilities,
        }))}
      />

      {/* 08 — Infrastructure as Code */}
      <PrincipleDeck
        label={CLOUD_IAC.label}
        title={CLOUD_IAC.heading}
        supporting={CLOUD_IAC.supporting}
        icons={IAC_ICONS}
        eyebrowPrefix="Benefit"
        items={CLOUD_IAC.cards.map((card) => ({
          title: card.title,
          text: card.text,
          tags: CLOUD_IAC.technology,
        }))}
        altBg
      />

      {/* 09 — Security & Access */}
      <ExplorerList
        label={CLOUD_SECURITY.label}
        title={CLOUD_SECURITY.heading}
        supporting={CLOUD_SECURITY.supporting}
        items={CLOUD_SECURITY.cards}
        icons={SECURITY_ICONS}
      />

      {/* 10 — Monitoring & Observability */}
      <PrincipleDeck
        label={CLOUD_MONITORING.label}
        title={CLOUD_MONITORING.heading}
        supporting={CLOUD_MONITORING.supporting}
        items={CLOUD_MONITORING.cards}
        icons={MONITORING_ICONS}
        eyebrowPrefix="Signal"
        altBg
      />

      {/* 11 — Development + DevOps */}
      <ProseSection
        label={CLOUD_CONTINUITY.label}
        title={CLOUD_CONTINUITY.heading}
        paragraphs={[CLOUD_CONTINUITY.supporting]}
      >
        <PipelineDiagram items={CLOUD_CONTINUITY.flow} numbered={false} />
        <p className={home.supporting}>{CLOUD_CONTINUITY.statement}</p>
      </ProseSection>

      {/* 12 — Our Process */}
      <JourneyRail
        label={CLOUD_PROCESS.label}
        title={CLOUD_PROCESS.heading}
        steps={CLOUD_PROCESS.steps}
        layout="vertical"
        altBg
      />

      {/* 13 — Who We Help */}
      <AudienceAtlas
        label={CLOUD_WHO.label}
        title={CLOUD_WHO.heading}
        supporting={CLOUD_WHO.supporting}
        cards={CLOUD_WHO.cards}
      />

      {/* 14 — Selected Work (neutral empty state) */}
      <ProseSection
        label={CLOUD_WORK.label}
        title={CLOUD_WORK.heading}
        paragraphs={[CLOUD_WORK.supporting]}
        altBg
      >
        <div className={home.emptyState}>{CLOUD_WORK.emptyState}</div>
        <div className={home.sectionCtas}>
          <Button variant="primary" to={CLOUD_WORK.cta.to}>
            {CLOUD_WORK.cta.label} →
          </Button>
        </div>
      </ProseSection>

      {/* 15 — FAQ */}
      <FaqConsole label={CLOUD_FAQ.label} title={CLOUD_FAQ.heading} items={CLOUD_FAQ.items} footerCta={CLOUD_FAQ.cta} />

      {/* 16 — Final CTA */}
      <FinalCtaSection
        label={CLOUD_FINAL.label}
        heading={CLOUD_FINAL.heading}
        supporting={CLOUD_FINAL.supporting}
        primaryCta={CLOUD_FINAL.primaryCta}
        secondaryCta={CLOUD_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
