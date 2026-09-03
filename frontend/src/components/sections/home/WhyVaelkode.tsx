import { useState } from "react";
import { BrainCircuit, Compass, Layers, RefreshCcw } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { WHY } from "@/content/home";
import { useCycledIndex } from "@/hooks/useCycledIndex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

const ICONS = [Compass, BrainCircuit, Layers, RefreshCcw];

export function WhyVaelkode() {
  const reduced = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [active, setActive] = useCycledIndex(WHY.items.length, 4000, locked);
  const current = WHY.items[active];
  const CurrentIcon = ICONS[active];

  return (
    <Section id="why" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={WHY.label} title={WHY.heading} />
      </div>

      <div className={styles.whySplit} onMouseLeave={() => setLocked(false)}>
        <div className={styles.whyNav}>
          <span className={styles.whySpine} aria-hidden />
          <span
            className={styles.whySpineFill}
            aria-hidden
            style={{ height: `${((active + 0.5) / WHY.items.length) * 100}%` }}
          />
          <ol className={styles.whyList}>
            {WHY.items.map((item, i) => {
              const Icon = ICONS[i];
              const isActive = i === active;
              return (
                <li key={item.num}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    className={`${styles.whyBtn} ${isActive ? styles.whyBtnActive : ""}`}
                    onMouseEnter={() => {
                      setActive(i);
                      setLocked(true);
                    }}
                    onFocus={() => {
                      setActive(i);
                      setLocked(true);
                    }}
                    onBlur={() => setLocked(false)}
                    onClick={() => {
                      setActive(i);
                      setLocked(true);
                    }}
                  >
                    <span className={`${styles.whyNode} ${isActive ? styles.whyNodeActive : ""}`}>
                      {isActive && !reduced && <span className={styles.nodePulse} />}
                      <Icon size={16} className={isActive ? styles.iconActive : styles.icon} />
                    </span>
                    <span className={styles.whyBtnCopy}>
                      <span className={styles.whyNum}>{item.num}</span>
                      <span className={`${styles.whyBtnTitle} ${isActive ? "" : styles.muted}`}>{item.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className={styles.whyPanel} key={current.num}>
          {!reduced && (
            <div className={styles.whyGlow} aria-hidden>
              <span className={styles.whyGlowBlob} />
            </div>
          )}
          <span className={styles.readoutEyebrow}>Principle {current.num}</span>
          <div className={styles.whyPanelIcon}>
            <CurrentIcon size={28} className={styles.iconActive} />
          </div>
          <h3 className={styles.readoutTitle}>{current.title}</h3>
          <p className={styles.readoutBody}>{current.text}</p>
        </aside>
      </div>
    </Section>
  );
}
