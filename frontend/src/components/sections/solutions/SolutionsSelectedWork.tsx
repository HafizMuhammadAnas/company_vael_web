/**
 * Services landing — Selected Work with a living wave/current.
 * Same approved cards; motion suggests capability in motion, not auto-hype.
 */

import { ArrowUpRight, BrainCircuit, Layers, Workflow, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import editorial from "@/components/sections/editorial/Editorial.module.css";
import { Button, Eyebrow, Section } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";
import { SOL_WORK } from "@/content/solutions";

import styles from "./SolutionsSelectedWork.module.css";

const ICONS: LucideIcon[] = [BrainCircuit, Layers, Workflow];

export function SolutionsSelectedWork() {
  return (
    <Section className={[editorial.altBg, styles.stage].join(" ")}>
      <div className={`${styles.wrap} reveal`}>
        <div className={styles.current} aria-hidden>
          <svg className={styles.waveSvg} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              className={styles.waveA}
              d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60 L1200,120 L0,120 Z"
            />
            <path
              className={styles.waveB}
              d="M0,70 C200,30 400,110 700,70 C950,35 1100,95 1200,70 L1200,120 L0,120 Z"
            />
          </svg>
          <span className={styles.orb} />
          <span className={styles.orbLate} />
        </div>

        <header className={styles.head}>
          <div className={styles.headCopy}>
            <Eyebrow>{SOL_WORK.label}</Eyebrow>
            <h2 className={styles.title}>
              See What These Capabilities{" "}
              <span className={styles.titleAccent}>Can Become.</span>
            </h2>
            <p className={styles.lede}>{SOL_WORK.supporting}</p>
            {FEATURED_WORK.note ? <p className={styles.note}>{FEATURED_WORK.note}</p> : null}
          </div>
          <div className={styles.livePill} aria-hidden>
            <span className={styles.spinner} />
            <em>In motion</em>
          </div>
        </header>

        <ul className={styles.stream}>
          {FEATURED_WORK.cards.map((card, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <li
                key={card.title}
                className={styles.card}
                style={{ ["--card-i" as string]: i }}
              >
                <div className={styles.cardGlow} aria-hidden />
                <div className={styles.cardTop}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.cat}>{card.category}</span>
                  <span className={styles.iconWrap}>
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {card.capabilities ? (
                  <ul className={styles.tags}>
                    {card.capabilities.slice(0, 4).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : null}
                {card.technology ? <p className={styles.tech}>{card.technology}</p> : null}
                <Link to={card.to} className={styles.link}>
                  {card.cta}
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        {SOL_WORK.cta ? (
          <div className={styles.footer}>
            <Button variant="outline" to={SOL_WORK.cta.to}>
              {SOL_WORK.cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
