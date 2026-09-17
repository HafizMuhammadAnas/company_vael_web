import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/FormField";
import { createClient, fetchClient, updateClient } from "@/services/clients";
import type { ClientFormValues } from "@/types/client";

import styles from "./ClientFormPage.module.css";

const EMPTY: ClientFormValues = {
  slug: "",
  name: "",
  logo_url: "",
  logo_alt: "",
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
  return "Could not save client logo.";
}

export function ClientFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const clientId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<ClientFormValues>(EMPTY);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-client", clientId],
    queryFn: () => fetchClient(clientId as number),
    enabled: clientId !== null && !Number.isNaN(clientId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const c = existingQuery.data;
    setValues({
      slug: c.slug,
      name: c.name,
      logo_url: c.logo_url,
      logo_alt: c.logo_alt,
      is_active: c.is_active,
      sort_order: c.sort_order,
    });
    setSlugTouched(true);
  }, [existingQuery.data]);

  const previewUrl = useMemo(() => {
    if (logoFile) return URL.createObjectURL(logoFile);
    return values.logo_url || "";
  }, [logoFile, values.logo_url]);

  useEffect(() => {
    if (!logoFile || !previewUrl.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [logoFile, previewUrl]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createClient(values, logoFile);
      return updateClient(clientId as number, values, logoFile);
    },
    onSuccess: (client) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-clients"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-client-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["active-clients"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-client", client.id] });
      navigate("/admin/clients");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof ClientFormValues>(key: K, value: ClientFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onNameChange(name: string) {
    setField("name", name);
    if (!slugTouched) setField("slug", slugify(name));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.name.trim() || !values.slug.trim()) {
      setFormError("Name and slug are required.");
      return;
    }
    if (isNew && !logoFile && !values.logo_url.trim()) {
      setFormError("Add a logo upload or logo URL.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) {
    return <p>Loading client…</p>;
  }

  if (!isNew && existingQuery.isError) {
    return <p className={styles.error}>Client not found.</p>;
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/clients">Client logos</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add client logo" : "Edit client logo"}</h1>
        </div>
        <Button variant="outline" to="/admin/clients">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Name" htmlFor="name">
            <TextInput
              id="name"
              value={values.name}
              onChange={(e) => onNameChange(e.target.value)}
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

          <Field label="Logo alt text" htmlFor="logo_alt">
            <TextInput
              id="logo_alt"
              value={values.logo_alt}
              onChange={(e) => setField("logo_alt", e.target.value)}
              placeholder="Brand name logo"
            />
          </Field>

          <Field label="Logo URL (optional if uploading)" htmlFor="logo_url">
            <TextInput
              id="logo_url"
              value={values.logo_url}
              onChange={(e) => setField("logo_url", e.target.value)}
              placeholder="/clients/brand.svg or https://…"
            />
          </Field>

          <Field label="Upload logo" htmlFor="logo_file">
            <input
              id="logo_file"
              type="file"
              accept="image/svg+xml,image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
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

          <div className={styles.card}>
            <h2>Preview</h2>
            {previewUrl ? (
              <img src={previewUrl} alt="" className={styles.preview} />
            ) : (
              <p className={styles.muted}>No logo yet.</p>
            )}
          </div>

          {formError ? <p className={styles.error}>{formError}</p> : null}

          <Button variant="primary" type="submit" disabled={saveMutation.isPending} block>
            {saveMutation.isPending ? "Saving…" : isNew ? "Create logo" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
