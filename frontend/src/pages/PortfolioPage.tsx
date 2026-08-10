import { useState } from "react";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import { ProjectCard } from "@/components/sections/work/ProjectCard";
import work from "@/components/sections/work/Work.module.css";
import { Section } from "@/components/ui";
import {
  PORTFOLIO_HERO,
  PORTFOLIO_NOTE,
  PORTFOLIO_SEO,
  PROJECTS,
  WORK_FILTERS,
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
    <>
      <PageHero label={PORTFOLIO_HERO.label} title={PORTFOLIO_HERO.title} supporting={PORTFOLIO_HERO.supporting} />

      <Section>
        <p className={home.sectionNote}>// {PORTFOLIO_NOTE}</p>

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

        {visible.length > 0 ? (
          <div className={`${home.grid} ${home.cols3}`}>
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className={home.emptyState}>No projects in this category yet.</div>
        )}
      </Section>
    </>
  );
}
