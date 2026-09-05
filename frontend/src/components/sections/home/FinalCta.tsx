import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { FINAL_CTA } from "@/content/home";

/** Homepage closing CTA — shared animated panel + home copy. */
export function FinalCta() {
  return (
    <FinalCtaSection
      id="contact-cta"
      label={FINAL_CTA.label}
      heading={FINAL_CTA.heading}
      supporting={FINAL_CTA.supporting}
      primaryCta={FINAL_CTA.primaryCta}
      secondaryCta={FINAL_CTA.secondaryCta}
      showPrimaryArrow
    />
  );
}
