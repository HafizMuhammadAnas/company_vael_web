/**
 * About page — visual-first sections, lean copy.
 */

import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  Cloud,
  Code2,
  Compass,
  LayoutDashboard,
  Rocket,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button, Eyebrow, Section, Accent } from "@/components/ui";
import { HeroConsole } from "@/components/sections/HeroConsole";
import {
  ABOUT_APPROACH,
  ABOUT_CAPABILITIES,
  ABOUT_MISSION,
  ABOUT_SITUATIONS,
  ABOUT_VISION,
  ABOUT_WHO,
  ABOUT_WHO_WE_HELP,
} from "@/content/about";

import styles from "./AboutSections.module.css";

const CAP_ICONS: LucideIcon[] = [Code2, LayoutDashboard, Smartphone, BrainCircuit, Cloud, Compass];
const AUDIENCE_ICONS: LucideIcon[] = [Rocket, Users, Building2, Code2];

/** Hero right-column visual — problem → build → software. */
export function AboutHeroVisual() {
  return (
    <HeroConsole
      title="vaelkode · about"
      lane={[
        { label: "Understand" },
        { label: "Design" },
        { label: "Build", active: true },
        { label: "Improve" },
      ]}
    >
      <div className={styles.heroBody} aria-hidden>
        <div className={styles.heroPole}>
          <span>Problem</span>
          <div className={styles.heroFace}>
            <i /><i /><i />
            <strong>?</strong>
          </div>
        </div>
        <div className={styles.heroBridge}>
          <b />
          <em>Build</em>
        </div>
        <div className={`${styles.heroPole} ${styles.heroOut}`}>
          <span>Software</span>
          <div className={styles.heroFace}>
            <span className={styles.heroBars}>
              <i style={{ height: "40%" }} />
              <i style={{ height: "70%" }} />
              <i style={{ height: "55%" }} />
              <i style={{ height: "88%" }} />
            </span>
            <strong>✓</strong>
          </div>
        </div>
      </div>
    </HeroConsole>
  );
}

/** Situations — visual signal chips. */
export function AboutSituationsSection() {
  return (
    <Section className={[styles.stage, styles.altBg].join(" ")}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{ABOUT_SITUATIONS.label}</Eyebrow>
          <h2 className={styles.title}>{ABOUT_SITUATIONS.heading}</h2>
        </header>
        <ul className={styles.signalBoard}>
          {ABOUT_SITUATIONS.items.map((item, i) => (
            <li key={item.title} className={styles.signal} title={item.text} style={{ ["--i" as string]: i }}>
              <span className={styles.signalNum}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.signalViz} aria-hidden>
                <span /><span /><span />
              </div>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Who — dial + short lede + company facts. */
export function AboutWhoSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.who} reveal`}>
        <div className={styles.whoCopy}>
          <Eyebrow>{ABOUT_WHO.label}</Eyebrow>
          <h2 className={styles.title}>
            {ABOUT_WHO.heading} <span className={styles.accent}>{ABOUT_WHO.accent}</span>
          </h2>
          <p className={styles.lede}>{ABOUT_WHO.lede}</p>
          <p className={styles.highlight}>{ABOUT_WHO.highlight}</p>

          <aside className={styles.dial} aria-hidden>
            <div className={styles.dialRing}>
              <span className={styles.dialNeedle} />
              <div className={styles.dialCore}>
                <em>01</em>
                <strong>Problem</strong>
              </div>
            </div>
          </aside>
        </div>

        <aside className={styles.factShell} aria-label="Company registration">
          <span className={styles.factBadge}>UK company</span>
          <h3 className={styles.factTitle}>Company identity</h3>
          <dl className={styles.factList}>
            {ABOUT_WHO.facts.map((fact) => (
              <div key={fact.label} className={styles.factRow}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}

/** Capabilities — outcome mosaic. */
export function AboutCapabilitiesSection() {
  return (
    <Section className={[styles.stage, styles.altBg].join(" ")}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{ABOUT_CAPABILITIES.label}</Eyebrow>
          <h2 className={styles.title}>
            {ABOUT_CAPABILITIES.heading}{" "}
            <Accent>{ABOUT_CAPABILITIES.accent}</Accent>
          </h2>
        </header>
        <ul className={styles.capMosaic}>
          {ABOUT_CAPABILITIES.cards.map((card, i) => {
            const Icon = CAP_ICONS[i] ?? Code2;
            return (
              <li key={card.title}>
                <Link to={card.to} className={styles.capTile} title={card.text} aria-label={card.title}>
                  <span className={styles.capTop}>
                    <span className={styles.capShort}>{card.short}</span>
                    <ArrowUpRight size={15} aria-hidden />
                  </span>
                  <span className={styles.capIcon} aria-hidden>
                    <Icon size={20} strokeWidth={1.55} />
                  </span>
                  <strong>{card.title}</strong>
                  <em>{card.outcome}</em>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/** Audience — icon chips. */
export function AboutAudienceSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.head}>
          <Eyebrow>{ABOUT_WHO_WE_HELP.label}</Eyebrow>
          <h2 className={styles.title}>{ABOUT_WHO_WE_HELP.heading}</h2>
        </header>
        <ul className={styles.audienceGrid}>
          {ABOUT_WHO_WE_HELP.cards.map((card, i) => {
            const Icon = AUDIENCE_ICONS[i] ?? Users;
            return (
              <li key={card.title} className={styles.audienceChip} title={card.text}>
                <span className={styles.audienceIcon} aria-hidden>
                  <Icon size={18} strokeWidth={1.55} />
                </span>
                <span className={styles.audienceNum}>{String(i + 1).padStart(2, "0")}</span>
                <strong>{card.title}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

/** Approach — journey rail. */
export function AboutApproachSection() {
  return (
    <Section className={[styles.stage, styles.altBg].join(" ")}>
      <div className={`${styles.wrap} reveal`}>
        <header className={styles.headRow}>
          <div>
            <Eyebrow>{ABOUT_APPROACH.label}</Eyebrow>
            <h2 className={styles.title}>
              {ABOUT_APPROACH.heading} <span className={styles.accent}>{ABOUT_APPROACH.accent}</span>
            </h2>
          </div>
          <Button variant="outline" to={ABOUT_APPROACH.cta.to}>
            {ABOUT_APPROACH.cta.label}
            <ArrowRight size={15} aria-hidden />
          </Button>
        </header>

        <div className={styles.railWrap}>
          <div className={styles.railLine} aria-hidden>
            <i />
          </div>
          <ol className={styles.rail}>
            {ABOUT_APPROACH.steps.map((step) => (
              <li key={step.num} className={styles.railStop}>
                <span className={styles.railNode}>{step.num}</span>
                <div className={styles.railCard}>
                  <strong>{step.title}</strong>
                  <em>{step.output}</em>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/** Vision / mission — compact twin. */
export function AboutVisionMissionSection() {
  return (
    <Section className={styles.stage}>
      <div className={`${styles.twin} reveal`}>
        <article className={styles.twinPanel}>
          <Eyebrow>{ABOUT_VISION.label}</Eyebrow>
          <h2 className={styles.twinTitle}>{ABOUT_VISION.heading}</h2>
        </article>
        <article className={`${styles.twinPanel} ${styles.twinMission}`}>
          <Eyebrow>{ABOUT_MISSION.label}</Eyebrow>
          <h2 className={styles.twinTitle}>{ABOUT_MISSION.heading}</h2>
        </article>
      </div>
    </Section>
  );
}
