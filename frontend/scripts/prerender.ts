/**
 * Post-build SSG step: render each marketing route to static HTML,
 * then emit sitemap.xml and robots.txt.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildHeadTags } from "../src/seo/head.ts";
import { PRERENDER_ROUTES, SITEMAP_ROUTES } from "../src/seo/prerenderRoutes.ts";
import { DEFAULT_SITE_URL } from "../src/seo/site.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = join(rootDir, "dist");
const serverEntry = join(distDir, "server", "entry-server.js");

function routeToOutputPath(routePath: string): string {
  if (routePath === "/") return join(distDir, "index.html");
  const segments = routePath.replace(/^\//, "").split("/");
  return join(distDir, ...segments, "index.html");
}

function injectTemplate(template: string, headTags: string, appHtml: string): string {
  return template
    .replace("<!--ssg-head-->", headTags)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function buildSitemap(siteUrl: string): string {
  const urls = SITEMAP_ROUTES.map((entry) => {
    const loc = entry.path === "/" ? siteUrl : `${siteUrl}${entry.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${entry.changefreq ?? "monthly"}</changefreq>
    <priority>${(entry.priority ?? 0.7).toFixed(1)}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

function buildRobots(siteUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

async function main() {
  const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  const template = readFileSync(join(distDir, "index.html"), "utf8");
  const { render } = await import(pathToFileURL(serverEntry).href);

  let written = 0;
  let skipped = 0;

  for (const entry of PRERENDER_ROUTES) {
    const result = await render(entry.path, siteUrl);

    if (result.kind === "redirect") {
      console.warn(`[ssg] skip ${entry.path} → redirect ${result.location} (${result.status})`);
      skipped += 1;
      continue;
    }

    if (result.status >= 400) {
      console.warn(`[ssg] skip ${entry.path} → HTTP ${result.status}`);
      skipped += 1;
      continue;
    }

    const headTags = buildHeadTags(
      {
        path: entry.path,
        title: entry.title,
        description: entry.description,
        noindex: entry.noindex,
      },
      siteUrl,
    );

    const html = injectTemplate(template, headTags, result.html);
    const outPath = routeToOutputPath(entry.path);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    written += 1;
    console.log(`[ssg] ${entry.path} → ${outPath.replace(distDir, "dist")}`);
  }

  writeFileSync(join(distDir, "sitemap.xml"), buildSitemap(siteUrl), "utf8");
  writeFileSync(join(distDir, "robots.txt"), buildRobots(siteUrl), "utf8");

  console.log(`[ssg] done — ${written} pages, ${skipped} skipped`);
  console.log(`[ssg] sitemap → dist/sitemap.xml (${SITEMAP_ROUTES.length} URLs)`);
  console.log(`[ssg] robots  → dist/robots.txt`);
}

main().catch((err) => {
  console.error("[ssg] failed:", err);
  process.exit(1);
});
