/**
 * Visual smoke-check for VAELKODE public pages after the token pass.
 * Captures screenshots + reports console errors / forbidden confidential strings.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.SMOKE_BASE || "http://127.0.0.1:5173";
const OUT = path.resolve("smoke-screens");
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: "home", path: "/" },
  { name: "solutions-web", path: "/solutions/web-development" },
  { name: "contact", path: "/contact" },
  { name: "portfolio", path: "/portfolio" },
  { name: "privacy", path: "/privacy-policy" },
];

const FORBIDDEN = [
  "17284196",
  "26 St. Anne Street",
  "St. Anne Street",
  "Company No.",
  "Company number",
];

const results = [];

async function checkPage(browser, pageDef) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  const url = `${BASE}${pageDef.path}`;
  let status = "ok";
  let notes = [];

  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    if (!resp || !resp.ok()) {
      status = "fail";
      notes.push(`HTTP ${resp ? resp.status() : "no response"}`);
    }

    await page.waitForTimeout(800);

    // Token presence on :root
    const tokenCheck = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        headingColor: s.getPropertyValue("--heading-color").trim(),
        headingAccent: s.getPropertyValue("--heading-accent").trim(),
        pageGutter: s.getPropertyValue("--page-gutter").trim(),
        neon: s.getPropertyValue("--neon").trim(),
        obsidian1: s.getPropertyValue("--obsidian-1").trim(),
        textPrimary: s.getPropertyValue("--text-primary").trim(),
      };
    });

    if (!tokenCheck.neon || !tokenCheck.obsidian1 || !tokenCheck.headingColor) {
      status = "fail";
      notes.push(`Missing tokens: ${JSON.stringify(tokenCheck)}`);
    }

    // Body text scan for confidential / broken leftovers
    const bodyText = await page.innerText("body");
    for (const bad of FORBIDDEN) {
      if (bodyText.includes(bad)) {
        status = "fail";
        notes.push(`Forbidden string visible: "${bad}"`);
      }
    }

    // Footer should exist and show Liverpool (not street)
    const footer = page.locator("footer");
    const footerCount = await footer.count();
    if (footerCount === 0) {
      status = "fail";
      notes.push("No <footer> found");
    } else {
      const footerText = await footer.innerText();
      if (!footerText.includes("Liverpool")) {
        status = "warn";
        notes.push("Footer missing Liverpool address");
      }
      if (footerText.includes("Company No") || footerText.includes("17284196")) {
        status = "fail";
        notes.push("Footer still shows company number");
      }
    }

    // Section headings should resolve to light text (not neon-only)
    const headingSample = await page.evaluate(() => {
      const h2 = document.querySelector("h2");
      if (!h2) return null;
      const c = getComputedStyle(h2).color;
      return { text: h2.textContent?.slice(0, 80), color: c };
    });

    // Screenshots: top viewport + scrolled mid
    const shotTop = path.join(OUT, `${pageDef.name}-top.png`);
    await page.screenshot({ path: shotTop, fullPage: false });
    await page.evaluate(() => window.scrollTo(0, Math.min(1200, document.body.scrollHeight * 0.35)));
    await page.waitForTimeout(400);
    const shotMid = path.join(OUT, `${pageDef.name}-mid.png`);
    await page.screenshot({ path: shotMid, fullPage: false });

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const shotFoot = path.join(OUT, `${pageDef.name}-footer.png`);
    await page.screenshot({ path: shotFoot, fullPage: false });

    if (pageErrors.length) {
      status = "fail";
      notes.push(`pageerror: ${pageErrors.slice(0, 3).join(" | ")}`);
    }
    // Filter noisy vite overlay-ish console if any
    const serious = consoleErrors.filter(
      (e) => !e.includes("Download the React DevTools") && !e.includes("favicon"),
    );
    if (serious.length) {
      status = status === "ok" ? "warn" : status;
      notes.push(`console: ${serious.slice(0, 3).join(" | ")}`);
    }

    results.push({
      page: pageDef.name,
      url,
      status,
      notes,
      tokens: tokenCheck,
      headingSample,
      shots: [shotTop, shotMid, shotFoot],
    });
  } catch (err) {
    results.push({
      page: pageDef.name,
      url,
      status: "fail",
      notes: [String(err)],
      tokens: null,
      headingSample: null,
      shots: [],
    });
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ headless: true });
for (const p of PAGES) {
  await checkPage(browser, p);
}
await browser.close();

const summary = {
  base: BASE,
  at: new Date().toISOString(),
  results,
  pass: results.every((r) => r.status === "ok"),
  failCount: results.filter((r) => r.status === "fail").length,
  warnCount: results.filter((r) => r.status === "warn").length,
};

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
process.exit(summary.failCount ? 1 : 0);
