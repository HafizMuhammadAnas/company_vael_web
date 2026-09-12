import { BrainCircuit, Compass, Layers, MessageSquare, type LucideIcon } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { WHY } from "@/content/home";

import styles from "./WhyVaelkode.module.css";

const ICONS: LucideIcon[] = [Compass, BrainCircuit, Layers, MessageSquare];

/** Why VAELKODE — visual principles, minimal copy. */
export function WhyVaelkode() {
  return (
    <Section id="why" className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{WHY.label}</Eyebrow>
          <h2 className={styles.title}>
            Problem first.
            <span> Not a tech pitch.</span>
          </h2>
        </header>

        <div className={styles.stageGrid}>
          <aside className={styles.dial} aria-hidden>
            <div className={styles.dialRing}>
              <span className={styles.dialNeedle} />
              <div className={styles.dialCore}>
                <em>01</em>
                <strong>Problem</strong>
              </div>
            </div>
            <div className={styles.dialOrbit}>
              <span style={{ ["--a" as string]: "0deg" }}>Goals</span>
              <span style={{ ["--a" as string]: "90deg" }}>Users</span>
              <span style={{ ["--a" as string]: "180deg" }}>Limits</span>
              <span style={{ ["--a" as string]: "270deg" }}>Build</span>
            </div>
          </aside>

          <ul className={styles.principles}>
            {WHY.items.map((item, i) => {
              const Icon = ICONS[i] ?? Compass;
              return (
                <li key={item.num} className={styles.chip} title={item.text}>
                  <span className={styles.chipIcon} aria-hidden>
                    <Icon size={22} strokeWidth={1.55} />
                  </span>
                  <span className={styles.chipNum}>{item.num}</span>
                  <strong>{item.title}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
