import type { ReactNode } from "react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import type { PageDomain } from "@/components/sections/domain/DomainShell";
import { Button, Eyebrow } from "@/components/ui";

import styles from "./PageHero.module.css";

interface CtaLink {
  label: string;
  to: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  supporting: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  tags?: string[];
  /** Optional domain — tints hero accents to match the page subject. */
  domain?: PageDomain;
  /** Right-column graphic for split heroes (Services hub + service pages). */
  visual?: ReactNode;
  /** Accessible name for the visual column. */
  visualLabel?: string;
  /** Extra class on the outer hero section (page-specific layout tweaks). */
  className?: string;
}

/** Inner-page hero. With `visual`, switches to a home-style split layout. */
export function PageHero({
  label,
  title,
  supporting,
  primaryCta,
  secondaryCta,
  tags,
  domain,
  visual,
  visualLabel = "Overview",
  className,
}: PageHeroProps) {
  const split = Boolean(visual);

  return (
    <section
      className={[styles.hero, split ? styles.heroSplit : "", className].filter(Boolean).join(" ")}
      data-domain={domain || undefined}
    >
      <HeroAmbient layout="page" />
      <div className={[styles.content, split ? styles.contentSplit : ""].filter(Boolean).join(" ")}>
        <div className={split ? styles.copy : undefined}>
          <Eyebrow centered={!split} className={styles.eyebrow}>
            {label}
          </Eyebrow>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.supporting}>{supporting}</p>
          {(primaryCta || secondaryCta) && (
            <div className={styles.ctas}>
              {primaryCta && (
                <Button variant="primary" to={primaryCta.to}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" to={secondaryCta.to}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {visual && (
          <aside className={styles.visual} aria-label={visualLabel}>
            {visual}
          </aside>
        )}
      </div>
    </section>
  );
}
