import { useState } from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, Cloud, Code2, Compass, LayoutDashboard, Smartphone } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { SOLUTIONS } from "@/content/home";
import { useCycledIndex } from "@/hooks/useCycledIndex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

const ICONS = [BrainCircuit, Code2, LayoutDashboard, Smartphone, Cloud, Compass];

export function Solutions() {
  const reduced = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [active, setActive] = useCycledIndex(SOLUTIONS.cards.length, 4600, locked);
  const hub = SOLUTIONS.cards[0];
  const outer = SOLUTIONS.cards.slice(1);

  return (
    <Section id="solutions" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={SOLUTIONS.label} title={SOLUTIONS.heading} supporting={SOLUTIONS.supporting} />
      </div>

      <div className={`${styles.split} ${styles.splitConstellation}`}>
        <div className={styles.constellation} onMouseLeave={() => setLocked(false)}>
          <svg aria-hidden viewBox="0 0 100 100" className={styles.orbitSvg}>
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="color-mix(in srgb, var(--neon) 16%, transparent)"
              strokeWidth="0.25"
              strokeDasharray="1 3"
              style={reduced ? undefined : { animation: "vk-dash 3s linear infinite" }}
            />
            {outer.map((s, i) => (
              <line
                key={s.title}
                x1={hub.x}
                y1={hub.y}
                x2={s.x}
                y2={s.y}
                stroke={
                  i + 1 === active
                    ? "color-mix(in srgb, var(--neon) 80%, transparent)"
                    : "color-mix(in srgb, var(--neon) 20%, transparent)"
                }
                strokeWidth={i + 1 === active ? 0.5 : 0.25}
                strokeDasharray="1.5 2.5"
                style={reduced ? undefined : { animation: `vk-dash ${2 + i * 0.35}s linear infinite` }}
              />
            ))}
            {outer.map((s, i) => {
              const next = outer[(i + 1) % outer.length];
              return (
                <line
                  key={`${s.title}-edge`}
                  x1={s.x}
                  y1={s.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="color-mix(in srgb, var(--violet) 18%, transparent)"
                  strokeWidth="0.2"
                  strokeDasharray="1 3"
                  style={reduced ? undefined : { animation: `vk-dash ${4 + i * 0.4}s linear infinite` }}
                />
              );
            })}
          </svg>

          {SOLUTIONS.cards.map((s, i) => {
            const Icon = ICONS[i];
            const isActive = i === active;
            const isHub = i === 0;
            return (
              <div key={s.title} className={styles.star} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={`${styles.starBtn} ${isHub ? styles.starHub : styles.starNode} ${isActive ? styles.starActive : ""}`}
                  style={{ animationDelay: `${i * 0.9}s` }}
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
                  {isActive && !reduced && <span className={styles.nodePulse} />}
                  <Icon size={isHub ? 22 : 16} className={isActive ? styles.iconActive : styles.icon} />
                  <span className={styles.starLabel}>{s.short}</span>
                </button>
              </div>
            );
          })}
        </div>

        <ul className={styles.list}>
          {SOLUTIONS.cards.map((s, i) => {
            const Icon = ICONS[i];
            const isActive = i === active;
            return (
              <li key={s.title} className={styles.listItem}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={`${styles.listBtn} ${isActive ? styles.listBtnActive : ""}`}
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
                  <span className={styles.listBar} />
                  <Icon size={16} className={`${styles.listIcon} ${isActive ? styles.iconActive : styles.icon}`} />
                  <span className={styles.listMain}>
                    <span className={styles.listHead}>
                      <span className={styles.listTitle}>{s.title}</span>
                      <span className={styles.listNum}>0{i + 1}</span>
                    </span>
                    <span className={styles.readoutBody}>{s.text}</span>
                    <span className={styles.pills}>
                      {s.tags.map((t) => (
                        <span key={t} className={styles.pill}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
                {isActive && (
                  <Link to={s.to} className={styles.listCta}>
                    {s.cta} →
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
