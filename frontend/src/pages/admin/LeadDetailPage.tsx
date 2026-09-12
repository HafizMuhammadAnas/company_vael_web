import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { LeadActions } from "@/components/admin/LeadActions";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { Button } from "@/components/ui/Button";
import {
  formatFormType,
  getOrderedPayloadEntries,
  getPayloadFieldLabel,
} from "@/lib/leadLabels";
import { downloadAttachment, fetchLead } from "@/services/leads";
import type { LeadFormType } from "@/types/lead";

import styles from "./LeadDetailPage.module.css";

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function LeadDetailPage() {
  const { id } = useParams();
  const leadId = Number(id);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-lead", leadId],
    queryFn: () => fetchLead(leadId),
    enabled: Number.isFinite(leadId),
  });

  if (!Number.isFinite(leadId)) {
    return <p className={styles.error}>Invalid lead ID.</p>;
  }

  if (isLoading) return <p className={styles.loading}>Loading submission…</p>;
  if (isError || !data) return <p className={styles.error}>Lead not found.</p>;

  const formType = data.form_type as LeadFormType;
  const payloadEntries = getOrderedPayloadEntries(formType, data.payload);

  return (
    <section>
      <Link to="/admin/leads" className={styles.back}>
        ← Back to leads
      </Link>

      <div className={styles.header}>
        <div>
          <p className={styles.formType}>{formatFormType(formType)}</p>
          <h1>{data.full_name}</h1>
          <div className={styles.metaRow}>
            <LeadStatusBadge status={data.status} />
            <span>Submitted {new Date(data.created_at).toLocaleString()}</span>
            {data.attachments.length > 0 && <span>{data.attachments.length} file(s)</span>}
          </div>
        </div>

        <div className={styles.actionPanel}>
          <p className={styles.actionLabel}>Actions</p>
          <LeadActions
            leadId={data.id}
            status={data.status}
            onUpdated={() => void refetch()}
          />
        </div>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Contact information</h2>
          <div className={styles.dl}>
            <div className={styles.row}>
              <span className={styles.label}>Full name</span>
              <span>{data.full_name}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Email</span>
              <span>
                <a href={`mailto:${data.email}`} className={styles.mailLink}>
                  {data.email}
                </a>
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Phone</span>
              <span>{data.phone ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Company</span>
              <span>{data.company ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Country</span>
              <span>{data.country ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Privacy consent</span>
              <span>{data.privacy_consent ? "Yes" : "No"}</span>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <h2>{formatFormType(formType)}: submission details</h2>
          <div className={styles.dl}>
            {payloadEntries.length === 0 && (
              <p className={styles.muted}>No extra fields submitted.</p>
            )}
            {payloadEntries.map(([key, value]) => (
              <div key={key} className={styles.row}>
                <span className={styles.label}>{getPayloadFieldLabel(key)}</span>
                <span className={key === "description" ? styles.multiline : undefined}>
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        </article>

        {data.attachments.length > 0 && (
          <article className={styles.card}>
            <h2>Attachments</h2>
            <ul className={styles.attachments}>
              {data.attachments.map((file) => (
                <li key={file.id} className={styles.attachmentItem}>
                  <span>
                    {file.original_filename} · {formatBytes(file.size_bytes)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => void downloadAttachment(data.id, file.id)}
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </article>
        )}

        <article className={`${styles.card} ${styles.metaCard}`}>
          <h2>Submission metadata</h2>
          <div className={styles.dl}>
            <div className={styles.row}>
              <span className={styles.label}>Lead ID</span>
              <span>{data.id}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Form type</span>
              <span>{formatFormType(formType)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>IP address</span>
              <span>{data.ip_address ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>User agent</span>
              <span className={styles.wrapText}>{data.user_agent ?? "—"}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Last updated</span>
              <span>{new Date(data.updated_at).toLocaleString()}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
