import {
  BrainCircuit,
  Cloud,
  Code2,
  Compass,
  LayoutDashboard,
  Smartphone,
  Layers,
  Target,
  Lightbulb,
  Wrench,
  Users,
  RefreshCcw,
  Eye,
  Shield,
} from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
  AudienceAtlas,
  DomainShell,
  ExplorerList,
  JourneyRail,
  PrincipleDeck,
  ProseSection,
  StackExplorer,
} from "@/components/sections/elevated/Elevate";
import styles from "@/components/sections/home/Interactive.module.css";
import { Section } from "@/components/ui";
import {
  ABOUT_APPROACH,
  ABOUT_CAPABILITIES,
  ABOUT_FINAL,
  ABOUT_HERO,
  ABOUT_JOURNEY,
  ABOUT_MINDSET,
  ABOUT_MISSION,
  ABOUT_SEO,
  ABOUT_TECH,
  ABOUT_WHO,
  ABOUT_WHO_WE_HELP,
  ABOUT_WHY,
  ABOUT_VISION,
} from "@/content/about";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CAP_ICONS = [Code2, LayoutDashboard, Smartphone, BrainCircuit, Cloud, Compass];
const MINDSET_ICONS = [Target, Wrench, Lightbulb, Layers, Eye, RefreshCcw];
const WHY_ICONS = [Code2, Target, Layers, Lightbulb, Users, Shield];

export function AboutPage() {
  useDocumentMeta(ABOUT_SEO.title, ABOUT_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="about">
      <PageHero
        domain="about"
        label={ABOUT_HERO.label}
        title={ABOUT_HERO.title}
        supporting={ABOUT_HERO.supporting}
        primaryCta={ABOUT_HERO.primaryCta}
        secondaryCta={ABOUT_HERO.secondaryCta}
      />

      <ProseSection
        label={ABOUT_WHO.label}
        title={ABOUT_WHO.heading}
        paragraphs={ABOUT_WHO.paragraphs}
        highlight={ABOUT_WHO.highlight}
        altBg
      />

      <ExplorerList
        label={ABOUT_CAPABILITIES.label}
        title={ABOUT_CAPABILITIES.heading}
        supporting={ABOUT_CAPABILITIES.supporting}
        icons={CAP_ICONS}
        items={ABOUT_CAPABILITIES.cards.map((card) => ({
          title: card.title,
          text: card.text,
          href: card.to,
          cta: "Learn more",
        }))}
      />

      <PrincipleDeck
        label={ABOUT_MINDSET.label}
        title={ABOUT_MINDSET.heading}
        supporting={ABOUT_MINDSET.paragraphs.join(" ")}
        items={ABOUT_MINDSET.principles}
        icons={MINDSET_ICONS}
        eyebrowPrefix="Principle"
        altBg
      />

      <StackExplorer
        label={ABOUT_TECH.label}
        title={ABOUT_TECH.heading}
        supporting={ABOUT_TECH.supporting}
        categories={ABOUT_TECH.categories}
      />

      <AudienceAtlas
        label={ABOUT_WHO_WE_HELP.label}
        title={ABOUT_WHO_WE_HELP.heading}
        supporting={ABOUT_WHO_WE_HELP.supporting}
        cards={ABOUT_WHO_WE_HELP.cards}
        altBg
      />

      <JourneyRail
        label={ABOUT_APPROACH.label}
        title={ABOUT_APPROACH.heading}
        steps={ABOUT_APPROACH.steps}
        footerCta={ABOUT_APPROACH.cta}
      />

      <PrincipleDeck
        label={ABOUT_WHY.label}
        title={ABOUT_WHY.heading}
        items={ABOUT_WHY.points}
        icons={WHY_ICONS}
        eyebrowPrefix="Why"
        altBg
      />

      <Section>
        <div className={`${styles.whySplit} reveal`}>
          <aside className={styles.whyPanel}>
            <span className={styles.readoutEyebrow}>{ABOUT_VISION.label}</span>
            <h3 className={styles.readoutTitle}>{ABOUT_VISION.heading}</h3>
            {ABOUT_VISION.paragraphs.map((p) => (
              <p key={p} className={styles.readoutBody}>
                {p}
              </p>
            ))}
          </aside>
          <aside className={styles.whyPanel}>
            <span className={styles.readoutEyebrow}>{ABOUT_MISSION.label}</span>
            <h3 className={styles.readoutTitle}>{ABOUT_MISSION.heading}</h3>
            {ABOUT_MISSION.paragraphs.map((p) => (
              <p key={p} className={styles.readoutBody}>
                {p}
              </p>
            ))}
          </aside>
        </div>
      </Section>

      <JourneyRail
        label={ABOUT_JOURNEY.label}
        title={ABOUT_JOURNEY.heading}
        supporting={ABOUT_JOURNEY.supporting}
        steps={ABOUT_JOURNEY.phases.map((phase, i) => ({
          num: String(i + 1).padStart(2, "0"),
          title: phase.title,
          text: phase.text,
        }))}
        altBg
      />

      <FinalCtaSection
        label={ABOUT_FINAL.label}
        heading={ABOUT_FINAL.heading}
        supporting={ABOUT_FINAL.supporting}
        primaryCta={ABOUT_FINAL.primaryCta}
        secondaryCta={ABOUT_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
