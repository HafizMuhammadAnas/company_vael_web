import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Sprout,
  Truck,
} from "lucide-react";

import { Section } from "@/components/ui";
import { INDUSTRIES } from "@/content/home";

import styles from "./Industries.module.css";

const SECTOR_META = [
  { Icon: Building2, accent: styles.accentNeon },
  { Icon: BookOpen, accent: styles.accentViolet },
  { Icon: Heart, accent: styles.accentPink },
  { Icon: Sprout, accent: styles.accentNeon },
  { Icon: BarChart3, accent: styles.accentViolet },
  { Icon: Truck, accent: styles.accentBlue },
  { Icon: ShoppingBag, accent: styles.accentPink },
] as const;

function padNum(n: number) {
  return String(n).padStart(2, "0");
}

/** Homepage industries — dark premium sector carousel. */
export function Industries() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const count = INDUSTRIES.cards.length;

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max <= 0 ? 1 : el.scrollLeft / max;
    setProgress(ratio);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.slide}`) as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <Section id="industries" className={styles.stage}>
      <header className={`${styles.header} reveal`}>
        <h2 className={styles.heading}>{INDUSTRIES.heading}</h2>
        <p className={styles.supporting}>{INDUSTRIES.supporting}</p>
      </header>

      <ul ref={trackRef} className={`${styles.track} reveal`} aria-label="Industry sectors">
        {INDUSTRIES.cards.map((card, i) => {
          const meta = SECTOR_META[i] ?? SECTOR_META[0];
          const Icon = meta.Icon;
          const num = padNum(i + 1);
          return (
            <li key={card.title} className={styles.slide}>
              <article className={`${styles.card} ${meta.accent}`}>
                <div className={styles.cardTop}>
                  <span className={styles.badge}>{num} SECTOR</span>
                  <span className={styles.focus} aria-hidden />
                </div>

                <div className={styles.iconWrap} aria-hidden>
                  <span className={styles.iconRing}>
                    <Icon className={styles.icon} strokeWidth={1.35} />
                  </span>
                </div>

                <span className={styles.ghostNum} aria-hidden>
                  {num}
                </span>

                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <span className={styles.cardArrow} aria-hidden>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className={`${styles.controls} reveal`}>
        <div className={styles.progressTrack} aria-hidden>
          <div className={styles.progressFill} style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
        <div className={styles.controlMeta}>
          <p className={styles.hint}>
            Drag · Scroll · {count} items
          </p>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous sectors"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Next sectors"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
