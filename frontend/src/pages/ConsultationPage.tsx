import { Compass, Eye, Target, Users, type LucideIcon } from "lucide-react";

import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import { DomainShell } from "@/components/sections/elevated/Elevate";
import { Eyebrow, Section } from "@/components/ui";
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

const DISCUSS_ICONS: LucideIcon[] = [Target, Eye, Users, Compass];

export function ConsultationPage() {
  useDocumentMeta(CONSULT_SEO.title, CONSULT_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="contact">
      <>
        <PageHero
          domain="contact"
          label={CONSULT_HERO.label}
          title={CONSULT_HERO.title}
          supporting={CONSULT_HERO.supporting}
        />

        <Section>
          <div className="reveal">
            <header className={c.discussHead}>
              <Eyebrow>{CONSULT_DISCUSS.label}</Eyebrow>
              <h2 className={c.discussTitle}>
                Four things we <span>{CONSULT_DISCUSS.accent}</span>
              </h2>
            </header>

            <ul className={c.discussGrid}>
              {CONSULT_DISCUSS.points.map((point, i) => {
                const Icon = DISCUSS_ICONS[i] ?? Target;
                return (
                  <li key={point.num} className={c.discussChip}>
                    <span className={c.discussIcon} aria-hidden>
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <span className={c.discussNum}>{point.num}</span>
                    <strong>{point.title}</strong>
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>

        <Section className={c.altBg}>
          <div className={`${c.formSolo} reveal`}>
            <div className={c.formShell}>
              <div className={c.formHead}>
                <div>
                  <h2 className={c.formTitle}>{CONSULT_FORM.heading}</h2>
                  <p className={c.formHint}>{CONSULT_FORM.hint}</p>
                </div>
                <span className={c.formBadge}>{CONSULT_FORM.badge}</span>
              </div>
              <div className={c.formBody}>
                <LeadForm
                  formType="consultation"
                  fields={CONSULT_FORM_FIELDS}
                  submitLabel={CONSULT_FORM.submitLabel}
                  trust={CONSULT_FORM.trust}
                  redirectTo="/thank-you"
                />
              </div>
            </div>
          </div>
        </Section>

        <FinalCtaSection
          label={CONSULT_FINAL.label}
          heading={CONSULT_FINAL.heading}
          supporting={CONSULT_FINAL.supporting}
          primaryCta={CONSULT_FINAL.primaryCta}
        />
      </>
    </DomainShell>
  );
}
