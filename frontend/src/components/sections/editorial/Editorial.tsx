/**
 * Editorial section primitives for inner pages.
 *
 * Design intent (distinct from homepage interactives):
 * - All copy stays readable without hover/auto-cycle
 * - Layouts follow content domain (catalog, narrative, timeline)
 * - Motion is subtle: lift, underline, fade — never orbits/constellations
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Button, Section, SectionHeader } from "@/components/ui";

import styles from "./Editorial.module.css";

interface BandProps {
  label: string;
  title: string;
  supporting?: string;
  altBg?: boolean;
  children?: ReactNode;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}

function Band({ label, title, supporting, altBg, children, footerCta }: BandProps) {
  return (
    <Section className={altBg ? styles.altBg : undefined}>
      <div className={`reveal ${styles.bandHead}`}>
        <SectionHeader label={label} title={title} supporting={supporting} />
      </div>
      {children}
      {footerCta && (
        <div className={`${styles.footerCta} reveal`}>
          <Button variant={footerCta.variant ?? "primary"} to={footerCta.to}>
            {footerCta.label} →
          </Button>
        </div>
      )}
    </Section>
  );
}

/** Narrative intro — prose first, optional highlight quote. */
export function NarrativeBand({
  label,
  title,
  paragraphs,
  highlight,
  altBg,
}: {
  label: string;
  title: string;
  paragraphs: string[];
  highlight?: string;
  altBg?: boolean;
}) {
  return (
    <Band label={label} title={title} altBg={altBg}>
      <div className={`${styles.prose} reveal`}>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {highlight && <blockquote className={styles.quote}>{highlight}</blockquote>}
      </div>
    </Band>
  );
}

/** Always-visible feature tiles — for principles, mindset, why points. */
export function FeatureTiles({
  label,
  title,
  supporting,
  items,
  altBg,
  columns = 3,
}: BandProps & {
  items: { title: string; text: string; num?: string }[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg}>
      <div className={`${styles.tileGrid} ${styles[`cols${columns}`]} reveal`}>
        {items.map((item, i) => (
          <article key={item.title} className={styles.tile}>
            <span className={styles.tileNum}>{item.num ?? String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.tileTitle}>{item.title}</h3>
            <p className={styles.tileText}>{item.text}</p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/**
 * Service catalog — Solutions-domain layout.
 * Full description + tags always visible; row expands slightly on focus/hover.
 */
export function ServiceCatalog({
  label,
  title,
  supporting,
  items,
  altBg,
}: BandProps & {
  items: {
    title: string;
    description: string;
    capabilities?: string[];
    cta: string;
    to: string;
  }[];
}) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg}>
      <div className={`${styles.catalog} reveal`}>
        {items.map((item, i) => (
          <article key={item.title} className={styles.catalogRow}>
            <div className={styles.catalogIndex}>{String(i + 1).padStart(2, "0")}</div>
            <div className={styles.catalogBody}>
              <h3 className={styles.catalogTitle}>{item.title}</h3>
              <p className={styles.catalogText}>{item.description}</p>
              {item.capabilities && item.capabilities.length > 0 && (
                <ul className={styles.tagList}>
                  {item.capabilities.slice(0, 8).map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              )}
            </div>
            <Link to={item.to} className={styles.catalogCta}>
              {item.cta}
              <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>
    </Band>
  );
}

/** Challenge finder — question → clear next step (Solutions domain). */
export function ChallengeFinder({
  label,
  title,
  supporting,
  items,
  altBg,
}: BandProps & { items: { question: string; cta: string; to: string }[] }) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg}>
      <div className={`${styles.challengeList} reveal`}>
        {items.map((item) => (
          <Link key={item.question} to={item.to} className={styles.challengeRow}>
            <span className={styles.challengeQ}>{item.question}</span>
            <span className={styles.challengeA}>
              {item.cta} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </Band>
  );
}

/** Vertical process timeline — Process / delivery domain. All steps readable. */
export function ProcessTimeline({
  label,
  title,
  supporting,
  steps,
  altBg,
  footerCta,
}: BandProps & {
  steps: {
    num: string;
    title: string;
    text: string;
    activities?: string[];
    activitiesLabel?: string;
    output?: string;
  }[];
}) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg} footerCta={footerCta}>
      <ol className={`${styles.timeline} reveal`}>
        {steps.map((step) => (
          <li key={step.num} className={styles.timelineStep}>
            <div className={styles.timelineMarker}>
              <span className={styles.timelineNum}>{step.num}</span>
            </div>
            <div className={styles.timelineCard}>
              <h3 className={styles.timelineTitle}>{step.title}</h3>
              <p className={styles.timelineText}>{step.text}</p>
              {step.activities && step.activities.length > 0 && (
                <div className={styles.timelineMeta}>
                  {step.activitiesLabel && (
                    <span className={styles.metaLabel}>{step.activitiesLabel}</span>
                  )}
                  <ul className={styles.tagList}>
                    {step.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {step.output && (
                <p className={styles.output}>
                  <span className={styles.metaLabel}>Output</span>
                  {step.output}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/** Calm tech stacks — always visible categories. */
export function TechStacks({
  label,
  title,
  supporting,
  categories,
  altBg,
}: BandProps & { categories: { title: string; items: string[] }[] }) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg}>
      <div className={`${styles.stackGrid} reveal`}>
        {categories.map((cat) => (
          <div key={cat.title} className={styles.stackCard}>
            <h3 className={styles.stackTitle}>{cat.title}</h3>
            <ul className={styles.tagList}>
              {cat.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
}

/** Linked capability cards — About / solutions with learn-more. */
export function LinkCards({
  label,
  title,
  supporting,
  items,
  altBg,
  columns = 3,
  footerCta,
}: BandProps & {
  items: { title: string; text: string; to: string; cta?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg} footerCta={footerCta}>
      <div className={`${styles.tileGrid} ${styles[`cols${columns}`]} reveal`}>
        {items.map((item) => (
          <article key={item.title} className={styles.linkCard}>
            <h3 className={styles.tileTitle}>{item.title}</h3>
            <p className={styles.tileText}>{item.text}</p>
            <Link to={item.to} className={styles.textLink}>
              {item.cta ?? "Learn more"} →
            </Link>
          </article>
        ))}
      </div>
    </Band>
  );
}

/** Audience / who-we-help — readable pairs. */
export function AudienceCards({
  label,
  title,
  supporting,
  cards,
  altBg,
  footerCta,
}: BandProps & { cards: { title: string; text?: string; to?: string }[] }) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg} footerCta={footerCta}>
      <div className={`${styles.tileGrid} ${styles.cols2} reveal`}>
        {cards.map((card) =>
          card.to ? (
            <Link key={card.title} to={card.to} className={styles.linkCard}>
              <h3 className={styles.tileTitle}>{card.title}</h3>
              {card.text && <p className={styles.tileText}>{card.text}</p>}
            </Link>
          ) : (
            <article key={card.title} className={styles.tile}>
              <h3 className={styles.tileTitle}>{card.title}</h3>
              {card.text && <p className={styles.tileText}>{card.text}</p>}
            </article>
          ),
        )}
      </div>
    </Band>
  );
}

/** Industry chip strip. */
export function IndustryStrip({
  label,
  title,
  supporting,
  items,
  altBg,
  footerCta,
}: BandProps & { items: { title: string; to: string }[] }) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg} footerCta={footerCta}>
      <div className={`${styles.industryStrip} reveal`}>
        {items.map((item) => (
          <Link key={item.title} to={item.to} className={styles.industryChip}>
            {item.title}
          </Link>
        ))}
      </div>
    </Band>
  );
}

/** Work showcase — stacked readable project panels (not auto-cycling gallery). */
export function WorkShowcase({
  label,
  title,
  supporting,
  note,
  cards,
  altBg,
  footerCta,
}: BandProps & {
  note?: string;
  cards: {
    title: string;
    category: string;
    description: string;
    capabilities?: string[];
    technology?: string;
    to: string;
    cta: string;
  }[];
}) {
  return (
    <Band label={label} title={title} supporting={supporting} altBg={altBg} footerCta={footerCta}>
      {note && <p className={`${styles.note} reveal`}>{note}</p>}
      <div className={`${styles.workStack} reveal`}>
        {cards.map((card, i) => (
          <article key={card.title} className={styles.workCard}>
            <div className={styles.workMeta}>
              <span className={styles.workNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.workCat}>{card.category}</span>
            </div>
            <h3 className={styles.workTitle}>{card.title}</h3>
            <p className={styles.workText}>{card.description}</p>
            {card.capabilities && (
              <ul className={styles.tagList}>
                {card.capabilities.slice(0, 5).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}
            {card.technology && <p className={styles.workTech}>{card.technology}</p>}
            <Link to={card.to} className={styles.textLink}>
              {card.cta} →
            </Link>
          </article>
        ))}
      </div>
    </Band>
  );
}

/** FAQ — openable, but questions always scannable. */
export function FaqList({
  label,
  title,
  items,
  altBg,
  footerCta,
}: BandProps & { items: { q: string; a: string }[] }) {
  return (
    <Band label={label} title={title} altBg={altBg} footerCta={footerCta}>
      <div className={`${styles.faq} reveal`}>
        {items.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQ}>{item.q}</summary>
            <p className={styles.faqA}>{item.a}</p>
          </details>
        ))}
      </div>
    </Band>
  );
}

/** Twin vision/mission panels for About. */
export function TwinPanels({
  panels,
  altBg,
}: {
  panels: { label: string; title: string; paragraphs: string[] }[];
  altBg?: boolean;
}) {
  return (
    <Section className={altBg ? styles.altBg : undefined}>
      <div className={`${styles.twin} reveal`}>
        {panels.map((panel) => (
          <article key={panel.title} className={styles.twinPanel}>
            <span className={styles.metaLabel}>{panel.label}</span>
            <h3 className={styles.tileTitle}>{panel.title}</h3>
            {panel.paragraphs.map((p) => (
              <p key={p} className={styles.tileText}>
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>
    </Section>
  );
}
