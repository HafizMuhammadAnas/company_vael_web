import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { DomainShell } from "@/components/sections/domain/DomainShell";
import { WorkGallery } from "@/components/sections/elevated/Elevate";
import { InsightsBlogSection } from "@/components/sections/insights/InsightsBlog";
import { INS_FEATURED, INS_FINAL, INS_HERO, INSIGHTS_SEO } from "@/content/insights";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublicInsights } from "@/hooks/usePublicInsights";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function InsightsPage() {
  useDocumentMeta(INSIGHTS_SEO.title, INSIGHTS_SEO.description);
  useScrollReveal();
  const { previews } = usePublicInsights();

  const featuredPublished = previews.filter(
    (item) => item.status === "published" && item.slug && item.featured,
  );

  return (
    <DomainShell domain="insights">
      <PageHero
        domain="insights"
        label={INS_HERO.label}
        title={INS_HERO.title}
        supporting={INS_HERO.supporting}
        primaryCta={INS_HERO.primaryCta}
      />

      {featuredPublished.length > 0 ? (
        <WorkGallery
          label={INS_FEATURED.label}
          title={INS_FEATURED.heading}
          supporting={INS_FEATURED.description}
          cards={featuredPublished.map((article) => ({
            title: article.title,
            category: article.category,
            description: article.description ?? "",
            technology: `${article.publishedDate ?? "Published"} · ${article.readTime}`,
            to: `/insights/blog/${article.slug}`,
            cta: "Read Article",
          }))}
          altBg
        />
      ) : null}

      <InsightsBlogSection />

      <FinalCtaSection
        label={INS_FINAL.label}
        heading={INS_FINAL.heading}
        supporting={INS_FINAL.supporting}
        primaryCta={INS_FINAL.primaryCta}
        secondaryCta={INS_FINAL.secondaryCta}
      />
    </DomainShell>
  );
}
