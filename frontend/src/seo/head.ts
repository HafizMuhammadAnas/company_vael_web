import { getSiteUrl } from "./site";

export interface PageHead {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

export function canonicalUrl(path: string, siteUrl = getSiteUrl()): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/** HTML fragment injected into <head> during SSG (includes <title>). */
export function buildHeadTags(meta: PageHead, siteUrl = getSiteUrl()): string {
  const canonical = canonicalUrl(meta.path, siteUrl);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const robots = meta.noindex ? `\n    <meta name="robots" content="noindex, nofollow" />` : "";

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="${siteUrl}/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="${siteUrl}/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="${siteUrl}/apple-touch-icon.png" sizes="180x180" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="VAELKODE" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/icon-512.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/icon-512.png" />${robots}`;
}
