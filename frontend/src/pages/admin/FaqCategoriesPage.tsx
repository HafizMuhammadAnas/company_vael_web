import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { deleteFaqCategory, fetchFaqCategories } from "@/services/faqs";

import styles from "./FaqCategoriesPage.module.css";

export function FaqCategoriesPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["admin-faq-categories"],
    queryFn: () => fetchFaqCategories(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaqCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-categories"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-items"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faq-category"] });
    },
  });

  const categories = listQuery.data ?? [];

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/faqs">FAQs</Link> / Categories
          </p>
          <h1 className={styles.title}>FAQ categories</h1>
          <p className={styles.subtitle}>Filter groups shown on /faqs and service pages.</p>
        </div>
        <div className={styles.headingActions}>
          <Button variant="outline" to="/admin/faqs">
            Back to questions
          </Button>
          {canEdit ? (
            <Button variant="primary" to="/admin/faqs/categories/new">
              Add category
            </Button>
          ) : null}
        </div>
      </div>

      {listQuery.isLoading ? <p>Loading categories…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load categories.</p> : null}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Slug</th>
              <th>Items</th>
              <th>Status</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={6}>No categories yet.</td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <strong>{cat.label}</strong>
                    <span className={styles.muted}>{cat.heading}</span>
                  </td>
                  <td>{cat.slug}</td>
                  <td>{cat.item_count}</td>
                  <td>
                    <span className={cat.is_active ? styles.badgeLive : styles.badgeDraft}>
                      {cat.is_active ? "active" : "inactive"}
                    </span>
                  </td>
                  <td>{cat.sort_order}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/admin/faqs/categories/${cat.id}`}>Edit</Link>
                      {canEdit ? (
                        <button
                          type="button"
                          className={styles.danger}
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete category “${cat.label}”? All its questions will be removed.`,
                              )
                            ) {
                              deleteMutation.mutate(cat.id);
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
    </section>
  );
}
