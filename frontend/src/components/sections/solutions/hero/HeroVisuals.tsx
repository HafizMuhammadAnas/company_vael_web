/**
 * Right-column hero graphics for Services hub + individual service pages.
 * Each visual is intentionally distinct and themed to that service line.
 */

import styles from "./HeroVisuals.module.css";

/* ─── Services hub: staggered badge stack (market-style stack) ─── */

const HUB_BADGES = [
  { label: "Web Dev", tone: "t0" },
  { label: "Software", tone: "t1" },
  { label: "AI & Auto", tone: "t2" },
  { label: "Mobile", tone: "t3" },
  { label: "Cloud", tone: "t4" },
  { label: "Consult", tone: "t5" },
] as const;

export function ServicesBadgeStack() {
  return (
    <div className={styles.badgeStack}>
      <div className={styles.badgeRail} aria-hidden />
      <ul className={styles.badgeList}>
        {HUB_BADGES.map((badge, index) => (
          <li
            key={badge.label}
            className={[styles.badge, styles[badge.tone], styles[`offset${index % 3}`]].join(" ")}
            style={{ animationDelay: `${0.2 + index * 0.08}s` }}
          >
            {badge.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Web: layered browser frames ─── */

export function WebHeroVisual() {
  return (
    <div className={styles.webScene}>
      <div className={`${styles.browser} ${styles.browserBack}`} aria-hidden>
        <div className={styles.browserBar}>
          <span /><span /><span />
        </div>
        <div className={styles.browserBody}>
          <div className={styles.webBlock} />
          <div className={styles.webRows}>
            <i /><i /><i />
          </div>
        </div>
      </div>
      <div className={`${styles.browser} ${styles.browserFront}`}>
        <div className={styles.browserBar}>
          <span /><span /><span />
          <em className={styles.url}>vaelkode.com</em>
        </div>
        <div className={styles.browserBody}>
          <div className={styles.webHeroBand} />
          <div className={styles.webGrid}>
            <i /><i /><i />
          </div>
          <ul className={styles.chipRow}>
            <li>Sites</li>
            <li>Stores</li>
            <li>Portals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Custom software: connected module board ─── */

const MODULES = [
  { label: "Apps", x: 8, y: 12 },
  { label: "Portals", x: 58, y: 8 },
  { label: "APIs", x: 32, y: 42 },
  { label: "Workflows", x: 6, y: 68 },
  { label: "Integrations", x: 55, y: 62 },
] as const;

export function SoftwareHeroVisual() {
  return (
    <div className={styles.moduleBoard}>
      <svg className={styles.moduleLines} viewBox="0 0 100 100" aria-hidden>
        <path d="M22 22 L40 48 M70 18 L48 48 M40 52 L22 76 M48 52 L68 72" />
      </svg>
      {MODULES.map((mod, index) => (
        <div
          key={mod.label}
          className={styles.module}
          style={{
            left: `${mod.x}%`,
            top: `${mod.y}%`,
            animationDelay: `${0.22 + index * 0.07}s`,
          }}
        >
          {mod.label}
        </div>
      ))}
    </div>
  );
}

/* ─── AI: constellation / orbit nodes ─── */

const AI_NODES = [
  { label: "Docs", x: "50%", y: "8%" },
  { label: "Assist", x: "88%", y: "35%" },
  { label: "Agents", x: "78%", y: "78%" },
  { label: "RAG", x: "22%", y: "78%" },
  { label: "Vision", x: "12%", y: "35%" },
] as const;

export function AiHeroVisual() {
  return (
    <div className={styles.aiOrbit}>
      <div className={styles.aiCore}>
        <span>AI</span>
      </div>
      <div className={styles.aiRing} aria-hidden />
      <div className={styles.aiRingOuter} aria-hidden />
      {AI_NODES.map((node, index) => (
        <div
          key={node.label}
          className={styles.aiNode}
          style={{
            ["--x" as string]: node.x,
            ["--y" as string]: node.y,
            animationDelay: `${0.2 + index * 0.06}s`,
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

/* ─── Mobile: dual device frames ─── */

export function MobileHeroVisual() {
  return (
    <div className={styles.phonePair}>
      <div className={`${styles.phone} ${styles.phoneLeft}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader} />
          <div className={styles.phoneCard} />
          <div className={styles.phoneCard} />
          <span className={styles.phoneTag}>iOS</span>
        </div>
      </div>
      <div className={`${styles.phone} ${styles.phoneRight}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader} />
          <div className={styles.phoneList}>
            <i /><i /><i />
          </div>
          <span className={styles.phoneTag}>Android</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Cloud: release pipeline ─── */

const PIPE_STEPS = ["Build", "Test", "Ship", "Watch"] as const;

export function CloudHeroVisual() {
  return (
    <div className={styles.pipeline}>
      {PIPE_STEPS.map((step, index) => (
        <div key={step} className={styles.pipeStep} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
          <div className={styles.pipeNode}>
            <span>{index + 1}</span>
          </div>
          <p>{step}</p>
          {index < PIPE_STEPS.length - 1 && <div className={styles.pipeLink} aria-hidden />}
        </div>
      ))}
      <ul className={styles.pipeMeta}>
        <li>CI/CD</li>
        <li>Cloud</li>
        <li>Monitor</li>
      </ul>
    </div>
  );
}

/* ─── Consulting: decision roadmap ─── */

const ROAD_STEPS = [
  { n: "01", label: "Discover" },
  { n: "02", label: "Decide" },
  { n: "03", label: "Architect" },
  { n: "04", label: "Roadmap" },
] as const;

export function ConsultingHeroVisual() {
  return (
    <div className={styles.roadmap}>
      <div className={styles.roadLine} aria-hidden />
      {ROAD_STEPS.map((step, index) => (
        <div
          key={step.label}
          className={[styles.roadItem, index % 2 === 0 ? styles.roadLeft : styles.roadRight].join(" ")}
          style={{ animationDelay: `${0.2 + index * 0.09}s` }}
        >
          <span className={styles.roadNum}>{step.n}</span>
          <span className={styles.roadLabel}>{step.label}</span>
        </div>
      ))}
    </div>
  );
}
