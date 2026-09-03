import { Link } from "react-router-dom";

import { PageHero } from "@/components/sections/PageHero";
import home from "@/components/sections/home/Home.module.css";
import ins from "@/components/sections/insights/Insights.module.css";
import work from "@/components/sections/work/Work.module.css";
import { Button, Card, Section, SectionHeader, Eyebrow } from "@/components/ui";
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
} from "@/content/insights";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const activeSocials = FOOTER_SOCIALS.filter((s) => s.href && s.href !== "#");

export function InsightsPage() {
  useDocumentMeta(INSIGHTS_SEO.title, INSIGHTS_SEO.description);
  useScrollReveal();

  return (
    <>
      <PageHero
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
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={INS_FEATURED.label} title={INS_FEATURED.heading} lineText={INS_FEATURED.description} />
        </div>
        {INS_FEATURED.articles.length > 0 ? (
          <div className={`${home.grid} ${home.cols3} reveal`}>
            {INS_FEATURED.articles.map((article) => (
              <Card key={article.slug}>
                <div className={home.cardCategory}>{article.category}</div>
                <div className={home.cardTitle}>{article.title}</div>
                <p className={home.cardText}>{article.description}</p>
                <div className={home.readTime}>
                  {article.publishedDate} · {article.readTime}
                </div>
                <Link to={`/insights/blog/${article.slug}`} className={home.cardCta}>
                  Read Article →
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className={`${home.emptyState} reveal`} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {INS_FEATURED.emptyState.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}
      </Section>

      {/* Blog */}
      <Section id={INS_BLOG.id}>
        <div className="reveal">
          <SectionHeader label={INS_BLOG.label} title={INS_BLOG.heading} lineText={INS_BLOG.description} />
        </div>
        <div className={`${home.chips} reveal`} style={{ marginBottom: "1rem" }}>
          {INS_BLOG.categories.map((category) => (
            <span key={category} className={home.chip}>
              {category}
            </span>
          ))}
        </div>

        {INS_BLOG.articles.length > 0 ? (
          <div className={`${home.grid} ${home.cols3} reveal`}>
            {INS_BLOG.articles.map((article) => (
              <Card key={article.slug}>
                <div className={home.cardCategory}>{article.category}</div>
                <div className={home.cardTitle}>{article.title}</div>
                <p className={home.cardText}>{article.description}</p>
                <div className={home.readTime}>
                  {article.publishedDate} · {article.readTime}
                </div>
                <Link to={`/insights/blog/${article.slug}`} className={home.cardCta}>
                  Read Article →
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className={`${ins.prepLabel} reveal`}>{INS_BLOG.inPreparationLabel}</div>
            <div className={`${home.grid} ${home.cols3} reveal`}>
              {INS_BLOG.inPreparation.map((idea) => (
                <Card key={idea.title}>
                  <div className={home.cardCategory}>{idea.category}</div>
                  <div className={home.cardTitle}>{idea.title}</div>
                  <span className={home.comingSoon}>Coming Soon</span>
                </Card>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Resources */}
      <Section id={INS_RESOURCES.id} className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={INS_RESOURCES.label} title={INS_RESOURCES.heading} lineText={INS_RESOURCES.description} />
        </div>

        <div className={`${ins.distinction} reveal`}>
          <div className={ins.distinctionCard}>
            <div className={ins.distinctionTitle}>{INS_RESOURCES.distinction.blog.title}</div>
            <p className={ins.distinctionText}>{INS_RESOURCES.distinction.blog.text}</p>
          </div>
          <div className={ins.distinctionCard}>
            <div className={ins.distinctionTitle}>{INS_RESOURCES.distinction.resources.title}</div>
            <p className={ins.distinctionText}>{INS_RESOURCES.distinction.resources.text}</p>
          </div>
        </div>

        <div className={`${home.techGrid} reveal`} style={{ marginBottom: "2.5rem" }}>
          {INS_RESOURCES.categories.map((category) => (
            <div key={category.title} className={home.techCat}>
              <div className={home.techTitle}>{category.title}</div>
              <p className={home.cardText}>{category.text}</p>
            </div>
          ))}
        </div>

        <div className={`${home.grid} ${home.cols2} reveal`}>
          {INS_RESOURCES.items.map((item) => (
            <Card key={item.order}>
              <div className={home.cardNum}>{item.order}</div>
              <div className={home.cardTitle}>{item.title}</div>
              <p className={home.cardText}>{item.description}</p>
              <span className={home.comingSoon}>Coming Soon</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Technology Topics */}
      <Section>
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
      <Section className={home.altBg}>
        <div className="reveal">
          <SectionHeader label={INS_WHY.label} title={INS_WHY.heading} />
          <div className={home.supporting}>
            {INS_WHY.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Stay Connected */}
      <Section>
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

      {/* Final CTA */}
      <Section className={home.altBg}>
        <div className={`${home.finalCta} reveal`} style={{ position: "relative" }}>
          <div className="circuit-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Eyebrow>{INS_FINAL.label}</Eyebrow>
            <h2 className={home.finalHeading}>{INS_FINAL.heading}</h2>
            <p className={home.finalSupporting}>{INS_FINAL.supporting}</p>
            <div className={home.finalCtas}>
              <Button variant="primary" to={INS_FINAL.primaryCta.to}>
                {INS_FINAL.primaryCta.label}
              </Button>
              <Button variant="outline" to={INS_FINAL.secondaryCta.to}>
                {INS_FINAL.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
