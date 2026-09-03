import { PipelineDiagram } from "@/components/sections/Diagram";
import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
import {
  CLOUD_CHALLENGES,
  CLOUD_CONTAINERS,
  CLOUD_CONTINUITY,
  CLOUD_FAQ,
  CLOUD_FINAL,
  CLOUD_HERO,
  CLOUD_IAC,
  CLOUD_INTRO,
  CLOUD_MONITORING,
  CLOUD_PIPELINE,
  CLOUD_PLATFORMS,
  CLOUD_PROCESS,
  CLOUD_SECURITY,
  CLOUD_SEO,
  CLOUD_SERVICES,
  CLOUD_WHO,
  CLOUD_WORK,
} from "@/content/cloudDevops";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CloudDevOpsPage() {
  useDocumentMeta(CLOUD_SEO.title, CLOUD_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={CLOUD_HERO.label}
        title={CLOUD_HERO.title}
        supporting={CLOUD_HERO.supporting}
        primaryCta={CLOUD_HERO.primaryCta}
        secondaryCta={CLOUD_HERO.secondaryCta}
        tags={CLOUD_HERO.tags}
      />

      {/* 02 — Beyond Development */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_INTRO.label} title={CLOUD_INTRO.heading} />
          <div className={home.supporting}>
            {CLOUD_INTRO.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_INTRO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 03 — Cloud & DevOps Services */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_SERVICES.label} title={CLOUD_SERVICES.heading} lineText={CLOUD_SERVICES.supporting} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_SERVICES.cards.map((card) => (
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

      {/* 04 — DevOps Challenges We Solve */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_CHALLENGES.label} title={CLOUD_CHALLENGES.heading} />
          <p className={home.supporting}>{CLOUD_CHALLENGES.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_CHALLENGES.cards.map((item) => (
            <Card key={item.title} className={s.solutionCard}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
              <div className={s.potential}>
                <span>Approach</span>
                <span className={s.potentialValue}>{item.approach}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 05 — CI/CD Pipelines */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_PIPELINE.label} title={CLOUD_PIPELINE.heading} />
          <p className={home.supporting}>{CLOUD_PIPELINE.supporting}</p>
        </div>
        <div className="reveal">
          <PipelineDiagram items={CLOUD_PIPELINE.flow} />
        </div>
        <div className="reveal">
          <p className={home.supporting}>{CLOUD_PIPELINE.note}</p>
        </div>
      </Section>

      {/* 06 — Containers & Environments */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_CONTAINERS.label} title={CLOUD_CONTAINERS.heading} />
          <div className={home.supporting}>
            {CLOUD_CONTAINERS.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {CLOUD_CONTAINERS.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 07 — Cloud Platforms */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_PLATFORMS.label} title={CLOUD_PLATFORMS.heading} />
          <p className={home.supporting}>{CLOUD_PLATFORMS.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_PLATFORMS.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${s.chipBlock} reveal`}>
          <div className={s.chipBlockLabel}>{CLOUD_PLATFORMS.capabilitiesLabel}</div>
          <div className={s.chipBlockChips}>
            {CLOUD_PLATFORMS.capabilities.map((item) => (
              <span key={item} className={home.chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — Infrastructure as Code */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_IAC.label} title={CLOUD_IAC.heading} />
          <p className={home.supporting}>{CLOUD_IAC.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols4} reveal`}>
          {CLOUD_IAC.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
        <div className={`${s.chipBlock} reveal`}>
          <div className={s.chipBlockLabel}>{CLOUD_IAC.technologyLabel}</div>
          <div className={s.chipBlockChips}>
            {CLOUD_IAC.technology.map((item) => (
              <span key={item} className={home.chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 09 — Security & Access */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_SECURITY.label} title={CLOUD_SECURITY.heading} />
          <p className={home.supporting}>{CLOUD_SECURITY.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_SECURITY.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 10 — Monitoring & Observability */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_MONITORING.label} title={CLOUD_MONITORING.heading} />
          <p className={home.supporting}>{CLOUD_MONITORING.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CLOUD_MONITORING.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 11 — Development + DevOps */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_CONTINUITY.label} title={CLOUD_CONTINUITY.heading} />
          <p className={home.supporting}>{CLOUD_CONTINUITY.supporting}</p>
        </div>
        <div className="reveal">
          <PipelineDiagram items={CLOUD_CONTINUITY.flow} numbered={false} />
        </div>
        <div className="reveal">
          <p className={home.supporting}>{CLOUD_CONTINUITY.statement}</p>
        </div>
      </Section>

      {/* 12 — Our Process */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_PROCESS.label} title={CLOUD_PROCESS.heading} />
        </div>
        <div className={`${s.stepsGrid} reveal`}>
          {CLOUD_PROCESS.steps.map((step) => (
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

      {/* 13 — Who We Help */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_WHO.label} title={CLOUD_WHO.heading} />
          <p className={home.supporting}>{CLOUD_WHO.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols2} reveal`}>
          {CLOUD_WHO.cards.map((item) => (
            <Card key={item.title}>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 14 — Selected Work (neutral empty state) */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CLOUD_WORK.label} title={CLOUD_WORK.heading} />
          <p className={home.supporting}>{CLOUD_WORK.supporting}</p>
        </div>
        <div className={`${home.emptyState} reveal`}>{CLOUD_WORK.emptyState}</div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={CLOUD_WORK.cta.to}>
            {CLOUD_WORK.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 15 — FAQ */}
      <Section>
        <div className="reveal">
          <SectionHeader label={CLOUD_FAQ.label} title={CLOUD_FAQ.heading} />
        </div>
        <div className={`${s.faq} reveal`}>
          {CLOUD_FAQ.items.map((item) => (
            <details key={item.q} className={s.faqItem}>
              <summary className={s.faqQuestion}>{item.q}</summary>
              <div className={s.faqAnswer}>{item.a}</div>
            </details>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={CLOUD_FAQ.cta.to}>
            {CLOUD_FAQ.cta.label} →
          </Button>
        </div>
      </Section>

      {/* 16 — Final CTA */}
      <Section className={home.altBg}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{CLOUD_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{CLOUD_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{CLOUD_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={CLOUD_FINAL.primaryCta.to}>
                {CLOUD_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={CLOUD_FINAL.secondaryCta.to}>
                {CLOUD_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
