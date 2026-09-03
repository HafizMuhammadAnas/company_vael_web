import { ArrowRight } from "lucide-react";

import { OrbitField, ParticleNetwork } from "@/components/ambient/Ambient";
import { Button, Eyebrow } from "@/components/ui";
import { HERO } from "@/content/home";
import { usePointerParallax } from "@/hooks/usePointerParallax";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <AmbientField />

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

function AmbientField() {
  const ref = usePointerParallax<HTMLDivElement>();

  return (
    <div ref={ref} aria-hidden className={styles.ambient}>
      {/* Soft color wash — calm, not busy */}
      <div className="vk-parallax" style={{ ["--depth" as string]: "22px" }}>
        <div className={`${styles.blob} ${styles.blobA}`} />
        <div className={`${styles.blob} ${styles.blobB}`} />
        <div className={`${styles.blob} ${styles.blobC}`} />
      </div>

      {/* Slow radar rings behind the copy */}
      <div className="vk-parallax" style={{ ["--depth" as string]: "-10px" }}>
        <OrbitField />
      </div>

      {/* Constellation — hero-only */}
      <div className={`${styles.particles} vk-parallax`} style={{ ["--depth" as string]: "14px" }}>
        <ParticleNetwork />
      </div>
    </div>
  );
}
