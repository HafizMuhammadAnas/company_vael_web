import type { CSSProperties, ReactNode } from "react";

import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Full-width section wrapper with the standard centered inner container. */
export function Section({ id, children, className, style }: SectionProps) {
  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(" ")} style={style}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  /** Small monospace eyebrow, rendered with a leading `//`. */
  label?: string;
  /** Heading text. Use `accent` for a bronze-highlighted trailing fragment. */
  title: ReactNode;
  /** Optional caption shown next to the gradient bar. */
  lineText?: string;
  centered?: boolean;
}

/** Section eyebrow + title + gradient rule, matching the wireframe pattern. */
export function SectionHeader({ label, title, lineText, centered }: SectionHeaderProps) {
  return (
    <div className={centered ? styles.centered : undefined}>
      {label && <div className={styles.label}>// {label}</div>}
      <h2 className={styles.title}>{title}</h2>
      {lineText && (
        <div className={styles.line}>
          <div className={styles.lineBar} />
          <span className={styles.lineText}>{lineText}</span>
        </div>
      )}
    </div>
  );
}

/** Bronze-accented inline fragment for use inside a title. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}
