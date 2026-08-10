import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { Button } from "@/components/ui";
import { HERO } from "@/content/home";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className="circuit-bg" />
      <div className={styles.radial} />
      <div className={styles.radialBronze} />
      <div className="scan-line" />
      <div className="scan-line" style={{ animationDelay: "4s" }} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>// {HERO.eyebrow}</div>

        <LogoGlyph size={130} className={styles.visual} />

        <h1 className={styles.title}>{HERO.title}</h1>
        <p className={styles.description}>{HERO.description}</p>

        <div className={styles.terms}>
          {HERO.orbitTerms.map((term) => (
            <span key={term} className={styles.term}>
              {term}
            </span>
          ))}
        </div>

        <div className={styles.ctas}>
          <Button variant="primary" to={HERO.primaryCta.to}>
            {HERO.primaryCta.label}
          </Button>
          <Button variant="outline" to={HERO.secondaryCta.to}>
            {HERO.secondaryCta.label}
          </Button>
        </div>

        <p className={styles.microcopy}>{HERO.microcopy}</p>
      </div>
    </section>
  );
}
