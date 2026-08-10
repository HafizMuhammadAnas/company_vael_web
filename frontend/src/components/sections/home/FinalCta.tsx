import { Button, Section } from "@/components/ui";
import { FINAL_CTA } from "@/content/home";

import styles from "./Home.module.css";

export function FinalCta() {
  return (
    <Section>
      <div className={`${styles.finalCta} reveal`} style={{ position: "relative" }}>
        <div className="circuit-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: "var(--neon)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            // {FINAL_CTA.label}
          </div>
          <h2 className={styles.finalHeading}>{FINAL_CTA.heading}</h2>
          <p className={styles.finalSupporting}>{FINAL_CTA.supporting}</p>
          <div className={styles.finalCtas}>
            <Button variant="primary" to={FINAL_CTA.primaryCta.to}>
              {FINAL_CTA.primaryCta.label}
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
