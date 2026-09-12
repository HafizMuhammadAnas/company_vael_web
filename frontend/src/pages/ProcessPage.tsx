import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { DomainShell, JourneyRail, PrincipleDeck } from "@/components/sections/elevated/Elevate";
import {
  PROCESS_ENGAGEMENT,
  PROCESS_FINAL,
  PROCESS_HERO,
  PROCESS_SEO,
  PROCESS_STEPS,
} from "@/content/process";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ProcessPage() {
  useDocumentMeta(PROCESS_SEO.title, PROCESS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="process">
      <PageHero
        domain="process"
        label={PROCESS_HERO.label}
        title={PROCESS_HERO.title}
        supporting={PROCESS_HERO.supporting}
        primaryCta={PROCESS_HERO.primaryCta}
      />

      <JourneyRail
        label="Delivery Stages"
        title="Every Stage Visible. Every Decision Clear."
        supporting="Follow each stage from discovery through launch and ongoing improvement. Every step stays readable."
        layout="vertical"
        steps={PROCESS_STEPS.map((step) => ({
          num: step.num,
          title: step.title,
          text: [
            step.text,
            step.activities.length > 0 ? `Focus: ${step.activities.slice(0, 4).join(", ")}.` : "",
            step.output ? `Output: ${step.output}` : "",
          ]
            .filter(Boolean)
            .join(" "),
        }))}
      />

      <PrincipleDeck
        label={PROCESS_ENGAGEMENT.label}
        title={PROCESS_ENGAGEMENT.heading}
        items={PROCESS_ENGAGEMENT.models}
        eyebrowPrefix="Model"
        altBg
      />

      <FinalCtaSection
        label={PROCESS_FINAL.label}
        heading={PROCESS_FINAL.heading}
        supporting={PROCESS_FINAL.supporting}
        primaryCta={PROCESS_FINAL.primaryCta}
        secondaryCta={PROCESS_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
