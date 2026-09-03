import { ArrowRight } from "lucide-react";

import { Button, Eyebrow, Section } from "@/components/ui";
import { FINAL_CTA } from "@/content/home";

import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <Section id="contact-cta">
      <div className={`${styles.panel} reveal`}>
        <div className={styles.glow} aria-hidden>
          <span className={styles.blobA} />
          <span className={styles.blobB} />
        </div>
        <div className={styles.content}>
          <Eyebrow centered>{FINAL_CTA.label}</Eyebrow>
          <h2 className={styles.heading}>{FINAL_CTA.heading}</h2>
          <p className={styles.supporting}>{FINAL_CTA.supporting}</p>
          <div className={styles.ctas}>
            <Button variant="primary" to={FINAL_CTA.primaryCta.to}>
              {FINAL_CTA.primaryCta.label}
              <ArrowRight size={16} aria-hidden />
            </Button>
            <Button variant="outline" to={FINAL_CTA.secondaryCta.to}>
              {FINAL_CTA.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
