import { Link } from "react-router-dom";

import { Card, Section, SectionHeader } from "@/components/ui";
import { INDUSTRIES } from "@/content/home";

import styles from "./Home.module.css";

export function Industries() {
  return (
    <Section>
      <div className="reveal">
        <SectionHeader label={INDUSTRIES.label} title={INDUSTRIES.heading} />
        <p className={styles.supporting}>{INDUSTRIES.supporting}</p>
      </div>
      <div className={`${styles.grid} ${styles.cols3} reveal`}>
        {INDUSTRIES.cards.map((card) => (
          <Card key={card.title}>
            <div className={styles.cardTitle}>{card.title}</div>
            <p className={styles.cardText}>{card.text}</p>
            <Link to={card.to} className={styles.cardCta}>
              Explore Industry →
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
