import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, FieldRow, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteCareerJob,
  fetchCareerJobs,
  fetchCareerSettings,
  fetchCareerStats,
  updateCareerSettings,
} from "@/services/careers";
import type { CareerSettingsFormValues } from "@/types/career";

import styles from "./CareersAdminPage.module.css";

function settingsToForm(s: Awaited<ReturnType<typeof fetchCareerSettings>>): CareerSettingsFormValues {
  const { id: _id, updated_at: _u, ...rest } = s;
  return rest;
}

export function CareersAdminPage() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "editor";
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? "";
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1") || 1;
  const [searchInput, setSearchInput] = useState(query);
  const [form, setForm] = useState<CareerSettingsFormValues | null>(null);
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

  const statsQuery = useQuery({ queryKey: ["admin-career-stats"], queryFn: fetchCareerStats });
  const settingsQuery = useQuery({ queryKey: ["admin-career-settings"], queryFn: fetchCareerSettings });
  const listQuery = useQuery({
    queryKey: ["admin-career-jobs", status, query, page],
    queryFn: () =>
      fetchCareerJobs({
        status: status || undefined,
        q: query || undefined,
        page,
        page_size: 20,
      }),
  });

  useEffect(() => {
    if (!settingsQuery.data || form) return;
    setForm(settingsToForm(settingsQuery.data));
  }, [settingsQuery.data, form]);

  const settingsMutation = useMutation({
    mutationFn: updateCareerSettings,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-career-settings"] });
      void queryClient.invalidateQueries({ queryKey: ["public-careers"] });
      setSettingsSaved(true);
      setSettingsError(null);
    },
    onError: () => setSettingsError("Could not save settings."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCareerJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-career-jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-career-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-careers"] });
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
    if (!form || !canEdit) return;
    setSettingsSaved(false);
    settingsMutation.mutate(form);
  }

  const data = listQuery.data;
  const stats = statsQuery.data;

  return (
    <section>
      <div className={styles.headingRow}>
        <div>
          <h1 className={styles.title}>Careers</h1>
          <p className={styles.subtitle}>/careers page content and optional job openings.</p>
        </div>
        {canEdit ? (
          <Button variant="primary" to="/admin/careers/jobs/new">
            Add job
          </Button>
        ) : null}
      </div>

      {stats ? (
        <div className={styles.kpis}>
          <div className={styles.kpi}>
            <span>Total jobs</span>
            <strong>{stats.total}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Published</span>
            <strong>{stats.published}</strong>
          </div>
          <div className={styles.kpi}>
            <span>Draft</span>
            <strong>{stats.draft}</strong>
          </div>
        </div>
      ) : null}

      {form ? (
        <form className={styles.settings} onSubmit={onSaveSettings}>
          <h2>Page settings</h2>
          <FieldRow>
            <Field label="SEO title" htmlFor="seo_title">
              <TextInput
                id="seo_title"
                value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Hero label" htmlFor="hero_label">
              <TextInput
                id="hero_label"
                value={form.hero_label}
                onChange={(e) => setForm({ ...form, hero_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="SEO description" htmlFor="seo_description">
            <TextArea
              id="seo_description"
              rows={2}
              value={form.seo_description}
              onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <Field label="Hero title" htmlFor="hero_title">
            <TextInput
              id="hero_title"
              value={form.hero_title}
              onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <Field label="Hero supporting" htmlFor="hero_supporting">
            <TextArea
              id="hero_supporting"
              rows={3}
              value={form.hero_supporting}
              onChange={(e) => setForm({ ...form, hero_supporting: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Why label" htmlFor="why_label">
              <TextInput
                id="why_label"
                value={form.why_label}
                onChange={(e) => setForm({ ...form, why_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Why heading" htmlFor="why_heading">
              <TextInput
                id="why_heading"
                value={form.why_heading}
                onChange={(e) => setForm({ ...form, why_heading: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="Why cards (JSON array of {title, text})" htmlFor="why_cards">
            <TextArea
              id="why_cards"
              rows={6}
              value={JSON.stringify(form.why_cards, null, 2)}
              onChange={(e) => {
                try {
                  setForm({ ...form, why_cards: JSON.parse(e.target.value) });
                } catch {
                  /* keep typing */
                }
              }}
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Look-for label" htmlFor="look_label">
              <TextInput
                id="look_label"
                value={form.look_label}
                onChange={(e) => setForm({ ...form, look_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Look-for heading" htmlFor="look_heading">
              <TextInput
                id="look_heading"
                value={form.look_heading}
                onChange={(e) => setForm({ ...form, look_heading: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="Look-for supporting" htmlFor="look_supporting">
            <TextArea
              id="look_supporting"
              rows={2}
              value={form.look_supporting}
              onChange={(e) => setForm({ ...form, look_supporting: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <Field label="Qualities (one per line)" htmlFor="look_qualities">
            <TextArea
              id="look_qualities"
              rows={4}
              value={form.look_qualities.join("\n")}
              onChange={(e) =>
                setForm({
                  ...form,
                  look_qualities: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean),
                })
              }
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Opportunities label" htmlFor="opportunities_label">
              <TextInput
                id="opportunities_label"
                value={form.opportunities_label}
                onChange={(e) => setForm({ ...form, opportunities_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Opportunities heading" htmlFor="opportunities_heading">
              <TextInput
                id="opportunities_heading"
                value={form.opportunities_heading}
                onChange={(e) => setForm({ ...form, opportunities_heading: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="Empty state (one line per paragraph)" htmlFor="empty_state">
            <TextArea
              id="empty_state"
              rows={3}
              value={form.empty_state.join("\n")}
              onChange={(e) =>
                setForm({
                  ...form,
                  empty_state: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean),
                })
              }
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Profile CTA label" htmlFor="profile_cta_label">
              <TextInput
                id="profile_cta_label"
                value={form.profile_cta_label}
                onChange={(e) => setForm({ ...form, profile_cta_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Profile CTA href" htmlFor="profile_cta_href">
              <TextInput
                id="profile_cta_href"
                value={form.profile_cta_href}
                onChange={(e) => setForm({ ...form, profile_cta_href: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field label="Final CTA label" htmlFor="final_label">
              <TextInput
                id="final_label"
                value={form.final_label}
                onChange={(e) => setForm({ ...form, final_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Final heading" htmlFor="final_heading">
              <TextInput
                id="final_heading"
                value={form.final_heading}
                onChange={(e) => setForm({ ...form, final_heading: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
          <Field label="Final supporting" htmlFor="final_supporting">
            <TextArea
              id="final_supporting"
              rows={2}
              value={form.final_supporting}
              onChange={(e) => setForm({ ...form, final_supporting: e.target.value })}
              disabled={!canEdit}
            />
          </Field>
          <FieldRow>
            <Field label="Final button label" htmlFor="final_cta_label">
              <TextInput
                id="final_cta_label"
                value={form.final_cta_label}
                onChange={(e) => setForm({ ...form, final_cta_label: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
            <Field label="Final button path" htmlFor="final_cta_to">
              <TextInput
                id="final_cta_to"
                value={form.final_cta_to}
                onChange={(e) => setForm({ ...form, final_cta_to: e.target.value })}
                disabled={!canEdit}
              />
            </Field>
          </FieldRow>
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
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Select>
        <TextInput
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search jobs…"
          aria-label="Search jobs"
        />
      </div>

      {listQuery.isLoading ? <p>Loading jobs…</p> : null}
      {listQuery.isError ? <p className={styles.error}>Could not load jobs.</p> : null}

      {data ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5}>No job openings yet (empty state shows on /careers).</td>
                </tr>
              ) : (
                data.items.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <strong>{job.title}</strong>
                      <span className={styles.muted}>{job.location || job.employment_type}</span>
                    </td>
                    <td>{job.department || "—"}</td>
                    <td>
                      <span
                        className={job.status === "published" ? styles.badgeLive : styles.badgeDraft}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{job.sort_order}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link to={`/admin/careers/jobs/${job.id}`}>Edit</Link>
                        {canEdit ? (
                          <button
                            type="button"
                            className={styles.danger}
                            onClick={() => {
                              if (window.confirm(`Delete “${job.title}”?`)) {
                                deleteMutation.mutate(job.id);
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
