import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import { Card, Section } from "@/components/ui";
import { CASE_STUDIES, CASE_STUDIES_HERO, CASE_STUDIES_SEO, FEATURED_CASE_STUDY_SLUGS } from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const featured = FEATURED_CASE_STUDY_SLUGS.map((slug) => CASE_STUDIES.find((cs) => cs.slug === slug)).filter(
  (cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs),
);

export function CaseStudiesPage() {
  useDocumentMeta(CASE_STUDIES_SEO.title, CASE_STUDIES_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={CASE_STUDIES_HERO.label}
        title={CASE_STUDIES_HERO.title}
        supporting={CASE_STUDIES_HERO.supporting}
      />

      <Section>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {featured.map((cs) => (
            <Card key={cs.slug}>
              <div className={home.cardCategory}>{cs.category}</div>
              <div className={home.cardTitle}>{cs.title}</div>
              <p className={home.cardText}>{cs.lead}</p>
              <Link to={`/work/case-studies/${cs.slug}`} className={home.cardCta}>
                Read Case Study →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
