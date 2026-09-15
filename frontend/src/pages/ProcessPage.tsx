import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { PrincipleDeck } from "@/components/sections/elevated/Elevate";
import { DeliveryStages } from "@/components/sections/process/DeliveryStages";
import {
  PROCESS_ENGAGEMENT,
  PROCESS_FINAL,
  PROCESS_HERO,
  PROCESS_SEO,
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

      <DeliveryStages />

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
