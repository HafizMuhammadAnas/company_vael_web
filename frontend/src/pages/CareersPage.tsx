import { BrainCircuit, Code2, GraduationCap, Target, TrendingUp, Users } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import careers from "@/components/sections/careers/Careers.module.css";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { PrincipleDeck } from "@/components/sections/elevated/Elevate";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublicCareers } from "@/hooks/usePublicCareers";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHY_ICONS = [Code2, BrainCircuit, GraduationCap, Target, Users, TrendingUp];

export function CareersPage() {
  const { seo, hero, why, lookFor, opportunities, finalCta, jobs } = usePublicCareers();
  useDocumentMeta(seo.title, seo.description);
  useScrollReveal([jobs.length, why.cards.length]);

  return (
    <DomainShell domain="careers">
      <>
        <PageHero domain="careers" label={hero.label} title={hero.title} supporting={hero.supporting} />

        <PrincipleDeck
          label={why.label}
          title={why.heading}
          items={why.cards}
          icons={WHY_ICONS}
          eyebrowPrefix="Reason"
          altBg
        />

        <Section>
          <div className="reveal">
            <SectionHeader label={lookFor.label} title={lookFor.heading} lineText={lookFor.supporting} />
          </div>
          <div className={`${s.chipBlock} reveal`} style={{ marginTop: 0, textAlign: "left" }}>
            <div className={s.chipBlockChips} style={{ justifyContent: "flex-start" }}>
              {lookFor.qualities.map((q) => (
                <span key={q} className={careers.chip}>
                  {q}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section className={careers.altBg}>
          <div className="reveal">
            <SectionHeader label={opportunities.label} title={opportunities.heading} />
          </div>

          {jobs.length > 0 ? (
            <div className={`${careers.jobsList} reveal`}>
              {jobs.map((job) => (
                <article key={job.id} className={careers.jobCard}>
                  <h3>{job.title}</h3>
                  <p className={careers.jobMeta}>
                    {[job.department, job.location, job.employment_type].filter(Boolean).join(" · ")}
                  </p>
                  {job.summary ? <p>{job.summary}</p> : null}
                  {job.apply_href ? (
                    <Button variant="outline" href={job.apply_href}>
                      Apply
                    </Button>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <>
              <div
                className={`${careers.emptyState} reveal`}
                style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
              >
                {opportunities.emptyState.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div className={`${careers.sectionCtas} reveal`}>
                <Button variant="primary" href={opportunities.cta.href}>
                  {opportunities.cta.label} →
                </Button>
              </div>
            </>
          )}
        </Section>

        <FinalCtaSection
          label={finalCta.label}
          heading={finalCta.heading}
          supporting={finalCta.supporting}
          primaryCta={finalCta.primaryCta}
        />
      </>
    </DomainShell>
  );
}
