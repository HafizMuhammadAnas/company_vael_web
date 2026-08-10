import { Card, Section, SectionHeader } from "@/components/ui";
import { CAPABILITIES } from "@/content/home";

import styles from "./Home.module.css";

export function Capabilities() {
  return (
    <Section className={styles.altBg}>
      <div className="reveal">
        <SectionHeader label={CAPABILITIES.label} title={CAPABILITIES.heading} />
        <p className={styles.supporting}>{CAPABILITIES.supporting}</p>
      </div>
      <div className={`${styles.grid} ${styles.cols4} reveal`}>
        {CAPABILITIES.items.map((item) => (
          <Card key={item.title}>
            <div className={styles.cardTitle}>{item.title}</div>
            <p className={styles.cardText}>{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
