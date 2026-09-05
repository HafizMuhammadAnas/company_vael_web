import {
  BarChart3,
  Blocks,
  Boxes,
  Braces,
  Database,
  Eye,
  Gauge,
  KeyRound,
  Layers,
  LayoutDashboard,
  Link2,
  Lock,
  Move,
  Palette,
  Puzzle,
  RefreshCcw,
  ScrollText,
  Server,
  Settings,
  SquareStack,
  TestTube,
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
  WorkGallery,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import {
  CS_BUILD,
  CS_CAPABILITIES,
  CS_FAQ,
  CS_FINAL,
  CS_HERO,
  CS_MODERNIZE,
  CS_PRINCIPLES,
  CS_PROBLEMS,
  CS_PROCESS,
  CS_SEO,
  CS_TECH,
  CS_WHO,
  CS_WHY,
  CS_WORK,
} from "@/content/customSoftware";
import { FEATURED_WORK } from "@/content/home";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHY_ICONS = [Workflow, Link2, TrendingUp];
const BUILD_ICONS = [Layers, Settings, Boxes, LayoutDashboard, Users, Webhook];
const PROBLEM_ICONS = [Puzzle, RefreshCcw, Server, Eye, Blocks, Braces];
const CAPABILITY_ICONS = [
  Layers,
  Palette,
  Server,
  LayoutDashboard,
  Database,
  Webhook,
  KeyRound,
  BarChart3,
];
const MODERNIZE_ICONS = [RefreshCcw, Link2, Move, Puzzle];
const PRINCIPLE_ICONS = [SquareStack, Blocks, Lock, Gauge, TestTube, ScrollText];

export function CustomSoftwarePage() {
  useDocumentMeta(CS_SEO.title, CS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="software">
      <>
      <PageHero
        domain="software"
        label={CS_HERO.label}
        title={CS_HERO.title}
        supporting={CS_HERO.supporting}
        primaryCta={CS_HERO.primaryCta}
        secondaryCta={CS_HERO.secondaryCta}
        tags={CS_HERO.tags}
      />

      {/* 02 — Why Custom Software */}
      <PrincipleDeck
        label={CS_WHY.label}
        title={CS_WHY.heading}
        supporting={CS_WHY.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={CS_WHY.cards}
        icons={WHY_ICONS}
        eyebrowPrefix="Reason"
        altBg
      />

      {/* 03 — What We Build */}
      <ExplorerList
        label={CS_BUILD.label}
        title={CS_BUILD.heading}
        supporting={CS_BUILD.supporting}
        icons={BUILD_ICONS}
        items={CS_BUILD.cards.map((card) => ({
          title: card.title,
          text: card.description,
          tags: card.items,
        }))}
      />

      {/* 04 — Business Problems We Solve */}
      <PrincipleDeck
        label={CS_PROBLEMS.label}
        title={CS_PROBLEMS.heading}
        supporting={CS_PROBLEMS.supporting}
        icons={PROBLEM_ICONS}
        eyebrowPrefix="Challenge"
        items={CS_PROBLEMS.cards.map((card) => ({
          title: card.title,
          text: card.text,
          tags: [card.solution],
        }))}
        altBg
      />

      {/* 05 — Software Capabilities */}
      <ExplorerList
        label={CS_CAPABILITIES.label}
        title={CS_CAPABILITIES.heading}
        supporting={CS_CAPABILITIES.supporting}
        items={CS_CAPABILITIES.cards}
        icons={CAPABILITY_ICONS}
      />

      {/* 06 — Modernization & Integration */}
      <ExplorerList
        label={CS_MODERNIZE.label}
        title={CS_MODERNIZE.heading}
        supporting={CS_MODERNIZE.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        items={CS_MODERNIZE.cards}
        icons={MODERNIZE_ICONS}
        footerCta={CS_MODERNIZE.cta}
        altBg
      />

      {/* 07 — Engineering Principles */}
      <PrincipleDeck
        label={CS_PRINCIPLES.label}
        title={CS_PRINCIPLES.heading}
        supporting={CS_PRINCIPLES.supporting}
        items={CS_PRINCIPLES.cards}
        icons={PRINCIPLE_ICONS}
        eyebrowPrefix="Principle"
      />

      {/* 08 — Technology */}
      <StackExplorer
        label={CS_TECH.label}
        title={CS_TECH.heading}
        supporting={CS_TECH.supporting}
        categories={CS_TECH.categories}
        altBg
      />

      {/* 09 — Development Process */}
      <JourneyRail
        label={CS_PROCESS.label}
        title={CS_PROCESS.heading}
        supporting={CS_PROCESS.supporting}
        steps={CS_PROCESS.steps}
        layout="vertical"
      />

      {/* 10 — Who We Help */}
      <AudienceAtlas
        label={CS_WHO.label}
        title={CS_WHO.heading}
        supporting={CS_WHO.supporting}
        cards={CS_WHO.cards}
        footerCta={CS_WHO.cta}
        altBg
      />

      {/* 11 — Selected Work (reuses approved homepage items) */}
      <WorkGallery
        label={CS_WORK.label}
        title={CS_WORK.heading}
        supporting={CS_WORK.supporting}
        note={CS_WORK.note}
        cards={FEATURED_WORK.cards}
        footerCta={CS_WORK.cta}
      />

      {/* 12 — FAQ */}
      <FaqConsole
        label={CS_FAQ.label}
        title={CS_FAQ.heading}
        items={CS_FAQ.items}
        footerCta={CS_FAQ.cta}
        altBg
      />

      {/* 13 — Final CTA */}
      <FinalCtaSection
        label={CS_FINAL.label}
        heading={CS_FINAL.heading}
        supporting={CS_FINAL.supporting}
        primaryCta={CS_FINAL.primaryCta}
        secondaryCta={CS_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
