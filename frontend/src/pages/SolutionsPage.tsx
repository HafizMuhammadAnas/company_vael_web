import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/elevated/Elevate";
import { ServicesBadgeStack } from "@/components/sections/solutions/hero";
import { ServiceFaqCtaSection } from "@/components/sections/solutions/ServiceJourney";
import { ServiceShowcaseCards } from "@/components/sections/solutions/ServiceShowcaseCards";
import { SolutionsFourMoves } from "@/components/sections/solutions/SolutionsFourMoves";
import { SolutionsHowWeHelp } from "@/components/sections/solutions/SolutionsHowWeHelp";
import { SolutionsSelectedWork } from "@/components/sections/solutions/SolutionsSelectedWork";
import {
  SOL_FAQ,
  SOL_FINAL,
  SOL_HERO,
  SOLUTIONS_SEO,
} from "@/content/solutions";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SolutionsPage() {
  useDocumentMeta(SOLUTIONS_SEO.title, SOLUTIONS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="software">
      <PageHero
        domain="software"
        label={SOL_HERO.label}
        title={SOL_HERO.title}
        supporting={SOL_HERO.supporting}
        primaryCta={SOL_HERO.primaryCta}
        secondaryCta={SOL_HERO.secondaryCta}
        visual={<ServicesBadgeStack />}
        visualLabel="Our six service lines"
      />

      <SolutionsHowWeHelp />
      <SolutionsFourMoves />

      <ServiceShowcaseCards />

      <SolutionsSelectedWork />

      <ServiceFaqCtaSection faq={SOL_FAQ} finalCta={SOL_FINAL} />
    </DomainShell>
  );
}
