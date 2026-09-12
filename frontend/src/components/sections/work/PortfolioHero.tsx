import { ArrowRight } from "lucide-react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { Button, Eyebrow } from "@/components/ui";
import {
  PORTFOLIO_FLOATING_CTA,
  PORTFOLIO_HERO,
  PORTFOLIO_HERO_STATS,
  PORTFOLIO_PROJECTS,
} from "@/content/portfolio";

import styles from "./PortfolioHero.module.css";

const ACCENT_CLASS = {
  violet: styles.statViolet,
  neon: styles.statNeon,
  pink: styles.statPink,
} as const;

function resolveStatValue(value: string): string {
  if (value === "auto") {
    return String(PORTFOLIO_PROJECTS.length);
  }
  if (value === "auto-industries") {
    return String(new Set(PORTFOLIO_PROJECTS.map((p) => p.industry)).size);
  }
  return value;
}

/** Portfolio page hero — left narrative, right staggered highlight cards. */
export function PortfolioHero() {
  return (
    <section className={styles.hero} data-domain="work">
      <HeroAmbient layout="page" />

      <div className={styles.content}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow}>{PORTFOLIO_HERO.label}</Eyebrow>
            <h1 className={styles.title}>
              {PORTFOLIO_HERO.titleBefore}{" "}
              <span className={styles.accent}>{PORTFOLIO_HERO.titleAccent}</span>
            </h1>
            <p className={styles.supporting}>{PORTFOLIO_HERO.supporting}</p>
            <div className={styles.ctas}>
              <Button variant="primary" to={PORTFOLIO_FLOATING_CTA.primary.to}>
                {PORTFOLIO_FLOATING_CTA.primary.label}
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button variant="outline" to={PORTFOLIO_FLOATING_CTA.secondary.to}>
                {PORTFOLIO_FLOATING_CTA.secondary.label}
              </Button>
            </div>
          </div>

          <aside className={styles.stats} aria-label="Portfolio highlights">
            {PORTFOLIO_HERO_STATS.map((stat, index) => (
              <div
                key={stat.id}
                className={[
                  styles.statCard,
                  ACCENT_CLASS[stat.accent],
                  index === 0 ? styles.statOffset0 : "",
                  index === 1 ? styles.statOffset1 : "",
                  index === 2 ? styles.statOffset2 : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className={styles.statValue}>{resolveStatValue(stat.value)}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
