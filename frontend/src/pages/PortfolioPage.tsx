import { useState } from "react";

import { PageHero } from "@/components/sections/PageHero";
import {
WorkGallery,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Section } from "@/components/ui";
import {
  PORTFOLIO_HERO,
  PORTFOLIO_NOTE,
  PORTFOLIO_SEO,
  PROJECTS,
  WORK_FILTERS,
  WORK_HERO,
  WORK_SELECTED,
  type WorkFilter,
} from "@/content/work";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function PortfolioPage() {
  useDocumentMeta(PORTFOLIO_SEO.title, PORTFOLIO_SEO.description);
  useScrollReveal();

  const [active, setActive] = useState<WorkFilter>("All");
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <DomainShell domain="work">
      <>
      <PageHero domain="work" label={PORTFOLIO_HERO.label} title={PORTFOLIO_HERO.title} supporting={PORTFOLIO_HERO.supporting} />

      <Section>
        <div className={work.filters}>
          {WORK_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${work.filterBtn} ${active === filter ? work.filterActive : ""}`}
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </Section>

      {visible.length > 0 ? (
        <WorkGallery
          // Remount on filter change so the gallery re-cycles from the first panel.
          key={active}
          label={WORK_SELECTED.label}
          title={WORK_SELECTED.heading}
          note={PORTFOLIO_NOTE}
          altBg
          cards={visible.map((project) => ({
            title: project.title,
            category: project.category,
            description: project.description,
            capabilities: project.aiFocus,
            technology: project.technologies.join(" · "),
            ...(project.hasCaseStudy
              ? { to: `/work/case-studies/${project.slug}`, cta: "View Project Write-Up" }
              : { to: WORK_HERO.primaryCta.to, cta: WORK_HERO.primaryCta.label }),
          }))}
        />
      ) : (
        <Section className={home.altBg}>
          <p className={home.sectionNote}>{PORTFOLIO_NOTE}</p>
          <div className={home.emptyState}>No projects in this category yet.</div>
        </Section>
      )}
    </>
    </DomainShell>
  );
}
