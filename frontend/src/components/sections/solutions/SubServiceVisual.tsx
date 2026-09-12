/**
 * Shared sub-service showcase visuals — one mock UI per service kind.
 * Used by ServiceCardsSection across all solution pages.
 */

import {
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

import styles from "./SubServiceShowcase.module.css";

export type SubServiceVisualKind =
  /* Web */
  | "sitemap"
  | "funnel"
  | "shop"
  | "cms"
  | "migrate"
  | "arch"
  | "vitals"
  | "forms"
  /* Custom software */
  | "app"
  | "portal"
  | "admin"
  | "workflow"
  | "api"
  | "mvp"
  /* AI */
  | "automation"
  | "documents"
  | "chatbot"
  | "rag"
  | "agents"
  | "vision"
  | "aiRoadmap"
  | "aiEmbed"
  /* Mobile */
  | "phones"
  | "cross"
  | "pwa"
  | "appApi"
  | "store"
  | "maintain"
  /* Cloud */
  | "cloudSetup"
  | "cloudMigrate"
  | "cicd"
  | "monitor"
  | "secure"
  | "cost"
  | "envs"
  /* Consulting */
  | "workshop"
  | "techArch"
  | "buildBuy"
  | "consultRoadmap"
  | "audit"
  | "vendor"
  | "scoping";

const VIZ_SURFACE: Partial<Record<SubServiceVisualKind, string>> = {
  sitemap: styles.vizSitemapSurface,
  funnel: styles.vizFunnelSurface,
  shop: styles.vizShopSurface,
  cms: styles.vizCmsSurface,
  migrate: styles.vizMigrateSurface,
  arch: styles.vizArchSurface,
  vitals: styles.vizVitalsSurface,
  forms: styles.vizFormsSurface,
  app: styles.vizAppSurface,
  portal: styles.vizArchSurface,
  admin: styles.vizCmsSurface,
  workflow: styles.vizFunnelSurface,
  api: styles.vizAppSurface,
  mvp: styles.vizMigrateSurface,
  automation: styles.vizFunnelSurface,
  documents: styles.vizCmsSurface,
  chatbot: styles.vizFormsSurface,
  rag: styles.vizSitemapSurface,
  agents: styles.vizArchSurface,
  vision: styles.vizShopSurface,
  aiRoadmap: styles.vizMigrateSurface,
  aiEmbed: styles.vizAppSurface,
  phones: styles.vizArchSurface,
  cross: styles.vizFunnelSurface,
  pwa: styles.vizSitemapSurface,
  appApi: styles.vizAppSurface,
  store: styles.vizShopSurface,
  maintain: styles.vizVitalsSurface,
  cloudSetup: styles.vizArchSurface,
  cloudMigrate: styles.vizMigrateSurface,
  cicd: styles.vizFunnelSurface,
  monitor: styles.vizVitalsSurface,
  secure: styles.vizFormsSurface,
  cost: styles.vizShopSurface,
  envs: styles.vizCmsSurface,
  workshop: styles.vizMigrateSurface,
  techArch: styles.vizArchSurface,
  buildBuy: styles.vizFunnelSurface,
  consultRoadmap: styles.vizSitemapSurface,
  audit: styles.vizVitalsSurface,
  vendor: styles.vizCmsSurface,
  scoping: styles.vizAppSurface,
};

export function SubServiceVisual({
  kind,
  Icon,
}: {
  kind: SubServiceVisualKind;
  Icon: LucideIcon;
}) {
  const surface = VIZ_SURFACE[kind] ?? styles.vizSitemapSurface;

  return (
    <div className={[styles.viz, surface].join(" ")} aria-hidden>
      <span className={styles.coverGlow} />
      {renderVisual(kind)}
      <span className={styles.coverIcon}>
        <Icon size={22} strokeWidth={1.55} />
      </span>
    </div>
  );
}

function renderVisual(kind: SubServiceVisualKind) {
  switch (kind) {
    case "sitemap":
      return (
        <div className={styles.vizBrowser}>
          <div className={styles.vizBrowserBar}>
            <i /><i /><i /><em>yoursite.com</em>
          </div>
          <div className={styles.vizBrowserNav}>
            <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
          </div>
          <div className={styles.vizBrowserHero}>
            <b /><b /><em>Get in touch</em>
          </div>
          <div className={styles.vizBrowserCards}><span /><span /><span /></div>
        </div>
      );

    case "funnel":
      return (
        <div className={styles.vizLanding}>
          <span className={styles.vizLandingBadge}>Campaign</span>
          <strong>Launch offer</strong>
          <p>One message. One clear next step.</p>
          <em className={styles.vizLandingCta}>Request a demo</em>
          <div className={styles.vizLandingFunnel}>
            <span style={{ width: "100%" }} />
            <span style={{ width: "72%" }} />
            <span style={{ width: "44%" }} />
          </div>
        </div>
      );

    case "shop":
      return (
        <div className={styles.vizShop}>
          {[48, 62, 35, 79].map((price) => (
            <div key={price} className={styles.vizProduct}>
              <i /><em>${price}</em>
            </div>
          ))}
          <div className={styles.vizCart}>
            <ShoppingCart size={14} />
            <em>Cart · 2 items</em>
          </div>
        </div>
      );

    case "cms":
      return (
        <div className={styles.vizCms}>
          <div className={styles.vizCmsSidebar}>
            <em>Pages</em><em>Posts</em><em>Media</em>
          </div>
          <div className={styles.vizCmsMain}>
            <span className={styles.vizCmsTitle}>Edit page</span>
            <b /><b /><b />
            <span className={styles.vizCmsPublish}>Publish</span>
          </div>
        </div>
      );

    case "migrate":
    case "cloudMigrate":
      return (
        <div className={styles.vizMigrate}>
          <div className={styles.vizMigratePane}>
            <label>Before</label>
            <div className={styles.vizMigrateOld}><i /><i /><i /></div>
          </div>
          <em aria-hidden>→</em>
          <div className={styles.vizMigratePane}>
            <label>After</label>
            <div className={styles.vizMigrateNew}><i /><i /><i /></div>
          </div>
        </div>
      );

    case "arch":
    case "portal":
      return (
        <div className={styles.vizPortal}>
          <aside>
            <em>Portal</em><i /><i /><i />
          </aside>
          <main>
            <header><b /><span>Signed in</span></header>
            <div className={styles.vizPortalCharts}>
              <span style={{ height: "55%" }} />
              <span style={{ height: "78%" }} />
              <span style={{ height: "42%" }} />
              <span style={{ height: "90%" }} />
            </div>
            <div className={styles.vizPortalRows}><i /><i /></div>
          </main>
        </div>
      );

    case "vitals":
      return (
        <div className={styles.vizVitals}>
          {[
            ["LCP", "78%"],
            ["INP", "62%"],
            ["CLS", "88%"],
          ].map(([label, width]) => (
            <div key={label} className={styles.vizVitalRow}>
              <label>{label}</label>
              <i style={{ width }} />
              <em>Good</em>
            </div>
          ))}
          <ul className={styles.vizSeoList}>
            <li>Meta & titles</li>
            <li>Heading structure</li>
            <li>Mobile-ready</li>
          </ul>
        </div>
      );

    case "forms":
      return (
        <div className={styles.vizForms}>
          <div className={styles.vizFormsCal}>
            <span>Mon</span><span>Tue</span>
            <span className={styles.vizFormsDayOn}>Wed</span>
            <span>Thu</span><span>Fri</span>
          </div>
          <label>Name</label><span />
          <label>Email</label><span />
          <span className={styles.vizFormsBtn}>Confirm booking</span>
        </div>
      );

    case "app":
      return (
        <div className={styles.vizApp}>
          <div className={styles.vizAppBar}><i /><i /><i /><em>App</em></div>
          <div className={styles.vizAppBody}>
            <aside><i /><i /><i /></aside>
            <section>
              <b /><b />
              <div className={styles.vizAppGrid}><span /><span /><span /><span /></div>
            </section>
          </div>
        </div>
      );

    case "admin":
      return (
        <div className={styles.vizAdmin}>
          <header><em>Admin</em><span>Team</span></header>
          <div className={styles.vizAdminTable}>
            <i /><i /><i /><i />
          </div>
        </div>
      );

    case "workflow":
    case "automation":
    case "cicd":
      return (
        <div className={styles.vizFlow}>
          {(kind === "cicd"
            ? ["Build", "Test", "Deploy"]
            : kind === "automation"
              ? ["Trigger", "Rule", "Action"]
              : ["Request", "Review", "Done"]
          ).map((step, i, arr) => (
            <div key={step} className={styles.vizFlowStep}>
              <span>{step}</span>
              {i < arr.length - 1 ? <em>→</em> : null}
            </div>
          ))}
        </div>
      );

    case "api":
    case "appApi":
      return (
        <div className={styles.vizApi}>
          <span>CRM</span>
          <em>⟷</em>
          <span className={styles.vizApiHub}>API</span>
          <em>⟷</em>
          <span>App</span>
        </div>
      );

    case "mvp":
    case "aiRoadmap":
    case "consultRoadmap":
      return (
        <div className={styles.vizRoadmap}>
          {["Now", "Next", "Later"].map((phase) => (
            <div key={phase} className={styles.vizRoadmapCol}>
              <label>{phase}</label>
              <i /><i />
            </div>
          ))}
        </div>
      );

    case "documents":
      return (
        <div className={styles.vizDocs}>
          <div className={styles.vizDocFile}><em>PDF</em><i /><i /><i /></div>
          <em>→</em>
          <div className={styles.vizDocOut}>
            <label>Extracted</label>
            <span>Invoice #1042</span>
            <span>Total · line items</span>
          </div>
        </div>
      );

    case "chatbot":
      return (
        <div className={styles.vizChat}>
          <div className={styles.vizChatBot}>How can I help?</div>
          <div className={styles.vizChatUser}>Reset my password</div>
          <div className={styles.vizChatBot}>Here’s a secure link…</div>
        </div>
      );

    case "rag":
      return (
        <div className={styles.vizRag}>
          <div className={styles.vizRagSearch}>Ask your policies…</div>
          <ul>
            <li>Employee handbook §3</li>
            <li>Security policy</li>
            <li>Onboarding guide</li>
          </ul>
        </div>
      );

    case "agents":
      return (
        <div className={styles.vizAgents}>
          <span>Plan</span>
          <em>↓</em>
          <span>Call tools</span>
          <em>↓</em>
          <span>Human check</span>
          <em>↓</em>
          <span className={styles.vizAgentsDone}>Complete</span>
        </div>
      );

    case "vision":
      return (
        <div className={styles.vizVision}>
          <div className={styles.vizVisionFrame}>
            <i /><i /><span>Detect</span>
          </div>
          <ul>
            <li>Object A</li>
            <li>Object B</li>
          </ul>
        </div>
      );

    case "aiEmbed":
      return (
        <div className={styles.vizEmbed}>
          <div className={styles.vizEmbedApp}>
            <b /><b />
            <span className={styles.vizEmbedBadge}>AI</span>
          </div>
          <p>Feature inside your product</p>
        </div>
      );

    case "phones":
    case "cross":
      return (
        <div className={styles.vizPhones}>
          <div className={styles.vizPhone}><i /><i /><i /></div>
          {kind === "cross" ? <div className={styles.vizPhone}><i /><i /><i /></div> : null}
        </div>
      );

    case "pwa":
      return (
        <div className={styles.vizBrowser}>
          <div className={styles.vizBrowserBar}>
            <i /><i /><i /><em>app.yoursite.com</em>
          </div>
          <div className={styles.vizPwaBody}>
            <strong>Install app?</strong>
            <em className={styles.vizLandingCta}>Add to home</em>
          </div>
        </div>
      );

    case "store":
      return (
        <div className={styles.vizStore}>
          <div className={styles.vizStoreIcon} />
          <div>
            <strong>Your App</strong>
            <p>App Store · Google Play</p>
            <em>Get</em>
          </div>
        </div>
      );

    case "maintain":
      return (
        <div className={styles.vizMaintain}>
          <span>v2.3.1</span>
          <em>→</em>
          <span className={styles.vizMaintainNew}>v2.4.0</span>
          <ul>
            <li>OS updates</li>
            <li>Bug fixes</li>
            <li>Monitoring</li>
          </ul>
        </div>
      );

    case "cloudSetup":
      return (
        <div className={styles.vizCloud}>
          <span>Region</span>
          <div className={styles.vizCloudNodes}>
            <i>App</i><i>DB</i><i>CDN</i>
          </div>
        </div>
      );

    case "monitor":
      return (
        <div className={styles.vizMonitor}>
          <div className={styles.vizMonitorChart}>
            <span style={{ height: "40%" }} />
            <span style={{ height: "65%" }} />
            <span style={{ height: "50%" }} />
            <span style={{ height: "80%" }} />
            <span style={{ height: "55%" }} />
          </div>
          <em className={styles.vizAlert}>Alert · latency</em>
        </div>
      );

    case "secure":
      return (
        <div className={styles.vizSecure}>
          <span>Secrets</span>
          <span>Access roles</span>
          <span>Hardened defaults</span>
        </div>
      );

    case "cost":
      return (
        <div className={styles.vizCost}>
          <div className={styles.vizVitalRow}>
            <label>Compute</label><i style={{ width: "70%" }} /><em>-18%</em>
          </div>
          <div className={styles.vizVitalRow}>
            <label>Storage</label><i style={{ width: "45%" }} /><em>-12%</em>
          </div>
          <div className={styles.vizVitalRow}>
            <label>Idle</label><i style={{ width: "30%" }} /><em>Cut</em>
          </div>
        </div>
      );

    case "envs":
      return (
        <div className={styles.vizEnvs}>
          <span>Dev</span>
          <span>Staging</span>
          <span className={styles.vizEnvsProd}>Prod</span>
        </div>
      );

    case "workshop":
      return (
        <div className={styles.vizWorkshop}>
          <span>Users</span>
          <span>Goals</span>
          <span>Constraints</span>
          <span>Success</span>
        </div>
      );

    case "techArch":
      return (
        <div className={styles.vizArchLayers}>
          <span>Experience</span>
          <span>Services</span>
          <span>Data</span>
          <span>Infrastructure</span>
        </div>
      );

    case "buildBuy":
      return (
        <div className={styles.vizBuildBuy}>
          <div><label>Buy</label><i /><i /></div>
          <em>vs</em>
          <div><label>Build</label><i /><i /></div>
        </div>
      );

    case "audit":
      return (
        <div className={styles.vizAudit}>
          <ul className={styles.vizSeoList}>
            <li>Architecture</li>
            <li>Security risks</li>
            <li>Tech debt</li>
            <li>Recommendations</li>
          </ul>
        </div>
      );

    case "vendor":
      return (
        <div className={styles.vizVendor}>
          <div className={styles.vizVendorHead}><span /><span /><span /></div>
          <div className={styles.vizVendorRow}><i /><i /><i /></div>
          <div className={styles.vizVendorRow}><i /><i /><i /></div>
          <div className={styles.vizVendorRow}><i /><i /><i /></div>
        </div>
      );

    case "scoping":
      return (
        <div className={styles.vizScope}>
          <span>Phase 1</span>
          <span>Phase 2</span>
          <span>Decision</span>
        </div>
      );

    default:
      return null;
  }
}
