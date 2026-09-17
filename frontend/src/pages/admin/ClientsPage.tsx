import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Select, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import { deleteClient, fetchClientStats, fetchClients } from "@/services/clients";

import styles from "./ClientsPage.module.css";

const ACTIVE_FILTERS = [
  { value: "", label: "All logos" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
] as const;

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
const DEFAULT_PAGE_SIZE = 20;

function parsePageSize(value: string | null): number {
  const size = Number(value ?? DEFAULT_PAGE_SIZE);
  return PAGE_SIZE_OPTIONS.includes(size as (typeof PAGE_SIZE_OPTIONS)[number])
    ? size
    : DEFAULT_PAGE_SIZE;
}

export function ClientsPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get("is_active") ?? "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const pageSize = parsePageSize(searchParams.get("page_size"));
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

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

  const statsQuery = useQuery({
    queryKey: ["admin-client-stats"],
    queryFn: fetchClientStats,
  });

  const clientsQuery = useQuery({
    queryKey: ["admin-clients", activeFilter, query, page, pageSize],
    queryFn: () =>
      fetchClients({
        is_active: activeFilter === "" ? "" : activeFilter === "true",
        q: query || undefined,
        page,
        page_size: pageSize,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-client-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["active-clients"] });
    },
  });

  const { data, isLoading, isError } = clientsQuery;
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

  function onDelete(id: number, name: string) {
    if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>Client logos</h1>
          <p className={styles.subtitle}>Brand marks shown in the public logo marquee.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/clients/new">
            Add logo
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
            <span>Active</span>
            <strong>{stats.active}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Inactive</span>
            <strong>{stats.inactive}</strong>
          </div>
        </div>
      ) : null}

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Select
            className={styles.filterControl}
            value={activeFilter}
            onChange={(e) => updateFilter("is_active", e.target.value)}
            aria-label="Filter by status"
          >
            {ACTIVE_FILTERS.map((opt) => (
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
        </div>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name or slug…"
          aria-label="Search clients"
        />
      </div>

      {isLoading ? <p>Loading logos…</p> : null}
      {isError ? <p className={styles.error}>Could not load client logos.</p> : null}

      {data ? (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No client logos found.</td>
                  </tr>
                ) : (
                  data.items.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <img src={client.logo_url} alt="" className={styles.thumb} />
                      </td>
                      <td>
                        <strong>{client.name}</strong>
                        <span className={styles.muted}>{client.slug}</span>
                      </td>
                      <td>
                        <span className={client.is_active ? styles.badgeLive : styles.badgeDraft}>
                          {client.is_active ? "active" : "inactive"}
                        </span>
                      </td>
                      <td>{client.sort_order}</td>
                      <td>
                        <div className={styles.actions}>
                          <Link to={`/admin/clients/${client.id}`}>Edit</Link>
                          {canEdit ? (
                            <button
                              type="button"
                              className={styles.danger}
                              onClick={() => onDelete(client.id, client.name)}
                              disabled={deleteMutation.isPending}
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
              <Button
                variant="outline"
                disabled={data.page <= 1}
                onClick={() => goToPage(data.page - 1)}
              >
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
