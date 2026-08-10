import { Link } from "react-router-dom";

import { Button, Card, Section, SectionHeader } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";

import styles from "./Home.module.css";

export function FeaturedWork() {
  return (
    <Section className={styles.altBg}>
      <div className="reveal">
        <SectionHeader label={FEATURED_WORK.label} title={FEATURED_WORK.heading} />
        <p className={styles.supporting}>{FEATURED_WORK.supporting}</p>
        <p className={styles.sectionNote}>// {FEATURED_WORK.note}</p>
      </div>

      <div className={`${styles.grid} ${styles.cols3} reveal`}>
        {FEATURED_WORK.cards.map((card) => (
          <Card key={card.title}>
            <div className={styles.cardCategory}>{card.category}</div>
            <div className={styles.cardTitle}>{card.title}</div>
            <p className={styles.cardText}>{card.description}</p>
            <div className={styles.cardChips}>
              {card.capabilities.map((cap) => (
                <span key={cap} className={styles.chip}>
                  {cap}
                </span>
              ))}
            </div>
            <div className={styles.cardTech}>{card.technology}</div>
            <Link to={card.to} className={styles.cardCta}>
              {card.cta} →
            </Link>
          </Card>
        ))}
      </div>

      <div className={`${styles.sectionCtas} reveal`}>
        <Button variant="primary" to={FEATURED_WORK.primaryCta.to}>
          {FEATURED_WORK.primaryCta.label} →
        </Button>
        <Link to={FEATURED_WORK.secondaryCta.to} className={styles.cardCta}>
          {FEATURED_WORK.secondaryCta.label} →
        </Link>
      </div>
    </Section>
  );
}
