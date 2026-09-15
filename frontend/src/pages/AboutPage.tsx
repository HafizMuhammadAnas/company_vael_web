import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import {
  AboutApproachSection,
  AboutAudienceSection,
  AboutCapabilitiesSection,
  AboutHeroVisual,
  AboutSituationsSection,
  AboutVisionMissionSection,
  AboutWhoSection,
} from "@/components/sections/about/AboutSections";
import { ABOUT_FINAL, ABOUT_HERO, ABOUT_SEO } from "@/content/about";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * About journey (lean):
 * Hero → situations → who → deliver → audience → approach → purpose → CTA
 */
export function AboutPage() {
  useDocumentMeta(ABOUT_SEO.title, ABOUT_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="about">
      <PageHero
        domain="about"
        label={ABOUT_HERO.label}
        title={ABOUT_HERO.title}
        supporting={ABOUT_HERO.supporting}
        primaryCta={ABOUT_HERO.primaryCta}
        secondaryCta={ABOUT_HERO.secondaryCta}
        visual={<AboutHeroVisual />}
        visualLabel="How we work from problem to software"
      />

      <AboutSituationsSection />
      <AboutWhoSection />
      <AboutCapabilitiesSection />
      <AboutAudienceSection />
      <AboutApproachSection />
      <AboutVisionMissionSection />

      <FinalCtaSection
        label={ABOUT_FINAL.label}
        heading={ABOUT_FINAL.heading}
        supporting={ABOUT_FINAL.supporting}
        primaryCta={ABOUT_FINAL.primaryCta}
        secondaryCta={ABOUT_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
