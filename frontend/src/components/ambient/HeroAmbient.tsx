import { OrbitField, ParticleNetwork } from "@/components/ambient/Ambient";
import { usePointerParallax } from "@/hooks/usePointerParallax";

import styles from "./HeroAmbient.module.css";

export type HeroAmbientLayout = "home" | "page";

interface HeroAmbientProps {
  /**
   * `home` — denser constellation biased to the right (left-aligned copy).
   * `page` — softer field with a clearer center (centered PageHero copy).
   */
  layout?: HeroAmbientLayout;
}

/**
 * Shared hero background motion: drifting color washes, slow orbit rings,
 * and a calm particle constellation with pointer parallax.
 */
export function HeroAmbient({ layout = "page" }: HeroAmbientProps) {
  const ref = usePointerParallax<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden
      className={`${styles.ambient} ${layout === "home" ? styles.home : styles.page}`}
    >
      <div className="vk-parallax" style={{ ["--depth" as string]: "22px" }}>
        <div className={`${styles.blob} ${styles.blobA}`} />
        <div className={`${styles.blob} ${styles.blobB}`} />
        <div className={`${styles.blob} ${styles.blobC}`} />
      </div>

      <div className="vk-parallax" style={{ ["--depth" as string]: "-10px" }}>
        <OrbitField layout={layout} />
      </div>

      <div className={`${styles.particles} vk-parallax`} style={{ ["--depth" as string]: "14px" }}>
        <ParticleNetwork layout={layout} />
      </div>
    </div>
  );
}
