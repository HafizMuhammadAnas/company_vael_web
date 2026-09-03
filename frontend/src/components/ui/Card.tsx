import type { ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  /** Soft moving sheen + packet for flow-style cards. */
  flow?: boolean;
  /** Stagger the packet animation (0–2). */
  flowDelay?: 0 | 1 | 2;
  /** Show the top-left neon corner bracket. */
  cornerTl?: boolean;
  /** Show the bottom-right bronze corner bracket. */
  cornerBr?: boolean;
  className?: string;
}

export function Card({
  children,
  hoverable = true,
  flow = false,
  flowDelay = 0,
  cornerTl,
  cornerBr,
  className,
}: CardProps) {
  const delayClass =
    flowDelay === 1 ? styles.flowDelay1 : flowDelay === 2 ? styles.flowDelay2 : "";
  const cls = [
    styles.card,
    hoverable ? styles.hoverable : "",
    flow ? styles.flow : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {flow && <span className={`${styles.flowPacket} ${delayClass}`} aria-hidden />}
      {cornerTl && <span className={styles.cornerTl} />}
      {cornerBr && <span className={styles.cornerBr} />}
      {children}
    </div>
  );
}
