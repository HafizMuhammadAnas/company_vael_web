import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
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

export function CareersPage() {
  useDocumentMeta(CAREERS_SEO.title, CAREERS_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero label={CAREERS_HERO.label} title={CAREERS_HERO.title} supporting={CAREERS_HERO.supporting} />

      {/* Why work with us */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CAREERS_WHY.label} title={CAREERS_WHY.heading} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CAREERS_WHY.cards.map((card) => (
            <Card key={card.title}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.text}</p>
            </Card>
          ))}
        </div>
      </Section>

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
              <span key={q} className={home.chip}>
                {q}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Current opportunities (honest empty state) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CAREERS_OPPORTUNITIES.label} title={CAREERS_OPPORTUNITIES.heading} />
        </div>
        <div className={`${home.emptyState} reveal`} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {CAREERS_OPPORTUNITIES.emptyState.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" href={CAREERS_OPPORTUNITIES.cta.href}>
            {CAREERS_OPPORTUNITIES.cta.label} →
          </Button>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{CAREERS_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{CAREERS_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{CAREERS_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={CAREERS_FINAL.primaryCta.to}>
                {CAREERS_FINAL.primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
