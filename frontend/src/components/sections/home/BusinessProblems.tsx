import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Boxes, Eye, Link2, RefreshCcw, TrendingUp } from "lucide-react";

import { Section, SectionHeader } from "@/components/ui";
import { PROBLEMS } from "@/content/home";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

const ICONS = [RefreshCcw, Link2, Boxes, Eye, TrendingUp];

export function BusinessProblems() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const current = PROBLEMS.cards[active];

  return (
    <Section id="challenges" className={styles.stage}>
      <div className="reveal">
        <SectionHeader
          label={PROBLEMS.label}
          title={PROBLEMS.heading}
          supporting={PROBLEMS.supporting.map((para) => (
            <p key={para}>{para}</p>
          ))}
        />
      </div>

      <div className={styles.track}>
        <div className={styles.conduit} aria-hidden>
          {!reduced && (
            <>
              <span className={styles.trace} />
              <span className={styles.trace} style={{ animationDelay: "2.1s", width: "3.5rem" }} />
            </>
          )}
        </div>
        <ol className={styles.stages}>
          {PROBLEMS.cards.map((card, i) => {
            const Icon = ICONS[i];
            const isActive = i === active;
            return (
              <li key={card.num}>
                <button
                  type="button"
                  className={styles.stageBtn}
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}>
                    {isActive && !reduced && <span className={styles.nodePulse} />}
                    <Icon size={20} className={isActive ? styles.iconActive : styles.icon} />
                  </span>
                  <span>
                    <span className={styles.coreLabel}>{card.num}</span>
                    <span className={`${styles.coreTitle} ${isActive ? "" : styles.muted}`}>{card.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.panel} key={current.num}>
        <div className={styles.panelCell}>
          <p className={styles.panelLabel}>friction</p>
          <p className={styles.panelText}>{current.text}</p>
        </div>
        <div className={`${styles.panelCell} ${styles.panelMid}`}>
          <p className={`${styles.panelLabel} ${styles.panelSignal}`}>engineering shift</p>
          <p className={styles.panelText} style={{ color: "var(--text-primary)" }}>
            {current.shift}
          </p>
        </div>
        <div className={styles.panelCell}>
          <p className={styles.panelLabel}>next step</p>
          <Link to={current.to} className={styles.panelCta}>
            {current.cta}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
