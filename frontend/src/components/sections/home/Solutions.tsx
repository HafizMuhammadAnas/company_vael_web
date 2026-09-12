import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow, Section } from "@/components/ui";
import { SOLUTIONS } from "@/content/home";

import styles from "./Solutions.module.css";

type PreviewKind = "web" | "software" | "ai" | "mobile" | "cloud" | "consulting";

const PREVIEWS: PreviewKind[] = ["web", "software", "ai", "mobile", "cloud", "consulting"];

const ACCENTS = [
  styles.accentSky,
  styles.accentViolet,
  styles.accentFuchsia,
  styles.accentAmber,
  styles.accentTeal,
  styles.accentRose,
] as const;

function Preview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "web":
      return (
        <div className={`${styles.preview} ${styles.previewWeb}`} aria-hidden>
          <div className={styles.chrome}>
            <span /><span /><span />
          </div>
          <div className={styles.webBody}>
            <b />
            <div>
              <i /><i /><i />
            </div>
          </div>
        </div>
      );
    case "software":
      return (
        <div className={`${styles.preview} ${styles.previewSoft}`} aria-hidden>
          <div className={styles.softCols}>
            <div><span /><span /><span /></div>
            <div><span /><span /></div>
            <div><span /><span /><span /></div>
          </div>
        </div>
      );
    case "ai":
      return (
        <div className={`${styles.preview} ${styles.previewAi}`} aria-hidden>
          <div className={styles.aiBubble}>
            <strong>Extract</strong>
            <em>Fields · Route</em>
          </div>
          <div className={styles.aiPulse} />
        </div>
      );
    case "mobile":
      return (
        <div className={`${styles.preview} ${styles.previewMobile}`} aria-hidden>
          <div className={styles.phone}>
            <i />
            <span /><span /><span />
          </div>
        </div>
      );
    case "cloud":
      return (
        <div className={`${styles.preview} ${styles.previewCloud}`} aria-hidden>
          <div className={styles.cloudPipe}>
            <em className={styles.cloudDone}>Build</em>
            <em className={styles.cloudDone}>Test</em>
            <em className={styles.cloudNow}>Ship</em>
          </div>
        </div>
      );
    case "consulting":
      return (
        <div className={`${styles.preview} ${styles.previewConsult}`} aria-hidden>
          <ol>
            <li>Discover</li>
            <li className={styles.consultOn}>Decide</li>
            <li>Roadmap</li>
          </ol>
        </div>
      );
    default:
      return null;
  }
}

/** Services — preview-first mosaic, minimal copy. */
export function Solutions() {
  return (
    <Section id="solutions" className={styles.stage}>
      <header className={`${styles.head} reveal`}>
        <Eyebrow>{SOLUTIONS.label}</Eyebrow>
        <h2 className={styles.heading}>
          Clear services.
          <span> Plain outcomes.</span>
        </h2>
      </header>

      <ul className={`${styles.mosaic} reveal`}>
        {SOLUTIONS.cards.map((card, i) => (
          <li key={card.title} className={[styles.tile, ACCENTS[i] ?? styles.accentTeal].join(" ")}>
            <Link
              to={card.to}
              className={styles.link}
              aria-label={`${card.title}. ${card.cta}`}
              title={card.text}
            >
              <Preview kind={PREVIEWS[i] ?? "web"} />

              <div className={styles.meta}>
                <span className={styles.short}>{card.short}</span>
                <h3 className={styles.title}>{card.title}</h3>
                <ul className={styles.tags}>
                  {card.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <span className={styles.arrow} aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
