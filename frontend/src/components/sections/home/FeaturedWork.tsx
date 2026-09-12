import { ArrowUpRight, BrainCircuit, Layers, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

import { Button, Section, SectionHeader } from "@/components/ui";
import { FEATURED_WORK } from "@/content/home";

import home from "./Home.module.css";

const ICONS = [BrainCircuit, Layers, Workflow];

/** Static work cards — all visible, no auto-cycle. */
export function FeaturedWork() {
  return (
    <Section id="work" className={home.altBg}>
      <div className="reveal">
        <SectionHeader
          label={FEATURED_WORK.label}
          title={FEATURED_WORK.heading}
          supporting={FEATURED_WORK.supporting}
        />
        <p className={home.supporting} style={{ marginTop: "-0.5rem" }}>
          {FEATURED_WORK.note}
        </p>
      </div>

      <ul className={`${home.grid} ${home.cols3} reveal`} style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {FEATURED_WORK.cards.map((card, i) => {
          const Icon = ICONS[i] ?? Layers;
          return (
            <li key={card.title} className={home.trustCard}>
              <span className={home.cardNum}>{card.category}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
                <Icon size={18} aria-hidden style={{ color: "var(--neon-bright)" }} />
                <h3 className={home.cardTitle} style={{ margin: 0 }}>
                  {card.title}
                </h3>
              </div>
              <p className={home.cardText}>{card.description}</p>
              <Link to={card.to} className={home.cardCta}>
                {card.cta}
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={`${home.sectionCtas} reveal`} style={{ marginTop: "1.75rem" }}>
        <Button variant="primary" to={FEATURED_WORK.primaryCta.to}>
          {FEATURED_WORK.primaryCta.label}
        </Button>
        <Button variant="outline" to={FEATURED_WORK.secondaryCta.to}>
          {FEATURED_WORK.secondaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
