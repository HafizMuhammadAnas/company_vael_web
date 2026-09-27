import { ServiceFaqCtaSection } from "@/components/sections/solutions/ServiceJourney";
import { FINAL_CTA, HOME_FAQ } from "@/content/home";

/** Homepage closing band — FAQ left, CTA card right (same row as solution pages). */
export function FinalCta() {
  return (
    <ServiceFaqCtaSection
      id="contact-cta"
      faqSlug="general"
      faq={HOME_FAQ}
      finalCta={FINAL_CTA}
      showPrimaryArrow
    />
  );
}
