import { useState } from "react";
import { ArrowRight, BrainCircuit, Layers, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

import { Button, Section, SectionHeader } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";
import { useCycledIndex } from "@/hooks/useCycledIndex";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Interactive.module.css";

const ICONS = [BrainCircuit, Layers, Workflow];
const SCENES = [styles.workSceneA, styles.workSceneB, styles.workSceneC];

export function FeaturedWork() {
  const reduced = usePrefersReducedMotion();
  const [locked, setLocked] = useState(false);
  const [active, setActive] = useCycledIndex(FEATURED_WORK.cards.length, 5200, locked);

  return (
    <Section id="work" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={FEATURED_WORK.label} title={FEATURED_WORK.heading} />
        <p className={styles.workNote}>{FEATURED_WORK.note}</p>
      </div>

      <div
        className={styles.workGallery}
        onMouseLeave={() => setLocked(false)}
        role="list"
        aria-label="Selected solutions"
      >
        {FEATURED_WORK.cards.map((card, i) => {
          const Icon = ICONS[i] ?? Layers;
          const isActive = i === active;
          return (
            <article
              key={card.title}
              role="listitem"
              className={`${styles.workPanel} ${SCENES[i]} ${isActive ? styles.workPanelActive : ""}`}
              onMouseEnter={() => {
                setActive(i);
                setLocked(true);
              }}
              onFocusCapture={() => {
                setActive(i);
                setLocked(true);
              }}
            >
              <button
                type="button"
                className={styles.workPanelHit}
                aria-pressed={isActive}
                aria-expanded={isActive}
                onClick={() => {
                  setActive(i);
                  setLocked(true);
                }}
              >
                <span className={styles.workPanelNum}>0{i + 1}</span>
                <span className={styles.workPanelSpine}>
                  <Icon size={16} className={styles.iconActive} aria-hidden />
                  <span className={styles.workPanelSpineTitle}>{card.title}</span>
                </span>
              </button>

              <div className={styles.workPanelBody}>
                <div className={styles.workPanelInner}>
                  {!reduced && isActive && <span className={styles.workPanelSheen} aria-hidden />}
                  <span className={styles.workPanelCat}>{card.category}</span>
                  <h3 className={styles.workPanelTitle}>{card.title}</h3>
                  <p className={styles.workPanelText}>{card.description}</p>
                  <div className={styles.workPanelPills}>
                    {card.capabilities.slice(0, 4).map((cap) => (
                      <span key={cap} className={styles.pill}>
                        {cap}
                      </span>
                    ))}
                  </div>
                  <p className={styles.workTech}>{card.technology}</p>
                  <Link
                    to={card.to}
                    className={styles.workFeatureCta}
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {card.cta}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>

              {!reduced && isActive && (
                <span className={styles.workProgress} aria-hidden>
                  <span className={styles.workProgressFill} />
                </span>
              )}
            </article>
          );
        })}
      </div>

      <div className={`${styles.workCtas} reveal`}>
        <Button variant="primary" to={FEATURED_WORK.primaryCta.to}>
          {FEATURED_WORK.primaryCta.label}
          <ArrowRight size={16} aria-hidden />
        </Button>
        <Button variant="outline" to={FEATURED_WORK.secondaryCta.to}>
          {FEATURED_WORK.secondaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
