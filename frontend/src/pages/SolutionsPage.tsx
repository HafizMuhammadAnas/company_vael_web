import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
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

export function SolutionsPage() {
  useDocumentMeta(SOLUTIONS_SEO.title, SOLUTIONS_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={SOL_HERO.label}
        title={SOL_HERO.title}
        supporting={SOL_HERO.supporting}
        primaryCta={SOL_HERO.primaryCta}
        secondaryCta={SOL_HERO.secondaryCta}
      />

      {/* 02 — How We Help */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={SOL_INTRO.label} title={SOL_INTRO.heading} />
          <div className={home.supporting}>
            {SOL_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {SOL_INTRO.principles.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Core Technology Solutions */}
      <Section>
        <div className="reveal">
          <SectionHeader label={SOL_CORE.label} title={SOL_CORE.heading} lineText={SOL_CORE.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {SOL_CORE.solutions.map((sol) => (
            <Card key={sol.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{sol.title}</div>
              <p className={home.cardText}>{sol.description}</p>
              <div className={s.solutionCapabilities}>
                {sol.capabilities.map((cap) => (
                  <span key={cap} className={home.chip}>
                    {cap}
                  </span>
                ))}
              </div>
              <Link to={sol.to} className={home.cardCta}>
                {sol.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 04 — Find Your Solution */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={SOL_CHALLENGES.label} title={SOL_CHALLENGES.heading} />
          <p className={home.supporting}>{SOL_CHALLENGES.supporting}</p>
        </div>
        <div className={`${s.challengeGrid} reveal`}>
          {SOL_CHALLENGES.items.map((item) => (
            <div key={item.question} className={s.challenge}>
              <div className={s.challengeQuestion}>{item.question}</div>
              <Link to={item.to} className={home.cardCta}>
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 — Engineering Principles */}
      <Section>
        <div className="reveal">
          <SectionHeader label={SOL_PRINCIPLES.label} title={SOL_PRINCIPLES.heading} />
          <p className={home.supporting}>{SOL_PRINCIPLES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {SOL_PRINCIPLES.items.map((item) => (
            <Card key={item.num}>
              <div className={home.cardNum}>{item.num}</div>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 06 — Technology Ecosystem */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={SOL_TECH.label} title={SOL_TECH.heading} />
          <p className={home.supporting}>{SOL_TECH.supporting}</p>
        </div>
        <div className={`${home.techGrid} reveal`}>
          {SOL_TECH.categories.map((cat) => (
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

      {/* 07 — Delivery Model */}
      <Section>
        <div className="reveal">
          <SectionHeader label={SOL_DELIVERY.label} title={SOL_DELIVERY.heading} />
        </div>
        <div className={`${home.steps} reveal`}>
          {SOL_DELIVERY.steps.map((step) => (
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
          <Button variant="primary" to={SOL_DELIVERY.cta.to}>
            {SOL_DELIVERY.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 08 — Who We Help */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={SOL_WHO.label} title={SOL_WHO.heading} />
          <p className={home.supporting}>{SOL_WHO.supporting}</p>
        </div>
        <div className={`${s.whoGrid} reveal`}>
          {SOL_WHO.cards.map((card) => (
            <Link key={card.title} to={card.to} className={s.whoCard}>
              {card.title}
            </Link>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={SOL_WHO.cta.to}>
            {SOL_WHO.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 09 — Selected Work (reuses approved homepage items) */}
      <Section>
        <div className="reveal">
          <SectionHeader label={SOL_WORK.label} title={SOL_WORK.heading} />
          <p className={home.supporting}>{SOL_WORK.supporting}</p>
          <p className={home.sectionNote}>{FEATURED_WORK.note}</p>
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
          <Button variant="primary" to={SOL_WORK.cta.to}>
            {SOL_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 10 — FAQ */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={SOL_FAQ.label} title={SOL_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {SOL_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={SOL_FAQ.cta.to}>
            {SOL_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 11 — Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{SOL_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{SOL_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{SOL_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={SOL_FINAL.primaryCta.to}>
                {SOL_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={SOL_FINAL.secondaryCta.to}>
                {SOL_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
