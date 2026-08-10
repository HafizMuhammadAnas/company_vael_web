/**
 * Lightweight API client for public form submissions.
 *
 * The base URL is read from `VITE_API_URL` (see `.env`); when unset it defaults
 * to a same-origin relative path so a dev proxy or production reverse-proxy can
 * forward `/api/*` to the FastAPI backend.
 */
const rawBase = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
export const API_BASE = rawBase.replace(/\/$/, "");

export const LEADS_ENDPOINT = `${API_BASE}/api/v1/public/leads`;

export interface LeadPayload {
  /** Which form produced the lead: "contact" | "consultation" | "proposal". */
  form_type: string;
  [key: string]: unknown;
}

/**
 * Submit a lead to the backend. When `files` are provided the request is sent
 * as multipart/form-data, otherwise as JSON. Throws on a non-2xx response so
 * callers can surface an error state (leads are never silently dropped).
 */
export async function submitLead(payload: LeadPayload, files: File[] = []): Promise<unknown> {
  let response: Response;

  if (files.length > 0) {
    const form = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      form.append(key, value == null ? "" : String(value));
    }
    for (const file of files) {
      form.append("attachments", file);
    }
    response = await fetch(LEADS_ENDPOINT, { method: "POST", body: form });
  } else {
    response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    throw new Error(`Submission failed (${response.status}). Please try again.`);
  }

  return response.json().catch(() => ({}));
}
