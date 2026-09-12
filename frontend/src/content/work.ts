/**
 * VAELKODE /work ecosystem content. Work landing, Portfolio, Case Studies,
 * and case-study detail pages.
 *
 * IMPORTANT. Honesty rules for this section:
 *  - These projects represent selected professional / technical delivery
 *    experience across AI, software engineering, enterprise platforms,
 *    automation, and computer vision. They are framed as professional work,
 *    NOT as client projects delivered under the VAELKODE brand.
 *  - Do NOT invent outcomes: no percentages, time savings, user counts, ROI,
 *    or "results" until factual, approved figures are provided. Case-study
 *    detail pages deliberately omit a Results section for now.
 */

import { CTA, DISCLAIMERS, FINAL_PAIR } from "@/content/shared";
import type { FinalCta, PageHero, PageHeroWithCta, SeoMeta } from "@/content/shared";


export const WORK_FILTERS = [
  "All",
  "AI",
  "Software",
  "Web",
  "Cloud",
  "Computer Vision",
  "Geospatial",
  "Automation",
] as const;

export type WorkFilter = (typeof WORK_FILTERS)[number];

export interface Project {
  slug: string;
  order: string;
  title: string;
  category: string;
  description: string;
  /** Optional AI/automation highlight bullets (only where factually provided). */
  aiFocus?: string[];
  technologies: string[];
  /** Filter tags for the portfolio grid (subset of WORK_FILTERS). */
  tags: WorkFilter[];
  /** True when a dedicated case-study detail page exists. */
  hasCaseStudy?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "navttc-government-platform",
    order: "01",
    title: "NAVTTC Government Infrastructure Platform",
    category: "Government Technology · Enterprise Platforms · AI Automation",
    description:
      "End-to-end architecture and delivery across 12 interconnected government systems supporting the TVET lifecycle, including qualification development, institute registration, accreditation, certification, testing, LMS, and job placement.",
    aiFocus: [
      "Document digitization with PaddleOCR",
      "Multi-agent qualification generation",
      "AI-powered dynamic reporting",
    ],
    technologies: ["Python", "PaddleOCR", "LangChain", "PHP", "MySQL", "REST APIs", "Azure DevOps"],
    tags: ["AI", "Software", "Automation"],
    hasCaseStudy: true,
  },
  {
    slug: "empowernow-agentic-ai",
    order: "02",
    title: "EmpowerNow. Agentic AI Workflow Engine",
    category: "Agentic AI · Enterprise Automation",
    description:
      "A WebSocket-driven agentic AI engine that turns user queries into structured enterprise workflows using GPT-4o, RAG, tool calling, and multi-agent orchestration.",
    aiFocus: [
      "Structured enterprise workflow generation from natural-language queries",
      "Multi-agent orchestration with tool calling",
      "Retrieval-augmented generation (RAG)",
      "Real-time, WebSocket-driven interaction",
    ],
    technologies: ["Python", "GPT-4o", "LangGraph", "LangChain", "FastAPI", "WebSockets", "ChromaDB", "Docker"],
    tags: ["AI", "Automation"],
    hasCaseStudy: true,
  },
  {
    slug: "ai-sales-intelligence-pipeline",
    order: "03",
    title: "AI Sales Intelligence Pipeline",
    category: "AI · Enterprise Automation · Sales Intelligence",
    description:
      "An AI pipeline that processes sales conversations, documents, and emails to surface useful insights, opportunity analysis, and automated CRM updates.",
    technologies: [
      "Azure OpenAI",
      "Azure Cognitive Search",
      "Azure Functions",
      "Azure Storage",
      "SQL Server",
    ],
    tags: ["AI", "Automation", "Cloud"],
  },
  {
    slug: "ai-educational-assistant",
    order: "04",
    title: "AI Educational Assistant",
    category: "AI · NLP · Voice Applications",
    description:
      "An educational AI assistant fine-tuned for contextually relevant responses across mathematics, science, and history, with voice interaction through speech-to-text and text-to-speech technologies.",
    technologies: ["Python", "MPT-7B", "Hugging Face", "Whisper", "Google TTS", "Flask"],
    tags: ["AI"],
  },
  {
    slug: "ai-virtual-travel-assistant",
    order: "05",
    title: "AI Virtual Travel Assistant",
    category: "Generative AI · Travel Technology",
    description:
      "A domain-focused AI travel assistant integrating live API data and web-sourced information to provide real-time travel recommendations.",
    technologies: ["Python", "GPT-3.5", "BERT", "spaCy", "Flask", "Docker", "Skyscanner API"],
    tags: ["AI"],
  },
  {
    slug: "crm-on-azure",
    order: "06",
    title: "CRM on Azure",
    category: "Cloud · AI · CRM",
    description:
      "A cloud-native CRM solution incorporating AI-driven task routing and Azure Bot Framework capabilities for automated customer interaction and feedback workflows.",
    technologies: ["Azure Bot Framework", "Python", "Docker"],
    tags: ["Cloud", "AI", "Automation"],
  },
  {
    slug: "business-plan-buddy",
    order: "07",
    title: "Business Plan Buddy",
    category: "Generative AI · Business Automation",
    description:
      "An AI-powered business plan generation system using structured outputs to transform user inputs into organized business planning content.",
    technologies: ["Python", "AutoGen", "GPT", "PostgreSQL", "Flask"],
    tags: ["AI", "Automation"],
  },
  {
    slug: "precision-agriculture-cv-geospatial",
    order: "08",
    title: "Precision Agriculture. CV & Geospatial",
    category: "Computer Vision · Geospatial AI · Agriculture",
    description:
      "AI and geospatial initiatives covering crop classification, sugarcane variety detection, disease detection and risk mapping, and crop sowing date prediction using satellite imagery and computer vision.",
    aiFocus: [
      "Crop classification from satellite imagery",
      "Sugarcane variety detection",
      "Disease detection and risk mapping",
      "Crop sowing date prediction",
    ],
    technologies: ["YOLOv8", "Detectron2", "Google Earth Engine", "GCP", "Python", "OpenCV"],
    tags: ["Computer Vision", "Geospatial", "AI"],
    hasCaseStudy: true,
  },
];

/* ─────────────────────────  /work landing  ───────────────────────── */

export const WORK_SEO: SeoMeta = {
  title: "Our Work | VAELKODE",
  description:
    "Selected professional work across AI and intelligent automation, enterprise software, digital platforms, computer vision, cloud engineering, and data-driven solutions.",
};

export const WORK_HERO: PageHeroWithCta = {
  label: "Our Work",
  title: "Building Intelligent Technology for Real-World Challenges.",
  supporting: DISCLAIMERS.workHeroSupporting,
  primaryCta: CTA.discussYourProject,
  secondaryCta: CTA.requestProposal,
};

export const WORK_SELECTED = {
  label: "Selected Professional Projects",
  heading: "Selected Projects",
  supporting:
    "A selection of projects and technical initiatives across enterprise AI, government platforms, automation, computer vision, and geospatial technology.",
  note: DISCLAIMERS.selectedWork,
};

export const WORK_DEMONSTRATES = {
  label: "What This Work Demonstrates",
  heading: "From AI Research to Production Systems",
  cards: [
    {
      title: "Enterprise AI",
      text: "Designing AI systems that integrate with real business workflows, data, and applications.",
    },
    {
      title: "Intelligent Automation",
      text: "Automating document-heavy, repetitive, and information-intensive processes.",
    },
    {
      title: "Software Platforms",
      text: "Building multi-system platforms designed around complex organizational requirements.",
    },
    {
      title: "Computer Vision & Geospatial AI",
      text: "Applying machine learning and computer vision to imagery, agriculture, and spatial problems.",
    },
    {
      title: "Cloud & Engineering",
      text: "Building deployable systems with APIs, containers, cloud services, CI/CD, and production-oriented engineering practices.",
    },
  ],
};

export const WORK_EXPERTISE = {
  label: "Expertise Behind the Work",
  heading: "Technical Expertise",
  groups: [
    {
      title: "Agentic AI & LLMs",
      text: "LangChain, LangGraph, AutoGen, CrewAI, OpenAI and Anthropic APIs, RAG, MCP servers, prompt engineering, and multi-agent orchestration.",
    },
    {
      title: "AI Pipelines & Search",
      text: "PaddleOCR, document indexing, AI-powered content generation, dynamic reporting, embeddings, and enterprise search.",
    },
    {
      title: "Machine Learning & Computer Vision",
      text: "TensorFlow, PyTorch, scikit-learn, Hugging Face, spaCy, NLTK, OpenCV, YOLOv8, and Detectron2.",
    },
    {
      title: "MLOps & Cloud",
      text: "AWS, GCP, Azure, Docker, Kubernetes, MLflow, CI/CD, REST APIs, and cloud-based AI services.",
    },
    {
      title: "Engineering & Integration",
      text: "Python, PHP, APIs, databases, application architecture, system integration, and production deployment.",
    },
  ],
};

export const WORK_DELIVERY = {
  label: "How We Deliver",
  heading: "A Structured Path From Requirement to Production.",
  steps: [
    { num: "01", title: "Understand", text: "Business requirements, users, existing systems, and objectives." },
    { num: "02", title: "Architect", text: "Solution architecture, technology decisions, data and integration design." },
    { num: "03", title: "Build", text: "Development, AI integration, testing, and iteration." },
    { num: "04", title: "Deploy", text: "Infrastructure, CI/CD, deployment, and production readiness." },
    { num: "05", title: "Improve", text: "Monitoring, refinement, optimization, and future development." },
  ],
  cta: { label: "Explore Our Process", to: "/about/process" },
};

export const WORK_CASE_STUDIES_TEASER = {
  label: "Project Write-Ups",
  heading: "Explore the Work in Detail",
  supporting:
    "Go beyond the technology stack and explore the challenges, approaches, architectures, and solutions behind selected professional projects.",
  cta: CTA.viewAllWriteUps,
};

export const WORK_FINAL: FinalCta = {
  label: "Let's Build",
  heading: "Have a Complex Technology Challenge?",
  supporting:
    "Tell us what you're trying to build, automate, improve, or solve. We'll help you explore the right technical approach.",
  ...FINAL_PAIR,
};

/* ─────────────────────────  /work/portfolio  ───────────────────────── */
/* Portfolio showcase content lives in content/portfolio.ts */

export {
  PORTFOLIO_FLOATING_CTA,
  PORTFOLIO_HERO,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SEO,
  type PortfolioProject,
} from "./portfolio";

export { CASE_STUDIES_NOTE } from "@/content/shared";

/* ─────────────────────────  /work/case-studies  ───────────────────────── */

export const CASE_STUDIES_SEO: SeoMeta = {
  title: "Project Write-Ups | VAELKODE",
  description:
    "Detailed write-ups of selected professional projects across software engineering, artificial intelligence, automation, and modern digital technologies. These aren't client deliveries under the VAELKODE brand.",
};

export const CASE_STUDIES_HERO: PageHero = {
  label: "Project Write-Ups",
  title: "Project Write-Ups",
  supporting:
    "Explore how complex business and technical challenges were approached through software engineering, artificial intelligence, automation, and modern digital technologies.",
};

export interface CaseStudy {
  slug: string;
  seo: { title: string; description: string };
  category: string;
  title: string;
  /** Short lead shown in the hero. */
  lead: string;
  overview: string[];
  focus: { heading: string; points: string[] };
  /** Optional additional key components (factual, derived from provided scope). */
  keyComponents?: string[];
  technologies: string[];
  relatedCapabilities: { label: string; to: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "navttc-government-platform",
    seo: {
      title: "NAVTTC Government Infrastructure Platform | Project Write-Up | VAELKODE",
      description:
        "A professional project write-up on architecting and delivering 12 interconnected government systems across the TVET lifecycle, with document digitization, multi-agent qualification generation, and AI-powered reporting.",
    },
    category: "Government Technology · Enterprise Platforms · AI Automation",
    title: "NAVTTC Government Infrastructure Platform",
    lead: "Architecture and delivery across 12 interconnected government systems supporting the full TVET lifecycle.",
    overview: [
      "End-to-end architecture and delivery across 12 interconnected government systems supporting the TVET lifecycle, including qualification development, institute registration, accreditation, certification, testing, LMS, and job placement.",
    ],
    focus: {
      heading: "AI & Automation",
      points: [
        "Document digitization with PaddleOCR",
        "Multi-agent qualification generation",
        "AI-powered dynamic reporting",
      ],
    },
    keyComponents: [
      "Qualification development",
      "Institute registration",
      "Accreditation",
      "Certification",
      "Testing",
      "Learning Management System (LMS)",
      "Job placement",
    ],
    technologies: ["Python", "PaddleOCR", "LangChain", "PHP", "MySQL", "REST APIs", "Azure DevOps"],
    relatedCapabilities: [
      { label: "AI & Automation", to: "/solutions/ai-automation" },
      { label: "Custom Software", to: "/solutions/custom-software" },
    ],
  },
  {
    slug: "empowernow-agentic-ai",
    seo: {
      title: "EmpowerNow. Agentic AI Workflow Engine | Project Write-Up | VAELKODE",
      description:
        "A professional project write-up on a WebSocket-driven agentic AI engine that generates structured enterprise workflows using GPT-4o, RAG, tool calling, and multi-agent orchestration.",
    },
    category: "Agentic AI · Enterprise Automation",
    title: "EmpowerNow. Agentic AI Workflow Engine",
    lead: "A real-time agentic AI engine that turns natural-language queries into structured enterprise workflows.",
    overview: [
      "A WebSocket-driven agentic AI engine that turns user queries into structured enterprise workflows using GPT-4o, RAG, tool calling, and multi-agent orchestration.",
    ],
    focus: {
      heading: "AI & Automation",
      points: [
        "Structured enterprise workflow generation from natural-language queries",
        "Multi-agent orchestration with tool calling",
        "Retrieval-augmented generation (RAG)",
        "Real-time, WebSocket-driven interaction",
      ],
    },
    technologies: ["Python", "GPT-4o", "LangGraph", "LangChain", "FastAPI", "WebSockets", "ChromaDB", "Docker"],
    relatedCapabilities: [
      { label: "AI & Automation", to: "/solutions/ai-automation" },
      { label: "Custom Software", to: "/solutions/custom-software" },
    ],
  },
  {
    slug: "precision-agriculture-cv-geospatial",
    seo: {
      title: "Precision Agriculture. CV & Geospatial AI | Project Write-Up | VAELKODE",
      description:
        "A professional project write-up on computer vision and geospatial AI for agriculture: crop classification, variety detection, disease and risk mapping, and sowing date prediction from satellite imagery.",
    },
    category: "Computer Vision · Geospatial AI · Agriculture",
    title: "Precision Agriculture. CV & Geospatial AI",
    lead: "Computer vision and geospatial AI applied to satellite imagery for smarter agricultural decisions.",
    overview: [
      "AI and geospatial initiatives covering crop classification, sugarcane variety detection, disease detection and risk mapping, and crop sowing date prediction using satellite imagery and computer vision.",
    ],
    focus: {
      heading: "Computer Vision & Geospatial AI",
      points: [
        "Crop classification from satellite imagery",
        "Sugarcane variety detection",
        "Disease detection and risk mapping",
        "Crop sowing date prediction",
      ],
    },
    technologies: ["YOLOv8", "Detectron2", "Google Earth Engine", "GCP", "Python", "OpenCV"],
    relatedCapabilities: [
      { label: "AI & Automation", to: "/solutions/ai-automation" },
      { label: "Custom Software", to: "/solutions/custom-software" },
    ],
  },
];

/** Ordered slugs featured on the /work/case-studies index. */
export const FEATURED_CASE_STUDY_SLUGS = [
  "navttc-government-platform",
  "empowernow-agentic-ai",
  "precision-agriculture-cv-geospatial",
];
