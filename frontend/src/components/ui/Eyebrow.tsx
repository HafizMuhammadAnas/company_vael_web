import { Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  /** Optional icon override; defaults to Sparkles. */
  icon?: LucideIcon;
  className?: string;
  /** Center the badge (for centered section headers). */
  centered?: boolean;
}

/** Pill label with neon icon — shared by hero, section headers, and page heroes. */
export function Eyebrow({ children, icon: Icon = Sparkles, className, centered }: EyebrowProps) {
  return (
    <span className={[styles.eyebrow, centered ? styles.centered : "", className].filter(Boolean).join(" ")}>
      <Icon size={14} className={styles.icon} aria-hidden />
      {children}
    </span>
  );
}
