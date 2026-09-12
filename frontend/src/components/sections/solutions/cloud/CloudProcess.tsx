/**
 * Cloud & DevOps — How we work as a pipeline console.
 * Unique to this page (not road / board / lab / phone rail).
 */

import {
  Activity,
  CheckCircle2,
  Cloud,
  Code2,
  Flag,
  GitBranch,
  MessageSquare,
  Pencil,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { CLOUD_PROCESS } from "@/content/cloudDevops";

import styles from "./CloudProcess.module.css";

const STEP_ICONS: LucideIcon[] = [MessageSquare, Pencil, Code2, Flag];

const TONE_CLASS: Record<(typeof CLOUD_PROCESS.steps)[number]["tone"], string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
};

const JOB_META = [
  {
    status: "Mapped",
    statusClass: styles.statusMapped,
    detail: "inventory" as const,
  },
  {
    status: "Queued",
    statusClass: styles.statusQueued,
    detail: "plan" as const,
  },
  {
    status: "Running",
    statusClass: styles.statusRunning,
    detail: "pipeline" as const,
  },
  {
    status: "Healthy",
    statusClass: styles.statusHealthy,
    detail: "monitor" as const,
  },
];

export function CloudProcessSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{CLOUD_PROCESS.label}</Eyebrow>
          <h2 className={styles.title}>
            {CLOUD_PROCESS.headingBefore}{" "}
            <span className={styles.accent}>{CLOUD_PROCESS.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{CLOUD_PROCESS.supporting}</p>
          <div className={styles.focus}>
            <Cloud size={15} aria-hidden />
            <span>Cloud & DevOps</span>
          </div>
        </header>

        <div className={styles.console} aria-label="Delivery pipeline console">
          <div className={styles.chrome} aria-hidden>
            <div className={styles.chromeDots}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.chromeTitle}>
              <GitBranch size={13} strokeWidth={1.85} />
              <span>delivery / release-pipeline</span>
            </div>
            <div className={styles.chromeMeta}>
              <em>staging → production</em>
              <span className={styles.livePill}>
                <Activity size={11} strokeWidth={2} />
                live
              </span>
            </div>
          </div>

          <ol className={styles.jobs}>
            {CLOUD_PROCESS.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageSquare;
              const job = JOB_META[i] ?? JOB_META[0];
              const showArrow = i < CLOUD_PROCESS.steps.length - 1;

              return (
                <li
                  key={step.num}
                  className={[styles.job, TONE_CLASS[step.tone]].join(" ")}
                  style={{ ["--job-i" as string]: i }}
                >
                  <article className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.nodeIcon} aria-hidden>
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className={styles.nodeNum}>job {step.num}</span>
                      <span className={[styles.status, job.statusClass].join(" ")}>
                        {job.status}
                      </span>
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.text}</p>

                    {job.detail === "inventory" ? (
                      <div className={styles.consoleBlock} aria-hidden>
                        <code>apps: mapped</code>
                        <code>envs: reviewed</code>
                        <code>ship: current</code>
                      </div>
                    ) : null}

                    {job.detail === "plan" ? (
                      <div className={styles.consoleBlock} aria-hidden>
                        <code>✓ target setup</code>
                        <code>✓ automation order</code>
                        <code>○ cutover window</code>
                      </div>
                    ) : null}

                    {job.detail === "pipeline" ? (
                      <div className={styles.pipeSteps} aria-hidden>
                        <span className={styles.pipeDone}>infra</span>
                        <span className={styles.pipeDone}>ci</span>
                        <span className={styles.pipeNow}>cd</span>
                        <span className={styles.pipeWait}>ops</span>
                      </div>
                    ) : null}

                    {job.detail === "monitor" ? (
                      <div className={styles.monitorRow} aria-hidden>
                        <span className={styles.heart} />
                        <em>releases calmer · alerts watched</em>
                      </div>
                    ) : null}

                    {step.milestone ? (
                      <span className={styles.milestone}>
                        <CheckCircle2 size={12} aria-hidden />
                        {step.milestone}
                      </span>
                    ) : null}
                  </article>

                  {showArrow ? (
                    <div className={styles.flowArrow} aria-hidden>
                      <span />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <footer className={styles.footer} aria-hidden>
            <span className={styles.prompt}>$</span>
            <span>pipeline status: assess · plan · build · run &amp; improve</span>
          </footer>
        </div>
      </div>
    </Section>
  );
}
