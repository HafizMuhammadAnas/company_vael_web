import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
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

export function AboutPage() {
  useDocumentMeta(ABOUT_SEO.title, ABOUT_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={ABOUT_HERO.label}
        title={ABOUT_HERO.title}
        supporting={ABOUT_HERO.supporting}
        primaryCta={ABOUT_HERO.primaryCta}
        secondaryCta={ABOUT_HERO.secondaryCta}
      />

      {/* Who we are */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={ABOUT_WHO.label} title={ABOUT_WHO.heading} />
          <div className={home.supporting}>
            {ABOUT_WHO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote
            style={{
              borderLeft: "3px solid var(--neon-dim)",
              padding: "0.6rem 0 0.6rem 1.4rem",
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {ABOUT_WHO.highlight}
          </blockquote>
        </div>
      </Section>

      {/* What VAELKODE does */}
      <Section>
        <div className="reveal">
          <SectionHeader
            label={ABOUT_CAPABILITIES.label}
            title={ABOUT_CAPABILITIES.heading}
            lineText={ABOUT_CAPABILITIES.supporting}
          />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {ABOUT_CAPABILITIES.cards.map((card) => (
            <Card key={card.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.text}</p>
              <Link to={card.to} className={home.cardCta}>
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technology mindset */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={ABOUT_MINDSET.label} title={ABOUT_MINDSET.heading} />
          <div className={home.supporting}>
            {ABOUT_MINDSET.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {ABOUT_MINDSET.principles.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technology at VAELKODE */}
      <Section>
        <div className="reveal">
          <SectionHeader label={ABOUT_TECH.label} title={ABOUT_TECH.heading} lineText={ABOUT_TECH.supporting} />
        </div>
        <div className={`${home.techGrid} reveal`}>
          {ABOUT_TECH.categories.map((cat) => (
            <div key={cat.title} className={home.techCat}>
              <div className={home.techTitle}>{cat.title}</div>
              <div className={home.chips}>
                {cat.items.map((item) => (
                  <span key={item} className={home.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Who we work with */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader
            label={ABOUT_WHO_WE_HELP.label}
            title={ABOUT_WHO_WE_HELP.heading}
            lineText={ABOUT_WHO_WE_HELP.supporting}
          />
        </div>
        <div className={`${home.grid} ${home.cols2} reveal`}>
          {ABOUT_WHO_WE_HELP.cards.map((card) => (
            <Card key={card.title}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Our approach */}
      <Section>
        <div className="reveal">
          <SectionHeader label={ABOUT_APPROACH.label} title={ABOUT_APPROACH.heading} />
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {ABOUT_APPROACH.steps.map((step) => (
            <div key={step.num} className={home.step}>
              <div className={home.stepNode}>
                <span className={home.stepNum}>{step.num}</span>
              </div>
              <div className={home.stepTitle}>{step.title}</div>
              <p className={home.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={ABOUT_APPROACH.cta.to}>
            {ABOUT_APPROACH.cta.label} →
          </Button>
        </div>
      </Section>

      {/* Why VAELKODE */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={ABOUT_WHY.label} title={ABOUT_WHY.heading} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {ABOUT_WHY.points.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Vision + Mission */}
      <Section>
        <div className={`${home.grid} ${home.cols2} reveal`}>
          <Card hoverable={false}>
            <SectionHeader label={ABOUT_VISION.label} title={ABOUT_VISION.heading} />
            <div className={home.supporting} style={{ marginBottom: 0 }}>
              {ABOUT_VISION.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
          <Card hoverable={false}>
            <SectionHeader label={ABOUT_MISSION.label} title={ABOUT_MISSION.heading} />
            <div className={home.supporting} style={{ marginBottom: 0 }}>
              {ABOUT_MISSION.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Journey */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={ABOUT_JOURNEY.label} title={ABOUT_JOURNEY.heading} lineText={ABOUT_JOURNEY.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {ABOUT_JOURNEY.phases.map((phase, i) => (
            <Card key={phase.title}>
              <div className={home.cardNum}>{String(i + 1).padStart(2, "0")}</div>
              <div className={home.cardTitle}>{phase.title}</div>
              <p className={home.cardText}>{phase.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
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
              // {ABOUT_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{ABOUT_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{ABOUT_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={ABOUT_FINAL.primaryCta.to}>
                {ABOUT_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={ABOUT_FINAL.secondaryCta.to}>
                {ABOUT_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
