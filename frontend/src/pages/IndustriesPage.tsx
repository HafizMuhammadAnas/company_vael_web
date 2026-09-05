import {
  BrainCircuit,
  Building2,
  Cloud,
  Code2,
  Compass,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
  Sprout,
  Truck,
} from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
ExplorerList,
  FaqConsole,
  JourneyRail,
  ProseSection,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import ind from "@/components/sections/industries/Industries.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import {
  IND_APPROACH,
  IND_CAPABILITIES,
  IND_FAQ,
  IND_FINAL,
  IND_HERO,
  IND_INTRO,
  IND_NAV,
  IND_SECTIONS,
  IND_SEO,
  IND_WORK,
  type IndustrySection,
} from "@/content/industries";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INDUSTRY_ICONS = [Building2, GraduationCap, HeartPulse, Sprout, Landmark, Truck, ShoppingBag];
const CAPABILITY_ICONS = [Code2, LayoutDashboard, Smartphone, BrainCircuit, Cloud, Compass];

function IndustryBlock({ industry, index }: { industry: IndustrySection; index: number }) {
  const reversed = index % 2 === 1;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(IND_SECTIONS.length).padStart(2, "0")}`;

  return (
    <Section id={industry.id} className={`${ind.anchor} ${reversed ? home.altBg : ""}`}>
      <div className={`${ind.split} ${reversed ? ind.reversed : ""} reveal`}>
        <div className={ind.copy}>
          <SectionHeader label={industry.label} title={industry.heading} />
          <div className={home.supporting}>
            {industry.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Button variant="primary" to={industry.cta.to} className={ind.cta}>
            {industry.cta.label} →
          </Button>
        </div>

        <div className={`${ind.panel} ${reversed ? ind.panelBronze : ""}`}>
          <span className={ind.panelIndex}>{counter}</span>
          <div className={ind.panelLabel}>{industry.capabilitiesLabel}</div>
          <div className={ind.panelChips}>
            {industry.capabilities.map((cap) => (
              <span key={cap} className={ind.panelChip}>
                {cap}
              </span>
            ))}
          </div>

          {industry.useCases && (
            <>
              <div className={ind.panelLabel} style={{ marginTop: "1.8rem" }}>
                {industry.useCasesLabel}
              </div>
              <div className={ind.panelChips}>
                {industry.useCases.map((uc) => (
                  <span key={uc} className={`${ind.panelChip} ${ind.panelChipAlt}`}>
                    {uc}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}

export function IndustriesPage() {
  useDocumentMeta(IND_SEO.title, IND_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="industries">
      <>
      <PageHero
        domain="industries"
        label={IND_HERO.label}
        title={IND_HERO.title}
        supporting={IND_HERO.supporting}
        primaryCta={IND_HERO.primaryCta}
        secondaryCta={IND_HERO.secondaryCta}
      />

      <ProseSection
        label={IND_INTRO.label}
        title={IND_INTRO.heading}
        paragraphs={IND_INTRO.paragraphs}
        altBg
      />

      {/* Industry navigation — jumps to the anchored sections below */}
      <ExplorerList
        label={IND_NAV.label}
        title={IND_NAV.heading}
        supporting={IND_NAV.supporting}
        icons={INDUSTRY_ICONS}
        items={IND_NAV.cards.map((card) => ({
          title: card.title,
          text: card.description,
          href: `/industries#${card.anchor}`,
          cta: card.cta,
        }))}
      />

      {/* Seven industry sections (alternating layout + accent) */}
      {IND_SECTIONS.map((industry, i) => (
        <IndustryBlock key={industry.id} industry={industry} index={i} />
      ))}

      {/* Cross-industry capabilities */}
      <ExplorerList
        label={IND_CAPABILITIES.label}
        title={IND_CAPABILITIES.heading}
        supporting={IND_CAPABILITIES.supporting}
        icons={CAPABILITY_ICONS}
        altBg
        items={IND_CAPABILITIES.cards.map((card) => ({
          title: card.title,
          text: card.text,
          href: card.to,
          cta: card.cta,
        }))}
      />

      {/* How we approach industry solutions */}
      <JourneyRail
        label={IND_APPROACH.label}
        title={IND_APPROACH.heading}
        steps={IND_APPROACH.steps}
        layout="vertical"
      />

      {/* Selected work (neutral empty state) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={IND_WORK.label} title={IND_WORK.heading} />
          <p className={home.supporting}>{IND_WORK.supporting}</p>
        </div>
        <div className={`${home.emptyState} reveal`}>{IND_WORK.emptyState}</div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={IND_WORK.cta.to}>
            {IND_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      <FaqConsole label={IND_FAQ.label} title={IND_FAQ.heading} items={IND_FAQ.items} />

      <FinalCtaSection
        label={IND_FINAL.label}
        heading={IND_FINAL.heading}
        supporting={IND_FINAL.supporting}
        primaryCta={IND_FINAL.primaryCta}
        secondaryCta={IND_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
