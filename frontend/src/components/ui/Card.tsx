import type { ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  /** Show the top-left neon corner bracket. */
  cornerTl?: boolean;
  /** Show the bottom-right bronze corner bracket. */
  cornerBr?: boolean;
  className?: string;
}

export function Card({ children, hoverable = true, cornerTl, cornerBr, className }: CardProps) {
  const cls = [styles.card, hoverable ? styles.hoverable : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      {cornerTl && <span className={styles.cornerTl} />}
      {cornerBr && <span className={styles.cornerBr} />}
      {children}
    </div>
  );
}
