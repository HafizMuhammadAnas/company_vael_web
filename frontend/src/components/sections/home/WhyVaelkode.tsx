import { Card, Section, SectionHeader } from "@/components/ui";
import { WHY } from "@/content/home";

import styles from "./Home.module.css";

export function WhyVaelkode() {
  return (
    <Section>
      <div className="reveal">
        <SectionHeader label={WHY.label} title={WHY.heading} />
        <p className={styles.supporting}>{WHY.supporting}</p>
      </div>
      <div className={`${styles.grid} ${styles.cols2} reveal`}>
        {WHY.items.map((item) => (
          <Card key={item.num}>
            <div className={styles.cardNum}>{item.num}</div>
            <div className={styles.cardTitle}>{item.title}</div>
            <p className={styles.cardText}>{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
