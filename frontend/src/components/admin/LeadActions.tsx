import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { updateLeadStatus } from "@/services/leads";
import type { LeadStatus } from "@/types/lead";

import styles from "./LeadActions.module.css";

interface LeadActionsProps {
  leadId: number;
  status: LeadStatus;
  /** Compact layout for table rows. */
  compact?: boolean;
  showView?: boolean;
  onUpdated?: () => void;
}

export function LeadActions({
  leadId,
  status,
  compact = false,
  showView = false,
  onUpdated,
}: LeadActionsProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";

  const mutation = useMutation({
    mutationFn: (nextStatus: LeadStatus) => updateLeadStatus(leadId, nextStatus),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-lead", leadId] });
      void queryClient.invalidateQueries({ queryKey: ["admin-lead-stats"] });
      onUpdated?.();
    },
  });

  const pending = mutation.isPending;
  const wrapClass = compact ? styles.compact : styles.actions;

  return (
    <div className={wrapClass}>
      {showView && (
        <Button variant="primary" to={`/admin/leads/${leadId}`} className={styles.actionBtn}>
          View
        </Button>
      )}

      {canEdit && status === "new" && (
        <Button
          variant="outline"
          className={styles.actionBtn}
          disabled={pending}
          onClick={() => mutation.mutate("read")}
        >
          Mark read
        </Button>
      )}

      {canEdit && status !== "archived" && (
        <Button
          variant="outline"
          className={styles.actionBtn}
          disabled={pending}
          onClick={() => mutation.mutate("archived")}
        >
          Archive
        </Button>
      )}

      {canEdit && status === "archived" && (
        <Button
          variant="outline"
          className={styles.actionBtn}
          disabled={pending}
          onClick={() => mutation.mutate("new")}
        >
          Restore
        </Button>
      )}
    </div>
  );
}
