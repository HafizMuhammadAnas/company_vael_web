import { Navigate, useParams } from "react-router-dom";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { DomainShell, ProseSection } from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import { CASE_STUDIES, CASE_STUDIES_NOTE, WORK_FINAL } from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find((cs) => cs.slug === slug);

  useDocumentMeta(
    study?.seo.title ?? "Project Write-Up | VAELKODE",
    study?.seo.description ??
      "Selected professional project write-up — not a VAELKODE-brand client delivery.",
  );
  useScrollReveal();

  if (!study) {
    return <Navigate to="/work/case-studies" replace />;
  }

  return (
    <DomainShell domain="work">
      <PageHero domain="work" label={study.category} title={study.title} supporting={study.lead} />

      <Section>
        <p className={`${home.sectionNote} reveal`}>{CASE_STUDIES_NOTE}</p>
      </Section>

      {/* Project Overview */}
      <ProseSection label="Overview" title="Project Overview" paragraphs={study.overview} altBg />

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
      <FinalCtaSection
        heading={WORK_FINAL.heading}
        supporting={WORK_FINAL.supporting}
        primaryCta={WORK_FINAL.primaryCta}
        secondaryCta={WORK_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
