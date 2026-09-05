import { ArrowRight } from "lucide-react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { Button, Eyebrow } from "@/components/ui";
import { HERO } from "@/content/home";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <HeroAmbient layout="home" />

      <div className={styles.content}>
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

      <div className={styles.marqueeWrap} aria-hidden>
        <div className={styles.marqueeTrack}>
          <MarqueeGroup words={HERO.orbitTerms} />
          <MarqueeGroup words={HERO.orbitTerms} />
        </div>
      </div>
    </section>
  );
}

function MarqueeGroup({ words }: { words: readonly string[] }) {
  const loop = [...words, ...words];
  return (
    <div className={styles.marqueeGroup}>
      {loop.map((word, i) => (
        <span key={`${word}-${i}`} className={styles.marqueeItem}>
          {word}
          <span className={styles.marqueeSep}> / </span>
        </span>
      ))}
    </div>
  );
}
