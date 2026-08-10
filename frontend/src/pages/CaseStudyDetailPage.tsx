import { Navigate, useParams } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import { CASE_STUDIES, WORK_FINAL } from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((cs) => cs.slug === slug);

  useDocumentMeta(
    study?.seo.title ?? "Case Study | VAELKODE",
    study?.seo.description ?? "VAELKODE case study.",
  );
  useScrollReveal();

  if (!study) {
    return <Navigate to="/work/case-studies" replace />;
  }

  return (
    <>
      <PageHero label={study.category} title={study.title} supporting={study.lead} />

      {/* Project Overview */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label="Overview" title="Project Overview" />
          <div className={home.supporting}>
            {study.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Focus — AI & Automation / Computer Vision */}
      <Section>
        <div className="reveal">
          <SectionHeader label="Focus" title={study.focus.heading} />
          <ul className={work.bulletList} style={{ maxWidth: 720 }}>
            {study.focus.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Key Components */}
      {study.keyComponents && study.keyComponents.length > 0 && (
        <Section className={home.altBg}>
          <div className="reveal">
            <SectionHeader label="Scope" title="Key Components" />
            <div className={home.chips}>
              {study.keyComponents.map((component) => (
                <span key={component} className={home.chip}>
                  {component}
                </span>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Technology Stack */}
      <Section>
        <div className="reveal">
          <SectionHeader label="Technology" title="Technology Stack" />
          <div className={home.chips}>
            {study.technologies.map((tech) => (
              <span key={tech} className={home.chip}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Related Capabilities */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label="Explore" title="Related Capabilities" />
          <div className={work.related}>
            {study.relatedCapabilities.map((cap) => (
              <Button key={cap.to} variant="outline" to={cap.to}>
                {cap.label} →
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
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
