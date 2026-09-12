import { BusinessProblems } from "@/components/sections/home/BusinessProblems";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { GoogleReviews } from "@/components/sections/home/GoogleReviews";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Process } from "@/components/sections/home/Process";
import { ProudWork } from "@/components/sections/home/ProudWork";
import { Solutions } from "@/components/sections/home/Solutions";
import { WhyVaelkode } from "@/components/sections/home/WhyVaelkode";
import { HOME_SEO } from "@/content/home";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Homepage journey:
 * Hero (delivery scene) → Reviews → Logos → Proud work →
 * Problems (signal board) → Services (mosaic) → Why (folio) →
 * Industries → Process (rail) → CTA
 */
export function HomePage() {
  useDocumentMeta(HOME_SEO.title, HOME_SEO.description);
  useScrollReveal();

  return (
    <>
      <Hero />
      <GoogleReviews />
      <ClientLogos variant="marquee" />
      <ProudWork />
      <BusinessProblems />
      <Solutions />
      <WhyVaelkode />
      <Industries />
      <Process />
      <FinalCta />
    </>
  );
}
