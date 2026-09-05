const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "frontend", "src", "content");

/** Ensure type imports are present on a content file. */
function ensureTypeImports(source, typeNames) {
  const typeImportRe = /import\s+type\s+\{([^}]+)\}\s+from\s+"@\/content\/shared";/;
  const valueImportRe = /import\s+\{([^}]+)\}\s+from\s+"@\/content\/shared";/;

  const needed = new Set(typeNames);

  if (typeImportRe.test(source)) {
    source = source.replace(typeImportRe, (_, inner) => {
      const existing = inner
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      for (const n of existing) needed.add(n);
      return `import type { ${[...needed].sort().join(", ")} } from "@/content/shared";`;
    });
  } else if (valueImportRe.test(source)) {
    // Insert type import before the value import
    source = source.replace(
      valueImportRe,
      `import type { ${[...needed].sort().join(", ")} } from "@/content/shared";\nimport {$1} from "@/content/shared";`,
    );
  } else {
    // After file header comment if any
    const m = source.match(/^(\/\*[\s\S]*?\*\/\r?\n)/);
    const line = `import type { ${[...needed].sort().join(", ")} } from "@/content/shared";\n`;
    if (m) source = m[1] + "\n" + line + source.slice(m[1].length);
    else source = line + "\n" + source;
  }
  return source;
}

function annotate(source, constName, typeName) {
  // Avoid double-annotation
  const already = new RegExp(`export const ${constName}\\s*:\\s*${typeName}\\s*=`);
  if (already.test(source)) return source;

  const re = new RegExp(`export const ${constName}\\s*=`);
  if (!re.test(source)) {
    console.warn("missing const", constName);
    return source;
  }
  return source.replace(re, `export const ${constName}: ${typeName} =`);
}

const files = [
  // solutions
  {
    file: "cloudDevops.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      CLOUD_SEO: "SeoMeta",
      CLOUD_HERO: "PageHero",
      CLOUD_FAQ: "FaqSection",
      CLOUD_FINAL: "FinalCta",
      CLOUD_WORK: "WorkSection",
    },
  },
  {
    file: "mobileDevelopment.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      MOB_SEO: "SeoMeta",
      MOB_HERO: "PageHero",
      MOB_FAQ: "FaqSection",
      MOB_FINAL: "FinalCta",
      MOB_WORK: "WorkSection",
    },
  },
  {
    file: "webDevelopment.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      WEB_SEO: "SeoMeta",
      WEB_HERO: "PageHero",
      WEB_FAQ: "FaqSection",
      WEB_FINAL: "FinalCta",
      WEB_WORK: "WorkSection",
    },
  },
  {
    file: "customSoftware.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      CS_SEO: "SeoMeta",
      CS_HERO: "PageHero",
      CS_FAQ: "FaqSection",
      CS_FINAL: "FinalCta",
      CS_WORK: "WorkSection",
    },
  },
  {
    file: "aiAutomation.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      AI_SEO: "SeoMeta",
      AI_HERO: "PageHero",
      AI_FAQ: "FaqSection",
      AI_FINAL: "FinalCta",
      AI_WORK: "WorkSection",
    },
  },
  {
    file: "technologyConsulting.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      TC_SEO: "SeoMeta",
      TC_HERO: "PageHero",
      TC_FAQ: "FaqSection",
      TC_FINAL: "FinalCta",
      TC_WORK: "WorkSection",
    },
  },
  {
    file: "solutions.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      SOLUTIONS_SEO: "SeoMeta",
      SOL_HERO: "PageHero",
      SOL_FAQ: "FaqSection",
      SOL_FINAL: "FinalCta",
      SOL_WORK: "WorkSection",
    },
  },
  {
    file: "industries.ts",
    types: ["SeoMeta", "PageHero", "FaqSection", "FinalCta", "WorkSection"],
    map: {
      IND_SEO: "SeoMeta",
      IND_HERO: "PageHero",
      IND_FAQ: "FaqSection",
      IND_FINAL: "FinalCta",
      IND_WORK: "WorkSection",
    },
  },
  {
    file: "about.ts",
    types: ["SeoMeta", "PageHero", "FinalCta"],
    map: {
      ABOUT_SEO: "SeoMeta",
      ABOUT_HERO: "PageHero",
      ABOUT_FINAL: "FinalCta",
    },
  },
  {
    file: "process.ts",
    types: ["SeoMeta", "PageHero", "FinalCta", "ProcessStep"],
    map: {
      PROCESS_SEO: "SeoMeta",
      PROCESS_HERO: "PageHero",
      PROCESS_FINAL: "FinalCta",
    },
    // PROCESS_STEPS handled separately
  },
  {
    file: "careers.ts",
    types: ["SeoMeta", "PageHero", "FinalCta"],
    map: {
      CAREERS_SEO: "SeoMeta",
      CAREERS_HERO: "PageHero",
      CAREERS_FINAL: "FinalCta",
    },
  },
  {
    file: "contact.ts",
    types: ["SeoMeta", "PageHero", "FinalCta"],
    map: {
      CONTACT_SEO: "SeoMeta",
      CONTACT_HERO: "PageHero",
      CONTACT_FINAL: "FinalCta",
    },
  },
  {
    file: "consultation.ts",
    types: ["SeoMeta", "PageHero", "FinalCta"],
    map: {
      CONSULT_SEO: "SeoMeta",
      CONSULT_HERO: "PageHero",
      CONSULT_FINAL: "FinalCta",
    },
  },
  {
    file: "requestProposal.ts",
    types: ["SeoMeta", "PageHero"],
    map: {
      PROPOSAL_SEO: "SeoMeta",
      PROPOSAL_HERO: "PageHero",
    },
  },
  {
    file: "insights.ts",
    types: ["SeoMeta", "PageHero", "FinalCta"],
    map: {
      INSIGHTS_SEO: "SeoMeta",
      INS_HERO: "PageHero",
      INS_FINAL: "FinalCta",
    },
  },
  {
    file: "faqs.ts",
    types: ["SeoMeta", "PageHero", "FinalCta", "FaqCategory", "FaqItem"],
    map: {
      FAQ_SEO: "SeoMeta",
      FAQ_HERO: "PageHero",
      FAQ_FINAL: "FinalCta",
    },
  },
  {
    file: "home.ts",
    types: ["SeoMeta", "HomeHero", "FinalCta"],
    map: {
      HOME_SEO: "SeoMeta",
      HERO: "HomeHero",
      FINAL_CTA: "FinalCta",
    },
  },
  {
    file: "work.ts",
    types: ["SeoMeta", "PageHero", "FinalCta", "WorkSection"],
    map: {
      WORK_SEO: "SeoMeta",
      WORK_HERO: "PageHero",
      WORK_FINAL: "FinalCta",
      WORK_SELECTED: "WorkSection",
      PORTFOLIO_SEO: "SeoMeta",
      PORTFOLIO_HERO: "PageHero",
      CASE_STUDIES_SEO: "SeoMeta",
      CASE_STUDIES_HERO: "PageHero",
    },
  },
];

for (const cfg of files) {
  const p = path.join(root, cfg.file);
  let s = fs.readFileSync(p, "utf8");
  s = ensureTypeImports(s, cfg.types);
  for (const [name, type] of Object.entries(cfg.map)) {
    s = annotate(s, name, type);
  }
  fs.writeFileSync(p, s);
  console.log("annotated", cfg.file);
}

// process.ts — replace local ProcessStep with shared + type PROCESS_STEPS
{
  const p = path.join(root, "process.ts");
  let s = fs.readFileSync(p, "utf8");
  // Remove local interface if present
  s = s.replace(
    /export interface ProcessStep \{[\s\S]*?\}\r?\n\r?\n/,
    "",
  );
  // Ensure ProcessStep is in type import
  s = ensureTypeImports(s, ["SeoMeta", "PageHero", "FinalCta", "ProcessStep"]);
  // Annotate PROCESS_STEPS
  s = annotate(s, "PROCESS_STEPS", "ProcessStep[]");
  // Re-export ProcessStep for any external consumers
  if (!s.includes("export type { ProcessStep }") && !s.includes("export type {ProcessStep}")) {
    s = s.replace(
      /import type \{([^}]+)\} from "@\/content\/shared";/,
      (full, inner) => {
        return `${full}\n\nexport type { ProcessStep } from "@/content/shared";`;
      },
    );
  }
  fs.writeFileSync(p, s);
  console.log("process ProcessStep migrated");
}

// faqs.ts — remove local FaqItem/FaqCategory, re-export from shared
{
  const p = path.join(root, "faqs.ts");
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(
    /export interface FaqItem \{[\s\S]*?\}\r?\n\r?\nexport interface FaqCategory \{[\s\S]*?\}\r?\n\r?\n/,
    `export type { FaqItem, FaqCategory } from "@/content/shared";\n\n`,
  );
  s = annotate(s, "FAQ_CATEGORIES", "FaqCategory[]");
  fs.writeFileSync(p, s);
  console.log("faqs types migrated");
}

console.log("done");
