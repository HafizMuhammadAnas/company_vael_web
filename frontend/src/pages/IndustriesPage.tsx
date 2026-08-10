import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import ind from "@/components/sections/industries/Industries.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
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
    <>
      <PageHero
        label={IND_HERO.label}
        title={IND_HERO.title}
        supporting={IND_HERO.supporting}
        primaryCta={IND_HERO.primaryCta}
        secondaryCta={IND_HERO.secondaryCta}
      />

      {/* Introduction */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={IND_INTRO.label} title={IND_INTRO.heading} />
          <div className={home.supporting}>
            {IND_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Industry navigation */}
      <Section>
        <div className="reveal">
          <SectionHeader label={IND_NAV.label} title={IND_NAV.heading} lineText={IND_NAV.supporting} />
        </div>
        <div className={`${ind.navGrid} reveal`}>
          {IND_NAV.cards.map((card, i) => (
            <Link
              key={card.anchor}
              to={`/industries#${card.anchor}`}
              className={ind.navCard}
              data-index={String(i + 1).padStart(2, "0")}
            >
              <span className={ind.navCardTitle}>{card.title}</span>
              <span className={ind.navCardText}>{card.description}</span>
              <span className={ind.navCardCta}>{card.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Seven industry sections (alternating layout + accent) */}
      {IND_SECTIONS.map((industry, i) => (
        <IndustryBlock key={industry.id} industry={industry} index={i} />
      ))}

      {/* Cross-industry capabilities */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={IND_CAPABILITIES.label} title={IND_CAPABILITIES.heading} />
          <p className={home.supporting}>{IND_CAPABILITIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {IND_CAPABILITIES.cards.map((item) => (
            <Card key={item.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
              <Link to={item.to} className={home.cardCta}>
                {item.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* How we approach industry solutions */}
      <Section>
        <div className="reveal">
          <SectionHeader label={IND_APPROACH.label} title={IND_APPROACH.heading} />
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {IND_APPROACH.steps.map((step) => (
            <div key={step.num} className={home.step}>
              <div className={home.stepNode}>
                <span className={home.stepNum}>{step.num}</span>
              </div>
              <div className={home.stepTitle}>{step.title}</div>
              <p className={home.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

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

      {/* FAQ */}
      <Section>
        <div className="reveal">
          <SectionHeader label={IND_FAQ.label} title={IND_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {IND_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className={home.altBg}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                color: "var(--neon)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              // {IND_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{IND_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{IND_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={IND_FINAL.primaryCta.to}>
                {IND_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={IND_FINAL.secondaryCta.to}>
                {IND_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
