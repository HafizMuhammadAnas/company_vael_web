import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";

import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { PortfolioHero } from "@/components/sections/work/PortfolioHero";
import { PortfolioProjectCard } from "@/components/sections/work/PortfolioProjectCard";
import { Button, Section } from "@/components/ui";
import {
  PORTFOLIO_FLOATING_CTA,
  PORTFOLIO_SEO,
} from "@/content/portfolio";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import styles from "@/components/sections/work/Portfolio.module.css";

function PortfolioFloatBar() {
  return (
    <div className={styles.floatBar} role="region" aria-label="Portfolio call to action">
      <p className={styles.floatPrompt}>
        {PORTFOLIO_FLOATING_CTA.prompt} <ArrowRight size={14} aria-hidden />
      </p>
      <div className={styles.floatActions}>
        <Button variant="primary" to={PORTFOLIO_FLOATING_CTA.primary.to}>
          {PORTFOLIO_FLOATING_CTA.primary.label}
        </Button>
        <Button variant="outline" to={PORTFOLIO_FLOATING_CTA.secondary.to}>
          {PORTFOLIO_FLOATING_CTA.secondary.label}
        </Button>
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const [portalReady, setPortalReady] = useState(false);
  const { projects } = usePublishedProjects();
  useDocumentMeta(PORTFOLIO_SEO.title, PORTFOLIO_SEO.description);
  useScrollReveal();

  // Portals need `document`; skip during SSG/SSR and mount after hydration.
  useEffect(() => {
    setPortalReady(true);
  }, []);

  return (
    <DomainShell domain="work">
      <PortfolioHero />

      <ClientLogos variant="marquee" />

      <Section className={styles.stage}>
        <ul className={`${styles.grid} reveal`}>
          {projects.map((project) => (
            <li key={project.id}>
              <PortfolioProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      {portalReady ? createPortal(<PortfolioFloatBar />, document.body) : null}
    </DomainShell>
  );
}
