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
}

/** Inner-page hero. Domain prop shifts accent atmosphere to match the page topic. */
export function PageHero({
  label,
  title,
  supporting,
  primaryCta,
  secondaryCta,
  tags,
  domain,
}: PageHeroProps) {
  return (
    <section className={styles.hero} data-domain={domain || undefined}>
      <HeroAmbient layout="page" />
      <div className={styles.content}>
        <Eyebrow centered className={styles.eyebrow}>
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
    </section>
  );
}
