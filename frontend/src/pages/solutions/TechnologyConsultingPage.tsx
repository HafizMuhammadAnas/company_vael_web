import {
  Activity,
  BrainCircuit,
  Cloud,
  Coins,
  Compass,
  Database,
  FileCode,
  FileSearch,
  Gauge,
  GitCompare,
  Handshake,
  Layers,
  Lightbulb,
  Link2,
  ListChecks,
  Map,
  Milestone,
  Network,
  Puzzle,
  RefreshCcw,
  Rocket,
  Route,
  Scale,
  Scaling,
  SearchCheck,
  Server,
  Settings,
  Shield,
  Sparkles,
  Target,
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
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import { Button } from "@/components/ui";
import {
  TC_AI,
  TC_ARCHITECTURE,
  TC_ASSESSMENT,
  TC_BUILD_BUY,
  TC_DELIVERABLES,
  TC_EVALUATION,
  TC_FAQ,
  TC_FINAL,
  TC_HERO,
  TC_INTRO,
  TC_PROCESS,
  TC_ROADMAP,
  TC_SEO,
  TC_SERVICES,
  TC_TRANSFORM,
  TC_WHEN,
  TC_WHO,
  TC_WORK,
} from "@/content/technologyConsulting";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INTRO_ICONS = [SearchCheck, Scale, Rocket];
const SERVICE_ICONS = [Compass, Layers, FileSearch, RefreshCcw, GitCompare, Map];
const WHEN_ICONS = [Lightbulb, Wrench, Cloud, Puzzle, Workflow, Scale];
const ASSESSMENT_ICONS = [Layers, FileCode, Database, Webhook, Server, Shield, Gauge];
const ARCHITECTURE_ICONS = [Layers, Webhook, Database, Link2, Server, Shield];
const BUILD_BUY_ICONS = [Settings, Handshake, Link2, Puzzle];
const EVALUATION_ICONS = [Target, Settings, Users, Coins, Wrench, Scaling, Network];
const AI_ICONS = [BrainCircuit, Workflow, Sparkles, Database];
const ROADMAP_ICONS = [Milestone, Rocket, Link2, Gauge, Activity];
const DELIVERABLE_ICONS = [
  FileSearch,
  Layers,
  GitCompare,
  Route,
  RefreshCcw,
  Link2,
  BrainCircuit,
  ListChecks,
];

export function TechnologyConsultingPage() {
  useDocumentMeta(TC_SEO.title, TC_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="consulting">
      <>
      <PageHero
        domain="consulting"
        label={TC_HERO.label}
        title={TC_HERO.title}
        supporting={TC_HERO.supporting}
        primaryCta={TC_HERO.primaryCta}
        secondaryCta={TC_HERO.secondaryCta}
        tags={TC_HERO.tags}
      />

      {/* 02 — Technology Decisions */}
      <PrincipleDeck
        label={TC_INTRO.label}
        title={TC_INTRO.heading}
        supporting={TC_INTRO.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={TC_INTRO.cards}
        icons={INTRO_ICONS}
        eyebrowPrefix="Step"
        altBg
      />

      {/* 03 — Consulting Services */}
      <ExplorerList
        label={TC_SERVICES.label}
        title={TC_SERVICES.heading}
        supporting={TC_SERVICES.supporting}
        icons={SERVICE_ICONS}
        items={TC_SERVICES.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.items,
        }))}
      />

      {/* 04 — When You Need Technology Consulting */}
      <PrincipleDeck
        label={TC_WHEN.label}
        title={TC_WHEN.heading}
        supporting={TC_WHEN.supporting}
        icons={WHEN_ICONS}
        eyebrowPrefix="Question"
        items={TC_WHEN.cards.map((card) => ({
          title: card.title,
          text: card.text,
          tags: [card.focus],
        }))}
        altBg
      />

      {/* 05 — System & Technology Assessment */}
      <ExplorerList
        label={TC_ASSESSMENT.label}
        title={TC_ASSESSMENT.heading}
        supporting={TC_ASSESSMENT.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={TC_ASSESSMENT.cards}
        icons={ASSESSMENT_ICONS}
        footerCta={TC_ASSESSMENT.cta}
      />

      {/* 06 — Solution Architecture */}
      <ProseSection
        label={TC_ARCHITECTURE.label}
        title={TC_ARCHITECTURE.heading}
        paragraphs={TC_ARCHITECTURE.paragraphs}
        altBg
      >
        <PipelineDiagram items={TC_ARCHITECTURE.flow} numbered={false} />
      </ProseSection>

      <PrincipleDeck
        label={TC_ARCHITECTURE.label}
        title="What the Blueprint Defines."
        items={TC_ARCHITECTURE.cards}
        icons={ARCHITECTURE_ICONS}
        eyebrowPrefix="Decision"
      />

      {/* 07 — Digital Transformation */}
      <JourneyRail
        label={TC_TRANSFORM.label}
        title={TC_TRANSFORM.heading}
        supporting={TC_TRANSFORM.supporting}
        steps={TC_TRANSFORM.cards.map((card, i) => ({
          num: String(i + 1).padStart(2, "0"),
          title: card.title,
          text: card.text,
        }))}
        altBg
      />

      {/* 08 — Build vs Buy */}
      <ExplorerList
        label={TC_BUILD_BUY.label}
        title={TC_BUILD_BUY.heading}
        supporting={TC_BUILD_BUY.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={TC_BUILD_BUY.cards}
        icons={BUILD_BUY_ICONS}
        footerCta={TC_BUILD_BUY.cta}
      />

      {/* 09 — Technology Evaluation */}
      <PrincipleDeck
        label={TC_EVALUATION.label}
        title={TC_EVALUATION.heading}
        supporting={TC_EVALUATION.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={TC_EVALUATION.cards}
        icons={EVALUATION_ICONS}
        eyebrowPrefix="Criterion"
        altBg
      />

      {/* 10 — AI & Emerging Technology */}
      <ExplorerList
        label={TC_AI.label}
        title={TC_AI.heading}
        supporting={TC_AI.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={TC_AI.cards}
        icons={AI_ICONS}
        footerCta={{ ...TC_AI.cta, variant: "outline" }}
      />

      {/* 11 — Technical Roadmap */}
      <ProseSection
        label={TC_ROADMAP.label}
        title={TC_ROADMAP.heading}
        paragraphs={TC_ROADMAP.paragraphs}
        altBg
      >
        <PipelineDiagram items={TC_ROADMAP.flow} />
      </ProseSection>

      <PrincipleDeck
        label={TC_ROADMAP.label}
        title="Implementation Phases."
        items={TC_ROADMAP.phases}
        icons={ROADMAP_ICONS}
        eyebrowPrefix="Phase"
      />

      {/* 12 — Our Consulting Process */}
      <JourneyRail label={TC_PROCESS.label} title={TC_PROCESS.heading} steps={TC_PROCESS.steps} altBg />

      {/* 13 — Consulting Deliverables */}
      <ExplorerList
        label={TC_DELIVERABLES.label}
        title={TC_DELIVERABLES.heading}
        supporting={TC_DELIVERABLES.supporting}
        note={TC_DELIVERABLES.note}
        items={TC_DELIVERABLES.cards}
        icons={DELIVERABLE_ICONS}
      />

      {/* 14 — Who We Help */}
      <AudienceAtlas label={TC_WHO.label} title={TC_WHO.heading} cards={TC_WHO.cards} altBg />

      {/* 15 — Selected Work (neutral empty state) */}
      <ProseSection label={TC_WORK.label} title={TC_WORK.heading} paragraphs={[TC_WORK.supporting]}>
        <div className={home.emptyState}>{TC_WORK.emptyState}</div>
        <div className={home.sectionCtas}>
          <Button variant="primary" to={TC_WORK.cta.to}>
            {TC_WORK.cta.label} →
          </Button>
        </div>
      </ProseSection>

      {/* 16 — FAQ */}
      <FaqConsole
        label={TC_FAQ.label}
        title={TC_FAQ.heading}
        items={TC_FAQ.items}
        footerCta={TC_FAQ.cta}
        altBg
      />

      {/* 17 — Final CTA */}
      <FinalCtaSection
        label={TC_FINAL.label}
        heading={TC_FINAL.heading}
        supporting={TC_FINAL.supporting}
        primaryCta={TC_FINAL.primaryCta}
        secondaryCta={TC_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
