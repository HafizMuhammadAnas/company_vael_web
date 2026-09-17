import { ArrowRight } from "lucide-react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { HeroConsole } from "@/components/sections/HeroConsole";
import { Accent, Button, Eyebrow } from "@/components/ui";
import {
  PORTFOLIO_FLOATING_CTA,
  PORTFOLIO_HERO,
  PORTFOLIO_HERO_STATS,
} from "@/content/portfolio";
import { useCountUp } from "@/hooks/useCountUp";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";

import styles from "./PortfolioHero.module.css";

const ACCENT_CLASS = {
  violet: styles.statViolet,
  neon: styles.statNeon,
  pink: styles.statPink,
} as const;

function resolveCountTo(
  stat: (typeof PORTFOLIO_HERO_STATS)[number],
  industryCount: number,
): number | null {
  if (!("countTo" in stat) || stat.countTo === undefined) return null;
  if (stat.countTo === "auto-industries") return industryCount;
  return typeof stat.countTo === "number" ? stat.countTo : null;
}

function AnimatedStatValue({
  to,
  suffix = "",
  delay,
}: {
  to: number;
  suffix?: string;
  delay: number;
}) {
  const n = useCountUp({ to, duration: 1400, delay });
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/** Portfolio page hero — left narrative, right console with highlight cards. */
export function PortfolioHero() {
  const { projects } = usePublishedProjects();
  const industryCount = new Set(projects.map((p) => p.industry)).size;

  return (
    <section className={styles.hero} data-domain="work">
      <HeroAmbient layout="page" />

      <div className={styles.content}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow}>{PORTFOLIO_HERO.label}</Eyebrow>
            <h1 className={styles.title}>
              {PORTFOLIO_HERO.titleBefore} <Accent>{PORTFOLIO_HERO.titleAccent}</Accent>
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

          <aside className={styles.scene} aria-label="Portfolio highlights">
            <HeroConsole
              title="vaelkode · work"
              lane={[
                { label: "Brief" },
                { label: "Build" },
                { label: "Ship", active: true },
                { label: "Learn" },
              ]}
            >
              <div className={styles.stats}>
                <i className={styles.statsScan} aria-hidden />
                {PORTFOLIO_HERO_STATS.map((stat, index) => {
                  const countTo = resolveCountTo(stat, industryCount);
                  const suffix = "suffix" in stat ? stat.suffix : "";

                  return (
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
                      style={{ ["--i" as string]: index }}
                    >
                      <p className={styles.statValue}>
                        {countTo !== null ? (
                          <AnimatedStatValue
                            to={countTo}
                            suffix={suffix}
                            delay={350 + index * 120}
                          />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className={styles.statLabel}>{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </HeroConsole>
          </aside>
        </div>
      </div>
    </section>
  );
}
