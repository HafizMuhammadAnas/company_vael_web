import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { PROBLEMS } from "@/content/home";

import styles from "./BusinessProblems.module.css";

const ACCENTS = [
  styles.accentAmber,
  styles.accentViolet,
  styles.accentSky,
  styles.accentTeal,
  styles.accentRose,
] as const;

type VizKind = "manual" | "systems" | "fit" | "sight" | "grow";

const VIZ: VizKind[] = ["manual", "systems", "fit", "sight", "grow"];

function FrictionViz({ kind }: { kind: VizKind }) {
  switch (kind) {
    case "manual":
      return (
        <div className={styles.vizManual} aria-hidden>
          <span /><span /><span /><span /><span /><span />
        </div>
      );
    case "systems":
      return (
        <div className={styles.vizSystems} aria-hidden>
          <i /><i /><i />
        </div>
      );
    case "fit":
      return <div className={styles.vizFit} aria-hidden />;
    case "sight":
      return <div className={styles.vizSight} aria-hidden />;
    case "grow":
      return (
        <div className={styles.vizGrow} aria-hidden>
          <i /><i /><i /><i />
        </div>
      );
    default:
      return null;
  }
}

/** Problems — visual signals, minimal copy. */
export function BusinessProblems() {
  return (
    <Section id="challenges" className={styles.stage}>
      <header className={`${styles.head} reveal`}>
        <Eyebrow>{PROBLEMS.label}</Eyebrow>
        <h2 className={styles.heading}>
          Problems we <span>fix.</span>
        </h2>
      </header>

      <ul className={`${styles.board} reveal`}>
        {PROBLEMS.cards.map((card, i) => (
          <li key={card.num}>
            <Link
              to={card.to}
              className={[styles.card, ACCENTS[i] ?? styles.accentTeal].join(" ")}
              aria-label={`${card.title}. ${card.shift}`}
              title={card.text}
            >
              <div className={styles.visual}>
                <FrictionViz kind={VIZ[i] ?? "manual"} />
              </div>

              <div className={styles.meta}>
                <span className={styles.num}>{card.num}</span>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.shift}>{card.shift}</p>
              </div>

              <span className={styles.cta} aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
