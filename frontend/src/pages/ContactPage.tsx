import { DomainShell } from "@/components/sections/elevated/Elevate";
import { LeadForm } from "@/components/forms/LeadForm";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import { Section } from "@/components/ui";
import {
  CONTACT_COMPANY,
  CONTACT_FINAL,
  CONTACT_FORM,
  CONTACT_FORM_FIELDS,
  CONTACT_HERO,
  CONTACT_INFO,
  CONTACT_SEO,
} from "@/content/contact";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ContactPage() {
  useDocumentMeta(CONTACT_SEO.title, CONTACT_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="contact">
      <>
        <PageHero
          domain="contact"
          label={CONTACT_HERO.label}
          title={CONTACT_HERO.title}
          supporting={CONTACT_HERO.supporting}
        />

        <Section>
          <div className={`${c.layout} reveal`}>
            <aside className={c.info}>
              <h2 className={c.infoHeading}>{CONTACT_INFO.heading}</h2>

              <div className={c.channelCard}>
                <div className={c.channel}>
                  <span className={c.blockLabel}>Email</span>
                  <a className={c.email} href={`mailto:${CONTACT_INFO.email}`}>
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className={c.channel}>
                  <span className={c.blockLabel}>Phone</span>
                  <a className={c.email} href={`tel:${CONTACT_INFO.phone}`}>
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </div>
                <p className={c.helpLabel}>{CONTACT_INFO.helpLabel}</p>
                <ul className={c.helpChips}>
                  {CONTACT_INFO.help.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={c.company}>
                <span className={c.companyLabel}>{CONTACT_COMPANY.label}</span>
                <dl className={c.details}>
                  {CONTACT_COMPANY.rows.map((row) => (
                    <div key={row.label} className={c.detailRow}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>

            <div className={c.formShell}>
              <div className={c.formHead}>
                <div>
                  <h2 className={c.formTitle}>{CONTACT_FORM.heading}</h2>
                  <p className={c.formHint}>{CONTACT_FORM.hint}</p>
                </div>
                <span className={c.formBadge}>{CONTACT_FORM.badge}</span>
              </div>
              <div className={c.formBody}>
                <LeadForm
                  formType="contact"
                  fields={CONTACT_FORM_FIELDS}
                  submitLabel={CONTACT_FORM.submitLabel}
                  trust={CONTACT_FORM.trust}
                  successTitle={CONTACT_FORM.successTitle}
                  successText={CONTACT_FORM.successText}
                />
              </div>
            </div>
          </div>
        </Section>

        <FinalCtaSection
          label={CONTACT_FINAL.label}
          heading={CONTACT_FINAL.heading}
          supporting={CONTACT_FINAL.supporting}
          primaryCta={CONTACT_FINAL.primaryCta}
        />
      </>
    </DomainShell>
  );
}
