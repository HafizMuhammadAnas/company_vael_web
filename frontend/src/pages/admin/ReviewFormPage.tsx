import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/FormField";
import { createReview, fetchReview, updateReview } from "@/services/googleReviews";
import type { ReviewFormValues } from "@/types/googleReview";

import styles from "./ReviewFormPage.module.css";

const EMPTY: ReviewFormValues = {
  author: "",
  relative_time: "",
  rating: 5,
  text: "",
  initials: "",
  avatar_src: "",
  avatar_color: "#4285F4",
  is_active: true,
  sort_order: 0,
};

function errorMessage(err: unknown): string {
  if (typeof err === "object" && err && "response" in err) {
    const response = (err as { response?: { data?: { detail?: unknown } } }).response;
    const detail = response?.data?.detail;
    if (typeof detail === "string") return detail;
  }
  return "Could not save review.";
}

export function ReviewFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const reviewId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<ReviewFormValues>(EMPTY);
  const [formError, setFormError] = useState<string | null>(null);

  const existingQuery = useQuery({
    queryKey: ["admin-review", reviewId],
    queryFn: () => fetchReview(reviewId as number),
    enabled: reviewId !== null && !Number.isNaN(reviewId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const r = existingQuery.data;
    setValues({
      author: r.author,
      relative_time: r.relative_time,
      rating: r.rating,
      text: r.text,
      initials: r.initials,
      avatar_src: r.avatar_src,
      avatar_color: r.avatar_color,
      is_active: r.is_active,
      sort_order: r.sort_order,
    });
  }, [existingQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createReview(values);
      return updateReview(reviewId as number, values);
    },
    onSuccess: (review) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-review-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-google-reviews"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-review", review.id] });
      navigate("/admin/reviews");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof ReviewFormValues>(key: K, value: ReviewFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.author.trim() || !values.text.trim()) {
      setFormError("Author and review text are required.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) {
    return <p>Loading review…</p>;
  }

  if (!isNew && existingQuery.isError) {
    return <p className={styles.error}>Review not found.</p>;
  }

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/reviews">Google reviews</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add review" : "Edit review"}</h1>
        </div>
        <Button variant="outline" to="/admin/reviews">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Author" htmlFor="author">
            <TextInput
              id="author"
              value={values.author}
              onChange={(e) => setField("author", e.target.value)}
              required
            />
          </Field>

          <Field label="Relative time" htmlFor="relative_time">
            <TextInput
              id="relative_time"
              value={values.relative_time}
              onChange={(e) => setField("relative_time", e.target.value)}
              placeholder="2 months ago"
            />
          </Field>

          <Field label="Review text" htmlFor="text">
            <TextArea
              id="text"
              rows={6}
              value={values.text}
              onChange={(e) => setField("text", e.target.value)}
              required
            />
          </Field>

          <Field label="Initials (optional)" htmlFor="initials">
            <TextInput
              id="initials"
              value={values.initials}
              onChange={(e) => setField("initials", e.target.value)}
              placeholder="NG"
              maxLength={8}
            />
          </Field>

          <Field label="Avatar image URL (optional)" htmlFor="avatar_src">
            <TextInput
              id="avatar_src"
              value={values.avatar_src}
              onChange={(e) => setField("avatar_src", e.target.value)}
              placeholder="https://…"
            />
          </Field>

          <Field label="Avatar color" htmlFor="avatar_color">
            <TextInput
              id="avatar_color"
              value={values.avatar_color}
              onChange={(e) => setField("avatar_color", e.target.value)}
              placeholder="#4285F4"
            />
          </Field>
        </div>

        <aside className={styles.side}>
          <div className={styles.card}>
            <h2>Visibility</h2>
            <Field label="Rating (1–5)" htmlFor="rating">
              <TextInput
                id="rating"
                type="number"
                min={1}
                max={5}
                value={values.rating}
                onChange={(e) => setField("rating", Number(e.target.value) || 5)}
              />
            </Field>
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
            {saveMutation.isPending ? "Saving…" : isNew ? "Create review" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
