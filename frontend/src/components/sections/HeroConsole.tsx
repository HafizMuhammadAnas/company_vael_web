import type { ReactNode } from "react";

import styles from "./HeroConsole.module.css";

type LaneStep = {
  label: string;
  /** Highlight this step (defaults to index 2 when omitted). */
  active?: boolean;
};

type HeroConsoleProps = {
  /** Window title shown in the chrome bar. */
  title: string;
  children: ReactNode;
  /** Optional bottom step lane (home-style). */
  lane?: LaneStep[];
  className?: string;
};

/** Shared hero delivery console — same chrome + entrance motion as the homepage. */
export function HeroConsole({ title, children, lane, className }: HeroConsoleProps) {
  return (
    <div className={[styles.console, className].filter(Boolean).join(" ")}>
      <header className={styles.bar}>
        <span className={styles.dotR} />
        <span className={styles.dotY} />
        <span className={styles.dotG} />
        <em>{title}</em>
      </header>
      <div className={styles.body}>{children}</div>
      {lane && lane.length > 0 ? (
        <ul className={styles.lane}>
          {lane.map((step, i) => {
            const on = step.active ?? i === 2;
            return (
              <li key={step.label} className={on ? styles.laneOn : undefined}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{step.label}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
