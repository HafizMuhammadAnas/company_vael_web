/**
 * Lightweight knowledge matcher for the site assistant.
 * Answers only from approved FAQ / company / service content — no invented claims.
 */

import { COMPANY } from "@/constants/company";
import { FAQ_CATEGORIES } from "@/content/faqs";
import { PROCESS_STAGES } from "@/content/process";
import { SOL_CORE } from "@/content/solutions";

type KnowledgeEntry = {
  keys: string[];
  answer: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+/&.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 2);
}

function score(query: string, keys: string[]): number {
  const q = normalize(query);
  const qTokens = new Set(tokens(query));
  let s = 0;

  for (const key of keys) {
    const k = normalize(key);
    if (!k) continue;
    if (q.includes(k) || k.includes(q)) {
      s += Math.min(k.length, 48);
      continue;
    }
    const keyTokens = tokens(key);
    let hit = 0;
    for (const t of keyTokens) {
      if (qTokens.has(t)) hit += 1;
    }
    if (hit > 0) {
      s += (hit / Math.max(keyTokens.length, 1)) * 18 + hit * 2;
    }
  }

  return s;
}

function faqEntries(): KnowledgeEntry[] {
  return FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      keys: [item.q, item.a, cat.label, cat.heading],
      answer: item.a,
    })),
  );
}

function serviceEntries(): KnowledgeEntry[] {
  return SOL_CORE.solutions.map((sol) => ({
    keys: [sol.title, sol.description, ...sol.tags, sol.pathTag, sol.cta],
    answer: `${sol.title}: ${sol.description}\n\nMore detail: ${sol.to}`,
  }));
}

function staticEntries(): KnowledgeEntry[] {
  const stages = PROCESS_STAGES.steps.map((s) => `${s.title} — ${s.text}`).join("\n");
  const servicesList = SOL_CORE.solutions.map((s) => `• ${s.title}: ${s.description}`).join("\n");

  return [
    {
      keys: [
        "what does vaelkode do",
        "who are you",
        "about vaelkode",
        "company",
        "what do you build",
      ],
      answer: `${COMPANY.shortDescription}\n\n${COMPANY.positioning}`,
    },
    {
      keys: [
        "which service",
        "what services",
        "service fits",
        "offerings",
        "what can you help with",
      ],
      answer: `We work across six service lines:\n\n${servicesList}\n\nNot sure which fits? Describe the problem and we can help map the next step — or book a consultation.`,
    },
    {
      keys: ["process", "how do you work", "delivery stages", "methodology", "timeline"],
      answer: `Our delivery path is straightforward:\n\n${stages}\n\nFull detail lives on the Our Process page (/about/process).`,
    },
    {
      keys: [
        "book",
        "consultation",
        "contact",
        "talk to someone",
        "get started",
        "start a project",
        "schedule",
        "call",
      ],
      answer: `The easiest next step is a consultation — tell us what you're trying to achieve and we'll map a practical path forward.\n\nBook here: /consultation\nOr email ${COMPANY.contact.email} · ${COMPANY.contact.phoneDisplay}`,
    },
    {
      keys: ["email", "phone", "location", "address", "uk", "liverpool"],
      answer: `Email: ${COMPANY.contact.email}\nPhone: ${COMPANY.contact.phoneDisplay}\nRegistered in the ${COMPANY.legal.registeredIn} (${COMPANY.legal.registeredOffice}).`,
    },
    {
      keys: ["pricing", "cost", "quote", "budget", "how much"],
      answer:
        "Pricing depends on scope, complexity, and how we engage. Share the problem and constraints and we can outline a sensible next step — start with a consultation rather than a guess.",
    },
  ];
}

const KNOWLEDGE: KnowledgeEntry[] = [...staticEntries(), ...serviceEntries(), ...faqEntries()];

const FALLBACK = `I don't have a precise answer for that in our published FAQs. Try rephrasing, browse /faqs, or book a consultation and a human will take it from there.\n\nEmail ${COMPANY.contact.email}`;

/** Return a grounded reply for the visitor's question. */
export function answerAssistantQuestion(question: string): string {
  const q = question.trim();
  if (!q) return FALLBACK;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    const s = score(q, entry.keys);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }

  if (!best || bestScore < 8) {
    return FALLBACK;
  }

  return best.answer;
}
