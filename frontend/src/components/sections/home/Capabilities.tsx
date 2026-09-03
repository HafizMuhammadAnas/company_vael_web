import { useState } from "react";
import { BrainCircuit, Cloud, Code2, Workflow } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { CAPABILITIES } from "@/content/home";
import { useCycledIndex } from "@/hooks/useCycledIndex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

const ICONS = [BrainCircuit, Code2, Cloud, Workflow];

export function Capabilities() {
  const reduced = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [active, setActive] = useCycledIndex(CAPABILITIES.items.length, 4200, locked);
  const current = CAPABILITIES.items[active];
  const paused = locked ? "paused" : "running";
  const spin = reduced ? undefined : "vk-spin 52s linear infinite";
  const counter = reduced ? undefined : "vk-spin 52s linear infinite reverse";

  return (
    <Section id="capabilities" className={styles.stage}>
      <div className="reveal">
        <SectionHeader
          label={CAPABILITIES.label}
          title={CAPABILITIES.heading}
          supporting={CAPABILITIES.supporting}
        />
      </div>

      <div className={styles.split}>
        <div className={styles.orbit}>
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className={styles.orbitSvg}
            style={{ animation: spin, animationDuration: "120s", animationPlayState: paused }}
          >
            <circle
              cx="200"
              cy="200"
              r="176"
              fill="none"
              stroke="color-mix(in srgb, var(--neon) 26%, transparent)"
              strokeWidth="1"
              strokeDasharray="2 10"
            />
            <circle
              cx="200"
              cy="200"
              r="128"
              fill="none"
              stroke="color-mix(in srgb, var(--violet) 30%, transparent)"
              strokeWidth="1"
              strokeDasharray="6 14"
            />
            <circle
              cx="200"
              cy="200"
              r="84"
              fill="none"
              stroke="color-mix(in srgb, var(--neon) 22%, transparent)"
              strokeWidth="1"
            />
          </svg>
          <svg aria-hidden viewBox="0 0 400 400" className={styles.orbitSvg}>
            {CAPABILITIES.items.map((item, i) => {
              const a = (i / CAPABILITIES.items.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={item.title}
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(a) * 152}
                  y2={200 + Math.sin(a) * 152}
                  stroke={
                    i === active
                      ? "color-mix(in srgb, var(--neon) 75%, transparent)"
                      : "color-mix(in srgb, var(--neon) 18%, transparent)"
                  }
                  strokeWidth={i === active ? 1.6 : 1}
                  strokeDasharray="4 8"
                  style={reduced ? undefined : { animation: "vk-dash 1.6s linear infinite" }}
                />
              );
            })}
          </svg>

          <div className={styles.coreWrap}>
            <div className={styles.core}>
              <span className={styles.coreGlow} />
              {!reduced && <span className={styles.coreRing} />}
              <div>
                <p className={styles.coreLabel}>core</p>
                <p className={styles.coreTitle}>{current.short}</p>
                <p className={styles.coreMeta}>
                  0{active + 1} / 0{CAPABILITIES.items.length}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.orbitLayer}>
            {CAPABILITIES.items.map((item, i) => {
              const deg = (i / CAPABILITIES.items.length) * 360;
              const delay = `-${((i / CAPABILITIES.items.length) * 52).toFixed(2)}s`;
              const Icon = ICONS[i];
              const isActive = i === active;
              return (
                <div
                  key={item.title}
                  className={styles.orbitLayer}
                  style={
                    reduced
                      ? { transform: `rotate(${deg}deg)` }
                      : { animation: spin, animationDelay: delay, animationPlayState: paused }
                  }
                >
                  <div className={styles.module}>
                    <div
                      style={
                        reduced
                          ? { transform: `rotate(${-deg}deg)` }
                          : { animation: counter, animationDelay: delay, animationPlayState: paused }
                      }
                    >
                      <button
                        type="button"
                        className={`${styles.moduleBtn} ${isActive ? styles.moduleBtnActive : ""}`}
                        aria-pressed={isActive}
                        onMouseEnter={() => {
                          setActive(i);
                          setLocked(true);
                        }}
                        onMouseLeave={() => setLocked(false)}
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
                        <Icon size={20} className={isActive ? styles.iconActive : styles.icon} />
                        <span className={styles.moduleLabel}>{item.short}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className={styles.readout} key={current.title}>
            <span className={styles.readoutEyebrow}>module 0{active + 1}</span>
            <h3 className={styles.readoutTitle}>{current.title}</h3>
            <p className={styles.readoutBody}>{current.text}</p>
            <div className={styles.pills}>
              {current.tags.map((tag) => (
                <span key={tag} className={styles.pill}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.selectors}>
            {CAPABILITIES.items.map((item, i) => (
              <button
                key={item.short}
                type="button"
                className={`${styles.selector} ${i === active ? styles.selectorActive : ""}`}
                onClick={() => {
                  setActive(i);
                  setLocked(true);
                }}
              >
                {item.short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
