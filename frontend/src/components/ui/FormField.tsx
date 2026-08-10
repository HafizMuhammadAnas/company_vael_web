import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import styles from "./FormField.module.css";

interface FieldWrapperProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

/** Label + control + optional error, styled as the wireframe `form-group`. */
export function Field({ label, htmlFor, error, children }: FieldWrapperProps) {
  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={htmlFor}>
        // {label}
      </label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

/** Two-column responsive row for side-by-side fields. */
export function FieldRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.control} {...props} />;
}

export function Select({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={`${styles.control} ${styles.select}`} {...props}>
      {children}
    </select>
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${styles.control} ${styles.textarea}`} {...props} />;
}
