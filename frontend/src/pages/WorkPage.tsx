import { Link } from "react-router-dom";
import { BrainCircuit, Cloud, Code2, Database, Eye, Layers, Workflow } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
  DomainShell,
  ExplorerList,
  JourneyRail,
  PrincipleDeck,
  WorkGallery,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
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

const DEMONSTRATES_ICONS = [BrainCircuit, Workflow, Layers, Eye, Cloud];
const EXPERTISE_ICONS = [BrainCircuit, Database, Eye, Cloud, Code2];

/** Projects without a published write-up fall back to the hero's consultation CTA. */
const projectCards = PROJECTS.map((project) => ({
  title: project.title,
  category: project.category,
  description: project.description,
  capabilities: project.aiFocus,
  technology: project.technologies.join(" · "),
  ...(project.hasCaseStudy
    ? { to: `/work/case-studies/${project.slug}`, cta: "View Project Write-Up" }
    : { to: WORK_HERO.primaryCta.to, cta: WORK_HERO.primaryCta.label }),
}));

export function WorkPage() {
  useDocumentMeta(WORK_SEO.title, WORK_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="work">
      <PageHero
        domain="work"
        label={WORK_HERO.label}
        title={WORK_HERO.title}
        supporting={WORK_HERO.supporting}
        primaryCta={WORK_HERO.primaryCta}
        secondaryCta={WORK_HERO.secondaryCta}
      />

      {/* Selected Projects */}
      <WorkGallery
        label={WORK_SELECTED.label}
        title={WORK_SELECTED.heading}
        supporting={WORK_SELECTED.supporting}
        note={WORK_SELECTED.note}
        cards={projectCards}
        altBg
      />

      {/* What This Work Demonstrates */}
      <PrincipleDeck
        label={WORK_DEMONSTRATES.label}
        title={WORK_DEMONSTRATES.heading}
        items={WORK_DEMONSTRATES.cards}
        icons={DEMONSTRATES_ICONS}
        eyebrowPrefix="Capability"
      />

      {/* Technical Expertise */}
      <ExplorerList
        label={WORK_EXPERTISE.label}
        title={WORK_EXPERTISE.heading}
        icons={EXPERTISE_ICONS}
        altBg
        items={WORK_EXPERTISE.groups.map((group) => ({
          title: group.title,
          text: group.text,
        }))}
      />

      {/* How We Deliver */}
      <JourneyRail
        label={WORK_DELIVERY.label}
        title={WORK_DELIVERY.heading}
        steps={WORK_DELIVERY.steps}
        footerCta={{ ...WORK_DELIVERY.cta, variant: "outline" }}
      />

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
      <WorkGallery
        label={WORK_CASE_STUDIES_TEASER.label}
        title={WORK_CASE_STUDIES_TEASER.heading}
        supporting={WORK_CASE_STUDIES_TEASER.supporting}
        cards={featuredCaseStudies.map((cs) => ({
          title: cs.title,
          category: cs.category,
          description: cs.lead,
          capabilities: cs.focus.points,
          technology: cs.technologies.join(" · "),
          to: `/work/case-studies/${cs.slug}`,
          cta: "View Project Write-Up",
        }))}
        footerCta={WORK_CASE_STUDIES_TEASER.cta}
      />

      <FinalCtaSection
        label={WORK_FINAL.label}
        heading={WORK_FINAL.heading}
        supporting={WORK_FINAL.supporting}
        primaryCta={WORK_FINAL.primaryCta}
        secondaryCta={WORK_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
