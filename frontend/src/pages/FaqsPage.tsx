import { useState } from "react";

import f from "@/components/sections/faqs/Faqs.module.css";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
FaqConsole,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import { Section } from "@/components/ui";
import { FAQ_CATEGORIES, FAQ_FINAL, FAQ_HERO, FAQ_SEO } from "@/content/faqs";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ALL = "all";

export function FaqsPage() {
  useDocumentMeta(FAQ_SEO.title, FAQ_SEO.description);
  const [active, setActive] = useState<string>(ALL);
  // Re-run reveal when the visible categories change.
  useScrollReveal([active]);

  const filters = [{ id: ALL, label: "All" }, ...FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))];
  const visible = active === ALL ? FAQ_CATEGORIES : FAQ_CATEGORIES.filter((c) => c.id === active);

  return (
    <DomainShell domain="faqs">
      <>
      <PageHero domain="faqs" label={FAQ_HERO.label} title={FAQ_HERO.title} supporting={FAQ_HERO.supporting} />

      {/* Category filter */}
      <Section>
        <div className={`${f.filters} reveal`} role="tablist" aria-label="FAQ categories">
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${f.filterBtn} ${isActive ? f.filterBtnActive : ""}`}
                onClick={() => setActive(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </Section>

      {/* FAQ sections */}
      {visible.map((category, i) => (
        <div key={category.id} id={category.id}>
          <FaqConsole
            label={`${category.sectionLabel} · ${String(category.items.length).padStart(2, "0")}`}
            title={category.heading}
            items={category.items}
            altBg={i % 2 === 1}
          />
        </div>
      ))}

      <FinalCtaSection
        label={FAQ_FINAL.label}
        heading={FAQ_FINAL.heading}
        supporting={FAQ_FINAL.supporting}
        primaryCta={FAQ_FINAL.primaryCta}
        secondaryCta={FAQ_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
