import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/FormField";
import {
  createFaqCategory,
  fetchFaqCategory,
  updateFaqCategory,
} from "@/services/faqs";
import type { FaqCategoryFormValues } from "@/types/faq";

import styles from "./FaqCategoryFormPage.module.css";

const EMPTY: FaqCategoryFormValues = {
  slug: "",
  label: "",
  section_label: "",
  heading: "",
  is_active: true,
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
  return "Could not save category.";
}

export function FaqCategoryFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const categoryId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<FaqCategoryFormValues>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-faq-category", categoryId],
    queryFn: () => fetchFaqCategory(categoryId as number),
    enabled: categoryId !== null && !Number.isNaN(categoryId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const cat = existingQuery.data;
    setValues({
      slug: cat.slug,
      label: cat.label,
      section_label: cat.section_label,
      heading: cat.heading,
      is_active: cat.is_active,
      sort_order: cat.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createFaqCategory(values);
      return updateFaqCategory(categoryId as number, values);
    },
    onSuccess: (cat) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-categories"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faq-category"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-category", cat.id] });
      navigate("/admin/faqs/categories");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof FaqCategoryFormValues>(
    key: K,
    value: FaqCategoryFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onLabelChange(label: string) {
    setField("label", label);
    if (!slugTouched) setField("slug", slugify(label));
    if (!values.section_label || values.section_label === values.label) {
      setField("section_label", label);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.label.trim() || !values.slug.trim() || !values.heading.trim()) {
      setFormError("Label, slug, and heading are required.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) {
    return <p>Loading category…</p>;
  }

  if (!isNew && existingQuery.isError) {
    return <p className={styles.error}>Category not found.</p>;
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/faqs/categories">Categories</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add category" : "Edit category"}</h1>
        </div>
        <Button variant="outline" to="/admin/faqs/categories">
          Back to categories
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Label" htmlFor="label">
            <TextInput
              id="label"
              value={values.label}
              onChange={(e) => onLabelChange(e.target.value)}
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
          <Field label="Section label" htmlFor="section_label">
            <TextInput
              id="section_label"
              value={values.section_label}
              onChange={(e) => setField("section_label", e.target.value)}
            />
          </Field>
          <Field label="Heading" htmlFor="heading">
            <TextInput
              id="heading"
              value={values.heading}
              onChange={(e) => setField("heading", e.target.value)}
              required
            />
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
            {saveMutation.isPending ? "Saving…" : isNew ? "Create category" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
