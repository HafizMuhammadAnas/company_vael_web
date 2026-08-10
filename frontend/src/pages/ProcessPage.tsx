import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import p from "@/components/sections/process/Process.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
import {
  PROCESS_ENGAGEMENT,
  PROCESS_FINAL,
  PROCESS_HERO,
  PROCESS_SEO,
  PROCESS_STEPS,
} from "@/content/process";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ProcessPage() {
  useDocumentMeta(PROCESS_SEO.title, PROCESS_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={PROCESS_HERO.label}
        title={PROCESS_HERO.title}
        supporting={PROCESS_HERO.supporting}
        primaryCta={PROCESS_HERO.primaryCta}
      />

      {/* Timeline of stages */}
      <Section>
        <div className={`${p.timeline} reveal`}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className={p.step}>
              <span className={p.node} aria-hidden="true" />
              <div className={p.head}>
                <span className={p.num}>{step.num}</span>
                <span className={p.title}>{step.title}</span>
              </div>
              <p className={p.text}>{step.text}</p>

              {step.activities.length > 0 && (
                <>
                  <div className={p.activitiesLabel}>{step.activitiesLabel}</div>
                  <div className={p.chips}>
                    {step.activities.map((a) => (
                      <span key={a} className={home.chip}>
                        {a}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {step.output && (
                <div className={p.output}>
                  <span className={p.outputLabel}>Output</span>
                  {step.output}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={PROCESS_ENGAGEMENT.label} title={PROCESS_ENGAGEMENT.heading} />
        </div>
        <div className={`${home.grid} ${home.cols2} reveal`}>
          {PROCESS_ENGAGEMENT.models.map((model) => (
            <Card key={model.title}>
              <div className={home.cardTitle}>{model.title}</div>
              <p className={home.cardText}>{model.text}</p>
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
              // {PROCESS_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{PROCESS_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{PROCESS_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={PROCESS_FINAL.primaryCta.to}>
                {PROCESS_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={PROCESS_FINAL.secondaryCta.to}>
                {PROCESS_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
