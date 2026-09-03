import { PipelineDiagram } from "@/components/sections/Diagram";
import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
import {
  TC_AI,
  TC_ARCHITECTURE,
  TC_ASSESSMENT,
  TC_BUILD_BUY,
  TC_DELIVERABLES,
  TC_EVALUATION,
  TC_FAQ,
  TC_FINAL,
  TC_HERO,
  TC_INTRO,
  TC_PROCESS,
  TC_ROADMAP,
  TC_SEO,
  TC_SERVICES,
  TC_TRANSFORM,
  TC_WHEN,
  TC_WHO,
  TC_WORK,
} from "@/content/technologyConsulting";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function TechnologyConsultingPage() {
  useDocumentMeta(TC_SEO.title, TC_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={TC_HERO.label}
        title={TC_HERO.title}
        supporting={TC_HERO.supporting}
        primaryCta={TC_HERO.primaryCta}
        secondaryCta={TC_HERO.secondaryCta}
        tags={TC_HERO.tags}
      />

      {/* 02 — Technology Decisions */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_INTRO.label} title={TC_INTRO.heading} />
          <div className={home.supporting}>
            {TC_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {TC_INTRO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Consulting Services */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_SERVICES.label} title={TC_SERVICES.heading} lineText={TC_SERVICES.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {TC_SERVICES.cards.map((card) => (
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

      {/* 04 — When You Need Technology Consulting */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_WHEN.label} title={TC_WHEN.heading} />
          <p className={home.supporting}>{TC_WHEN.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {TC_WHEN.cards.map((item) => (
            <Card key={item.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
              <div className={s.potential}>
                <span>Consulting focus</span>
                <span className={s.potentialValue}>{item.focus}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — System & Technology Assessment */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_ASSESSMENT.label} title={TC_ASSESSMENT.heading} />
          <div className={home.supporting}>
            {TC_ASSESSMENT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {TC_ASSESSMENT.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={TC_ASSESSMENT.cta.to}>
            {TC_ASSESSMENT.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 06 — Solution Architecture */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_ARCHITECTURE.label} title={TC_ARCHITECTURE.heading} />
          <div className={home.supporting}>
            {TC_ARCHITECTURE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="reveal">
          <PipelineDiagram items={TC_ARCHITECTURE.flow} numbered={false} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {TC_ARCHITECTURE.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 07 — Digital Transformation */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_TRANSFORM.label} title={TC_TRANSFORM.heading} />
          <p className={home.supporting}>{TC_TRANSFORM.supporting}</p>
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {TC_TRANSFORM.cards.map((item, i) => (
            <div key={item.title} className={home.step}>
              <div className={home.stepNode}>
                <span className={home.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className={home.stepTitle}>{item.title}</div>
              <p className={home.stepText}>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 08 — Build vs Buy */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_BUILD_BUY.label} title={TC_BUILD_BUY.heading} />
          <div className={home.supporting}>
            {TC_BUILD_BUY.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {TC_BUILD_BUY.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={TC_BUILD_BUY.cta.to}>
            {TC_BUILD_BUY.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 09 — Technology Evaluation */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_EVALUATION.label} title={TC_EVALUATION.heading} />
          <div className={home.supporting}>
            {TC_EVALUATION.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {TC_EVALUATION.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 10 — AI & Emerging Technology */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_AI.label} title={TC_AI.heading} />
          <div className={home.supporting}>
            {TC_AI.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {TC_AI.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="outline" to={TC_AI.cta.to}>
            {TC_AI.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 11 — Technical Roadmap */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_ROADMAP.label} title={TC_ROADMAP.heading} />
          <div className={home.supporting}>
            {TC_ROADMAP.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="reveal">
          <PipelineDiagram items={TC_ROADMAP.flow} />
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {TC_ROADMAP.phases.map((phase) => (
            <div key={phase.num} className={home.step}>
              <div className={home.stepNode}>
                <span className={home.stepNum}>{phase.num}</span>
              </div>
              <div className={home.stepTitle}>{phase.title}</div>
              <p className={home.stepText}>{phase.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 12 — Our Consulting Process */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_PROCESS.label} title={TC_PROCESS.heading} />
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {TC_PROCESS.steps.map((step) => (
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

      {/* 13 — Consulting Deliverables */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_DELIVERABLES.label} title={TC_DELIVERABLES.heading} />
          <p className={home.supporting}>{TC_DELIVERABLES.supporting}</p>
          <p className={home.sectionNote}>{TC_DELIVERABLES.note}</p>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {TC_DELIVERABLES.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 14 — Who We Help */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_WHO.label} title={TC_WHO.heading} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {TC_WHO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 15 — Selected Work (neutral empty state) */}
      <Section>
        <div className="reveal">
          <SectionHeader label={TC_WORK.label} title={TC_WORK.heading} />
          <p className={home.supporting}>{TC_WORK.supporting}</p>
        </div>
        <div className={`${home.emptyState} reveal`}>{TC_WORK.emptyState}</div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={TC_WORK.cta.to}>
            {TC_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 16 — FAQ */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={TC_FAQ.label} title={TC_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {TC_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={TC_FAQ.cta.to}>
            {TC_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 17 — Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{TC_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{TC_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{TC_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={TC_FINAL.primaryCta.to}>
                {TC_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={TC_FINAL.secondaryCta.to}>
                {TC_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
