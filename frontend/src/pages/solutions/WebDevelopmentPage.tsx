import { Link } from "react-router-dom";

import { PipelineDiagram } from "@/components/sections/Diagram";
import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";
import {
  WEB_BUILD,
  WEB_CAPABILITIES,
  WEB_FAQ,
  WEB_FINAL,
  WEB_HERO,
  WEB_INDUSTRIES,
  WEB_INTEGRATIONS,
  WEB_INTRO,
  WEB_MODERN,
  WEB_MORE,
  WEB_PROCESS,
  WEB_QUALITY,
  WEB_SEO,
  WEB_TECH,
  WEB_WORK,
} from "@/content/webDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function WebDevelopmentPage() {
  useDocumentMeta(WEB_SEO.title, WEB_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={WEB_HERO.label}
        title={WEB_HERO.title}
        supporting={WEB_HERO.supporting}
        primaryCta={WEB_HERO.primaryCta}
        secondaryCta={WEB_HERO.secondaryCta}
        tags={WEB_HERO.tags}
      />

      {/* 02 — Beyond a Website */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_INTRO.label} title={WEB_INTRO.heading} />
          <div className={home.supporting}>
            {WEB_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_INTRO.cards.map((item) => (
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
          <SectionHeader label={WEB_BUILD.label} title={WEB_BUILD.heading} lineText={WEB_BUILD.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_BUILD.cards.map((card) => (
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

      {/* 04 — What Makes a Modern Web Platform */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_MODERN.label} title={WEB_MODERN.heading} />
          <p className={home.supporting}>{WEB_MODERN.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_MODERN.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — Web Development Capabilities */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WEB_CAPABILITIES.label} title={WEB_CAPABILITIES.heading} />
          <p className={home.supporting}>{WEB_CAPABILITIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {WEB_CAPABILITIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 06 — Web Design & Development Process */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_PROCESS.label} title={WEB_PROCESS.heading} />
          <p className={home.supporting}>{WEB_PROCESS.supporting}</p>
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {WEB_PROCESS.steps.map((step) => (
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

      {/* 07 — From Website to Web Application */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WEB_MORE.label} title={WEB_MORE.heading} />
          <div className={home.supporting}>
            {WEB_MORE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="reveal">
          <PipelineDiagram items={WEB_MORE.flow} numbered={false} />
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={WEB_MORE.cta.to}>
            {WEB_MORE.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 08 — Integrations */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_INTEGRATIONS.label} title={WEB_INTEGRATIONS.heading} />
          <p className={home.supporting}>{WEB_INTEGRATIONS.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_INTEGRATIONS.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 09 — Technology */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WEB_TECH.label} title={WEB_TECH.heading} />
          <p className={home.supporting}>{WEB_TECH.supporting}</p>
        </div>
        <div className={`${home.techGrid} reveal`}>
          {WEB_TECH.categories.map((cat) => (
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

      {/* 10 — Performance, Security & Quality */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_QUALITY.label} title={WEB_QUALITY.heading} />
          <p className={home.supporting}>{WEB_QUALITY.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_QUALITY.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 11 — Industries */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WEB_INDUSTRIES.label} title={WEB_INDUSTRIES.heading} />
          <p className={home.supporting}>{WEB_INDUSTRIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WEB_INDUSTRIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={WEB_INDUSTRIES.cta.to}>
            {WEB_INDUSTRIES.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 12 — Selected Work (reuses approved homepage items) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WEB_WORK.label} title={WEB_WORK.heading} />
          <p className={home.supporting}>{WEB_WORK.supporting}</p>
          <p className={home.sectionNote}>{WEB_WORK.note}</p>
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
          <Button variant="primary" to={WEB_WORK.cta.to}>
            {WEB_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 13 — FAQ */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WEB_FAQ.label} title={WEB_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {WEB_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={WEB_FAQ.cta.to}>
            {WEB_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 14 — Final CTA */}
      <Section className={home.altBg}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{WEB_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{WEB_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{WEB_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={WEB_FINAL.primaryCta.to}>
                {WEB_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={WEB_FINAL.secondaryCta.to}>
                {WEB_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
