import { ArrowRight, Clock3 } from "lucide-react";

import { Button, Section, SectionHeader } from "@/components/ui";
import { INSIGHTS } from "@/content/home";

import styles from "./Insights.module.css";

export function Insights() {
  return (
    <Section id="insights" className={styles.stage}>
      <div className="reveal">
        <SectionHeader label={INSIGHTS.label} title={INSIGHTS.heading} supporting={INSIGHTS.supporting} />
      </div>

      <ol className={`${styles.feed} reveal`}>
        {INSIGHTS.articles.map((article, i) => (
          <li key={article.title} className={styles.item}>
            <article className={styles.row}>
              <span className={styles.index} aria-hidden>
                0{i + 1}
              </span>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.category}>{article.category}</span>
                  <span className={styles.dot} aria-hidden />
                  <span className={styles.readTime}>
                    <Clock3 size={12} aria-hidden />
                    {article.readTime}
                  </span>
                  {article.comingSoon && <span className={styles.badge}>Coming soon</span>}
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.text}>{article.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className={`${styles.cta} reveal`}>
        <Button variant="outline" to={INSIGHTS.cta.to}>
          {INSIGHTS.cta.label}
          <ArrowRight size={16} aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
