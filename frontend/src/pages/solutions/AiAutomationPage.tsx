import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
import {
  AI_APPROACH,
  AI_BUILD,
  AI_FAQ,
  AI_FINAL,
  AI_HERO,
  AI_INDUSTRIES,
  AI_INTEGRATION,
  AI_INTRO,
  AI_RESPONSIBLE,
  AI_SEO,
  AI_TECH,
  AI_USE_CASES,
  AI_WORK,
} from "@/content/aiAutomation";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function AiAutomationPage() {
  useDocumentMeta(AI_SEO.title, AI_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={AI_HERO.label}
        title={AI_HERO.title}
        supporting={AI_HERO.supporting}
        primaryCta={AI_HERO.primaryCta}
        secondaryCta={AI_HERO.secondaryCta}
        tags={AI_HERO.tags}
      />

      {/* 02 — The Opportunity */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={AI_INTRO.label} title={AI_INTRO.heading} />
          <div className={home.supporting}>
            {AI_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_INTRO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — What We Build */}
      <Section>
        <div className="reveal">
          <SectionHeader label={AI_BUILD.label} title={AI_BUILD.heading} lineText={AI_BUILD.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_BUILD.cards.map((card) => (
            <Card key={card.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.description}</p>
              <div className={s.solutionCapabilities}>
                {card.examples.map((ex) => (
                  <span key={ex} className={home.chip}>
                    {ex}
                  </span>
                ))}
              </div>
              <Link to={AI_BUILD.cta.to} className={home.cardCta}>
                {card.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 04 — Business Use Cases */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={AI_USE_CASES.label} title={AI_USE_CASES.heading} />
          <p className={home.supporting}>{AI_USE_CASES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_USE_CASES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — AI Across Industries */}
      <Section>
        <div className="reveal">
          <SectionHeader label={AI_INDUSTRIES.label} title={AI_INDUSTRIES.heading} />
          <p className={home.supporting}>{AI_INDUSTRIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_INDUSTRIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={AI_INDUSTRIES.cta.to}>
            {AI_INDUSTRIES.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 06 — AI Implementation Approach */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={AI_APPROACH.label} title={AI_APPROACH.heading} />
          <p className={home.supporting}>{AI_APPROACH.supporting}</p>
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {AI_APPROACH.steps.map((step) => (
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

      {/* 07 — Responsible AI */}
      <Section>
        <div className="reveal">
          <SectionHeader label={AI_RESPONSIBLE.label} title={AI_RESPONSIBLE.heading} />
          <p className={home.supporting}>{AI_RESPONSIBLE.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_RESPONSIBLE.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 08 — AI Technology */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={AI_TECH.label} title={AI_TECH.heading} />
          <p className={home.supporting}>{AI_TECH.supporting}</p>
        </div>
        <div className={`${home.techGrid} reveal`}>
          {AI_TECH.categories.map((cat) => (
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

      {/* 09 — AI Integration */}
      <Section>
        <div className="reveal">
          <SectionHeader label={AI_INTEGRATION.label} title={AI_INTEGRATION.heading} />
          <div className={home.supporting}>
            {AI_INTEGRATION.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_INTEGRATION.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={AI_INTEGRATION.cta.to}>
            {AI_INTEGRATION.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 10 — Selected AI Work (demonstrations, not client case studies) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={AI_WORK.label} title={AI_WORK.heading} />
          <p className={home.supporting}>{AI_WORK.supporting}</p>
          <p className={home.sectionNote}>// {AI_WORK.note}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {AI_WORK.cards.map((card) => (
            <Card key={card.title}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.description}</p>
              <div className={s.solutionCapabilities}>
                {card.capabilities.map((cap) => (
                  <span key={cap} className={home.chip}>
                    {cap}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 11 — FAQ */}
      <Section>
        <div className="reveal">
          <SectionHeader label={AI_FAQ.label} title={AI_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {AI_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={AI_FAQ.cta.to}>
            {AI_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 12 — Final CTA */}
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
              // {AI_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{AI_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{AI_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={AI_FINAL.primaryCta.to}>
                {AI_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={AI_FINAL.secondaryCta.to}>
                {AI_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
