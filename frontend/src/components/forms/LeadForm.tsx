import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Field, FieldRow, Select, TextArea, TextInput } from "@/components/ui";
import { COMPANY } from "@/constants/company";
import { submitLead } from "@/lib/api";

import styles from "./LeadForm.module.css";

export interface LeadFieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea" | "file" | "checkbox";
  required?: boolean;
  placeholder?: string;
  /** Options for a `select` field (first entry renders as the disabled hint). */
  options?: string[];
  /** Pair with the adjacent field on one row (desktop). */
  half?: boolean;
  helper?: string;
  /** `accept` attribute for a `file` field. */
  accept?: string;
  multiple?: boolean;
  /** Max size (MB) enforced per file for a `file` field. */
  maxSizeMb?: number;
}

interface LeadFormProps {
  /** Identifies the source form on the backend. */
  formType: string;
  fields: LeadFieldConfig[];
  submitLabel: string;
  /** Navigate here on success (e.g. "/thank-you"). Omit to show inline success. */
  redirectTo?: string;
  /** Short reassurance line shown next to the submit button. */
  trust?: string;
  successTitle?: string;
  successText?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_EMAIL = COMPANY.contact.email;

type Status = "idle" | "submitting" | "error" | "success";

/** Renders a consent sentence, linking any "Privacy Policy" mention to the page. */
function withPrivacyLink(text: string): ReactNode {
  const marker = "Privacy Policy";
  const parts = text.split(marker);
  if (parts.length !== 2) return text;
  return (
    <>
      {parts[0]}
      <Link to="/privacy-policy" className={styles.consentLink}>
        {marker}
      </Link>
      {parts[1]}
    </>
  );
}

/** Groups consecutive `half` fields into pairs so they render side by side. */
function groupRows(fields: LeadFieldConfig[]): LeadFieldConfig[][] {
  const rows: LeadFieldConfig[][] = [];
  let i = 0;
  while (i < fields.length) {
    const field = fields[i];
    if (field.half && fields[i + 1]?.half) {
      rows.push([field, fields[i + 1]]);
      i += 2;
    } else {
      rows.push([field]);
      i += 1;
    }
  }
  return rows;
}

export function LeadForm({
  formType,
  fields,
  submitLabel,
  redirectTo,
  trust,
  successTitle = "Thank you. We've received your message.",
  successText = "Our team will review your request and get back to you regarding the next steps.",
}: LeadFormProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>, name: string) {
    setFiles((prev) => ({ ...prev, [name]: Array.from(e.target.files ?? []) }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();

      if (field.type === "file") {
        const selected = files[field.name] ?? [];
        if (field.required && !selected.length) {
          next[field.name] = "Please attach at least one file.";
        } else if (field.maxSizeMb && selected.some((f) => f.size > field.maxSizeMb! * 1024 * 1024)) {
          next[field.name] = `Each file must be under ${field.maxSizeMb} MB.`;
        }
        continue;
      }

      if (field.type === "checkbox") {
        if (field.required && value !== "yes") {
          next[field.name] = "Please confirm this to continue.";
        }
        continue;
      }

      if (field.required && !value) {
        next[field.name] = "This field is required.";
      }
      if (field.type === "email" && value && !EMAIL_RE.test(value)) {
        next[field.name] = "Please enter a valid email address.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");
    try {
      const attachments = Object.values(files).flat();
      await submitLead({ form_type: formType, ...values }, attachments);
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success}>
        <div className={styles.successTitle}>{successTitle}</div>
        <p className={styles.successText}>{successText}</p>
      </div>
    );
  }

  function renderControl(field: LeadFieldConfig) {
    const id = `${formType}-${field.name}`;
    const common = { id, name: field.name };
    switch (field.type) {
      case "textarea":
        return (
          <TextArea
            {...common}
            placeholder={field.placeholder}
            value={values[field.name] ?? ""}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );
      case "select":
        return (
          <Select
            {...common}
            value={values[field.name] ?? ""}
            onChange={(e) => setValue(field.name, e.target.value)}
          >
            <option value="">{field.placeholder ?? "Select an option"}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        );
      case "file":
        return (
          <>
            <input
              {...common}
              type="file"
              className={`${styles.fileInput}`}
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => onFileChange(e, field.name)}
            />
            {files[field.name]?.length ? (
              <ul className={styles.fileList}>
                {files[field.name].map((f) => (
                  <li key={f.name} className={styles.fileChip}>
                    {f.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        );
      default:
        return (
          <TextInput
            {...common}
            type={field.type ?? "text"}
            placeholder={field.placeholder}
            value={values[field.name] ?? ""}
            onChange={(e) => setValue(field.name, e.target.value)}
          />
        );
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {groupRows(fields).map((row) => {
        const controls = row.map((field) =>
          field.type === "checkbox" ? (
            <div className={styles.consent} key={field.name}>
              <label className={styles.consentLabel} htmlFor={`${formType}-${field.name}`}>
                <input
                  id={`${formType}-${field.name}`}
                  name={field.name}
                  type="checkbox"
                  className={styles.consentBox}
                  checked={values[field.name] === "yes"}
                  onChange={(e) => setValue(field.name, e.target.checked ? "yes" : "")}
                />
                <span className={styles.consentText}>
                  {withPrivacyLink(field.label)}
                  {field.required && " *"}
                </span>
              </label>
              {errors[field.name] && <span className={styles.consentError}>{errors[field.name]}</span>}
            </div>
          ) : (
            <Field
              key={field.name}
              label={field.required ? `${field.label} *` : field.label}
              htmlFor={`${formType}-${field.name}`}
              error={errors[field.name]}
            >
              {renderControl(field)}
              {field.helper && <span className={styles.helper}>{field.helper}</span>}
            </Field>
          ),
        );
        return row.length === 2 ? (
          <FieldRow key={row.map((f) => f.name).join("-")}>{controls}</FieldRow>
        ) : (
          controls
        );
      })}

      {status === "error" && (
        <div className={styles.banner} role="alert">
          {serverError} If the problem persists, email us at{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
        </div>
      )}

      <div className={styles.actions}>
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
        {trust && <span className={styles.trust}>{trust}</span>}
      </div>
    </form>
  );
}
