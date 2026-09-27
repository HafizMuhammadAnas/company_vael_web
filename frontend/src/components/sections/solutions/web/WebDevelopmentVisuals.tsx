/**
 * Web Development page — full visitor journey sections.
 * Hero stays in the page file; everything below lives here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Flag,
  Gauge,
  LayoutTemplate,
  Link2,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Pencil,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { PortfolioProjectCard } from "@/components/sections/work/PortfolioProjectCard";
import ctaStyles from "@/components/sections/FinalCtaSection.module.css";
import editorial from "@/components/sections/editorial/Editorial.module.css";
import { Button, Eyebrow, Section } from "@/components/ui";
import {
  WEB_FAQ,
  WEB_FINAL,
  WEB_PROCESS,
  WEB_PROJECTS,
  WEB_QUALITY,
} from "@/content/webDevelopment";
import { usePublicFaqSection } from "@/hooks/usePublicFaqs";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";

import styles from "./WebDevelopmentVisuals.module.css";

const QUALITY_ICONS = [Gauge, MonitorSmartphone, Search, Accessibility, Lock, ShieldCheck];

const PROCESS_ICONS = [MessageSquare, LayoutTemplate, Pencil, Code2, Flag, CheckCircle2];

const PROCESS_TONE: Record<(typeof WEB_PROCESS.steps)[number]["tone"], string> = {
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

/** 1. Client logo marquee — trust before services. */
export function WebClientsSection() {
  return <ClientLogos variant="marquee" />;
}

/** 4. Project carousel — same interaction language as homepage Proud Work. */
export function WebProjectsSection() {
  const { projects } = usePublishedProjects();
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
          <SectionHead
            label={WEB_PROJECTS.label}
            title={WEB_PROJECTS.heading}
            supporting={WEB_PROJECTS.supporting}
          />
          <Link className={styles.viewAll} to={WEB_PROJECTS.viewAll.to}>
            {WEB_PROJECTS.viewAll.label}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

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
      </div>
    </Section>
  );
}

/** Winding road path (viewBox 0 0 100 100) — serpentine from idea → launch. */
const PROCESS_ROAD_PATH =
  "M 50 2 C 86 8, 86 16, 50 22 C 14 28, 14 36, 50 42 C 86 48, 86 56, 50 62 C 14 68, 14 76, 50 82 C 86 88, 78 94, 50 98";

/** 5. How we work — winding road from idea to launch. */
export function WebProcessSection() {
  return (
    <Section className={styles.processStage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{WEB_PROCESS.label}</Eyebrow>
          <h2 className={styles.title}>
            {WEB_PROCESS.headingBefore}{" "}
            <span className={styles.processAccent}>{WEB_PROCESS.headingAccent}</span>
          </h2>
          <p className={styles.lede}>{WEB_PROCESS.supporting}</p>
          <div className={styles.processFocus}>
            <MonitorSmartphone size={16} aria-hidden />
            <span>Website development</span>
          </div>
        </header>

        <div className={styles.timeline}>
          <svg
            className={styles.roadSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="webRoadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sky-deep)" />
                <stop offset="45%" stopColor="var(--violet)" />
                <stop offset="100%" stopColor="var(--danger)" />
              </linearGradient>
              <filter id="webRoadSoft" x="-20%" y="-5%" width="140%" height="110%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            <path
              d={PROCESS_ROAD_PATH}
              className={styles.roadGlow}
              fill="none"
              filter="url(#webRoadSoft)"
            />
            <path d={PROCESS_ROAD_PATH} className={styles.roadEdge} fill="none" />
            <path d={PROCESS_ROAD_PATH} className={styles.roadAsphalt} fill="none" />
            <path d={PROCESS_ROAD_PATH} className={styles.roadDash} fill="none" />
            <path d={PROCESS_ROAD_PATH} className={styles.roadPulse} fill="none" />

            <g className={styles.roadTraveler}>
              <circle r="1.35" cx="0" cy="0" />
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path={PROCESS_ROAD_PATH}
                rotate="auto"
              />
            </g>
          </svg>

          <div className={styles.roadCapStart} aria-hidden>
            <span className={styles.roadCapDot} />
            <span className={styles.roadCapLabel}>Idea</span>
          </div>
          <div className={styles.roadCapEnd} aria-hidden>
            <span className={styles.roadCapDot} />
            <span className={styles.roadCapLabel}>Launch</span>
          </div>

          <ol className={styles.timelineList}>
            {WEB_PROCESS.steps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? CheckCircle2;
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
      </div>
    </Section>
  );
}

/** 6. Quality checks — interactive “how the team verifies” console. */
export function WebQualitySection() {
  const [active, setActive] = useState(0);
  const check = WEB_QUALITY.checks[active] ?? WEB_QUALITY.checks[0];
  const Icon = QUALITY_ICONS[active] ?? CheckCircle2;

  return (
    <Section className={editorial.altBg}>
      <div className={`${styles.wrap} reveal`}>
        <SectionHead
          label={WEB_QUALITY.label}
          title={WEB_QUALITY.heading}
          supporting={WEB_QUALITY.supporting}
        />

        <div className={styles.qaConsole}>
          <div className={styles.qaNav} role="tablist" aria-label="Quality checks">
            {WEB_QUALITY.checks.map((item, i) => {
              const ItemIcon = QUALITY_ICONS[i] ?? CheckCircle2;
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={[styles.qaNavBtn, selected ? styles.qaNavBtnActive : ""].filter(Boolean).join(" ")}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.qaNavIcon} aria-hidden>
                    <ItemIcon size={16} strokeWidth={1.7} />
                  </span>
                  <span className={styles.qaNavCopy}>
                    <strong>{item.title}</strong>
                    <em>Check {String(i + 1).padStart(2, "0")}</em>
                  </span>
                  {selected ? <CheckCircle2 size={15} className={styles.qaNavCheck} aria-hidden /> : null}
                </button>
              );
            })}
          </div>

          <div className={styles.qaPanel} role="tabpanel">
            <div className={styles.qaPanelHead}>
              <span className={styles.qaPanelIcon} aria-hidden>
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <div>
                <p className={styles.qaPanelEyebrow}>
                  Team method · {String(active + 1).padStart(2, "0")} /{" "}
                  {String(WEB_QUALITY.checks.length).padStart(2, "0")}
                </p>
                <h3>{check.title}</h3>
                <p className={styles.qaPanelSummary}>{check.summary}</p>
              </div>
            </div>

            <ol className={styles.qaSteps}>
              {check.steps.map((step, i) => (
                <li key={step}>
                  <span className={styles.qaStepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            <div className={styles.qaOutcome}>
              <span>Pass means</span>
              <strong>{check.outcome}</strong>
            </div>

            <div className={styles.qaPager}>
              <button
                type="button"
                className={styles.qaPagerBtn}
                disabled={active === 0}
                onClick={() => setActive((v) => Math.max(0, v - 1))}
              >
                <ChevronLeft size={16} aria-hidden />
                Previous check
              </button>
              <button
                type="button"
                className={styles.qaPagerBtn}
                disabled={active >= WEB_QUALITY.checks.length - 1}
                onClick={() => setActive((v) => Math.min(WEB_QUALITY.checks.length - 1, v + 1))}
              >
                Next check
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** FAQ + next-step CTA in one row. */
export function WebFaqCtaSection() {
  const faq = usePublicFaqSection("web-development", WEB_FAQ);

  return (
    <Section id="start-project">
      <div className={`${styles.faqCtaRow} reveal`}>
        <div className={styles.faqCol}>
          <Eyebrow>{faq.label}</Eyebrow>
          <h2 className={styles.title}>{faq.heading}</h2>
          <div className={styles.faqList}>
            {faq.items.map((item) => (
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
              <Eyebrow centered>{WEB_FINAL.label}</Eyebrow>
              <h2 className={ctaStyles.heading}>{WEB_FINAL.heading}</h2>
              <p className={ctaStyles.supporting}>{WEB_FINAL.supporting}</p>
              <div className={ctaStyles.ctas}>
                <Button variant="primary" to={WEB_FINAL.primaryCta.to}>
                  {WEB_FINAL.primaryCta.label}
                  <ArrowRight size={16} aria-hidden />
                </Button>
                {WEB_FINAL.secondaryCta ? (
                  <Button variant="outline" to={WEB_FINAL.secondaryCta.to}>
                    {WEB_FINAL.secondaryCta.label}
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
