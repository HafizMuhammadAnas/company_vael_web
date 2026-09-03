import { PipelineDiagram } from "@/components/sections/Diagram";
import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
import {
  MOB_APPROACH,
  MOB_BACKEND,
  MOB_BUILD,
  MOB_CAPABILITIES,
  MOB_FAQ,
  MOB_FINAL,
  MOB_HERO,
  MOB_INDUSTRIES,
  MOB_INTRO,
  MOB_PROCESS,
  MOB_QUALITY,
  MOB_SEO,
  MOB_TECH,
  MOB_UX,
  MOB_WORK,
} from "@/content/mobileDevelopment";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function MobileDevelopmentPage() {
  useDocumentMeta(MOB_SEO.title, MOB_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={MOB_HERO.label}
        title={MOB_HERO.title}
        supporting={MOB_HERO.supporting}
        primaryCta={MOB_HERO.primaryCta}
        secondaryCta={MOB_HERO.secondaryCta}
        tags={MOB_HERO.tags}
      />

      {/* 02 — Mobile Products */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_INTRO.label} title={MOB_INTRO.heading} />
          <div className={home.supporting}>
            {MOB_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {MOB_INTRO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Mobile Solutions */}
      <Section>
        <div className="reveal">
          <SectionHeader label={MOB_BUILD.label} title={MOB_BUILD.heading} lineText={MOB_BUILD.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {MOB_BUILD.cards.map((card) => (
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

      {/* 04 — Mobile Development Capabilities */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_CAPABILITIES.label} title={MOB_CAPABILITIES.heading} />
          <p className={home.supporting}>{MOB_CAPABILITIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {MOB_CAPABILITIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — Mobile + Backend */}
      <Section>
        <div className="reveal">
          <SectionHeader label={MOB_BACKEND.label} title={MOB_BACKEND.heading} />
          <div className={home.supporting}>
            {MOB_BACKEND.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="reveal">
          <PipelineDiagram items={MOB_BACKEND.flow} numbered={false} />
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {MOB_BACKEND.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 06 — Mobile UX */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_UX.label} title={MOB_UX.heading} />
          <p className={home.supporting}>{MOB_UX.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {MOB_UX.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 07 — Technology Approach (Cross-Platform vs Native) */}
      <Section>
        <div className="reveal">
          <SectionHeader label={MOB_APPROACH.label} title={MOB_APPROACH.heading} />
          <p className={home.supporting}>{MOB_APPROACH.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols2} reveal`}>
          {MOB_APPROACH.options.map((opt) => (
            <Card key={opt.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{opt.title}</div>
              <p className={home.cardText}>{opt.text}</p>
              <div className={s.suitableLabel}>Suitable for</div>
              <div className={s.solutionCapabilities}>
                {opt.suitable.map((item) => (
                  <span key={item} className={home.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 08 — Technology */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_TECH.label} title={MOB_TECH.heading} />
          <p className={home.supporting}>{MOB_TECH.supporting}</p>
        </div>
        <div className={`${home.techGrid} reveal`}>
          {MOB_TECH.categories.map((cat) => (
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
          <SectionHeader label={MOB_PROCESS.label} title={MOB_PROCESS.heading} />
          <p className={home.supporting}>{MOB_PROCESS.supporting}</p>
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {MOB_PROCESS.steps.map((step) => (
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

      {/* 10 — Quality & Security */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_QUALITY.label} title={MOB_QUALITY.heading} />
          <p className={home.supporting}>{MOB_QUALITY.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {MOB_QUALITY.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 11 — Industries & Use Cases */}
      <Section>
        <div className="reveal">
          <SectionHeader label={MOB_INDUSTRIES.label} title={MOB_INDUSTRIES.heading} />
          <p className={home.supporting}>{MOB_INDUSTRIES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {MOB_INDUSTRIES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={MOB_INDUSTRIES.cta.to}>
            {MOB_INDUSTRIES.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 12 — Selected Work (neutral empty state — no fabricated mobile portfolio) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={MOB_WORK.label} title={MOB_WORK.heading} />
          <p className={home.supporting}>{MOB_WORK.supporting}</p>
        </div>
        <div className={`${home.emptyState} reveal`}>{MOB_WORK.emptyState}</div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={MOB_WORK.cta.to}>
            {MOB_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 13 — FAQ */}
      <Section>
        <div className="reveal">
          <SectionHeader label={MOB_FAQ.label} title={MOB_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {MOB_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={MOB_FAQ.cta.to}>
            {MOB_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 14 — Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{MOB_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{MOB_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{MOB_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={MOB_FINAL.primaryCta.to}>
                {MOB_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={MOB_FINAL.secondaryCta.to}>
                {MOB_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
