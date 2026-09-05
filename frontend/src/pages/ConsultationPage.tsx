import { ArrowRight, Compass, Eye, Layers, Target, Users } from "lucide-react";

import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import {
PrincipleDeck,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import { Section } from "@/components/ui";
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

const DISCUSS_ICONS = [Target, Eye, Users, Layers, Compass, ArrowRight];

export function ConsultationPage() {
  useDocumentMeta(CONSULT_SEO.title, CONSULT_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="contact">
      <>
      <PageHero domain="contact" label={CONSULT_HERO.label} title={CONSULT_HERO.title} supporting={CONSULT_HERO.supporting} />

      {/* What we can discuss */}
      <PrincipleDeck
        label={CONSULT_DISCUSS.label}
        title={CONSULT_DISCUSS.heading}
        items={CONSULT_DISCUSS.points}
        icons={DISCUSS_ICONS}
        eyebrowPrefix="Topic"
        altBg
      />

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
