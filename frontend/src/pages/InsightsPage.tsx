import { Link } from "react-router-dom";
import { Boxes, BrainCircuit, Code2, Compass, Gauge, Layers } from "lucide-react";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { PageHero } from "@/components/sections/PageHero";
import {
ExplorerList,
  PrincipleDeck,
  ProseSection,
  WorkGallery,
  DomainShell,
} from "@/components/sections/elevated/Elevate";
import home from "@/components/sections/home/Home.module.css";
import ins from "@/components/sections/insights/Insights.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Button, Section, SectionHeader } from "@/components/ui";
import { FOOTER_SOCIALS } from "@/constants/footer";
import {
  INS_BLOG,
  INS_CONNECT,
  INS_FEATURED,
  INS_FINAL,
  INS_HERO,
  INS_NAV,
  INS_RESOURCES,
  INS_TOPICS,
  INS_WHY,
  INSIGHTS_SEO,
  type Article,
} from "@/content/insights";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const activeSocials = FOOTER_SOCIALS.filter((s) => s.href && s.href !== "#");

const RESOURCE_CATEGORY_ICONS = [Compass, Boxes, Layers, BrainCircuit, Gauge];
const RESOURCE_ITEM_ICONS = [Layers, BrainCircuit, Code2, Gauge];

const toArticleCard = (article: Article) => ({
  title: article.title,
  category: article.category,
  description: article.description,
  technology: `${article.publishedDate} · ${article.readTime}`,
  to: `/insights/blog/${article.slug}`,
  cta: "Read Article",
});

export function InsightsPage() {
  useDocumentMeta(INSIGHTS_SEO.title, INSIGHTS_SEO.description);
  useScrollReveal();

  return (
    <DomainShell domain="insights">
      <>
      <PageHero
        domain="insights"
        label={INS_HERO.label}
        title={INS_HERO.title}
        supporting={INS_HERO.supporting}
        primaryCta={INS_HERO.primaryCta}
      />

      {/* Insights navigation */}
      <Section>
        <nav className={ins.nav} aria-label="Insights sections">
          {INS_NAV.map((item) => (
            <Link key={item.label} to={item.to} className={ins.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className={ins.navIntro}>{INS_HERO.intro}</p>
      </Section>

      {/* Featured Insights */}
      {INS_FEATURED.articles.length > 0 ? (
        <WorkGallery
          label={INS_FEATURED.label}
          title={INS_FEATURED.heading}
          supporting={INS_FEATURED.description}
          cards={INS_FEATURED.articles.map(toArticleCard)}
          altBg
        />
      ) : (
        <Section className={home.altBg}>
          <div className="reveal">
            <SectionHeader
              label={INS_FEATURED.label}
              title={INS_FEATURED.heading}
              lineText={INS_FEATURED.description}
            />
          </div>
          <div className={`${home.emptyState} reveal`} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {INS_FEATURED.emptyState.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Blog */}
      <div id={INS_BLOG.id}>
        <Section>
          <div className="reveal">
            <SectionHeader label={INS_BLOG.label} title={INS_BLOG.heading} lineText={INS_BLOG.description} />
          </div>
          <div className={`${home.chips} reveal`}>
            {INS_BLOG.categories.map((category) => (
              <span key={category} className={home.chip}>
                {category}
              </span>
            ))}
          </div>
        </Section>

        {INS_BLOG.articles.length > 0 ? (
          <WorkGallery
            label={INS_BLOG.label}
            title="Published Articles"
            cards={INS_BLOG.articles.map(toArticleCard)}
            altBg
          />
        ) : (
          <ExplorerList
            label={INS_BLOG.label}
            title={INS_BLOG.inPreparationLabel}
            altBg
            items={INS_BLOG.inPreparation.map((idea) => ({
              title: idea.title,
              text: idea.category,
              tags: ["Coming Soon"],
            }))}
          />
        )}
      </div>

      {/* Resources */}
      <div id={INS_RESOURCES.id}>
        <ProseSection
          label={INS_RESOURCES.label}
          title={INS_RESOURCES.heading}
          paragraphs={[INS_RESOURCES.description]}
        >
          <div className={ins.distinction}>
            <div className={ins.distinctionCard}>
              <div className={ins.distinctionTitle}>{INS_RESOURCES.distinction.blog.title}</div>
              <p className={ins.distinctionText}>{INS_RESOURCES.distinction.blog.text}</p>
            </div>
            <div className={ins.distinctionCard}>
              <div className={ins.distinctionTitle}>{INS_RESOURCES.distinction.resources.title}</div>
              <p className={ins.distinctionText}>{INS_RESOURCES.distinction.resources.text}</p>
            </div>
          </div>
        </ProseSection>

        <PrincipleDeck
          label="Categories"
          title="Resource Categories"
          items={INS_RESOURCES.categories.map((category) => ({
            title: category.title,
            text: category.text,
          }))}
          icons={RESOURCE_CATEGORY_ICONS}
          eyebrowPrefix="Category"
          altBg
        />

        <ExplorerList
          label="In Preparation"
          title="Planned Resources"
          icons={RESOURCE_ITEM_ICONS}
          items={INS_RESOURCES.items.map((item) => ({
            num: item.order,
            title: item.title,
            text: item.description,
            tags: ["Coming Soon"],
          }))}
        />
      </div>

      {/* Technology Topics */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader title={INS_TOPICS.heading} />
        </div>
        <div className={`${work.industryChips} reveal`}>
          {INS_TOPICS.topics.map((topic) => (
            <span key={topic} className={work.industryChip}>
              {topic}
            </span>
          ))}
        </div>
      </Section>

      {/* Why VAELKODE Shares Insights */}
      <ProseSection label={INS_WHY.label} title={INS_WHY.heading} paragraphs={INS_WHY.paragraphs} />

      {/* Stay Connected */}
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={INS_CONNECT.label} title={INS_CONNECT.heading} lineText={INS_CONNECT.text} />
        </div>
        {activeSocials.length > 0 ? (
          <div className={`${work.industryChips} reveal`}>
            {activeSocials.map((social) => (
              <a key={social.label} href={social.href} className={work.industryChip} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "flex-start" }}>
            <p className={ins.navIntro}>{INS_CONNECT.fallback.text}</p>
            <Button variant="outline" to={INS_CONNECT.fallback.cta.to}>
              {INS_CONNECT.fallback.cta.label} →
            </Button>
          </div>
        )}
      </Section>

      <FinalCtaSection
        label={INS_FINAL.label}
        heading={INS_FINAL.heading}
        supporting={INS_FINAL.supporting}
        primaryCta={INS_FINAL.primaryCta}
        secondaryCta={INS_FINAL.secondaryCta}
      />
    </>
    </DomainShell>
  );
}
