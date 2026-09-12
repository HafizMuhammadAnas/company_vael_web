import { ArrowRight } from "lucide-react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { Button, Eyebrow } from "@/components/ui";
import { HERO, HERO_STATS } from "@/content/home";

import styles from "./Hero.module.css";

const ACCENT_CLASS = {
  violet: styles.statViolet,
  neon: styles.statNeon,
  pink: styles.statPink,
} as const;

/** Homepage hero — copy + product delivery scene. */
export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <HeroAmbient layout="home" />

      <div className={styles.content}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow}>{HERO.eyebrow}</Eyebrow>
            <h1 className={styles.title}>
              <span>{HERO.titleBefore} </span>
              <span className="vk-gradient-text">{HERO.titleAccent}</span>
              <br />
              <span>{HERO.titleRest}</span>
            </h1>
            <p className={styles.description}>{HERO.description}</p>
            <div className={styles.ctas}>
              <Button variant="primary" to={HERO.primaryCta.to}>
                {HERO.primaryCta.label}
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button variant="outline" to={HERO.secondaryCta.to}>
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </div>

          <aside className={styles.scene} aria-label="How we deliver">
            <div className={styles.console}>
              <header className={styles.consoleBar}>
                <span className={styles.dotR} />
                <span className={styles.dotY} />
                <span className={styles.dotG} />
                <em>vaelkode · delivery</em>
              </header>

              <div className={styles.consoleBody}>
                <div className={styles.pole}>
                  <span className={styles.poleLabel}>Problem</span>
                  <div className={styles.poleFace}>
                    <i /><i /><i />
                    <strong>?</strong>
                  </div>
                </div>

                <div className={styles.bridge} aria-hidden>
                  <span className={styles.bridgeTrack} />
                  <span className={styles.bridgePulse} />
                  <em>Build</em>
                </div>

                <div className={`${styles.pole} ${styles.poleOut}`}>
                  <span className={styles.poleLabel}>Working software</span>
                  <div className={styles.poleFace}>
                    <span className={styles.bars}>
                      <i style={{ height: "42%" }} />
                      <i style={{ height: "68%" }} />
                      <i style={{ height: "52%" }} />
                      <i style={{ height: "86%" }} />
                    </span>
                    <strong>✓</strong>
                  </div>
                </div>
              </div>

              <ul className={styles.lane}>
                {["Discover", "Plan", "Build", "Launch"].map((step, i) => (
                  <li key={step} className={i === 2 ? styles.laneOn : undefined}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.stats}>
              {HERO_STATS.map((stat, index) => (
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
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
