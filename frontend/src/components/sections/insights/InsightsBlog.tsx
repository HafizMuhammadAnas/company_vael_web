/**
 * Insights › Blog — filters, covers, featured row, related.
 * Cards come from CMS (published + coming soon).
 */

import { useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

import { Section } from "@/components/ui";
import { INS_BLOG, type BlogPreview } from "@/content/insights";
import { usePublicInsights } from "@/hooks/usePublicInsights";

import styles from "./InsightsBlog.module.css";

const COVER_CLASS: Record<BlogPreview["cover"], string> = {
  mesh: styles.coverMesh,
  orbits: styles.coverOrbits,
  circuits: styles.coverCircuits,
  waves: styles.coverWaves,
  nodes: styles.coverNodes,
  book: styles.coverBook,
};

function Cover({ article }: { article: BlogPreview }) {
  return (
    <div className={[styles.cover, COVER_CLASS[article.cover]].join(" ")} aria-hidden>
      <span className={styles.coverGlow} />
      <span className={styles.coverPattern} />
    </div>
  );
}

function Meta({ article }: { article: BlogPreview }) {
  const when = article.publishedDate ?? "Coming soon";
  return (
    <p className={styles.meta}>
      {when} · {article.readTime}
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ArticleCard({ article, compact }: { article: BlogPreview; compact?: boolean }) {
  const body = (
    <>
      <Cover article={article} />
      <div className={styles.cardBody}>
        <Tags tags={article.tags} />
        <h3 className={styles.cardTitle}>{article.title}</h3>
        {!compact && article.description ? <p className={styles.cardExcerpt}>{article.description}</p> : null}
        <Meta article={article} />
        {article.status === "coming-soon" ? <span className={styles.soon}>Coming soon</span> : null}
      </div>
    </>
  );

  if (article.status === "published" && article.slug) {
    return (
      <Link to={`/insights/blog/${article.slug}`} className={styles.card}>
        {body}
      </Link>
    );
  }

  return (
    <article className={[styles.card, styles.cardSoon].join(" ")} aria-label={`${article.title} (coming soon)`}>
      {body}
    </article>
  );
}

function FeaturedRow({ article }: { article: BlogPreview }) {
  const inner = (
    <>
      <div className={styles.featuredMedia}>
        <Cover article={article} />
      </div>
      <div className={styles.featuredCopy}>
        <Tags tags={article.tags} />
        <h3 className={styles.featuredTitle}>{article.title}</h3>
        {article.description ? <p className={styles.cardExcerpt}>{article.description}</p> : null}
        <Meta article={article} />
        {article.status === "coming-soon" ? <span className={styles.soon}>Coming soon</span> : null}
      </div>
    </>
  );

  if (article.status === "published" && article.slug) {
    return (
      <Link to={`/insights/blog/${article.slug}`} className={styles.featured}>
        {inner}
      </Link>
    );
  }

  return <article className={[styles.featured, styles.cardSoon].join(" ")}>{inner}</article>;
}

/** Blog index block — filters, promo band, grid, featured, related. */
export function InsightsBlogSection() {
  const [active, setActive] = useState<string>("All");
  const { previews } = usePublicInsights();

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of previews) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [
      { label: "All", count: previews.length },
      ...INS_BLOG.categories
        .map((label) => ({ label, count: counts.get(label) ?? 0 }))
        .filter((c) => c.count > 0),
    ];
  }, [previews]);

  const filtered = useMemo(() => {
    if (active === "All") return previews;
    return previews.filter((p) => p.category === active);
  }, [active, previews]);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const grid = filtered.filter((p) => p !== featured).slice(0, 6);
  const related = filtered.filter((p) => p !== featured).slice(6, 10);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id={INS_BLOG.id} className={styles.stage}>
      <Section className={styles.tightSection}>
        <div className={`${styles.intro} reveal`}>
          <h2 className={styles.pageTitle}>{INS_BLOG.heading}</h2>
        </div>

        <div className={`${styles.filters} reveal`} role="toolbar" aria-label="Filter by topic">
          {categories.map((cat) => {
            const selected = active === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                className={[styles.filter, selected ? styles.filterActive : ""].filter(Boolean).join(" ")}
                aria-pressed={selected}
                onClick={() => setActive(cat.label)}
              >
                {cat.label} <span>[{cat.count}]</span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No topics in this category yet.</p>
        ) : (
          <>
            <div className={`${styles.grid} reveal`}>
              {grid.slice(0, 3).map((article) => (
                <ArticleCard key={article.slug ?? article.title} article={article} />
              ))}
            </div>

            {featured ? (
              <div className="reveal">
                <FeaturedRow article={featured} />
              </div>
            ) : null}

            {grid.length > 3 ? (
              <div className={`${styles.grid} reveal`}>
                {grid.slice(3).map((article) => (
                  <ArticleCard key={article.slug ?? article.title} article={article} />
                ))}
              </div>
            ) : null}

            {related.length > 0 ? (
              <section className={`${styles.related} reveal`} aria-labelledby="insights-related-heading">
                <p className={styles.relatedEyebrow}>You might like</p>
                <h3 id="insights-related-heading" className={styles.relatedTitle}>
                  {INS_BLOG.relatedHeading}
                </h3>
                <div className={styles.relatedGrid}>
                  {related.map((article) => (
                    <ArticleCard key={article.slug ?? article.title} article={article} compact />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}

        <button type="button" className={styles.toTop} onClick={scrollTop} aria-label="Back to top">
          <ArrowUp size={18} aria-hidden />
        </button>
      </Section>
    </div>
  );
}
