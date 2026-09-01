import type { LeadFormType, LeadStats, LeadStatus } from "@/types/lead";

import styles from "./LeadKpiCards.module.css";

interface LeadKpiCardsProps {
  stats: LeadStats;
  activeFormType?: LeadFormType | "";
  activeStatus?: LeadStatus | "";
  onFilter: (formType: LeadFormType | "", status: LeadStatus | "") => void;
}

interface BreakdownItem {
  key: string;
  label: string;
  value: number;
  formType?: LeadFormType;
  status?: LeadStatus;
  tone?: "new" | "read" | "archived";
  static?: boolean;
}

function Breakdown({
  items,
  activeFormType,
  activeStatus,
  onSelect,
}: {
  items: BreakdownItem[];
  activeFormType: LeadFormType | "";
  activeStatus: LeadStatus | "";
  onSelect: (formType: LeadFormType | "", status: LeadStatus | "") => void;
}) {
  function isActive(item: BreakdownItem) {
    if (item.status) return activeStatus === item.status && !activeFormType;
    if (item.formType) return activeFormType === item.formType && !activeStatus;
    return false;
  }

  return (
    <div className={styles.breakdown}>
      {items.map((item) => {
        const className = [
          styles.breakdownItem,
          item.tone ? styles[`tone_${item.tone}`] : "",
          isActive(item) ? styles.breakdownActive : "",
          item.static ? styles.breakdownStatic : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (item.static) {
          return (
            <div key={item.key} className={className}>
              <span className={styles.breakdownValue}>{item.value.toLocaleString()}</span>
              <span className={styles.breakdownLabel}>{item.label}</span>
            </div>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            className={className}
            onClick={() => onSelect(item.formType ?? "", item.status ?? "")}
          >
            <span className={styles.breakdownValue}>{item.value.toLocaleString()}</span>
            <span className={styles.breakdownLabel}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LeadKpiCards({
  stats,
  activeFormType = "",
  activeStatus = "",
  onFilter,
}: LeadKpiCardsProps) {
  const showAllActive = !activeFormType && !activeStatus;

  const statusItems: BreakdownItem[] = [
    { key: "new", label: "New", value: stats.new, status: "new", tone: "new" },
    { key: "read", label: "Read", value: stats.read, status: "read", tone: "read" },
    {
      key: "archived",
      label: "Archived",
      value: stats.archived,
      status: "archived",
      tone: "archived",
    },
  ];

  const formItems: BreakdownItem[] = [
    { key: "contact", label: "Contact", value: stats.contact, formType: "contact" },
    {
      key: "consultation",
      label: "Consultation",
      value: stats.consultation,
      formType: "consultation",
    },
    { key: "proposal", label: "Proposal", value: stats.proposal, formType: "proposal" },
  ];

  const fileItems: BreakdownItem[] = [
    {
      key: "proposals",
      label: "Proposals",
      value: stats.proposal,
      formType: "proposal",
    },
    {
      key: "files",
      label: "Files",
      value: stats.attachments,
      static: true,
    },
  ];

  return (
    <div className={styles.grid}>
      <article
        className={[styles.card, styles.neon, showAllActive ? styles.cardActive : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <button type="button" className={styles.cardHead} onClick={() => onFilter("", "")}>
          <span className={styles.value}>{stats.total.toLocaleString()}</span>
          <span className={styles.label}>Total submissions</span>
        </button>
        <Breakdown
          items={statusItems}
          activeFormType={activeFormType}
          activeStatus={activeStatus}
          onSelect={onFilter}
        />
      </article>

      <article
        className={[
          styles.card,
          styles.bronze,
          activeFormType && !activeStatus ? styles.cardActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.cardHeadStatic}>
          <span className={styles.value}>
            {(stats.contact + stats.consultation + stats.proposal).toLocaleString()}
          </span>
          <span className={styles.label}>By form type</span>
        </div>
        <Breakdown
          items={formItems}
          activeFormType={activeFormType}
          activeStatus={activeStatus}
          onSelect={onFilter}
        />
      </article>

      <article className={[styles.card, styles.files].filter(Boolean).join(" ")}>
        <div className={styles.cardHeadStatic}>
          <span className={styles.value}>{stats.attachments.toLocaleString()}</span>
          <span className={styles.label}>Files & proposals</span>
        </div>
        <Breakdown
          items={fileItems}
          activeFormType={activeFormType}
          activeStatus={activeStatus}
          onSelect={(formType) => {
            if (formType) onFilter(formType, "");
          }}
        />
      </article>
    </div>
  );
}
