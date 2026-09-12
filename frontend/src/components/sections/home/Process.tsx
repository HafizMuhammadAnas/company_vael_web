import { Section, SectionHeader, Accent } from "@/components/ui";
import { PROCESS } from "@/content/home";

import styles from "./Process.module.css";

const STEP_META = [
  { tone: styles.toneSky, mark: "Map" },
  { tone: styles.toneViolet, mark: "Scope" },
  { tone: styles.toneAmber, mark: "Ship" },
  { tone: styles.toneTeal, mark: "Live" },
] as const;

/** Delivery journey — connected rail with a traveling glow. */
export function Process() {
  return (
    <Section id="process" className={styles.stage}>
      <div className={`${styles.head} reveal`}>
        <SectionHeader
          label={PROCESS.label}
          title={
            <>
              Four steps. <Accent>No mystery.</Accent>
            </>
          }
          supporting={PROCESS.supporting}
        />
      </div>

      <div className={`${styles.railWrap} reveal`}>
        <div className={styles.railLine} aria-hidden>
          <i className={styles.traveler} />
        </div>
        <ol className={styles.rail}>
          {PROCESS.steps.map((step, i) => {
            const meta = STEP_META[i] ?? STEP_META[0];
            return (
              <li key={step.num} className={[styles.stop, meta.tone].join(" ")}>
                <div className={styles.node} aria-hidden>
                  <span className={styles.nodeCore}>{step.num}</span>
                  <span className={styles.nodeRing} />
                </div>
                <div className={styles.card}>
                  <span className={styles.mark}>{meta.mark}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
