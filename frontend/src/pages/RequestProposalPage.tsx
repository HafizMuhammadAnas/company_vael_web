import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import { Section } from "@/components/ui";
import {
  PROPOSAL_FORM,
  PROPOSAL_FORM_FIELDS,
  PROPOSAL_HERO,
  PROPOSAL_SEO,
} from "@/content/requestProposal";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function RequestProposalPage() {
  useDocumentMeta(PROPOSAL_SEO.title, PROPOSAL_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero label={PROPOSAL_HERO.label} title={PROPOSAL_HERO.title} supporting={PROPOSAL_HERO.supporting} />

      <Section>
        <div className="reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className={c.formWrap}>
            <div className={c.formTitle}>{PROPOSAL_FORM.heading}</div>
            <LeadForm
              formType="proposal"
              fields={PROPOSAL_FORM_FIELDS}
              submitLabel={PROPOSAL_FORM.submitLabel}
              trust={PROPOSAL_FORM.trust}
              redirectTo="/thank-you"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
