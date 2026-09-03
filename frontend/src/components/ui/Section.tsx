import type { CSSProperties, ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";
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
  /** Small pill eyebrow with neon icon. */
  label?: string;
  /** Heading text. Use `accent` for a bronze-highlighted trailing fragment. */
  title: ReactNode;
  /** Short mono caption next to the gradient rule (keep brief). */
  lineText?: string;
  /** Readable supporting lede under the title. Prefer this over long lineText. */
  supporting?: ReactNode;
  centered?: boolean;
}

/** Section eyebrow + title + optional lede / caption. */
export function SectionHeader({ label, title, lineText, supporting, centered }: SectionHeaderProps) {
  return (
    <div className={centered ? styles.centered : undefined}>
      {label && (
        <div className={centered ? styles.labelRow : undefined}>
          <Eyebrow centered={centered}>{label}</Eyebrow>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {(lineText || supporting) && (
        <div className={styles.line}>
          <div className={styles.lineBar} />
          {lineText && <span className={styles.lineText}>{lineText}</span>}
        </div>
      )}
      {supporting && <div className={styles.supporting}>{supporting}</div>}
    </div>
  );
}

/** Bronze-accented inline fragment for use inside a title. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}
