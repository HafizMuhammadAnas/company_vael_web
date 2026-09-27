import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteIndustry,
  fetchIndustries,
  fetchIndustrySettings,
  fetchIndustryStats,
  updateIndustrySettings,
} from "@/services/industries";
import type { IndustrySettingsFormValues } from "@/types/industry";

import styles from "./IndustriesAdminPage.module.css";

export function IndustriesAdminPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("is_active") ?? "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const [searchInput, setSearchInput] = useState(query);
  const [settingsForm, setSettingsForm] = useState<IndustrySettingsFormValues | null>(null);
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

  const statsQuery = useQuery({ queryKey: ["admin-industry-stats"], queryFn: fetchIndustryStats });
  const settingsQuery = useQuery({
    queryKey: ["admin-industry-settings"],
    queryFn: fetchIndustrySettings,
  });
  const listQuery = useQuery({
    queryKey: ["admin-industries", activeFilter, query, page],
    queryFn: () =>
      fetchIndustries({
        is_active: activeFilter === "" ? "" : activeFilter === "true",
        q: query || undefined,
        page,
        page_size: 20,
      }),
  });

  useEffect(() => {
    if (!settingsQuery.data || settingsForm) return;
    setSettingsForm({
      label: settingsQuery.data.label,
      heading: settingsQuery.data.heading,
      supporting: settingsQuery.data.supporting,
    });
  }, [settingsQuery.data, settingsForm]);

  const settingsMutation = useMutation({
    mutationFn: updateIndustrySettings,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-industry-settings"] });
      void queryClient.invalidateQueries({ queryKey: ["public-industries"] });
      setSettingsSaved(true);
      setSettingsError(null);
    },
    onError: () => setSettingsError("Could not save settings."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIndustry,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-industry-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-industries"] });
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
          <h1 className={styles.title}>Industries</h1>
          <p className={styles.subtitle}>Homepage sector carousel cards and headings.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/industries/new">
            Add industry
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
          <h2>Section settings</h2>
          <Field label="Label" htmlFor="label">
            <TextInput
              id="label"
              value={settingsForm.label}
              onChange={(e) => setSettingsForm({ ...settingsForm, label: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <Field label="Heading" htmlFor="heading">
            <TextInput
              id="heading"
              value={settingsForm.heading}
              onChange={(e) => setSettingsForm({ ...settingsForm, heading: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <Field label="Supporting" htmlFor="supporting">
            <TextArea
              id="supporting"
              rows={3}
              value={settingsForm.supporting}
              onChange={(e) => setSettingsForm({ ...settingsForm, supporting: e.target.value })}
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
          <option value="">All industries</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Select>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search…"
          aria-label="Search industries"
        />
      </div>

      {listQuery.isLoading ? <p>Loading industries…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load industries.</p> : null}

      {data ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Icon</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={6}>No industries found.</td>
                </tr>
              ) : (
                data.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td>{item.slug}</td>
                    <td>
                      {item.icon_key} / {item.accent_key}
                    </td>
                    <td>
                      <span className={item.is_active ? styles.badgeLive : styles.badgeDraft}>
                        {item.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td>{item.sort_order}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/industries/${item.id}`}>Edit</Link>
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
      ) : null}
    </section>
  );
}
