import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Select, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import { deleteInsight, fetchInsightStats, fetchInsights } from "@/services/insights";
import type { InsightStatus } from "@/types/insight";

import styles from "./InsightsAdminPage.module.css";

const STATUSES: Array<{ value: InsightStatus | ""; label: string }> = [
  { value: "", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "coming-soon", label: "Coming soon" },
  { value: "draft", label: "Draft" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export function InsightsAdminPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = (searchParams.get("status") ?? "") as InsightStatus | "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = Number(searchParams.get("page_size") ?? "20") || 20;
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => setSearchInput(query), [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput === query) return;
      const next = new URLSearchParams(searchParams);
      if (searchInput.trim()) next.set("q", searchInput.trim());
      else next.delete("q");
      next.set("page", "1");
      setSearchParams(next);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput, query, searchParams, setSearchParams]);

  const statsQuery = useQuery({ queryKey: ["admin-insight-stats"], queryFn: fetchInsightStats });
  const listQuery = useQuery({
    queryKey: ["admin-insights", status, query, page, pageSize],
    queryFn: () =>
      fetchInsights({
        status: status || undefined,
        q: query || undefined,
        page,
        page_size: pageSize,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInsight,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-insights"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-insight-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-insights"] });
    },
  });

  const data = listQuery.data;
  const stats = statsQuery.data;

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  }

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>Insights</h1>
          <p className={styles.subtitle}>Blog articles and coming-soon topics for /insights.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/insights/new">
            Add insight
          </Button>
        ) : null}
      </div>

      {stats ? (
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Published</span>
            <strong>{stats.published}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Coming soon</span>
            <strong>{stats.coming_soon}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Draft</span>
            <strong>{stats.draft}</strong>
          </div>
        </div>
      ) : null}

      <div className={styles.toolbar}>
        <Select
          className={styles.filterControl}
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          aria-label="Filter by status"
        >
          {STATUSES.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        <Select
          className={styles.filterControl}
          value={String(pageSize)}
          onChange={(e) => updateFilter("page_size", e.target.value)}
          aria-label="Rows per page"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </Select>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search title, category…"
          aria-label="Search insights"
        />
      </div>

      {listQuery.isLoading ? <p>Loading insights…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load insights.</p> : null}

      {data ? (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No insights found.</td>
                  </tr>
                ) : (
                  data.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.title}</strong>
                        <span className={styles.muted}>{item.slug}</span>
                      </td>
                      <td>{item.category}</td>
                      <td>
                        <span
                          className={
                            item.status === "published"
                              ? styles.badgeLive
                              : item.status === "coming-soon"
                                ? styles.badgeSoon
                                : styles.badgeDraft
                          }
                        >
                          {item.status}
                          {item.featured ? " · featured" : ""}
                        </span>
                      </td>
                      <td>{item.sort_order}</td>
                      <td>
                        <div className={styles.actions}>
                          <Link to={`/admin/insights/${item.id}`}>Edit</Link>
                          {canEdit ? (
                            <button
                              type="button"
                              className={styles.danger}
                              onClick={() => {
                                if (window.confirm(`Delete “${item.title}”?`)) {
                                  deleteMutation.mutate(item.id);
                                }
                              }}
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span>
              Page {data.page} of {data.pages} · {data.total} total
            </span>
            <div className={styles.pageBtns}>
              <Button variant="outline" disabled={data.page <= 1} onClick={() => goToPage(data.page - 1)}>
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={data.page >= data.pages}
                onClick={() => goToPage(data.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
