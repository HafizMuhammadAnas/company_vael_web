import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Select, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteFaqItem,
  fetchFaqCategories,
  fetchFaqItems,
  fetchFaqStats,
} from "@/services/faqs";

import styles from "./FaqsAdminPage.module.css";

export function FaqsAdminPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("category_id") ?? "";
  const activeFilter = searchParams.get("is_active") ?? "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
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

  const statsQuery = useQuery({ queryKey: ["admin-faq-stats"], queryFn: fetchFaqStats });
  const categoriesQuery = useQuery({
    queryKey: ["admin-faq-categories"],
    queryFn: () => fetchFaqCategories(),
  });
  const listQuery = useQuery({
    queryKey: ["admin-faq-items", categoryId, activeFilter, query, page],
    queryFn: () =>
      fetchFaqItems({
        category_id: categoryId === "" ? "" : Number(categoryId),
        is_active: activeFilter === "" ? "" : activeFilter === "true",
        q: query || undefined,
        page,
        page_size: 20,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaqItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-items"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-categories"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faq-category"] });
    },
  });

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  }

  const data = listQuery.data;
  const stats = statsQuery.data;
  const categories = categoriesQuery.data ?? [];

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>FAQs</h1>
          <p className={styles.subtitle}>
            Categories and Q&amp;A for /faqs and service pages.
          </p>
        </div>
        <div className={styles.headingActions}>
          <Button variant="outline" to="/admin/faqs/categories">
            Categories
          </Button>
          {canEdit ? (
            <Button variant="primary" to="/admin/faqs/items/new">
              Add question
            </Button>
          ) : null}
        </div>
      </div>

      {stats ? (
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span>Categories</span>
            <strong>{stats.categories}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Active</span>
            <strong>{stats.active_items}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Inactive</span>
            <strong>{stats.inactive_items}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Total Q&amp;A</span>
            <strong>{stats.items}</strong>
          </div>
        </div>
      ) : null}

      <div className={styles.toolbar}>
        <Select
          className={styles.filterControl}
          value={categoryId}
          onChange={(e) => updateFilter("category_id", e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </Select>
        <Select
          className={styles.filterControl}
          value={activeFilter}
          onChange={(e) => updateFilter("is_active", e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Select>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search question or answer…"
          aria-label="Search FAQs"
        />
      </div>

      {listQuery.isLoading ? <p>Loading FAQs…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load FAQs.</p> : null}

      {data ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5}>No FAQ items found.</td>
                </tr>
              ) : (
                data.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.question}</strong>
                    </td>
                    <td>{item.category_label ?? "—"}</td>
                    <td>
                      <span className={item.is_active ? styles.badgeLive : styles.badgeDraft}>
                        {item.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>{item.sort_order}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/faqs/items/${item.id}`}>Edit</Link>
                        {canEdit ? (
                          <button
                            type="button"
                            className={styles.danger}
                            onClick={() => {
                              if (window.confirm(`Delete “${item.question.slice(0, 60)}”?`)) {
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
      ) : null}
    </section>
  );
}
