/**
 * Custom Software — How we work as a build board / sprint wall.
 * Unique to this page (not the shared zigzag timeline).
 */

import {
  Boxes,
  CheckCircle2,
  Code2,
  Database,
  Flag,
  LayoutTemplate,
  MessageSquare,
  Pencil,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { CS_PROCESS } from "@/content/customSoftware";

import styles from "./CustomSoftwareProcess.module.css";

const COLUMN_ICONS: LucideIcon[] = [MessageSquare, Pencil, Code2, Flag];

/** Short column labels so headers stay one line and aligned. */
const COLUMN_LABELS = ["Discover", "Plan", "Build", "Launch"] as const;

const BUILD_MODULES = [
  { label: "UI", Icon: LayoutTemplate },
  { label: "API", Icon: Boxes },
  { label: "Data", Icon: Database },
] as const;

const TONE_CLASS: Record<(typeof CS_PROCESS.steps)[number]["tone"], string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
};

/** Steps that need an explicit client decision (matches supporting copy). */
const DECISION_STEPS = new Set(["02", "04"]);

export function CustomSoftwareProcessSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{CS_PROCESS.label}</Eyebrow>
          <h2 className={styles.title}>
            {CS_PROCESS.headingBefore}{" "}
            <span className={styles.accent}>{CS_PROCESS.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{CS_PROCESS.supporting}</p>
          <div className={styles.focus}>
            <Code2 size={15} aria-hidden />
            <span>Custom software</span>
          </div>
        </header>

        <div className={styles.board} aria-label="Software delivery board">
          <div className={styles.boardBar} aria-hidden>
            <span className={styles.boardDots}>
              <i />
              <i />
              <i />
            </span>
            <em>Delivery board</em>
            <span className={styles.boardMeta}>4 stages · decisions marked</span>
          </div>

          <ol className={styles.columns}>
            {CS_PROCESS.steps.map((step, i) => {
              const Icon = COLUMN_ICONS[i] ?? CheckCircle2;
              const needsDecision = DECISION_STEPS.has(step.num);
              const isBuild = step.num === "03";
              const columnLabel = COLUMN_LABELS[i] ?? step.title;

              return (
                <li
                  key={step.num}
                  className={[styles.column, TONE_CLASS[step.tone]].join(" ")}
                  style={{ ["--col-i" as string]: i }}
                >
                  <div className={styles.columnHead}>
                    <span className={styles.columnIcon} aria-hidden>
                      <Icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className={styles.columnName}>{columnLabel}</span>
                  </div>

                  <article
                    className={[styles.ticket, needsDecision ? styles.hasDecision : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {needsDecision ? (
                      <div className={styles.decisionRibbon}>Decision needed</div>
                    ) : null}

                    <div className={styles.ticketTop}>
                      <span className={styles.ticketId}>CS-{step.num}</span>
                      {step.milestone ? (
                        <span className={styles.statusChip}>{step.milestone}</span>
                      ) : null}
                    </div>

                    <h3 className={styles.ticketTitle}>{step.title}</h3>
                    <p className={styles.ticketText}>{step.text}</p>

                    <ul
                      className={styles.modules}
                      aria-label={isBuild ? "Build modules" : undefined}
                      aria-hidden={!isBuild}
                    >
                      {isBuild
                        ? BUILD_MODULES.map(({ label, Icon: ModIcon }) => (
                            <li key={label}>
                              <ModIcon size={12} strokeWidth={2} aria-hidden />
                              {label}
                            </li>
                          ))
                        : null}
                    </ul>

                    <div className={styles.ticketFoot}>
                      {needsDecision ? (
                        <span className={styles.decisionHint}>Your call</span>
                      ) : (
                        <span className={styles.doneHint}>
                          <CheckCircle2 size={12} aria-hidden />
                          In flow
                        </span>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
