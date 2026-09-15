/**
 * Compatibility layer for pages that previously used interactive Elevate sections.
 * Renders calm, fully-readable editorial layouts — no auto-cycle, no hover-reveal.
 * Domain atmosphere comes from DomainShell on each page.
 */
import type { ReactNode } from "react";

import {
  AudienceCards,
  ChallengeFinder,
  FeatureTiles,
  FaqList,
  LinkCards,
  NarrativeBand,
  ProcessTimeline,
  TechStacks,
  WorkShowcase,
} from "@/components/sections/editorial/Editorial";
import { Button, Section, SectionHeader } from "@/components/ui";
import editorial from "@/components/sections/editorial/Editorial.module.css";

export interface ElevateItem {
  title: string;
  text: string;
  num?: string;
  tags?: string[];
  href?: string;
  cta?: string;
}

function asText(supporting?: ReactNode): string | undefined {
  if (supporting == null) return undefined;
  if (typeof supporting === "string") return supporting;
  return undefined;
}

function DetailBlocks({
  label,
  title,
  supporting,
  items,
  altBg,
  note,
  footerCta,
}: {
  label: string;
  title: string;
  supporting?: ReactNode;
  items: ElevateItem[];
  altBg?: boolean;
  note?: string;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}) {
  const linked = items.some((i) => i.href);
  if (linked) {
    return (
      <LinkCards
        label={label}
        title={title}
        supporting={asText(supporting)}
        altBg={altBg}
        footerCta={footerCta}
        items={items.map((item) => ({
          title: item.title,
          text: item.tags?.length ? `${item.text} ${item.tags.slice(0, 4).join(" · ")}` : item.text,
          to: item.href ?? "#",
          cta: item.cta ?? "Learn more",
        }))}
      />
    );
  }

  return (
    <Section className={altBg ? editorial.altBg : undefined}>
      <div className="reveal">
        <SectionHeader label={label} title={title} supporting={asText(supporting)} />
        {typeof supporting !== "string" && supporting ? (
          <div className={editorial.prose}>{supporting}</div>
        ) : null}
        {note ? <p className={editorial.note}>{note}</p> : null}
      </div>
      <div className={`${editorial.workStack} reveal`}>
        {items.map((item, i) => (
          <article key={item.title} className={editorial.workCard}>
            <div className={editorial.workMeta}>
              <span className={editorial.workNum}>
                {item.num ?? String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={editorial.workTitle}>{item.title}</h3>
            <p className={editorial.workText}>{item.text}</p>
            {item.tags && item.tags.length > 0 && (
              <ul className={editorial.tagList}>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      {footerCta && (
        <div className={`${editorial.footerCta} reveal`}>
          <Button variant={footerCta.variant ?? "primary"} to={footerCta.to}>
            {footerCta.label} →
          </Button>
        </div>
      )}
    </Section>
  );
}

export function ProseSection({
  label,
  title,
  paragraphs,
  highlight,
  altBg,
  children,
}: {
  label: string;
  title: string;
  paragraphs?: string[];
  highlight?: string;
  altBg?: boolean;
  children?: ReactNode;
}) {
  if (paragraphs) {
    return (
      <NarrativeBand
        label={label}
        title={title}
        paragraphs={paragraphs}
        highlight={highlight}
        altBg={altBg}
      />
    );
  }
  return (
    <Section className={altBg ? editorial.altBg : undefined}>
      <div className="reveal">
        <SectionHeader label={label} title={title} />
        {children}
      </div>
    </Section>
  );
}

export function PrincipleDeck({
  label,
  title,
  supporting,
  items,
  altBg,
}: {
  label: string;
  title: string;
  supporting?: ReactNode;
  items: ElevateItem[];
  icons?: unknown;
  altBg?: boolean;
  eyebrowPrefix?: string;
}) {
  return (
    <Section className={altBg ? editorial.altBg : undefined}>
      <div className="reveal">
        <SectionHeader label={label} title={title} supporting={asText(supporting)} />
        {typeof supporting !== "string" && supporting ? (
          <div className={editorial.prose}>{supporting}</div>
        ) : null}
      </div>
      <div className={`${editorial.tileGrid} ${editorial.cols3} reveal`}>
        {items.map((item, i) => (
          <article key={item.title} className={editorial.tile}>
            <span className={editorial.tileNum}>
              {item.num ?? String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={editorial.tileTitle}>{item.title}</h3>
            <p className={editorial.tileText}>{item.text}</p>
            {item.tags && item.tags.length > 0 && (
              <ul className={editorial.tagList}>
                {item.tags.slice(0, 6).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function ExplorerList(props: {
  label: string;
  title: string;
  supporting?: ReactNode;
  items: ElevateItem[];
  icons?: unknown;
  altBg?: boolean;
  note?: string;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}) {
  return <DetailBlocks {...props} />;
}

export function JourneyRail({
  label,
  title,
  supporting,
  steps,
  altBg,
  footerCta,
}: {
  label: string;
  title: string;
  supporting?: ReactNode;
  steps: { num: string; title: string; text: string; activities?: string[]; activitiesLabel?: string; output?: string }[];
  altBg?: boolean;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
  layout?: "auto" | "vertical";
}) {
  return (
    <ProcessTimeline
      label={label}
      title={title}
      supporting={asText(supporting)}
      steps={steps}
      altBg={altBg}
      footerCta={footerCta}
    />
  );
}

export function SignalBoard({
  label,
  title,
  supporting,
  items,
  altBg,
}: {
  label: string;
  title: string;
  supporting?: string;
  items: { question: string; cta: string; to: string }[];
  altBg?: boolean;
}) {
  return (
    <ChallengeFinder
      label={label}
      title={title}
      supporting={supporting}
      items={items}
      altBg={altBg}
    />
  );
}

export function StackExplorer({
  label,
  title,
  supporting,
  categories,
  altBg,
}: {
  label: string;
  title: string;
  supporting?: string;
  categories: { title: string; items: string[] }[];
  altBg?: boolean;
}) {
  return (
    <TechStacks
      label={label}
      title={title}
      supporting={supporting}
      categories={categories}
      altBg={altBg}
    />
  );
}

export function WorkGallery({
  label,
  title,
  supporting,
  note,
  cards,
  altBg,
  footerCta,
}: {
  label: string;
  title: string;
  supporting?: string;
  note?: string;
  cards: {
    title: string;
    category: string;
    description: string;
    capabilities?: string[];
    technology?: string;
    to: string;
    cta: string;
  }[];
  altBg?: boolean;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}) {
  return (
    <WorkShowcase
      label={label}
      title={title}
      supporting={supporting}
      note={note}
      cards={cards}
      altBg={altBg}
      footerCta={footerCta}
    />
  );
}

export function FaqConsole({
  label,
  title,
  items,
  altBg,
  footerCta,
}: {
  label: string;
  title: string;
  items: { q: string; a: string }[];
  altBg?: boolean;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}) {
  return (
    <FaqList label={label} title={title} items={items} altBg={altBg} footerCta={footerCta} />
  );
}

export function AudienceAtlas({
  label,
  title,
  supporting,
  cards,
  altBg,
  footerCta,
}: {
  label: string;
  title: string;
  supporting?: string;
  cards: { title: string; to?: string; text?: string }[];
  altBg?: boolean;
  footerCta?: { label: string; to: string; variant?: "primary" | "outline" };
}) {
  return (
    <AudienceCards
      label={label}
      title={title}
      supporting={supporting}
      cards={cards}
      altBg={altBg}
      footerCta={footerCta}
    />
  );
}

export { FeatureTiles, NarrativeBand };
