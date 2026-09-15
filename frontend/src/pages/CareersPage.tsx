import { BrainCircuit, Code2, GraduationCap, Target, TrendingUp, Users } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import careers from "@/components/sections/careers/Careers.module.css";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { PrincipleDeck } from "@/components/sections/elevated/Elevate";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import {
  CAREERS_FINAL,
  CAREERS_HERO,
  CAREERS_LOOK_FOR,
  CAREERS_OPPORTUNITIES,
  CAREERS_SEO,
  CAREERS_WHY,
} from "@/content/careers";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHY_ICONS = [Code2, BrainCircuit, GraduationCap, Target, Users, TrendingUp];

export function CareersPage() {
  useDocumentMeta(CAREERS_SEO.title, CAREERS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="careers">
      <>
        <PageHero
          domain="careers"
          label={CAREERS_HERO.label}
          title={CAREERS_HERO.title}
          supporting={CAREERS_HERO.supporting}
        />

        {/* Why work with us */}
        <PrincipleDeck
          label={CAREERS_WHY.label}
          title={CAREERS_WHY.heading}
          items={CAREERS_WHY.cards}
          icons={WHY_ICONS}
          eyebrowPrefix="Reason"
          altBg
        />

        {/* What we look for */}
        <Section>
          <div className="reveal">
            <SectionHeader
              label={CAREERS_LOOK_FOR.label}
              title={CAREERS_LOOK_FOR.heading}
              lineText={CAREERS_LOOK_FOR.supporting}
            />
          </div>
          <div className={`${s.chipBlock} reveal`} style={{ marginTop: 0, textAlign: "left" }}>
            <div className={s.chipBlockChips} style={{ justifyContent: "flex-start" }}>
              {CAREERS_LOOK_FOR.qualities.map((q) => (
                <span key={q} className={careers.chip}>
                  {q}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Current opportunities (honest empty state) */}
        <Section className={careers.altBg}>
          <div className="reveal">
            <SectionHeader label={CAREERS_OPPORTUNITIES.label} title={CAREERS_OPPORTUNITIES.heading} />
          </div>
          <div
            className={`${careers.emptyState} reveal`}
            style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
          >
            {CAREERS_OPPORTUNITIES.emptyState.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div className={`${careers.sectionCtas} reveal`}>
            <Button variant="primary" href={CAREERS_OPPORTUNITIES.cta.href}>
              {CAREERS_OPPORTUNITIES.cta.label} →
            </Button>
          </div>
        </Section>

        <FinalCtaSection
          label={CAREERS_FINAL.label}
          heading={CAREERS_FINAL.heading}
          supporting={CAREERS_FINAL.supporting}
          primaryCta={CAREERS_FINAL.primaryCta}
        />
      </>
    </DomainShell>
  );
}
