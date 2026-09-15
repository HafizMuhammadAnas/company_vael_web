import { BrainCircuit, Compass, Layers, MessageSquare, type LucideIcon } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { WHY } from "@/content/home";

import styles from "./WhyVaelkode.module.css";

const ICONS: LucideIcon[] = [Compass, BrainCircuit, Layers, MessageSquare];

const STEP_META = [
  { tone: styles.toneSky, mark: "Map" },
  { tone: styles.toneViolet, mark: "Scope" },
  { tone: styles.toneAmber, mark: "Ship" },
  { tone: styles.toneTeal, mark: "Live" },
] as const;

/** Why VAELKODE + how we work — principles then delivery steps. */
export function WhyVaelkode() {
  return (
    <Section id="why" className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{WHY.label}</Eyebrow>
          <h2 className={styles.title}>
            Problem first.
            <span> Clear path to launch.</span>
          </h2>
          <p className={styles.lede}>{WHY.supporting}</p>
        </header>

        <ul className={styles.principles}>
          {WHY.items.map((item, i) => {
            const Icon = ICONS[i] ?? Compass;
            return (
              <li key={item.num} className={styles.chip} title={item.text}>
                <span className={styles.chipIcon} aria-hidden>
                  <Icon size={20} strokeWidth={1.55} />
                </span>
                <span className={styles.chipNum}>{item.num}</span>
                <strong>{item.title}</strong>
              </li>
            );
          })}
        </ul>

        <div id="process" className={styles.journey}>
          <Eyebrow>{WHY.processLabel}</Eyebrow>

          <div className={styles.railWrap}>
            <div className={styles.railLine} aria-hidden>
              <i className={styles.traveler} />
            </div>
            <ol className={styles.rail}>
              {WHY.steps.map((step, i) => {
                const meta = STEP_META[i] ?? STEP_META[0];
                return (
                  <li key={step.num} className={[styles.stop, meta.tone].join(" ")}>
                    <div className={styles.node} aria-hidden>
                      <span className={styles.nodeCore}>{step.num}</span>
                      <span className={styles.nodeRing} />
                    </div>
                    <div className={styles.card}>
                      <span className={styles.mark}>{meta.mark}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
