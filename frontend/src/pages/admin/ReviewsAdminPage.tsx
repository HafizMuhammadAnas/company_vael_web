import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, FieldRow, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteReview,
  fetchReviewSettings,
  fetchReviewStats,
  fetchReviews,
  updateReviewSettings,
} from "@/services/googleReviews";
import type { ReviewSettingsFormValues } from "@/types/googleReview";

import styles from "./ReviewsAdminPage.module.css";

export function ReviewsAdminPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get("is_active") ?? "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const [searchInput, setSearchInput] = useState(query);
  const [settingsForm, setSettingsForm] = useState<ReviewSettingsFormValues | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);

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

  const statsQuery = useQuery({ queryKey: ["admin-review-stats"], queryFn: fetchReviewStats });
  const settingsQuery = useQuery({
    queryKey: ["admin-review-settings"],
    queryFn: fetchReviewSettings,
  });
  const listQuery = useQuery({
    queryKey: ["admin-reviews", activeFilter, query, page],
    queryFn: () =>
      fetchReviews({
        is_active: activeFilter === "" ? "" : activeFilter === "true",
        q: query || undefined,
        page,
        page_size: 20,
      }),
  });

  useEffect(() => {
    if (!settingsQuery.data || settingsForm) return;
    setSettingsForm({
      heading: settingsQuery.data.heading,
      summary_label: settingsQuery.data.summary_label,
      rating: settingsQuery.data.rating,
      review_count: settingsQuery.data.review_count,
      profile_url: settingsQuery.data.profile_url,
    });
  }, [settingsQuery.data, settingsForm]);

  const settingsMutation = useMutation({
    mutationFn: updateReviewSettings,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-review-settings"] });
      void queryClient.invalidateQueries({ queryKey: ["public-google-reviews"] });
      setSettingsSaved(true);
      setSettingsError(null);
    },
    onError: () => setSettingsError("Could not save settings."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-review-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-google-reviews"] });
    },
  });

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  }

  function onSaveSettings(e: FormEvent) {
    e.preventDefault();
    if (!settingsForm || !canEdit) return;
    setSettingsSaved(false);
    settingsMutation.mutate(settingsForm);
  }

  const data = listQuery.data;
  const stats = statsQuery.data;

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>Google reviews</h1>
          <p className={styles.subtitle}>Homepage summary block and curated review cards.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/reviews/new">
            Add review
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

      {settingsForm ? (
        <form className={styles.settings} onSubmit={onSaveSettings}>
          <h2>Summary settings</h2>
          <Field label="Heading" htmlFor="heading">
            <TextArea
              id="heading"
              rows={2}
              value={settingsForm.heading}
              onChange={(e) => setSettingsForm({ ...settingsForm, heading: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Summary label" htmlFor="summary_label">
              <TextInput
                id="summary_label"
                value={settingsForm.summary_label}
                onChange={(e) => setSettingsForm({ ...settingsForm, summary_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Rating (1–5)" htmlFor="rating">
              <TextInput
                id="rating"
                type="number"
                min={1}
                max={5}
                step={0.1}
                value={settingsForm.rating}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, rating: Number(e.target.value) || 5 })
                }
                disabled={!canEdit}
              />
            </Field>
            <Field label="Review count" htmlFor="review_count">
              <TextInput
                id="review_count"
                type="number"
                min={0}
                value={settingsForm.review_count}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    review_count: Number(e.target.value) || 0,
                  })
                }
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="Google profile URL" htmlFor="profile_url">
            <TextInput
              id="profile_url"
              value={settingsForm.profile_url}
              onChange={(e) => setSettingsForm({ ...settingsForm, profile_url: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          {settingsError ? <p className={styles.error}>{settingsError}</p> : null}
          {settingsSaved ? <p className={styles.ok}>Settings saved.</p> : null}
          {canEdit ? (
            <Button variant="primary" type="submit" disabled={settingsMutation.isPending}>
              {settingsMutation.isPending ? "Saving…" : "Save settings"}
            </Button>
          ) : null}
        </form>
      ) : null}

      <div className={styles.toolbar}>
        <Select
          className={styles.filterControl}
          value={activeFilter}
          onChange={(e) => updateFilter("is_active", e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All reviews</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Select>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search author or text…"
          aria-label="Search reviews"
        />
      </div>

      {listQuery.isLoading ? <p>Loading reviews…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load reviews.</p> : null}

      {data ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Author</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5}>No reviews found.</td>
                </tr>
              ) : (
                data.items.map((review) => (
                  <tr key={review.id}>
                    <td>
                      <strong>{review.author}</strong>
                      <span className={styles.muted}>{review.relative_time}</span>
                    </td>
                    <td>{review.rating}/5</td>
                    <td>
                      <span className={review.is_active ? styles.badgeLive : styles.badgeDraft}>
                        {review.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>{review.sort_order}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/reviews/${review.id}`}>Edit</Link>
                        {canEdit ? (
                          <button
                            type="button"
                            className={styles.danger}
                            onClick={() => {
                              if (window.confirm(`Delete review by ${review.author}?`)) {
                                deleteMutation.mutate(review.id);
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
