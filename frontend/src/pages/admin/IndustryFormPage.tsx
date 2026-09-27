import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/FormField";
import { createIndustry, fetchIndustry, updateIndustry } from "@/services/industries";
import type { IndustryFormValues } from "@/types/industry";

import styles from "./IndustryFormPage.module.css";

const EMPTY: IndustryFormValues = {
  slug: "",
  title: "",
  short: "",
  icon_key: "building",
  accent_key: "neon",
  is_active: true,
  sort_order: 0,
};

const ICONS = ["building", "book", "heart", "sprout", "chart", "truck", "shopping"];
const ACCENTS = ["neon", "violet", "pink", "blue"];

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
  return "Could not save industry.";
}

export function IndustryFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const industryId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<IndustryFormValues>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-industry", industryId],
    queryFn: () => fetchIndustry(industryId as number),
    enabled: industryId !== null && !Number.isNaN(industryId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const i = existingQuery.data;
    setValues({
      slug: i.slug,
      title: i.title,
      short: i.short,
      icon_key: i.icon_key,
      accent_key: i.accent_key,
      is_active: i.is_active,
      sort_order: i.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createIndustry(values);
      return updateIndustry(industryId as number, values);
    },
    onSuccess: (item) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-industries"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-industry-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-industries"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-industry", item.id] });
      navigate("/admin/industries");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof IndustryFormValues>(key: K, value: IndustryFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(title: string) {
    setField("title", title);
    if (!slugTouched) setField("slug", slugify(title));
    if (!values.short || values.short === values.title) setField("short", title);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.title.trim() || !values.slug.trim()) {
      setFormError("Title and slug are required.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) return <p>Loading industry…</p>;
  if (!isNew && existingQuery.isError) return <p className={styles.error}>Industry not found.</p>;

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/industries">Industries</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add industry" : "Edit industry"}</h1>
        </div>
        <Button variant="outline" to="/admin/industries">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Title" htmlFor="title">
            <TextInput id="title" value={values.title} onChange={(e) => onTitleChange(e.target.value)} required />
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
          <Field label="Short label" htmlFor="short">
            <TextInput
              id="short"
              value={values.short}
              onChange={(e) => setField("short", e.target.value)}
            />
          </Field>
          <Field label="Icon" htmlFor="icon_key">
            <Select
              id="icon_key"
              value={values.icon_key}
              onChange={(e) => setField("icon_key", e.target.value)}
            >
              {ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Accent" htmlFor="accent_key">
            <Select
              id="accent_key"
              value={values.accent_key}
              onChange={(e) => setField("accent_key", e.target.value)}
            >
              {ACCENTS.map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <aside className={styles.side}>
          <div className={styles.card}>
            <h2>Visibility</h2>
            <Field label="Status" htmlFor="is_active">
              <Select
                id="is_active"
                value={values.is_active ? "true" : "false"}
                onChange={(e) => setField("is_active", e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Select>
            </Field>
            <Field label="Sort order" htmlFor="sort_order">
              <TextInput
                id="sort_order"
                type="number"
                value={values.sort_order}
                onChange={(e) => setField("sort_order", Number(e.target.value) || 0)}
              />
            </Field>
          </div>
          {formError ? <p className={styles.error}>{formError}</p> : null}
          <Button variant="primary" type="submit" disabled={saveMutation.isPending} block>
            {saveMutation.isPending ? "Saving…" : isNew ? "Create industry" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
