import type { LeadStatus } from "@/types/lead";

import styles from "./LeadStatusBadge.module.css";

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const statusClass =
    status === "new" ? styles.new : status === "read" ? styles.read : styles.archived;

  return <span className={`${styles.badge} ${statusClass}`}>{status}</span>;
}
