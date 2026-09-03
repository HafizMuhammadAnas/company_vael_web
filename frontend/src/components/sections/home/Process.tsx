import { useState } from "react";

import { Section, SectionHeader } from "@/components/ui";
import { PROCESS } from "@/content/home";
import { useCycledIndex } from "@/hooks/useCycledIndex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

export function Process() {
  const reduced = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [active, setActive] = useCycledIndex(PROCESS.steps.length, 3600, locked);
  const progress = ((active + 1) / PROCESS.steps.length) * 100;

  return (
    <Section id="process" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={PROCESS.label} title={PROCESS.heading} supporting={PROCESS.supporting} />
      </div>

      <div className={styles.rail} onMouseLeave={() => setLocked(false)}>
        <div className={styles.railLine} aria-hidden />
        <div className={styles.railFill} aria-hidden style={{ width: `calc((100% - 3rem) * ${progress / 100})` }} />
        {!reduced && (
          <div className={styles.railLine} aria-hidden style={{ overflow: "hidden", background: "transparent" }}>
            <span className={styles.trace} />
          </div>
        )}

        <ol className={styles.journey}>
          {PROCESS.steps.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={step.num}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={styles.journeyBtn}
                  onMouseEnter={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  onFocus={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                  onBlur={() => setLocked(false)}
                  onClick={() => {
                    setActive(i);
                    setLocked(true);
                  }}
                >
                  <span
                    className={`${styles.stepNode} ${isActive ? styles.stepActive : ""} ${isDone ? styles.stepDone : ""}`}
                  >
                    {isActive && !reduced && <span className={styles.nodePulse} />}
                    {step.num}
                  </span>
                  <span>
                    <span className={`${styles.coreTitle} ${isActive ? "" : styles.muted}`}>{step.title}</span>
                    <span className={`${styles.readoutBody} ${isActive ? "" : styles.muted}`}>{step.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
