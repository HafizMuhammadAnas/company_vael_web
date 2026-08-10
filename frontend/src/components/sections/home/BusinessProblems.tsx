import { Link } from "react-router-dom";

import { Card, Section, SectionHeader } from "@/components/ui";
import { PROBLEMS } from "@/content/home";

import styles from "./Home.module.css";

export function BusinessProblems() {
  return (
    <Section>
      <div className="reveal">
        <SectionHeader label={PROBLEMS.label} title={PROBLEMS.heading} />
        <div className={styles.supporting}>
          {PROBLEMS.supporting.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
      <div className={`${styles.grid} ${styles.cols3} reveal`}>
        {PROBLEMS.cards.map((card) => (
          <Card key={card.num}>
            <div className={styles.cardNum}>{card.num}</div>
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
