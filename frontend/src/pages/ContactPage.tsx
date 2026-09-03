import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import c from "@/components/sections/contact/Contact.module.css";
import home from "@/components/sections/home/Home.module.css";
import { Button, Section, Eyebrow } from "@/components/ui";
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
    <>
      <PageHero label={CONTACT_HERO.label} title={CONTACT_HERO.title} supporting={CONTACT_HERO.supporting} />

      <Section>
        <div className={`${c.layout} reveal`}>
          <div className={c.info}>
            <div className={c.infoHeading}>{CONTACT_INFO.heading}</div>
            <div className={c.block}>
              <span className={c.blockLabel}>Email</span>
              <a className={c.email} href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className={c.block}>
              <span className={c.blockLabel}>Phone</span>
              <a className={c.email} href={`tel:${CONTACT_INFO.phone}`}>
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
            {CONTACT_INFO.blocks.map((block) => (
              <div key={block.label} className={c.block}>
                <span className={c.blockLabel}>{block.label}</span>
                <span className={c.blockText}>{block.text}</span>
              </div>
            ))}
            <div className={c.block}>
              <span className={c.blockLabel}>{CONTACT_INFO.helpLabel}</span>
              <ul className={c.helpList}>
                {CONTACT_INFO.help.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={c.block}>
              <span className={c.blockLabel}>{CONTACT_COMPANY.label}</span>
              <dl className={c.details}>
                {CONTACT_COMPANY.rows.map((row) => (
                  <div key={row.label} className={c.detailRow}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className={c.formWrap}>
            <div className={c.formTitle}>{CONTACT_FORM.heading}</div>
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
      </Section>

      {/* Final CTA */}
      <Section className={home.altBg}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{CONTACT_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{CONTACT_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{CONTACT_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={CONTACT_FINAL.primaryCta.to}>
                {CONTACT_FINAL.primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
