/**
 * Shared service-page journey sections (logos → cards → projects → process → highlights → reviews → FAQ+CTA).
 * Extracted from the Web Development template so every service page can reuse the same shell.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { PortfolioProjectCard } from "@/components/sections/work/PortfolioProjectCard";
import ctaStyles from "@/components/sections/FinalCtaSection.module.css";
import editorial from "@/components/sections/editorial/Editorial.module.css";
import { Button, Eyebrow, Section } from "@/components/ui";
import type { FaqSection, FinalCta } from "@/content/shared";
import { usePublicFaqSection } from "@/hooks/usePublicFaqs";
import type { PortfolioProject } from "@/content/portfolio";

import { SubServiceVisual, type SubServiceVisualKind } from "./SubServiceVisual";
import showcase from "./SubServiceShowcase.module.css";
import styles from "./ServiceJourney.module.css";

export type ServiceCardItem = {
  title: string;
  text: string;
  highlights?: string[];
  stacks: string[];
};

export type ServiceCardsData = {
  label: string;
  heading: string;
  supporting?: string;
  items: ServiceCardItem[];
};

export type ServiceProjectsMeta = {
  label: string;
  heading: string;
  supporting: string;
  viewAll: { label: string; to: string };
  emptyState?: string;
};

export type ProcessTone = "sky" | "violet" | "amber" | "teal" | "gold" | "rose";

export type ProcessStep = {
  num: string;
  title: string;
  text: string;
  milestone?: string;
  tone: ProcessTone;
};

export type ServiceProcessData = {
  label: string;
  headingBefore: string;
  headingAccent: string;
  supporting: string;
  focusLabel?: string;
  steps: ProcessStep[];
};

export type HighlightItem = {
  title: string;
  text: string;
  num?: string;
};

export type HighlightsData = {
  label: string;
  heading: string;
  supporting?: string;
  items: HighlightItem[];
};

const SHOWCASE_ACCENTS = [
  showcase.svcAccentSky,
  showcase.svcAccentViolet,
  showcase.svcAccentTeal,
  showcase.svcAccentAmber,
  showcase.svcAccentRose,
  showcase.svcAccentBlue,
  showcase.svcAccentMint,
  showcase.svcAccentFuchsia,
];

const PROCESS_TONE: Record<ProcessTone, string> = {
  sky: styles.toneSky,
  violet: styles.toneViolet,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  gold: styles.toneGold,
  rose: styles.toneRose,
};

function SectionHead({
  label,
  title,
  supporting,
}: {
  label: string;
  title: string;
  supporting?: string;
}) {
  return (
    <header className={styles.head}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className={styles.title}>{title}</h2>
      {supporting ? <p className={styles.lede}>{supporting}</p> : null}
    </header>
  );
}

function ShowcaseHead({
  label,
  title,
  supporting,
}: {
  label: string;
  title: string;
  supporting?: string;
}) {
  return (
    <header className={showcase.head}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className={showcase.title}>{title}</h2>
      {supporting ? <p className={showcase.lede}>{supporting}</p> : null}
    </header>
  );
}

/** Client logo marquee — place directly under the hero. */
export function ServiceClientsSection() {
  return <ClientLogos variant="marquee" />;
}

/** Split showcase rows: service-related visual + copy (no jump links). */
export function ServiceCardsSection({
  data,
  icons,
  visuals,
}: {
  data: ServiceCardsData;
  icons: LucideIcon[];
  visuals: SubServiceVisualKind[];
}) {
  return (
    <Section className={editorial.altBg}>
      <div className={`${showcase.wrap} reveal`}>
        <ShowcaseHead label={data.label} title={data.heading} supporting={data.supporting} />
        <div className={showcase.showcaseStack}>
          {data.items.map((item, i) => {
            const Icon = icons[i] ?? CheckCircle2;
            const accent = SHOWCASE_ACCENTS[i % SHOWCASE_ACCENTS.length];
            const flip = i % 2 === 1;
            const kind = visuals[i] ?? visuals[0] ?? "app";
            return (
              <article
                key={item.title}
                className={[showcase.showcaseFeatured, accent, flip ? showcase.showcaseFlip : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <SubServiceVisual kind={kind} Icon={Icon} />
                <div className={showcase.showcaseFeaturedCopy}>
                  <span className={showcase.showcaseIndex}>
                    {String(i + 1).padStart(2, "0")}
                    {i === 0 ? " · Featured" : ""}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.highlights?.length ? (
                    <ul className={showcase.showcaseHighlights}>
                      {item.highlights.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={14} strokeWidth={2} aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <ul className={showcase.showcaseTags}>
                    {item.stacks.map((stack) => (
                      <li key={stack}>{stack}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/** Selected projects carousel — or honest empty state when no public projects. */
export function ServiceProjectsSection({
  meta,
  projects,
}: {
  meta: ServiceProjectsMeta;
  projects: PortfolioProject[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize));

  const goTo = useCallback(
    (next: number) => {
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[page * pageSize] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [page]);

  return (
    <Section className={editorial.altBg}>
      <div className={`${styles.wrapWide} reveal`}>
        <div className={styles.projectsHead}>
          <SectionHead label={meta.label} title={meta.heading} supporting={meta.supporting} />
          <Link className={styles.viewAll} to={meta.viewAll.to}>
            {meta.viewAll.label}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyProjects}>
            <p>{meta.emptyState ?? "Selected projects will show here once they're ready to share publicly."}</p>
            <Button variant="outline" to={meta.viewAll.to}>
              {meta.viewAll.label}
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous projects"
                onClick={() => goTo(page - 1)}
              >
                <ChevronLeft size={20} aria-hidden />
              </button>
              <ul ref={trackRef} className={styles.track}>
                {projects.map((project) => (
                  <li key={project.id} className={styles.slide}>
                    <PortfolioProjectCard project={project} compact />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next projects"
                onClick={() => goTo(page + 1)}
              >
                <ChevronRight size={20} aria-hidden />
              </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Project pages">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={page === i}
                  className={`${styles.dot} ${page === i ? styles.dotActive : ""}`}
                  aria-label={`Show projects page ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

/** How we work — zigzag timeline (delivery) or horizontal rail (consulting-style). */
export function ServiceProcessSection({
  data,
  icons,
  variant = "zigzag",
  FocusIcon,
}: {
  data: ServiceProcessData;
  icons: LucideIcon[];
  variant?: "zigzag" | "rail";
  FocusIcon?: LucideIcon;
}) {
  return (
    <Section className={styles.processStage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{data.label}</Eyebrow>
          <h2 className={styles.title}>
            {data.headingBefore}{" "}
            <span className={styles.processAccent}>{data.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{data.supporting}</p>
          {data.focusLabel ? (
            <div className={styles.processFocus}>
              {FocusIcon ? <FocusIcon size={16} aria-hidden /> : null}
              <span>{data.focusLabel}</span>
            </div>
          ) : null}
        </header>

        {variant === "rail" ? (
          <ol className={styles.railList}>
            {data.steps.map((step, i) => {
              const Icon = icons[i] ?? CheckCircle2;
              return (
                <li
                  key={step.num}
                  className={[styles.railItem, PROCESS_TONE[step.tone]].join(" ")}
                >
                  <span className={styles.railIcon} aria-hidden>
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className={styles.timelineStep}>Step {step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {step.milestone ? (
                    <span className={styles.milestone}>
                      <CheckCircle2 size={13} aria-hidden />
                      {step.milestone}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        ) : (
          <div className={styles.timeline}>
            <div className={styles.timelineRail} aria-hidden>
              <span className={styles.timelineGlow} />
              <span className={styles.timelineTraveler} />
            </div>
            <ol className={styles.timelineList}>
              {data.steps.map((step, i) => {
                const Icon = icons[i] ?? CheckCircle2;
                const side = i % 2 === 0 ? styles.timelineRight : styles.timelineLeft;
                return (
                  <li
                    key={step.num}
                    className={[styles.timelineItem, side, PROCESS_TONE[step.tone]].join(" ")}
                    style={{ ["--step-i" as string]: i }}
                  >
                    <div className={styles.timelineMarker} aria-hidden>
                      <span className={styles.timelineIcon}>
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div className={styles.timelineCard}>
                      <span className={styles.timelineStep}>Step {step.num}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                      {step.milestone ? (
                        <span className={styles.milestone}>
                          {step.tone === "amber" || step.tone === "rose" ? (
                            <CheckCircle2 size={13} aria-hidden />
                          ) : (
                            <Link2 size={13} aria-hidden />
                          )}
                          {step.milestone}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </Section>
  );
}

/** Compact highlight / principle cards — reuse leftover page content with a fresher layout. */
export function ServiceHighlightsSection({ data }: { data: HighlightsData }) {
  return (
    <Section className={editorial.altBg}>
      <div className={`${styles.wrap} reveal`}>
        <SectionHead label={data.label} title={data.heading} supporting={data.supporting} />
        <div className={styles.highlightGrid}>
          {data.items.map((item, i) => (
            <article key={item.title} className={styles.highlightCard}>
              <span className={styles.highlightNum}>{item.num ?? String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** FAQ + final CTA in one row. */
export function ServiceFaqCtaSection({
  faq,
  faqSlug,
  finalCta,
  id = "start-project",
  showPrimaryArrow = true,
}: {
  faq: FaqSection;
  /** CMS category slug; falls back to static `faq` when API is unavailable. */
  faqSlug: string;
  finalCta: FinalCta;
  /** Optional section id (home uses `contact-cta`). */
  id?: string;
  showPrimaryArrow?: boolean;
}) {
  const resolved = usePublicFaqSection(faqSlug, faq);

  return (
    <Section id={id}>
      <div className={`${styles.faqCtaRow} reveal`}>
        <div className={styles.faqCol}>
          <Eyebrow>{resolved.label}</Eyebrow>
          <h2 className={styles.title}>{resolved.heading}</h2>
          <div className={styles.faqList}>
            {resolved.items.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqQ}>{item.q}</summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className={styles.ctaCol}>
          <div className={`${ctaStyles.panel} ${styles.ctaPanel}`}>
            <div className={ctaStyles.ambient} aria-hidden>
              <HeroAmbient layout="page" />
            </div>
            <div className={`${ctaStyles.content} ${styles.ctaContent}`}>
              <Eyebrow centered>{finalCta.label}</Eyebrow>
              <h2 className={ctaStyles.heading}>{finalCta.heading}</h2>
              <p className={ctaStyles.supporting}>{finalCta.supporting}</p>
              <div className={ctaStyles.ctas}>
                <Button variant="primary" to={finalCta.primaryCta.to}>
                  {finalCta.primaryCta.label}
                  {showPrimaryArrow ? <ArrowRight size={16} aria-hidden /> : null}
                </Button>
                {finalCta.secondaryCta ? (
                  <Button variant="outline" to={finalCta.secondaryCta.to}>
                    {finalCta.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
