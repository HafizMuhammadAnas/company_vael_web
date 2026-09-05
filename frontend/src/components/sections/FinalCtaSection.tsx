import { ArrowRight } from "lucide-react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { Button, Eyebrow, Section } from "@/components/ui";

import styles from "./FinalCtaSection.module.css";

interface CtaLink {
  label: string;
  to: string;
}

export interface FinalCtaSectionProps {
  label?: string;
  heading: string;
  supporting: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  /** Optional section id (home uses `contact-cta`). */
  id?: string;
  /** Show arrow on the primary button — used on the homepage. */
  showPrimaryArrow?: boolean;
}

/**
 * Shared closing CTA band — same panel language as the homepage,
 * with ambient motion (blobs / orbits / constellation) behind the copy.
 */
export function FinalCtaSection({
  label,
  heading,
  supporting,
  primaryCta,
  secondaryCta,
  id,
  showPrimaryArrow = false,
}: FinalCtaSectionProps) {
  return (
    <Section id={id}>
      <div className={`${styles.panel} reveal`}>
        <div className={styles.ambient} aria-hidden>
          <HeroAmbient layout="page" />
        </div>
        <div className={styles.content}>
          {label ? <Eyebrow centered>{label}</Eyebrow> : null}
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.supporting}>{supporting}</p>
          <div className={styles.ctas}>
            <Button variant="primary" to={primaryCta.to}>
              {primaryCta.label}
              {showPrimaryArrow ? <ArrowRight size={16} aria-hidden /> : null}
            </Button>
            {secondaryCta ? (
              <Button variant="outline" to={secondaryCta.to}>
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
