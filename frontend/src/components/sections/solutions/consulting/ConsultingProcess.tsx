/**
 * Technology Consulting — How we work as a decision path / advisory map.
 * Unique to this page (not road / board / lab / phone / console).
 */

import {
  CheckCircle2,
  Compass,
  Flag,
  MessageSquare,
  Pencil,
  Search,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { TC_PROCESS } from "@/content/technologyConsulting";

import styles from "./ConsultingProcess.module.css";

const STEP_ICONS: LucideIcon[] = [MessageSquare, Search, Pencil, Flag];

const TONE_CLASS: Record<(typeof TC_PROCESS.steps)[number]["tone"], string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
};

const PATH_META = [
  { kind: "waypoint" as const, tag: "Start" },
  { kind: "waypoint" as const, tag: "Evidence" },
  { kind: "decision" as const, tag: "Decision" },
  { kind: "destination" as const, tag: "Next move" },
];

export function ConsultingProcessSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{TC_PROCESS.label}</Eyebrow>
          <h2 className={styles.title}>
            {TC_PROCESS.headingBefore}{" "}
            <span className={styles.accent}>{TC_PROCESS.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{TC_PROCESS.supporting}</p>
          <div className={styles.focus}>
            <Compass size={15} aria-hidden />
            <span>Technology consulting</span>
          </div>
        </header>

        <div className={styles.map} aria-label="Advisory decision map">
          <div className={styles.mapHead} aria-hidden>
            <div className={styles.legendStart}>
              <span className={styles.qMark}>?</span>
              <div>
                <strong>The question</strong>
                <em>Goals · systems · constraints</em>
              </div>
            </div>
            <div className={styles.legendTrail}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.legendEnd}>
              <Flag size={15} strokeWidth={1.85} />
              <div>
                <strong>Clear next move</strong>
                <em>Actable · prioritized</em>
              </div>
            </div>
          </div>

          <div className={styles.path} aria-hidden>
            <span className={styles.pathLine} />
            {TC_PROCESS.steps.map((step, i) => {
              const meta = PATH_META[i] ?? PATH_META[0];
              return (
                <span
                  key={step.num}
                  className={[
                    styles.pathNode,
                    meta.kind === "decision" ? styles.pathDiamond : "",
                    meta.kind === "destination" ? styles.pathFlag : "",
                    TONE_CLASS[step.tone],
                  ].join(" ")}
                  style={{ ["--node-i" as string]: i }}
                />
              );
            })}
          </div>

          <ol className={styles.waypoints}>
            {TC_PROCESS.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageSquare;
              const meta = PATH_META[i] ?? PATH_META[0];
              const isDecision = meta.kind === "decision";

              return (
                <li
                  key={step.num}
                  className={[
                    styles.waypoint,
                    isDecision ? styles.waypointDecision : "",
                    TONE_CLASS[step.tone],
                  ].join(" ")}
                  style={{ ["--wp-i" as string]: i }}
                >
                  <article className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.nodeIcon} aria-hidden>
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className={styles.nodeNum}>{step.num}</span>
                      <span className={styles.pathTag}>{meta.tag}</span>
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.text}</p>

                    {meta.kind === "waypoint" && i === 0 ? (
                      <div className={styles.briefChips} aria-hidden>
                        <span>Goals</span>
                        <span>Systems</span>
                        <span>Users</span>
                      </div>
                    ) : null}

                    {meta.kind === "waypoint" && i === 1 ? (
                      <div className={styles.findings} aria-hidden>
                        <span className={styles.findDot} />
                        <em>Friction points marked</em>
                      </div>
                    ) : null}

                    {isDecision ? (
                      <div className={styles.fork} aria-hidden>
                        <span className={styles.option}>A</span>
                        <span className={styles.option}>B</span>
                        <span className={[styles.option, styles.optionPick].join(" ")}>
                          C · rec
                        </span>
                      </div>
                    ) : null}

                    {meta.kind === "destination" ? (
                      <div className={styles.planStrip} aria-hidden>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <em>Prioritized steps</em>
                      </div>
                    ) : null}

                    {step.milestone ? (
                      <span className={styles.milestone}>
                        <CheckCircle2 size={12} aria-hidden />
                        {step.milestone}
                      </span>
                    ) : null}
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
