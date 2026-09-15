import { ABOUT_SEO } from "@/content/about";
import { AI_SEO } from "@/content/aiAutomation";
import { CAREERS_SEO } from "@/content/careers";
import { CLOUD_SEO } from "@/content/cloudDevops";
import { CONSULT_SEO } from "@/content/consultation";
import { CONTACT_SEO } from "@/content/contact";
import { CS_SEO } from "@/content/customSoftware";
import { FAQ_SEO } from "@/content/faqs";
import { HOME_SEO } from "@/content/home";
import { INSIGHTS_SEO } from "@/content/insights";
import { COOKIE_POLICY, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/content/legal";
import { MOB_SEO } from "@/content/mobileDevelopment";
import { PROCESS_SEO } from "@/content/process";
import { PROPOSAL_SEO } from "@/content/requestProposal";
import { SOLUTIONS_SEO } from "@/content/solutions";
import { TC_SEO } from "@/content/technologyConsulting";
import { WEB_SEO } from "@/content/webDevelopment";
import { PORTFOLIO_SEO } from "@/content/portfolio";

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  /** Include in sitemap.xml (default true unless noindex). */
  sitemap?: boolean;
  priority?: number;
  changefreq?: "weekly" | "monthly" | "yearly";
  noindex?: boolean;
}

function route(
  path: string,
  title: string,
  description: string,
  opts: Partial<Omit<PrerenderRoute, "path" | "title" | "description">> = {},
): PrerenderRoute {
  return {
    path,
    title,
    description,
    sitemap: opts.noindex ? false : (opts.sitemap ?? true),
    priority: opts.priority ?? 0.7,
    changefreq: opts.changefreq ?? "monthly",
    ...opts,
  };
}

/**
 * Public marketing routes pre-rendered at build time for SEO.
 * Redirect-only paths and post-submit pages are intentionally omitted.
 */
export const PRERENDER_ROUTES: PrerenderRoute[] = [
  route("/", HOME_SEO.title, HOME_SEO.description, { priority: 1, changefreq: "weekly" }),

  route("/solutions", SOLUTIONS_SEO.title, SOLUTIONS_SEO.description, { priority: 0.9 }),
  route("/solutions/ai-automation", AI_SEO.title, AI_SEO.description),
  route("/solutions/custom-software", CS_SEO.title, CS_SEO.description),
  route("/solutions/web-development", WEB_SEO.title, WEB_SEO.description),
  route("/solutions/mobile-development", MOB_SEO.title, MOB_SEO.description),
  route("/solutions/cloud-devops", CLOUD_SEO.title, CLOUD_SEO.description),
  route("/solutions/technology-consulting", TC_SEO.title, TC_SEO.description),

  route("/about", ABOUT_SEO.title, ABOUT_SEO.description),
  route("/about/process", PROCESS_SEO.title, PROCESS_SEO.description),
  route("/careers", CAREERS_SEO.title, CAREERS_SEO.description),

  route("/contact", CONTACT_SEO.title, CONTACT_SEO.description, { priority: 0.85 }),
  route("/consultation", CONSULT_SEO.title, CONSULT_SEO.description),
  route("/request-proposal", PROPOSAL_SEO.title, PROPOSAL_SEO.description),

  route("/portfolio", PORTFOLIO_SEO.title, PORTFOLIO_SEO.description, { priority: 0.85 }),

  route("/insights", INSIGHTS_SEO.title, INSIGHTS_SEO.description),
  route("/faqs", FAQ_SEO.title, FAQ_SEO.description),

  route("/privacy-policy", PRIVACY_POLICY.seo.title, PRIVACY_POLICY.seo.description, {
    changefreq: "yearly",
    priority: 0.3,
  }),
  route("/terms-and-conditions", TERMS_AND_CONDITIONS.seo.title, TERMS_AND_CONDITIONS.seo.description, {
    changefreq: "yearly",
    priority: 0.3,
  }),
  route("/cookie-policy", COOKIE_POLICY.seo.title, COOKIE_POLICY.seo.description, {
    changefreq: "yearly",
    priority: 0.3,
  }),
];

/** Lookup SEO metadata for a prerendered path (used by the prerender script). */
export function getPrerenderMeta(path: string): PrerenderRoute | undefined {
  const normalized = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return PRERENDER_ROUTES.find((entry) => entry.path === normalized);
}

export const SITEMAP_ROUTES = PRERENDER_ROUTES.filter((entry) => entry.sitemap !== false);
