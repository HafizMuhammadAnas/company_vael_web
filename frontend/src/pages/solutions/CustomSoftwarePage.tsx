import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
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

export function CustomSoftwarePage() {
  useDocumentMeta(CS_SEO.title, CS_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={CS_HERO.label}
        title={CS_HERO.title}
        supporting={CS_HERO.supporting}
        primaryCta={CS_HERO.primaryCta}
        secondaryCta={CS_HERO.secondaryCta}
        tags={CS_HERO.tags}
      />

      {/* 02 — Why Custom Software */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_WHY.label} title={CS_WHY.heading} />
          <div className={home.supporting}>
            {CS_WHY.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CS_WHY.cards.map((item) => (
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
          <SectionHeader label={CS_BUILD.label} title={CS_BUILD.heading} lineText={CS_BUILD.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CS_BUILD.cards.map((card) => (
            <Card key={card.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.description}</p>
              <div className={s.solutionCapabilities}>
                {card.items.map((item) => (
                  <span key={item} className={home.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 04 — Business Problems We Solve */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_PROBLEMS.label} title={CS_PROBLEMS.heading} />
          <p className={home.supporting}>{CS_PROBLEMS.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CS_PROBLEMS.cards.map((item) => (
            <Card key={item.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
              <div className={s.potential}>
                <span>Potential solution</span>
                <span className={s.potentialValue}>{item.solution}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — Software Capabilities */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CS_CAPABILITIES.label} title={CS_CAPABILITIES.heading} />
          <p className={home.supporting}>{CS_CAPABILITIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {CS_CAPABILITIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 06 — Modernization & Integration */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_MODERNIZE.label} title={CS_MODERNIZE.heading} />
          <div className={home.supporting}>
            {CS_MODERNIZE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {CS_MODERNIZE.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={CS_MODERNIZE.cta.to}>
            {CS_MODERNIZE.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 07 — Engineering Principles */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CS_PRINCIPLES.label} title={CS_PRINCIPLES.heading} />
          <p className={home.supporting}>{CS_PRINCIPLES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CS_PRINCIPLES.cards.map((item) => (
            <Card key={item.num}>
              <div className={home.cardNum}>{item.num}</div>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 08 — Technology */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_TECH.label} title={CS_TECH.heading} />
          <p className={home.supporting}>{CS_TECH.supporting}</p>
        </div>
        <div className={`${home.techGrid} reveal`}>
          {CS_TECH.categories.map((cat) => (
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

      {/* 09 — Development Process */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CS_PROCESS.label} title={CS_PROCESS.heading} />
          <p className={home.supporting}>{CS_PROCESS.supporting}</p>
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {CS_PROCESS.steps.map((step) => (
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

      {/* 10 — Who We Help */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_WHO.label} title={CS_WHO.heading} />
          <p className={home.supporting}>{CS_WHO.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CS_WHO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={CS_WHO.cta.to}>
            {CS_WHO.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 11 — Selected Work (reuses approved homepage items) */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CS_WORK.label} title={CS_WORK.heading} />
          <p className={home.supporting}>{CS_WORK.supporting}</p>
          <p className={home.sectionNote}>{CS_WORK.note}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {FEATURED_WORK.cards.map((card) => (
            <Card key={card.title}>
              <div className={home.cardCategory}>{card.category}</div>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.description}</p>
              <div className={home.cardTech}>{card.technology}</div>
              <Link to={card.to} className={home.cardCta}>
                {card.cta} →
              </Link>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={CS_WORK.cta.to}>
            {CS_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 12 — FAQ */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CS_FAQ.label} title={CS_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {CS_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={CS_FAQ.cta.to}>
            {CS_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 13 — Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{CS_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{CS_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{CS_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={CS_FINAL.primaryCta.to}>
                {CS_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={CS_FINAL.secondaryCta.to}>
                {CS_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
