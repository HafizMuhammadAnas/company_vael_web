import { LeadForm } from "@/components/forms/LeadForm";
import { DomainShell } from "@/components/sections/domain/DomainShell";
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
    <DomainShell domain="contact">
      <PageHero
        domain="contact"
        label={PROPOSAL_HERO.label}
        title={PROPOSAL_HERO.title}
        supporting={PROPOSAL_HERO.supporting}
      />

      <Section>
        <div className={`${c.formSolo} reveal`}>
          <div className={c.formShell}>
            <div className={c.formHead}>
              <div>
                <h2 className={c.formTitle}>{PROPOSAL_FORM.heading}</h2>
              </div>
              <span className={c.formBadge}>Proposal</span>
            </div>
            <div className={c.formBody}>
              <LeadForm
                formType="proposal"
                fields={PROPOSAL_FORM_FIELDS}
                submitLabel={PROPOSAL_FORM.submitLabel}
                trust={PROPOSAL_FORM.trust}
                redirectTo="/thank-you"
              />
            </div>
          </div>
        </div>
      </Section>
    </DomainShell>
  );
}
