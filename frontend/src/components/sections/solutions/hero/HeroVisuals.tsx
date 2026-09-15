/**
 * Right-column hero graphics for Services hub + individual service pages.
 * Each sits in the shared HeroConsole shell (homepage motion language).
 */

import { HeroConsole } from "@/components/sections/HeroConsole";

import styles from "./HeroVisuals.module.css";

/* ─── Services hub: staggered badge stack ─── */

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
    <HeroConsole
      title="vaelkode · services"
      lane={[
        { label: "Discover" },
        { label: "Design" },
        { label: "Build", active: true },
        { label: "Ship" },
      ]}
    >
      <div className={styles.badgeStack}>
        <div className={styles.badgeRail} aria-hidden>
          <i className={styles.badgeRailPulse} />
        </div>
        <ul className={styles.badgeList}>
          {HUB_BADGES.map((badge, index) => (
            <li
              key={badge.label}
              className={[styles.badge, styles[badge.tone], styles[`offset${index % 3}`]].join(" ")}
              style={{ ["--i" as string]: index }}
            >
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </HeroConsole>
  );
}

/* ─── Web: layered browser frames ─── */

export function WebHeroVisual() {
  return (
    <HeroConsole
      title="vaelkode · web"
      lane={[
        { label: "Sites" },
        { label: "Stores" },
        { label: "Portals", active: true },
        { label: "Launch" },
      ]}
    >
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
            <div className={styles.webHeroBand}>
              <i className={styles.webScan} />
            </div>
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
    </HeroConsole>
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
    <HeroConsole
      title="vaelkode · software"
      lane={[
        { label: "Map" },
        { label: "Design" },
        { label: "Build", active: true },
        { label: "Evolve" },
      ]}
    >
      <div className={styles.moduleBoard}>
        <svg className={styles.moduleLines} viewBox="0 0 100 100" aria-hidden>
          <path className={styles.modulePath} d="M22 22 L40 48 M70 18 L48 48 M40 52 L22 76 M48 52 L68 72" />
          <path className={styles.modulePathPulse} d="M22 22 L40 48 M70 18 L48 48 M40 52 L22 76 M48 52 L68 72" />
        </svg>
        {MODULES.map((mod, index) => (
          <div
            key={mod.label}
            className={styles.module}
            style={{
              left: `${mod.x}%`,
              top: `${mod.y}%`,
              ["--i" as string]: index,
            }}
          >
            {mod.label}
          </div>
        ))}
      </div>
    </HeroConsole>
  );
}

/* ─── AI: constellation / orbit nodes ─── */

const AI_NODES = [
  { label: "Docs", start: "0deg", duration: "22s" },
  { label: "Assist", start: "72deg", duration: "26s" },
  { label: "Agents", start: "144deg", duration: "30s" },
  { label: "RAG", start: "216deg", duration: "24s" },
  { label: "Vision", start: "288deg", duration: "20s" },
] as const;

export function AiHeroVisual() {
  return (
    <HeroConsole
      title="vaelkode · ai"
      lane={[
        { label: "Discover" },
        { label: "Pilot" },
        { label: "Ship", active: true },
        { label: "Tune" },
      ]}
    >
      <div className={styles.aiOrbit}>
        <div className={styles.aiCore}>
          <span>AI</span>
        </div>
        <div className={styles.aiRing} aria-hidden />
        <div className={styles.aiRingMid} aria-hidden />
        <div className={styles.aiRingOuter} aria-hidden />
        {AI_NODES.map((node) => (
          <div
            key={node.label}
            className={styles.aiPlanet}
            style={{
              ["--start" as string]: node.start,
              ["--dur" as string]: node.duration,
            }}
          >
            <span className={styles.aiNode}>{node.label}</span>
          </div>
        ))}
      </div>
    </HeroConsole>
  );
}

/* ─── Mobile: dual device frames ─── */

export function MobileHeroVisual() {
  return (
    <HeroConsole
      title="vaelkode · mobile"
      lane={[
        { label: "Idea" },
        { label: "UX" },
        { label: "Build", active: true },
        { label: "Store" },
      ]}
    >
      <div className={styles.phonePair}>
        <div className={`${styles.phone} ${styles.phoneLeft}`}>
          <div className={styles.phoneNotch} />
          <div className={styles.phoneScreen}>
            <div className={styles.phoneHeader} />
            <div className={styles.phoneCard} />
            <div className={styles.phoneCard} />
            <span className={styles.phoneTag}>iOS</span>
          </div>
          <i className={styles.phoneNotify} aria-hidden />
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
          <i className={styles.phoneNotify} aria-hidden />
        </div>
      </div>
    </HeroConsole>
  );
}

/* ─── Cloud: release pipeline ─── */

const PIPE_STEPS = ["Build", "Test", "Ship", "Watch"] as const;

export function CloudHeroVisual() {
  return (
    <HeroConsole
      title="vaelkode · cloud"
      lane={[
        { label: "Build" },
        { label: "Test" },
        { label: "Ship", active: true },
        { label: "Watch" },
      ]}
    >
      <div className={styles.pipeline}>
        {PIPE_STEPS.map((step, index) => (
          <div
            key={step}
            className={styles.pipeStep}
            style={{ ["--i" as string]: index }}
          >
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
    </HeroConsole>
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
    <HeroConsole
      title="vaelkode · consulting"
      lane={[
        { label: "Discover" },
        { label: "Decide" },
        { label: "Architect", active: true },
        { label: "Roadmap" },
      ]}
    >
      <div className={styles.roadmap}>
        <div className={styles.roadLine} aria-hidden>
          <i className={styles.roadPulse} />
        </div>
        {ROAD_STEPS.map((step, index) => (
          <div
            key={step.label}
            className={[styles.roadItem, index % 2 === 0 ? styles.roadLeft : styles.roadRight].join(" ")}
            style={{ ["--i" as string]: index }}
          >
            <span className={styles.roadNum}>{step.n}</span>
            <span className={styles.roadLabel}>{step.label}</span>
          </div>
        ))}
      </div>
    </HeroConsole>
  );
}
