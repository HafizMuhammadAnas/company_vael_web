import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, FieldRow, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { INS_BLOG } from "@/content/insights";
import { createInsight, fetchInsight, updateInsight } from "@/services/insights";
import type { InsightCover, InsightFormValues, InsightStatus } from "@/types/insight";

import styles from "./InsightFormPage.module.css";

const COVERS: InsightCover[] = ["mesh", "orbits", "circuits", "waves", "nodes", "book"];

const EMPTY: InsightFormValues = {
  slug: "",
  title: "",
  category: INS_BLOG.categories[0] ?? "Software Engineering",
  tags: "",
  description: "",
  body: "",
  read_time: "8 min",
  cover: "mesh",
  status: "draft",
  featured: false,
  published_date: "",
  sort_order: 0,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function errorMessage(err: unknown): string {
  if (typeof err === "object" && err && "response" in err) {
    const response = (err as { response?: { data?: { detail?: unknown } } }).response;
    const detail = response?.data?.detail;
    if (typeof detail === "string") return detail;
  }
  return "Could not save insight.";
}

export function InsightFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const insightId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<InsightFormValues>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-insight", insightId],
    queryFn: () => fetchInsight(insightId as number),
    enabled: insightId !== null && !Number.isNaN(insightId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const item = existingQuery.data;
    setValues({
      slug: item.slug,
      title: item.title,
      category: item.category,
      tags: item.tags.join(", "),
      description: item.description,
      body: item.body,
      read_time: item.read_time,
      cover: item.cover,
      status: item.status,
      featured: item.featured,
      published_date: item.published_date ?? "",
      sort_order: item.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createInsight(values);
      return updateInsight(insightId as number, values);
    },
    onSuccess: (item) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-insights"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-insight-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-insights"] });
      void queryClient.invalidateQueries({ queryKey: ["public-insight", item.slug] });
      void queryClient.invalidateQueries({ queryKey: ["admin-insight", item.id] });
      navigate("/admin/insights");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof InsightFormValues>(key: K, value: InsightFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.title.trim() || !values.slug.trim()) {
      setFormError("Title and slug are required.");
      return;
    }
    if (values.status === "published" && !values.body.trim()) {
      setFormError("Published insights need article body content.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) return <p>Loading insight…</p>;
  if (!isNew && existingQuery.isError) return <p className={styles.error}>Insight not found.</p>;

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/insights">Insights</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add insight" : "Edit insight"}</h1>
        </div>
        <Button variant="outline" to="/admin/insights">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Title" htmlFor="title">
            <TextInput
              id="title"
              value={values.title}
              onChange={(e) => {
                setField("title", e.target.value);
                if (!slugTouched) setField("slug", slugify(e.target.value));
              }}
              required
            />
          </Field>
          <Field label="Slug" htmlFor="slug">
            <TextInput
              id="slug"
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField("slug", e.target.value);
              }}
              required
            />
          </Field>
          <FieldRow>
            <Field label="Category" htmlFor="category">
              <Select
                id="category"
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
              >
                {INS_BLOG.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Read time" htmlFor="read_time">
              <TextInput
                id="read_time"
                value={values.read_time}
                onChange={(e) => setField("read_time", e.target.value)}
              />
            </Field>
          </FieldRow>
          <Field label="Tags (comma-separated)" htmlFor="tags">
            <TextInput
              id="tags"
              value={values.tags}
              onChange={(e) => setField("tags", e.target.value)}
              placeholder="AI, Automation"
            />
          </Field>
          <Field label="Short description" htmlFor="description">
            <TextArea
              id="description"
              rows={3}
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Field>
          <Field label="Article body" htmlFor="body">
            <TextArea
              id="body"
              rows={14}
              value={values.body}
              onChange={(e) => setField("body", e.target.value)}
              placeholder="Write the full article. Separate paragraphs with a blank line."
            />
          </Field>
        </div>

        <aside className={styles.side}>
          <div className={styles.card}>
            <h2>Publishing</h2>
            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={values.status}
                onChange={(e) => setField("status", e.target.value as InsightStatus)}
              >
                <option value="draft">Draft</option>
                <option value="coming-soon">Coming soon</option>
                <option value="published">Published</option>
              </Select>
            </Field>
            <Field label="Cover style" htmlFor="cover">
              <Select
                id="cover"
                value={values.cover}
                onChange={(e) => setField("cover", e.target.value as InsightCover)}
              >
                {COVERS.map((cover) => (
                  <option key={cover} value={cover}>
                    {cover}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Published date" htmlFor="published_date">
              <TextInput
                id="published_date"
                type="date"
                value={values.published_date}
                onChange={(e) => setField("published_date", e.target.value)}
              />
            </Field>
            <Field label="Sort order" htmlFor="sort_order">
              <TextInput
                id="sort_order"
                type="number"
                value={values.sort_order}
                onChange={(e) => setField("sort_order", Number(e.target.value) || 0)}
              />
            </Field>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) => setField("featured", e.target.checked)}
              />
              Featured
            </label>
          </div>

          {formError ? <p className={styles.error}>{formError}</p> : null}

          <Button variant="primary" type="submit" disabled={saveMutation.isPending} block>
            {saveMutation.isPending ? "Saving…" : isNew ? "Create insight" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
