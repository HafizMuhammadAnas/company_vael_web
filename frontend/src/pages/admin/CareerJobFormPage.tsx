import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { createCareerJob, fetchCareerJob, updateCareerJob } from "@/services/careers";
import type { CareerJobFormValues } from "@/types/career";

import styles from "./CareerJobFormPage.module.css";

const EMPTY: CareerJobFormValues = {
  slug: "",
  title: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  summary: "",
  description: "",
  requirements: [],
  apply_href: "mailto:careers@vaelkode.com",
  status: "draft",
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
  return "Could not save job.";
}

export function CareerJobFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const jobId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<CareerJobFormValues>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-career-job", jobId],
    queryFn: () => fetchCareerJob(jobId as number),
    enabled: jobId !== null && !Number.isNaN(jobId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const j = existingQuery.data;
    setValues({
      slug: j.slug,
      title: j.title,
      department: j.department,
      location: j.location,
      employment_type: j.employment_type,
      summary: j.summary,
      description: j.description,
      requirements: (j.requirements as string[]) || [],
      apply_href: j.apply_href,
      status: j.status,
      is_active: j.is_active,
      sort_order: j.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createCareerJob(values);
      return updateCareerJob(jobId as number, values);
    },
    onSuccess: (job) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-career-jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-career-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-careers"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-career-job", job.id] });
      navigate("/admin/careers");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof CareerJobFormValues>(key: K, value: CareerJobFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(title: string) {
    setField("title", title);
    if (!slugTouched) setField("slug", slugify(title));
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

  if (!isNew && existingQuery.isLoading) return <p>Loading job…</p>;
  if (!isNew && existingQuery.isError) return <p className={styles.error}>Job not found.</p>;

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/careers">Careers</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add job" : "Edit job"}</h1>
        </div>
        <Button variant="outline" to="/admin/careers">
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
          <Field label="Department" htmlFor="department">
            <TextInput
              id="department"
              value={values.department}
              onChange={(e) => setField("department", e.target.value)}
            />
          </Field>
          <Field label="Location" htmlFor="location">
            <TextInput
              id="location"
              value={values.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </Field>
          <Field label="Employment type" htmlFor="employment_type">
            <TextInput
              id="employment_type"
              value={values.employment_type}
              onChange={(e) => setField("employment_type", e.target.value)}
            />
          </Field>
          <Field label="Summary" htmlFor="summary">
            <TextArea
              id="summary"
              rows={3}
              value={values.summary}
              onChange={(e) => setField("summary", e.target.value)}
            />
          </Field>
          <Field label="Description" htmlFor="description">
            <TextArea
              id="description"
              rows={6}
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Field>
          <Field label="Requirements (one per line)" htmlFor="requirements">
            <TextArea
              id="requirements"
              rows={4}
              value={values.requirements.join("\n")}
              onChange={(e) =>
                setField(
                  "requirements",
                  e.target.value.split("\n").map((x) => x.trim()).filter(Boolean),
                )
              }
            />
          </Field>
          <Field label="Apply href" htmlFor="apply_href">
            <TextInput
              id="apply_href"
              value={values.apply_href}
              onChange={(e) => setField("apply_href", e.target.value)}
            />
          </Field>
        </div>

        <aside className={styles.side}>
          <div className={styles.card}>
            <h2>Visibility</h2>
            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={values.status}
                onChange={(e) => setField("status", e.target.value as CareerJobFormValues["status"])}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </Field>
            <Field label="Active" htmlFor="is_active">
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
            {saveMutation.isPending ? "Saving…" : isNew ? "Create job" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
