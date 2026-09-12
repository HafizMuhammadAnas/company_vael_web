/**
 * Services landing — four moves as a classic engineering folio.
 * Separate from the modern How-we-help intro above.
 */

import { Cloud, Code2, Compass, LayoutDashboard, type LucideIcon } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { SOL_INTRO } from "@/content/solutions";
import editorial from "@/components/sections/editorial/Editorial.module.css";

import styles from "./SolutionsFourMoves.module.css";

const STEP_ICONS: LucideIcon[] = [Compass, LayoutDashboard, Code2, Cloud];

const ROMAN = ["I", "II", "III", "IV"] as const;

export function SolutionsFourMoves() {
  return (
    <Section className={[styles.stage, editorial.altBg].filter(Boolean).join(" ")}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>How we help</Eyebrow>
          <h2 className={styles.title}>
            Four moves from problem to{" "}
            <span className={styles.titleMark}>working software.</span>
          </h2>
          <p className={styles.rule} aria-hidden />
        </header>

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
