/**
 * AI & Automation — How we work as Lab → Production pipeline.
 * Unique to this page (not the shared zigzag or software board).
 */

import {
  Activity,
  Beaker,
  CheckCircle2,
  Code2,
  Flag,
  MessageSquare,
  SearchCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { AI_APPROACH } from "@/content/aiAutomation";

import styles from "./AiAutomationProcess.module.css";

const STEP_ICONS: LucideIcon[] = [MessageSquare, Beaker, Code2, Activity];

const TONE_CLASS: Record<(typeof AI_APPROACH.steps)[number]["tone"], string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
};

const ZONE_META = [
  { zone: "lab" as const, zoneLabel: "Lab", connector: "dashed" as const },
  { zone: "lab" as const, zoneLabel: "Lab", connector: "gate" as const },
  { zone: "prod" as const, zoneLabel: "Production", connector: "solid" as const },
  { zone: "prod" as const, zoneLabel: "Production", connector: null },
];

export function AiAutomationProcessSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{AI_APPROACH.label}</Eyebrow>
          <h2 className={styles.title}>
            {AI_APPROACH.headingBefore}{" "}
            <span className={styles.accent}>{AI_APPROACH.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{AI_APPROACH.supporting}</p>
          <div className={styles.focus}>
            <Sparkles size={15} aria-hidden />
            <span>AI & automation</span>
          </div>
        </header>

        <div className={styles.pipeline} aria-label="AI delivery pipeline">
          <div className={styles.zoneBar} aria-hidden>
            <div className={styles.zoneLab}>
              <Beaker size={14} strokeWidth={1.85} />
              <span>Lab</span>
              <em>Prove it first</em>
            </div>
            <div className={styles.zoneGate}>
              <span>Commit</span>
            </div>
            <div className={styles.zoneProd}>
              <Flag size={14} strokeWidth={1.85} />
              <span>Production</span>
              <em>Ship what works</em>
            </div>
          </div>

          <ol className={styles.nodes}>
            {AI_APPROACH.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? SearchCheck;
              const meta = ZONE_META[i] ?? ZONE_META[0];
              const isPrototype = step.num === "02";
              const isLaunch = step.num === "04";

              return (
                <li
                  key={step.num}
                  className={[
                    styles.node,
                    meta.zone === "lab" ? styles.nodeLab : styles.nodeProd,
                    TONE_CLASS[step.tone],
                  ].join(" ")}
                  style={{ ["--node-i" as string]: i }}
                >
                  <article className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.nodeIcon} aria-hidden>
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <span className={styles.nodeNum}>{step.num}</span>
                      <span className={styles.zoneTag}>{meta.zoneLabel}</span>
                    </div>

                    <h3>{step.title}</h3>
                    <p>{step.text}</p>

                    {isPrototype ? (
                      <div className={styles.pocPulse} aria-hidden>
                        <span />
                        <em>Validate before scale</em>
                      </div>
                    ) : null}

                    {isLaunch ? (
                      <div className={styles.monitor} aria-hidden>
                        <span className={styles.monitorBars}>
                          <i style={{ height: "40%" }} />
                          <i style={{ height: "70%" }} />
                          <i style={{ height: "55%" }} />
                          <i style={{ height: "85%" }} />
                        </span>
                        <em>Monitored</em>
                      </div>
                    ) : null}

                    {step.milestone ? (
                      <span className={styles.milestone}>
                        <CheckCircle2 size={12} aria-hidden />
                        {step.milestone}
                      </span>
                    ) : null}
                  </article>

                  {meta.connector === "dashed" ? (
                    <div className={styles.linkDashed} aria-hidden>
                      <span />
                    </div>
                  ) : null}
                  {meta.connector === "gate" ? (
                    <div className={styles.linkGate} aria-hidden>
                      <span className={styles.gateLine} />
                      <em>Go / no-go</em>
                      <span className={styles.gateLine} />
                    </div>
                  ) : null}
                  {meta.connector === "solid" ? (
                    <div className={styles.linkSolid} aria-hidden>
                      <span />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
