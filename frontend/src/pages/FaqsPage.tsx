import { useState } from "react";

import f from "@/components/sections/faqs/Faqs.module.css";
import home from "@/components/sections/home/Home.module.css";
import { PageHero } from "@/components/sections/PageHero";
import s from "@/components/sections/solutions/Solutions.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
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
    <>
      <PageHero label={FAQ_HERO.label} title={FAQ_HERO.title} supporting={FAQ_HERO.supporting} />

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
        <Section key={category.id} id={category.id} className={i % 2 === 1 ? home.altBg : undefined}>
          <div className="reveal">
            <SectionHeader
              label={category.sectionLabel}
              title={
                <>
                  {category.heading}
                  <span className={f.count}>
                    {String(category.items.length).padStart(2, "0")}
                  </span>
                </>
              }
            />
          </div>
          <div className={`${s.faq} reveal`}>
            {category.items.map((item) => (
              <details key={item.q} className={s.faqItem}>
                <summary className={s.faqQuestion}>{item.q}</summary>
                <div className={s.faqAnswer}>{item.a}</div>
              </details>
            ))}
          </div>
        </Section>
      ))}

      {/* Final CTA */}
      <Section className={visible.length % 2 === 1 ? home.altBg : undefined}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.4em",
                color: "var(--neon)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              // {FAQ_FINAL.label}
            </div>
            <h2 className={home.finalHeading}>{FAQ_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{FAQ_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={FAQ_FINAL.primaryCta.to}>
                {FAQ_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={FAQ_FINAL.secondaryCta.to}>
                {FAQ_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
