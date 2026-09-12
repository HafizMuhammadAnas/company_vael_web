import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { PortfolioProjectCard } from "@/components/sections/work/PortfolioProjectCard";
import { Section } from "@/components/ui";
import { HOME_PROUD_WORK, PORTFOLIO_PROJECTS } from "@/content/portfolio";

import styles from "./ProudWork.module.css";

const PAGE_SIZE = 3;

/** Homepage portfolio carousel — same cards as /portfolio, with hover scroll previews. */
export function ProudWork() {
  const projects = PORTFOLIO_PROJECTS;
  const pageCount = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[page * PAGE_SIZE] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [page]);

  const proudParts = HOME_PROUD_WORK.title.split("Proud");

  return (
    <Section id="work" className={styles.stage}>
      <header className={`${styles.intro} reveal`}>
        <h2 className={styles.heading}>
          {proudParts[0]}
          <span className={styles.accent}>Proud</span>
          {proudParts[1] ?? ""}
        </h2>
      </header>

      <div className={`${styles.carousel} reveal`}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navPrev}`}
          aria-label="Previous projects"
          onClick={() => goTo(page - 1)}
        >
          <ChevronLeft size={20} aria-hidden />
        </button>

        <ul ref={trackRef} className={styles.track}>
          {projects.map((project) => (
            <li key={project.id} className={styles.slide}>
              <PortfolioProjectCard project={project} compact />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          aria-label="Next projects"
          onClick={() => goTo(page + 1)}
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>

      <div className={styles.footerRow}>
        <div className={styles.dots} role="tablist" aria-label="Project pages">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={page === i}
              className={`${styles.dot} ${page === i ? styles.dotActive : ""}`}
              aria-label={`Show projects page ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <Link className={styles.viewAll} to={HOME_PROUD_WORK.viewAll.to}>
          {HOME_PROUD_WORK.viewAll.label}
        </Link>
      </div>
    </Section>
  );
}
