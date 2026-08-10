import l from "@/components/sections/legal/Legal.module.css";
import { Section } from "@/components/ui";
import { COMPANY } from "@/constants/company";
import type { LegalBlock, LegalDoc } from "@/content/legal";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

function blockKey(block: LegalBlock): string {
  if ("h3" in block) return `h3:${block.h3}`;
  if ("ul" in block) return `ul:${block.ul.join("|")}`;
  return `p:${block.p}`;
}

function Block({ block }: { block: LegalBlock }) {
  if ("h3" in block) {
    return <h3 className={l.h3}>{block.h3}</h3>;
  }
  if ("ul" in block) {
    return (
      <ul className={l.ul}>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className={l.p}>{block.p}</p>;
}

/** Data-driven renderer shared by the Privacy, Terms, and Cookie legal pages. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  useDocumentMeta(doc.seo.title, doc.seo.description);

  return (
    <Section>
      <div className={l.wrap}>
        <div className={l.eyebrow}>// Legal</div>
        <h1 className={l.title}>{doc.title}</h1>
        <p className={l.meta}>Last updated: {doc.lastUpdated}</p>

        {doc.intro.map((paragraph) => (
          <p key={paragraph} className={l.intro}>
            {paragraph}
          </p>
        ))}

        {doc.sections.map((section) => (
          <section key={section.heading} className={l.section}>
            <h2 className={l.h2}>{section.heading}</h2>
            {section.blocks.map((block) => (
              <Block key={blockKey(block)} block={block} />
            ))}
          </section>
        ))}

        <div className={l.signature}>
          <strong>{COMPANY.legal.registeredName}</strong>
          <span>Company No. {COMPANY.legal.companyNumber}</span>
          <span>{COMPANY.legal.registeredOffice}</span>
        </div>
      </div>
    </Section>
  );
}
