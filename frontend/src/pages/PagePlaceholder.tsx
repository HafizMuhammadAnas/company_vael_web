import { useEffect } from "react";

import { Section, SectionHeader } from "@/components/ui";

interface PagePlaceholderProps {
  /** Page title (also used for the document title). */
  title: string;
  /** Small monospace eyebrow, e.g. a section name like "Solutions". */
  kicker?: string;
}

/**
 * Neutral scaffold for a route whose real content has not been provided yet.
 * Intentionally contains no marketing copy — just the page's structural title
 * and a build-status marker.
 */
export function PagePlaceholder({ title, kicker }: PagePlaceholderProps) {
  useEffect(() => {
    document.title = `${title} — VAELKODE`;
  }, [title]);

  return (
    <Section style={{ minHeight: "calc(100vh - var(--nav-height))" }}>
      <SectionHeader
        label={kicker ?? "VAELKODE"}
        title={title}
        lineText="Page scaffolded — awaiting content"
      />
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          color: "var(--slate)",
          textTransform: "uppercase",
        }}
      >
        // Content coming soon
      </p>
    </Section>
  );
}
