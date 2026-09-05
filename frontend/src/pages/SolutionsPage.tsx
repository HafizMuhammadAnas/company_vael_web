import {
  BrainCircuit,
  Cloud,
  Code2,
  Compass,
  LayoutDashboard,
  Smartphone,
  Layers,
  Shield,
  Gauge,
  Link2,
  BarChart3,
  Sparkles,
} from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
  AudienceAtlas,
  DomainShell,
  ExplorerList,
  FaqConsole,
  JourneyRail,
  PrincipleDeck,
  ProseSection,
  SignalBoard,
  StackExplorer,
  WorkGallery,
} from "@/components/sections/elevated/Elevate";
import { FEATURED_WORK } from "@/content/home";
import {
  SOL_CHALLENGES,
  SOL_CORE,
  SOL_DELIVERY,
  SOL_FAQ,
  SOL_FINAL,
  SOL_HERO,
  SOL_INTRO,
  SOL_PRINCIPLES,
  SOL_TECH,
  SOL_WHO,
  SOL_WORK,
  SOLUTIONS_SEO,
} from "@/content/solutions";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CORE_ICONS = [BrainCircuit, Code2, LayoutDashboard, Smartphone, Cloud, Compass];
const PRINCIPLE_ICONS = [Layers, Shield, Gauge, Link2, BarChart3, Sparkles];

export function SolutionsPage() {
  useDocumentMeta(SOLUTIONS_SEO.title, SOLUTIONS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="solutions">
      <PageHero
        domain="solutions"
        label={SOL_HERO.label}
        title={SOL_HERO.title}
        supporting={SOL_HERO.supporting}
        primaryCta={SOL_HERO.primaryCta}
        secondaryCta={SOL_HERO.secondaryCta}
      />

      <ProseSection
        label={SOL_INTRO.label}
        title={SOL_INTRO.heading}
        paragraphs={SOL_INTRO.paragraphs}
        altBg
      />

      <PrincipleDeck
        label="Approach"
        title="How We Move From Problem to Product."
        items={SOL_INTRO.principles}
        eyebrowPrefix="Step"
      />

      <ExplorerList
        label={SOL_CORE.label}
        title={SOL_CORE.heading}
        supporting={SOL_CORE.supporting}
        icons={CORE_ICONS}
        altBg
        items={SOL_CORE.solutions.map((sol) => ({
          title: sol.title,
          text: sol.description,
          tags: sol.capabilities,
          href: sol.to,
          cta: sol.cta,
        }))}
      />

      <SignalBoard
        label={SOL_CHALLENGES.label}
        title={SOL_CHALLENGES.heading}
        supporting={SOL_CHALLENGES.supporting}
        items={SOL_CHALLENGES.items}
      />

      <PrincipleDeck
        label={SOL_PRINCIPLES.label}
        title={SOL_PRINCIPLES.heading}
        supporting={SOL_PRINCIPLES.supporting}
        items={SOL_PRINCIPLES.items}
        icons={PRINCIPLE_ICONS}
        eyebrowPrefix="Principle"
        altBg
      />

      <StackExplorer
        label={SOL_TECH.label}
        title={SOL_TECH.heading}
        supporting={SOL_TECH.supporting}
        categories={SOL_TECH.categories}
      />

      <JourneyRail
        label={SOL_DELIVERY.label}
        title={SOL_DELIVERY.heading}
        steps={SOL_DELIVERY.steps}
        footerCta={SOL_DELIVERY.cta}
        altBg
      />

      <AudienceAtlas
        label={SOL_WHO.label}
        title={SOL_WHO.heading}
        supporting={SOL_WHO.supporting}
        cards={SOL_WHO.cards}
        footerCta={SOL_WHO.cta}
      />

      <WorkGallery
        label={SOL_WORK.label}
        title={SOL_WORK.heading}
        supporting={SOL_WORK.supporting}
        note={FEATURED_WORK.note}
        cards={FEATURED_WORK.cards}
        footerCta={SOL_WORK.cta}
        altBg
      />

      <FaqConsole label={SOL_FAQ.label} title={SOL_FAQ.heading} items={SOL_FAQ.items} footerCta={SOL_FAQ.cta} />

      <FinalCtaSection
        label={SOL_FINAL.label}
        heading={SOL_FINAL.heading}
        supporting={SOL_FINAL.supporting}
        primaryCta={SOL_FINAL.primaryCta}
        secondaryCta={SOL_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
