import { Link } from "react-router-dom";

import { Card, Section, SectionHeader } from "@/components/ui";
import { SOLUTIONS } from "@/content/home";

import styles from "./Home.module.css";

export function Solutions() {
  return (
    <Section className={styles.altBg}>
      <div className="reveal">
        <SectionHeader label={SOLUTIONS.label} title={SOLUTIONS.heading} />
        <p className={styles.supporting}>{SOLUTIONS.supporting}</p>
      </div>
      <div className={`${styles.grid} ${styles.cols3} reveal`}>
        {SOLUTIONS.cards.map((card, i) => (
          <Card key={card.title} cornerTl={i === 0} cornerBr={i === SOLUTIONS.cards.length - 1}>
            <div className={styles.cardNum}>
              {String(i + 1).padStart(2, "0")} / {String(SOLUTIONS.cards.length).padStart(2, "0")}
            </div>
            <div className={styles.cardTitle}>{card.title}</div>
            <p className={styles.cardText}>{card.text}</p>
            <Link to={card.to} className={styles.cardCta}>
              {card.cta} →
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
