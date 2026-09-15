/**
 * Our Process — Delivery Stages as an animated roadmap.
 * Minimal copy; the path and stage titles carry the story.
 */

import {
  Code2,
  Compass,
  FlaskConical,
  Map,
  PenLine,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { PROCESS_STAGES } from "@/content/process";

import styles from "./DeliveryStages.module.css";

const ICONS: LucideIcon[] = [Search, Compass, PenLine, Code2, FlaskConical, Rocket, Map];

const TONES = [
  styles.toneSky,
  styles.toneViolet,
  styles.toneAmber,
  styles.toneTeal,
  styles.toneRose,
  styles.toneSky,
  styles.toneTeal,
] as const;

export function DeliveryStages() {
  const { label, title, supporting, steps } = PROCESS_STAGES;

  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{label}</Eyebrow>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.lede}>{supporting}</p>
        </header>

        <div className={styles.roadmap} aria-label="Delivery stages roadmap">
          <div className={styles.path} aria-hidden>
            <span className={styles.pathTrack} />
            <span className={styles.pathGlow} />
            <span className={styles.traveler} />
          </div>

          <ol className={styles.stops}>
            {steps.map((step, i) => {
              const Icon = ICONS[i] ?? Search;
              const tone = TONES[i] ?? TONES[0];
              return (
                <li
                  key={step.num}
                  className={[styles.stop, tone].join(" ")}
                  style={{ ["--stop-i" as string]: i }}
                >
                  <div className={styles.node} aria-hidden>
                    <span className={styles.nodeRing} />
                    <span className={styles.nodeCore}>
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <span className={styles.nodeNum}>{step.num}</span>
                  </div>
                  <div className={styles.card}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
