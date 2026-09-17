import { Link, useParams } from "react-router-dom";

import { DomainShell } from "@/components/sections/domain/DomainShell";
import { Button, Section } from "@/components/ui";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublicInsight } from "@/hooks/usePublicInsights";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import styles from "./InsightArticlePage.module.css";

function renderBody(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => (
      <p key={index}>{block}</p>
    ));
}

export function InsightArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = usePublicInsight(slug);
  useScrollReveal();

  useDocumentMeta(
    data ? `${data.title} | VAELKODE Insights` : "Insight | VAELKODE",
    data?.description || "VAELKODE insights article.",
  );

  return (
    <DomainShell domain="insights">
      <Section className={styles.stage}>
        <div className={`${styles.wrap} reveal`}>
          <p className={styles.crumb}>
            <Link to="/insights">Insights</Link> / Article
          </p>

          {isLoading ? <p>Loading article…</p> : null}

          {isError || (!isLoading && !data) ? (
            <div className={styles.empty}>
              <h1>Article not found</h1>
              <p>This insight isn’t published yet, or the link is incorrect.</p>
              <Button variant="primary" to="/insights">
                Back to insights
              </Button>
            </div>
          ) : null}

          {data ? (
            <article>
              <p className={styles.meta}>
                {data.category} · {data.published_date ?? "Published"} · {data.read_time}
              </p>
              <h1 className={styles.title}>{data.title}</h1>
              {data.description ? <p className={styles.lede}>{data.description}</p> : null}
              {data.tags.length > 0 ? (
                <ul className={styles.tags}>
                  {data.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              <div className={styles.body}>{renderBody(data.body)}</div>
              <div className={styles.footer}>
                <Button variant="outline" to="/insights">
                  More insights
                </Button>
                <Button variant="primary" to="/consultation">
                  Book a consultation
                </Button>
              </div>
            </article>
          ) : null}
        </div>
      </Section>
    </DomainShell>
  );
}
