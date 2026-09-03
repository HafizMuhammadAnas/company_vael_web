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
}

/** Reusable hero for inner pages (Solutions, individual solution pages, etc.). */
export function PageHero({ label, title, supporting, primaryCta, secondaryCta, tags }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="circuit-bg" />
      <div className={styles.radial} />
      <div className="scan-line" />
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
