import type { ReactNode } from "react";

import styles from "./Domain.module.css";

export type PageDomain =
  | "cloud"
  | "mobile"
  | "ai"
  | "web"
  | "software"
  | "consulting"
  | "solutions"
  | "about"
  | "process"
  | "industries"
  | "work"
  | "insights"
  | "careers"
  | "contact"
  | "faqs";

const DOMAIN_CLASS: Record<PageDomain, string> = {
  cloud: styles.cloud,
  mobile: styles.mobile,
  ai: styles.ai,
  web: styles.web,
  software: styles.software,
  consulting: styles.consulting,
  solutions: styles.solutions,
  about: styles.about,
  process: styles.process,
  industries: styles.industries,
  work: styles.work,
  insights: styles.insights,
  careers: styles.careers,
  contact: styles.contact,
  faqs: styles.faqs,
};

/**
 * Wraps a marketing page in a domain-specific visual language:
 * accent color, atmosphere motif, and section surface treatment.
 * Does NOT reuse homepage orbit/constellation interactions.
 */
export function DomainShell({
  domain,
  children,
}: {
  domain: PageDomain;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.shell} ${DOMAIN_CLASS[domain]}`} data-domain={domain}>
      <div className={styles.atmosphere} aria-hidden>
        <span className={styles.motifA} />
        <span className={styles.motifB} />
        <span className={styles.motifC} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
