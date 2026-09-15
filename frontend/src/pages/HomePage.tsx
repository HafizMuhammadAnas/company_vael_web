import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { GoogleReviews } from "@/components/sections/home/GoogleReviews";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { ProudWork } from "@/components/sections/home/ProudWork";
import { Solutions } from "@/components/sections/home/Solutions";
import { WhyVaelkode } from "@/components/sections/home/WhyVaelkode";
import { HOME_SEO } from "@/content/home";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Homepage journey:
 * Hero → Reviews → Logos → Proud work →
 * Services → Why (incl. how we work) → Industries → CTA
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
      <Solutions />
      <WhyVaelkode />
      <Industries />
      <FinalCta />
    </>
  );
}
