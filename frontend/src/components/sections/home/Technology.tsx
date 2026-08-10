import { Section, SectionHeader } from "@/components/ui";
import { TECHNOLOGY } from "@/content/home";

import styles from "./Home.module.css";

export function Technology() {
  return (
    <Section>
      <div className="reveal">
        <SectionHeader label={TECHNOLOGY.label} title={TECHNOLOGY.heading} />
        <p className={styles.supporting}>{TECHNOLOGY.supporting}</p>
      </div>
      <div className={`${styles.techGrid} reveal`}>
        {TECHNOLOGY.categories.map((cat) => (
          <div key={cat.title} className={styles.techCat}>
            <div className={styles.techTitle}>{cat.title}</div>
            <div className={styles.chips}>
              {cat.items.map((item) => (
                <span key={item} className={styles.chip}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
