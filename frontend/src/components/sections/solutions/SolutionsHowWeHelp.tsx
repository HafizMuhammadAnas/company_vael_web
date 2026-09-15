/**
 * Services landing — How we help: problem → solution intro + four moves.
 */

import { ArrowRight, Cloud, Code2, Compass, LayoutDashboard, type LucideIcon } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { SOL_INTRO } from "@/content/solutions";

import styles from "./SolutionsHowWeHelp.module.css";

const STEP_ICONS: LucideIcon[] = [Compass, LayoutDashboard, Code2, Cloud];
const ROMAN = ["I", "II", "III", "IV"] as const;

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

        <ol className={styles.folio}>
          {SOL_INTRO.principles.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Compass;
            const isLast = i === SOL_INTRO.principles.length - 1;

            return (
              <li
                key={step.title}
                className={styles.chapter}
                style={{ ["--ch-i" as string]: i }}
              >
                <div className={styles.spine} aria-hidden>
                  <span className={styles.spineDot} />
                  {!isLast ? <span className={styles.spineLine} /> : null}
                </div>

                <div className={styles.plate}>
                  <span className={styles.watermark} aria-hidden>
                    {ROMAN[i]}
                  </span>

                  <div className={styles.plateTop}>
                    <span className={styles.chapterNo}>
                      Chapter {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.plateIcon}>
                      <Icon size={15} strokeWidth={1.7} />
                    </span>
                  </div>

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
