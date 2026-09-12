/**
 * Services landing — “How we help” intro.
 * Problem → path → solution diagram (principles live in SolutionsFourMoves).
 */

import { ArrowRight } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { SOL_INTRO } from "@/content/solutions";

import styles from "./SolutionsHowWeHelp.module.css";

export function SolutionsHowWeHelp() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <div className={styles.grid}>
          <header className={styles.copy}>
            <Eyebrow>{SOL_INTRO.label}</Eyebrow>
            <h2 className={styles.title}>
              <span className={styles.titleLine}>Start With the Problem.</span>
              <span className={styles.titleAccent}>Build the Right Solution.</span>
            </h2>
            <div className={styles.lede}>
              {SOL_INTRO.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </header>

          <aside className={styles.diagram} aria-hidden>
            <div className={styles.pole}>
              <span className={styles.poleLabel}>Problem</span>
              <div className={styles.poleFace}>
                <i className={styles.scratch} />
                <i className={styles.scratch} />
                <i className={styles.scratch} />
                <em>?</em>
              </div>
            </div>

            <div className={styles.bridge}>
              <span className={styles.bridgeTrack} />
              <span className={styles.bridgePulse} />
              <ArrowRight className={styles.bridgeArrow} size={16} strokeWidth={2} />
            </div>

            <div className={`${styles.pole} ${styles.poleSolution}`}>
              <span className={styles.poleLabel}>Solution</span>
              <div className={styles.poleFace}>
                <span className={styles.solBars}>
                  <i style={{ height: "45%" }} />
                  <i style={{ height: "70%" }} />
                  <i style={{ height: "55%" }} />
                  <i style={{ height: "88%" }} />
                </span>
                <em>✓</em>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
