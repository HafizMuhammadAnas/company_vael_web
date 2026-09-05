import { PageHero } from "@/components/sections/PageHero";
import { DomainShell, WorkGallery } from "@/components/sections/elevated/Elevate";
import {
  CASE_STUDIES,
  CASE_STUDIES_HERO,
  CASE_STUDIES_NOTE,
  CASE_STUDIES_SEO,
  FEATURED_CASE_STUDY_SLUGS,
  WORK_CASE_STUDIES_TEASER,
} from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const featured = FEATURED_CASE_STUDY_SLUGS.map((slug) => CASE_STUDIES.find((cs) => cs.slug === slug)).filter(
  (cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs),
);

export function CaseStudiesPage() {
  useDocumentMeta(CASE_STUDIES_SEO.title, CASE_STUDIES_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="work">
      <PageHero
        domain="work"
        label={CASE_STUDIES_HERO.label}
        title={CASE_STUDIES_HERO.title}
        supporting={CASE_STUDIES_HERO.supporting}
      />

      <WorkGallery
        label={WORK_CASE_STUDIES_TEASER.label}
        title={WORK_CASE_STUDIES_TEASER.heading}
        supporting={WORK_CASE_STUDIES_TEASER.supporting}
        note={CASE_STUDIES_NOTE}
        cards={featured.map((cs) => ({
          title: cs.title,
          category: cs.category,
          description: cs.lead,
          capabilities: cs.focus.points,
          technology: cs.technologies.join(" · "),
          to: `/work/case-studies/${cs.slug}`,
          cta: "Read Project Write-Up",
        }))}
      />
    </DomainShell>
  );
}
