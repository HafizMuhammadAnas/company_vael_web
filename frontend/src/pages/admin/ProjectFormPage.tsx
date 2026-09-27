import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, FieldRow, Select, TextInput } from "@/components/ui/FormField";
import { createProject, fetchProject, updateProject } from "@/services/projects";
import type { ProjectFormValues, ProjectStatus } from "@/types/project";

import styles from "./ProjectFormPage.module.css";

const EMPTY: ProjectFormValues = {
  slug: "",
  title: "",
  industry: "",
  service: "",
  location: "",
  image_url: "",
  image_alt: "",
  live_url: "https://",
  status: "draft",
  featured: false,
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
  return "Could not save project.";
}

export function ProjectFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const projectId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<ProjectFormValues>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: () => fetchProject(projectId as number),
    enabled: projectId !== null && !Number.isNaN(projectId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const p = existingQuery.data;
    setValues({
      slug: p.slug,
      title: p.title,
      industry: p.industry,
      service: p.service,
      location: p.location,
      image_url: p.image_url,
      image_alt: p.image_alt,
      live_url: p.live_url,
      status: p.status,
      featured: p.featured,
      sort_order: p.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return values.image_url || "";
  }, [imageFile, values.image_url]);

  useEffect(() => {
    if (!imageFile || !previewUrl.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile, previewUrl]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createProject(values, imageFile);
      return updateProject(projectId as number, values, imageFile);
    },
    onSuccess: (project) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-project-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["published-projects"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-project", project.id] });
      navigate("/admin/projects");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
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
    if (isNew && !imageFile && !values.image_url.trim()) {
      setFormError("Add an image upload or image URL.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) {
    return <p>Loading project…</p>;
  }

  if (!isNew && existingQuery.isError) {
    return <p className={styles.error}>Project not found.</p>;
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/projects">Projects</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add project" : "Edit project"}</h1>
        </div>
        <Button variant="outline" to="/admin/projects">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Title" htmlFor="title">
            <TextInput
              id="title"
              value={values.title}
              onChange={(e) => onTitleChange(e.target.value)}
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
            <Field label="Industry" htmlFor="industry">
              <TextInput
                id="industry"
                value={values.industry}
                onChange={(e) => setField("industry", e.target.value)}
                required
              />
            </Field>
            <Field label="Service" htmlFor="service">
              <TextInput
                id="service"
                value={values.service}
                onChange={(e) => setField("service", e.target.value)}
                required
              />
            </Field>
          </FieldRow>

          <Field label="Location" htmlFor="location">
            <TextInput
              id="location"
              value={values.location}
              onChange={(e) => setField("location", e.target.value)}
              required
            />
          </Field>

          <Field label="Live URL" htmlFor="live_url">
            <TextInput
              id="live_url"
              type="url"
              value={values.live_url}
              onChange={(e) => setField("live_url", e.target.value)}
              required
            />
          </Field>

          <Field label="Image alt text" htmlFor="image_alt">
            <TextInput
              id="image_alt"
              value={values.image_alt}
              onChange={(e) => setField("image_alt", e.target.value)}
              placeholder="Describe the preview image"
            />
          </Field>

          <Field label="Image URL (optional if uploading)" htmlFor="image_url">
            <TextInput
              id="image_url"
              value={values.image_url}
              onChange={(e) => setField("image_url", e.target.value)}
              placeholder="https://… or leave blank when uploading"
            />
          </Field>

          <Field label="Upload image" htmlFor="image_file">
            <input
              id="image_file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
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
                onChange={(e) => setField("status", e.target.value as ProjectStatus)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) => setField("featured", e.target.checked)}
              />
              Featured
            </label>
          </div>

          <div className={styles.card}>
            <h2>Preview</h2>
            {previewUrl ? (
              <img src={previewUrl} alt="" className={styles.preview} />
            ) : (
              <p className={styles.muted}>No image yet.</p>
            )}
          </div>

          {formError ? <p className={styles.error}>{formError}</p> : null}

          <Button variant="primary" type="submit" disabled={saveMutation.isPending} block>
            {saveMutation.isPending ? "Saving…" : isNew ? "Create project" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
