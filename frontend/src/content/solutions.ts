/**
 * VAELKODE /solutions landing page. Approved production copy.
 * No invented statistics, clients, testimonials, awards, or results.
 */

import { CTA, FINAL_PAIR } from "@/content/shared";
import type { ChallengeSection, FaqSection, FinalCta, PageHero, SeoMeta, WorkSection } from "@/content/shared";


export const SOLUTIONS_SEO: SeoMeta = {
  title: "Services | Web, Software, AI & Digital Engineering | VAELKODE",
  description:
    "Explore VAELKODE services: web development, custom software, AI automation, mobile apps, cloud & DevOps, and technology consulting.",
};

export const SOL_HERO: PageHero = {
  label: "Our Services",
  title: "Start with the challenge, not the stack.",
  supporting:
    "Six clear service lines, from websites and custom software to AI, mobile, cloud, and consulting. Pick what matches your problem.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: CTA.tellUsAboutProject,
};

export const SOL_INTRO = {
  label: "How We Help",
  heading: "Start with the problem, then build the right solution.",
  paragraphs: [
    "Technology should support the way your organization works, not force your business to work around technology.",
    "We begin with your objectives, workflows, users, and constraints. From there, we identify the right mix of strategy, engineering, AI, automation, and cloud, rather than a one-size catalogue.",
  ],
  principles: [
    { title: "Understand", text: "Identify the business challenge and the outcome you want to achieve." },
    { title: "Design", text: "Define the right experience, architecture, and technical approach." },
    { title: "Build", text: "Develop reliable software using modern engineering practices." },
    { title: "Evolve", text: "Improve, scale, and extend the solution as your organization grows." },
  ],
};

export const SOL_CORE = {
  label: "What We Do",
  heading: "Six services with plain outcomes.",
  supporting:
    "Pick the service that matches your problem. Each page explains what we include and how we work.",
  solutions: [
    {
      id: "web",
      pathTag: "/WEB DEVELOPMENT",
      title: "Web Development",
      description:
        "Business websites, stores, portals, and web apps that communicate clearly and perform reliably.",
      tags: ["Websites", "Stores", "Portals", "CMS"],
      highlightLabel: "Includes",
      highlightValue: "Sites · Apps",
      preview: "web" as const,
      accent: "sky" as const,
      cta: "Explore Web Development",
      to: "/solutions/web-development",
    },
    {
      id: "software",
      pathTag: "/CUSTOM SOFTWARE",
      title: "Custom Software",
      description:
        "Applications and platforms shaped around how your organization actually works, instead of forcing you into a generic template.",
      tags: ["Apps", "Portals", "APIs", "Workflows"],
      highlightLabel: "Built for",
      highlightValue: "Your process",
      preview: "software" as const,
      accent: "violet" as const,
      cta: "Explore Custom Software",
      to: "/solutions/custom-software",
    },
    {
      id: "ai",
      pathTag: "/AI & AUTOMATION",
      title: "AI & Automation",
      description:
        "Practical AI for documents, assistants, and workflows, used only where it removes real friction.",
      tags: ["Docs", "Assistants", "Agents", "RAG"],
      highlightLabel: "Approach",
      highlightValue: "Problem first",
      preview: "ai" as const,
      accent: "fuchsia" as const,
      cta: "Explore AI & Automation",
      to: "/solutions/ai-automation",
    },
    {
      id: "mobile",
      pathTag: "/MOBILE DEVELOPMENT",
      title: "Mobile Development",
      description:
        "iOS, Android, and cross-platform apps connected to the systems behind them.",
      tags: ["iOS", "Android", "PWA", "APIs"],
      highlightLabel: "Ships as",
      highlightValue: "iOS · Android",
      preview: "mobile" as const,
      accent: "amber" as const,
      cta: "Explore Mobile Development",
      to: "/solutions/mobile-development",
    },
    {
      id: "cloud",
      pathTag: "/CLOUD & DEVOPS",
      title: "Cloud & DevOps",
      description:
        "Cloud setup, calm releases, monitoring, and environments that stay consistent.",
      tags: ["CI/CD", "Cloud", "Monitor", "Secure"],
      highlightLabel: "Goal",
      highlightValue: "Calm releases",
      preview: "cloud" as const,
      accent: "teal" as const,
      cta: "Explore Cloud & DevOps",
      to: "/solutions/cloud-devops",
    },
    {
      id: "consulting",
      pathTag: "/TECH CONSULTING",
      title: "Technology Consulting",
      description:
        "Clarity before you spend. Discovery, architecture, build-vs-buy, and roadmaps.",
      tags: ["Discovery", "Architecture", "Roadmaps", "Audits"],
      highlightLabel: "Starts with",
      highlightValue: "Clear options",
      preview: "consulting" as const,
      accent: "rose" as const,
      cta: "Explore Consulting",
      to: "/solutions/technology-consulting",
    },
  ],
};

export const SOL_CHALLENGES: ChallengeSection = {
  label: "Find Your Solution",
  heading: "Not sure where to start? Start with the challenge.",
  supporting:
    "You don't need to know which technology you need before talking to us. Tell us what you're trying to improve, and we'll help identify the right approach.",
  items: [
    { question: "Need to automate repetitive work?", cta: "Explore AI & Automation", to: "/solutions/ai-automation" },
    { question: "Need a new business application?", cta: "Explore Custom Software", to: "/solutions/custom-software" },
    {
      question: "Need to modernize an existing system?",
      cta: "Explore Technology Consulting",
      to: "/solutions/technology-consulting",
    },
    {
      question: "Need a customer-facing digital platform?",
      cta: "Explore Web & Mobile",
      to: "/solutions/web-development",
    },
    { question: "Need to move to the cloud?", cta: "Explore Cloud & DevOps", to: "/solutions/cloud-devops" },
    {
      question: "Have an idea but don't know where to begin?",
      cta: CTA.bookConsultation.label,
      to: CTA.bookConsultation.to,
    },
  ],
};

export const SOL_PRINCIPLES = {
  label: "Engineering Principles",
  heading: "Useful now, and still useful as you grow.",
  supporting:
    "What we build should stay useful as your organization changes. We think about maintainability, security, performance, and future integration from the start.",
  items: [
    {
      num: "01",
      title: "Scalable Architecture",
      text: "Build foundations that can evolve as requirements, users, and data grow.",
    },
    {
      num: "02",
      title: "Security by Design",
      text: "Treat security as part of the engineering process rather than an afterthought.",
    },
    {
      num: "03",
      title: "Maintainable Engineering",
      text: "Favor clear architecture, reusable components, documentation, and sustainable development practices.",
    },
    {
      num: "04",
      title: "Integration Ready",
      text: "Build systems that can communicate with the tools, platforms, and services your organization already uses.",
    },
    {
      num: "05",
      title: "Data Driven",
      text: "Structure information so organizations can turn operational data into useful insights.",
    },
    {
      num: "06",
      title: "AI Where It Adds Value",
      text: "Use AI because it solves a meaningful problem, not simply because it is available.",
    },
  ],
};

export const SOL_TECH = {
  label: "Technology Stack",
  heading: "Modern technologies chosen with purpose.",
  supporting:
    "We pick technologies for each solution based on performance, maintainability, security, and long-term fit.",
  categories: [
    { title: "AI & Data", items: ["Python", "PyTorch", "TensorFlow", "Hugging Face", "LLM Technologies"] },
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { title: "Backend", items: ["Python", "FastAPI", "Django", "Laravel", "Node.js"] },
    {
      title: "Cloud & Infrastructure",
      items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
    },
    {
      title: "Databases & Data",
      items: ["PostgreSQL", "MySQL", "Redis", "Data Processing", "Analytics"],
    },
  ],
};

export const SOL_DELIVERY = {
  label: "How We Deliver",
  heading: "Four steps from first talk to continuous improvement.",
  steps: [
    { num: "01", title: "Discover", text: "Understand the challenge, users, and goals." },
    { num: "02", title: "Plan", text: "Agree the approach, scope, and first useful release." },
    { num: "03", title: "Build", text: "Design, develop, and test in short visible cycles." },
    { num: "04", title: "Launch & grow", text: "Go live carefully, then keep improving." },
  ],
  cta: CTA.discussYourProject,
};

export const SOL_WORK: WorkSection = {
  label: "Selected Work",
  heading: "See what these capabilities can become.",
  supporting:
    "Explore selected solutions and technology initiatives that demonstrate our approach to solving complex digital challenges.",
  cta: CTA.viewAllWork,
};

export const SOL_FAQ: FaqSection = {
  label: "Frequently Asked Questions",
  heading: "Questions about our solutions?",
  items: [
    {
      q: "What types of projects does VAELKODE work on?",
      a: "We work on AI solutions, custom software, web and mobile applications, cloud infrastructure, automation, and technology transformation initiatives. The appropriate approach depends on the organization's goals, requirements, and technical environment.",
    },
    {
      q: "Can VAELKODE work with an existing software system?",
      a: "Yes. Existing applications can be assessed, integrated, modernized, extended, or migrated depending on their architecture and business requirements.",
    },
    {
      q: "Do I need to know exactly what technology I need?",
      a: "No. You can start with the business problem or objective. We can help evaluate the requirements and recommend an appropriate technical approach.",
    },
    {
      q: "Does VAELKODE only build new software?",
      a: "No. We can also help organizations improve existing systems through modernization, integration, automation, optimization, and cloud transformation.",
    },
    {
      q: "Can AI be integrated into an existing application?",
      a: "In many cases, yes. AI capabilities can be integrated into existing workflows and applications when there is a clear business use case and appropriate data or system access.",
    },
    {
      q: "How do we start a project with VAELKODE?",
      a: "The process begins with a conversation about your objectives and challenges. From there, we can assess the requirements and determine the appropriate next steps.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const SOL_FINAL: FinalCta = {
  label: "Start a Conversation",
  heading: "Have a challenge worth solving?",
  supporting:
    "Starting a product, modernizing a system, or exploring AI? Tell us what you're trying to achieve and we'll help you map the next step.",
  ...FINAL_PAIR,
};
