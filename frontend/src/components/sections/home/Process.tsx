import { Section, SectionHeader } from "@/components/ui";
import { PROCESS } from "@/content/home";

import styles from "./Home.module.css";

export function Process() {
  return (
    <Section className={styles.altBg}>
      <div className="reveal">
        <SectionHeader label={PROCESS.label} title={PROCESS.heading} />
        <p className={styles.supporting}>{PROCESS.supporting}</p>
      </div>
      <div className={`${styles.steps} reveal`}>
        {PROCESS.steps.map((step) => (
          <div key={step.num} className={styles.step}>
            <div className={styles.stepNode}>
              <span className={styles.stepNum}>{step.num}</span>
            </div>
            <div className={styles.stepTitle}>{step.title}</div>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
