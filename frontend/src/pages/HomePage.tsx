import { BusinessProblems } from "@/components/sections/home/BusinessProblems";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Insights } from "@/components/sections/home/Insights";
import { Process } from "@/components/sections/home/Process";
import { Solutions } from "@/components/sections/home/Solutions";
import { Technology } from "@/components/sections/home/Technology";
import { WhyVaelkode } from "@/components/sections/home/WhyVaelkode";
import { HOME_SEO } from "@/content/home";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HomePage() {
  useDocumentMeta(HOME_SEO.title, HOME_SEO.description);
  useScrollReveal();

  return (
    <>
      <Hero />
      <Capabilities />
      <BusinessProblems />
      <Solutions />
      <WhyVaelkode />
      <FeaturedWork />
      <Industries />
      <Process />
      <Technology />
      <Insights />
      <FinalCta />
    </>
  );
}
