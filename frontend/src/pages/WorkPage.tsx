import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import { ProjectCard } from "@/components/sections/work/ProjectCard";
import work from "@/components/sections/work/Work.module.css";
import { Button, Card, Section, SectionHeader } from "@/components/ui";
import {
  CASE_STUDIES,
  FEATURED_CASE_STUDY_SLUGS,
  PROJECTS,
  WORK_CASE_STUDIES_TEASER,
  WORK_DELIVERY,
  WORK_DEMONSTRATES,
  WORK_EXPERTISE,
  WORK_FINAL,
  WORK_HERO,
  WORK_INDUSTRIES,
  WORK_SEO,
  WORK_SELECTED,
} from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const featuredCaseStudies = FEATURED_CASE_STUDY_SLUGS.map((slug) =>
  CASE_STUDIES.find((cs) => cs.slug === slug),
).filter((cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs));

export function WorkPage() {
  useDocumentMeta(WORK_SEO.title, WORK_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
        label={WORK_HERO.label}
        title={WORK_HERO.title}
        supporting={WORK_HERO.supporting}
        primaryCta={WORK_HERO.primaryCta}
        secondaryCta={WORK_HERO.secondaryCta}
      />

      {/* Selected Projects */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WORK_SELECTED.label} title={WORK_SELECTED.heading} />
          <p className={home.supporting}>{WORK_SELECTED.supporting}</p>
          <p className={home.sectionNote}>// {WORK_SELECTED.note}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {/* What This Work Demonstrates */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WORK_DEMONSTRATES.label} title={WORK_DEMONSTRATES.heading} />
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {WORK_DEMONSTRATES.cards.map((card) => (
            <Card key={card.title}>
              <div className={home.cardTitle}>{card.title}</div>
              <p className={home.cardText}>{card.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technical Expertise */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WORK_EXPERTISE.label} title={WORK_EXPERTISE.heading} />
        </div>
        <div className={`${home.techGrid} reveal`}>
          {WORK_EXPERTISE.groups.map((group) => (
            <div key={group.title} className={home.techCat}>
              <div className={home.techTitle}>{group.title}</div>
              <p className={home.cardText}>{group.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How We Deliver */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WORK_DELIVERY.label} title={WORK_DELIVERY.heading} />
        </div>
        <div className={`${work.delivery} reveal`}>
          {WORK_DELIVERY.steps.map((step) => (
            <div key={step.num} className={home.step}>
              <div className={home.stepNode}>
                <span className={home.stepNum}>{step.num}</span>
              </div>
              <div className={home.stepTitle}>{step.title}</div>
              <p className={home.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Link to={WORK_DELIVERY.cta.to} className={home.cardCta}>
            {WORK_DELIVERY.cta.label} →
          </Link>
        </div>
      </Section>

      {/* Industries */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={WORK_INDUSTRIES.label} title={WORK_INDUSTRIES.heading} />
        </div>
        <div className={`${work.industryChips} reveal`}>
          {WORK_INDUSTRIES.items.map((item) => (
            <Link key={item.label} to={item.to} className={work.industryChip}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="reveal">
          <Button variant="outline" to={WORK_INDUSTRIES.cta.to}>
            {WORK_INDUSTRIES.cta.label} →
          </Button>
        </div>
      </Section>

      {/* Case Studies teaser */}
      <Section>
        <div className="reveal">
          <SectionHeader label={WORK_CASE_STUDIES_TEASER.label} title={WORK_CASE_STUDIES_TEASER.heading} />
          <p className={home.supporting}>{WORK_CASE_STUDIES_TEASER.supporting}</p>
        </div>
        <div className={`${home.grid} ${home.cols3} reveal`}>
          {featuredCaseStudies.map((cs) => (
            <Card key={cs.slug}>
              <div className={home.cardCategory}>{cs.category}</div>
              <div className={home.cardTitle}>{cs.title}</div>
              <p className={home.cardText}>{cs.lead}</p>
              <Link to={`/work/case-studies/${cs.slug}`} className={home.cardCta}>
                View Case Study →
              </Link>
            </Card>
          ))}
        </div>
        <div className={`${home.sectionCtas} reveal`}>
          <Button variant="primary" to={WORK_CASE_STUDIES_TEASER.cta.to}>
            {WORK_CASE_STUDIES_TEASER.cta.label} →
          </Button>
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
              // {WORK_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{WORK_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{WORK_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={WORK_FINAL.primaryCta.to}>
                {WORK_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={WORK_FINAL.secondaryCta.to}>
                {WORK_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
