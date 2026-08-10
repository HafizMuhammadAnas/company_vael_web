import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import home from "@/components/sections/home/Home.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
import {
  CONSULT_DISCUSS,
  CONSULT_FINAL,
  CONSULT_FORM,
  CONSULT_FORM_FIELDS,
  CONSULT_HERO,
  CONSULT_SEO,
} from "@/content/consultation";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ConsultationPage() {
  useDocumentMeta(CONSULT_SEO.title, CONSULT_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero label={CONSULT_HERO.label} title={CONSULT_HERO.title} supporting={CONSULT_HERO.supporting} />

      {/* What we can discuss */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={CONSULT_DISCUSS.label} title={CONSULT_DISCUSS.heading} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {CONSULT_DISCUSS.points.map((point) => (
            <Card key={point.num}>
              <div className={home.cardNum}>{point.num}</div>
              <div className={home.cardTitle}>{point.title}</div>
              <p className={home.cardText}>{point.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Consultation form */}
      <Section>
        <div className="reveal" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className={c.formWrap}>
            <div className={c.formTitle}>{CONSULT_FORM.heading}</div>
            <LeadForm
              formType="consultation"
              fields={CONSULT_FORM_FIELDS}
              submitLabel={CONSULT_FORM.submitLabel}
              trust={CONSULT_FORM.trust}
              redirectTo="/thank-you"
            />
          </div>
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
              // {CONSULT_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{CONSULT_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{CONSULT_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={CONSULT_FINAL.primaryCta.to}>
                {CONSULT_FINAL.primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
