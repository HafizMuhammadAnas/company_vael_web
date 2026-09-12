import { useCallback, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioProject } from "@/content/portfolio";

import styles from "./Portfolio.module.css";

/** ~100px of image height ≈ 1s of scroll; clamped for short vs very tall captures. */
function scrollDurationSec(travelPx: number) {
  if (travelPx <= 0) return 0;
  return Math.min(12, Math.max(3.5, travelPx / 100));
}

export function PortfolioProjectCard({
  project,
  compact = false,
}: {
  project: PortfolioProject;
  /** Tighter card for homepage carousel. */
  compact?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovering, setHovering] = useState(false);
  const [travelPx, setTravelPx] = useState(0);

  const measureTravel = useCallback(() => {
    const viewport = viewportRef.current;
    const img = imgRef.current;
    if (!viewport || !img) return 0;
    return Math.max(0, img.offsetHeight - viewport.clientHeight);
  }, []);

  const handleEnter = () => {
    setTravelPx(measureTravel());
    setHovering(true);
  };

  const handleLeave = () => {
    setHovering(false);
  };

  const duration = scrollDurationSec(travelPx);

  return (
    <article
      className={`${styles.card} ${compact ? styles.cardCompact : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          handleLeave();
        }
      }}
    >
      <div className={styles.browser}>
        <div className={styles.chrome} aria-hidden>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <div ref={viewportRef} className={styles.viewport}>
          <img
            ref={imgRef}
            className={styles.previewImg}
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            onLoad={() => {
              if (hovering) setTravelPx(measureTravel());
            }}
            style={{
              transform: hovering && travelPx > 0 ? `translateY(-${travelPx}px)` : "translateY(0)",
              transitionDuration: `${duration}s`,
            }}
          />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.categories}>
          {project.industry} · {project.service}
        </p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.location}>{project.location}</p>
        <hr className={styles.divider} />
        <a
          className={styles.liveLink}
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Live Project
          <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
    </article>
  );
}
