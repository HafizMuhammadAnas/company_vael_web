export const DEFAULT_SITE_URL = "https://vaelkode.com";

/** Public site origin for canonical URLs, sitemap, and Open Graph. */
export function getSiteUrl(): string {
  const fromEnv =
    typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : undefined;
  return (fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL).replace(/\/$/, "");
}
