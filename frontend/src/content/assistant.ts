/**
 * Site assistant chrome copy. Answers come from approved FAQ / company content.
 */

import { COMPANY } from "@/constants/company";

export const ASSISTANT = {
  name: `${COMPANY.name} AI`,
  fabLabel: `Open ${COMPANY.name} AI assistant`,
  pillTitle: "Ask VAELKODE.",
  pillSub: "Instant answers · skip digging through FAQs",
  status: "Online · usually replies instantly",
  meta: ["Site assistant", "Grounded in our FAQs", "Free consultation"],
  welcome: `Hey — I'm the ${COMPANY.name} assistant. Ask about our services, how we work, or how to get started. I'll point you to clear answers instead of making you hunt through the FAQ page.`,
  placeholder: "Ask about services, process, or how to start…",
  suggestions: [
    "What does VAELKODE do?",
    "Which service fits my project?",
    "How does your process work?",
    "Book a consultation",
  ],
  bookLabel: "Book a consultation",
  bookTo: "/consultation",
  emailLabel: "Email",
  emailHref: `mailto:${COMPANY.contact.email}`,
} as const;
