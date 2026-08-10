import { Button, Card, Section, SectionHeader } from "@/components/ui";
import { INSIGHTS } from "@/content/home";

import styles from "./Home.module.css";

export function Insights() {
  return (
    <Section className={styles.altBg}>
      <div className="reveal">
        <SectionHeader label={INSIGHTS.label} title={INSIGHTS.heading} />
        <p className={styles.supporting}>{INSIGHTS.supporting}</p>
      </div>

      <div className={`${styles.grid} ${styles.cols3} reveal`}>
        {INSIGHTS.articles.map((article) => (
          <Card key={article.title} hoverable={!article.comingSoon}>
            <div className={styles.cardCategory}>{article.category}</div>
            <div className={styles.cardTitle}>{article.title}</div>
            <p className={styles.cardText}>{article.description}</p>
            <div className={styles.readTime}>{article.readTime}</div>
            {article.comingSoon && <span className={styles.comingSoon}>Coming Soon</span>}
          </Card>
        ))}
      </div>

      <div className={`${styles.sectionCtas} reveal`}>
        <Button variant="outline" to={INSIGHTS.cta.to}>
          {INSIGHTS.cta.label} →
        </Button>
      </div>
    </Section>
  );
}
