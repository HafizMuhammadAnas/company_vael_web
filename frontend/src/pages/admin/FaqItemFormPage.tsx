import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/FormField";
import {
  createFaqItem,
  fetchFaqCategories,
  fetchFaqItem,
  updateFaqItem,
} from "@/services/faqs";
import type { FaqItemFormValues } from "@/types/faq";

import styles from "./FaqItemFormPage.module.css";

const EMPTY: FaqItemFormValues = {
  category_id: 0,
  question: "",
  answer: "",
  is_active: true,
  sort_order: 0,
};

function errorMessage(err: unknown): string {
  if (typeof err === "object" && err && "response" in err) {
    const response = (err as { response?: { data?: { detail?: unknown } } }).response;
    const detail = response?.data?.detail;
    if (typeof detail === "string") return detail;
  }
  return "Could not save FAQ.";
}

export function FaqItemFormPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const itemId = isNew ? null : Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<FaqItemFormValues>(EMPTY);
  const [formError, setFormError] = useState<string | null>(null);

  const categoriesQuery = useQuery({
    queryKey: ["admin-faq-categories"],
    queryFn: () => fetchFaqCategories(),
  });

  const existingQuery = useQuery({
    queryKey: ["admin-faq-item", itemId],
    queryFn: () => fetchFaqItem(itemId as number),
    enabled: itemId !== null && !Number.isNaN(itemId),
  });

  useEffect(() => {
    if (!existingQuery.data) return;
    const item = existingQuery.data;
    setValues({
      category_id: item.category_id,
      question: item.question,
      answer: item.answer,
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
  }, [existingQuery.data]);

  useEffect(() => {
    if (!isNew || values.category_id || !categoriesQuery.data?.length) return;
    setValues((prev) => ({ ...prev, category_id: categoriesQuery.data[0].id }));
  }, [isNew, values.category_id, categoriesQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) return createFaqItem(values);
      return updateFaqItem(itemId as number, values);
    },
    onSuccess: (item) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-items"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-categories"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      void queryClient.invalidateQueries({ queryKey: ["public-faq-category"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-faq-item", item.id] });
      navigate("/admin/faqs");
    },
    onError: (err) => setFormError(errorMessage(err)),
  });

  function setField<K extends keyof FaqItemFormValues>(key: K, value: FaqItemFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!values.category_id) {
      setFormError("Select a category.");
      return;
    }
    if (!values.question.trim() || !values.answer.trim()) {
      setFormError("Question and answer are required.");
      return;
    }
    saveMutation.mutate();
  }

  if (!isNew && existingQuery.isLoading) {
    return <p>Loading FAQ…</p>;
  }

  if (!isNew && existingQuery.isError) {
    return <p className={styles.error}>FAQ not found.</p>;
  }

  const categories = categoriesQuery.data ?? [];

  return (
    <section className={styles.wrap}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.crumb}>
            <Link to="/admin/faqs">FAQs</Link> / {isNew ? "New" : "Edit"}
          </p>
          <h1 className={styles.title}>{isNew ? "Add question" : "Edit question"}</h1>
        </div>
        <Button variant="outline" to="/admin/faqs">
          Back to list
        </Button>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.main}>
          <Field label="Category" htmlFor="category_id">
            <Select
              id="category_id"
              value={values.category_id || ""}
              onChange={(e) => setField("category_id", Number(e.target.value) || 0)}
              required
            >
              <option value="" disabled>
                Select category…
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Question" htmlFor="question">
            <TextInput
              id="question"
              value={values.question}
              onChange={(e) => setField("question", e.target.value)}
              required
            />
          </Field>

          <Field label="Answer" htmlFor="answer">
            <TextArea
              id="answer"
              rows={8}
              value={values.answer}
              onChange={(e) => setField("answer", e.target.value)}
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
            {saveMutation.isPending ? "Saving…" : isNew ? "Create question" : "Save changes"}
          </Button>
        </aside>
      </form>
    </section>
  );
}
