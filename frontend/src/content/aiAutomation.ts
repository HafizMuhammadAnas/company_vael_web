/**
 * VAELKODE /solutions/ai-automation. AI & Intelligent Automation.
 * Approved production copy. No unsupported AI claims, accuracy figures,
 * client names, testimonials, or certifications.
 */

import { COMPANY } from "@/constants/company";
import { CTA, CTA_ROUTES, DISCLAIMERS, FINAL_PAIR_TELL_US, consultationCta, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkShowcaseSection } from "@/content/shared";


export const AI_SEO: SeoMeta = {
  title: "AI & Intelligent Automation Solutions | VAELKODE",
  description:
    "VAELKODE builds practical AI and intelligent automation solutions including generative AI, AI agents, document intelligence, computer vision, NLP, and predictive analytics.",
};

export const AI_HERO: PageHero = {
  label: "AI & Intelligent Automation",
  title: "AI only where it removes real friction.",
  supporting:
    "We help you automate documents, decisions, and repetitive work. Starting with a clear problem, a focused prototype, and systems your team already uses.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss an AI Project"),
  tags: [
    "Automation",
    "Document AI",
    "Assistants",
    "Knowledge search",
    "Agents",
    "Vision",
  ],
};

export const AI_SUB_SERVICES = {
  label: "AI services",
  heading: "Where we put AI to work.",
  supporting: "We only recommend AI where it earns its place. Stacks chosen to fit the workflow.",
  items: [
    {
      title: "Process & workflow automation",
      text: "Cut repetitive handoffs between people, spreadsheets, and email with rules and AI where judgment helps.",
      highlights: ["Trigger → rule → action paths", "Fewer manual handoffs", "Human review when needed"],
      stacks: ["Workflows", "APIs", "Rules + AI"],
    },
    {
      title: "Document intelligence",
      text: "Extract, classify, and summarize information from PDFs, forms, and invoices so teams stop retyping.",
      highlights: ["OCR and classification", "Structured extraction", "Handoff into your systems"],
      stacks: ["OCR", "Classification", "Extraction"],
    },
    {
      title: "Chatbots, copilots & assistants",
      text: "Help customers or staff get answers and complete tasks with guided AI support grounded in your content.",
      highlights: ["Guided Q&A and tasks", "Tool calling when useful", "Clear escalation to people"],
      stacks: ["LLMs", "RAG", "Tool calling"],
    },
    {
      title: "Knowledge search (RAG)",
      text: "Let people ask questions across your policies, manuals, and company documents, with sources you can check.",
      highlights: ["Search across your docs", "Answers with context", "Controls on what is indexed"],
      stacks: ["Embeddings", "Vector search", "RAG"],
    },
    {
      title: "Agentic workflows",
      text: "Multi-step automations that call tools, update systems, and hand off to humans when confidence is low.",
      highlights: ["Plan and tool use", "System updates", "Human checkpoints"],
      stacks: ["Agents", "Tool use", "Human handoff"],
    },
    {
      title: "Computer vision use-cases",
      text: "Detect, classify, or check visual data where cameras or images matter to operations, scoped to a clear job.",
      highlights: ["Detection and classification", "Operational review loops", "Integration with existing flows"],
      stacks: ["OpenCV", "Classification", "Detection"],
    },
    {
      title: "AI feasibility & roadmap",
      text: "Find where AI helps, what data you need, and what to build first, before a large spend.",
      highlights: ["Problem and data fit", "Focused proof of concept", "Phased roadmap"],
      stacks: ["Discovery", "PoC", "Roadmap"],
    },
    {
      title: "AI inside existing products",
      text: "Add practical AI features to the software and websites you already run, without a full rewrite.",
      highlights: ["Feature add-on approach", "APIs into current apps", "Guardrails and monitoring"],
      stacks: ["APIs", "Feature add-on", "Existing apps"],
    },
  ],
};

export const AI_INTRO = {
  label: "The Opportunity",
  heading: "AI is most valuable when it solves a real problem.",
  paragraphs: [
    "Successful AI adoption isn't about adding AI to everything. It's about finding workflows where intelligence, automation, or natural-language interaction can create measurable value.",
    "We start with the process and the data you already have, then prove the approach before you commit to a larger build.",
    "VAELKODE works with organizations to turn those opportunities into practical, usable systems rather than demos that never leave the lab.",
  ],
  cards: [
    { title: "Problem", text: "Identify where AI can improve an existing process, product, or decision." },
    { title: "Prototype", text: "Validate the approach with a focused proof of concept before scaling." },
    { title: "Integrate", text: "Connect AI capabilities with the systems and workflows your organization already uses." },
  ],
};

// Section 03. What We Build. No dedicated child routes exist yet, so each
// card CTA opens a conversation via /contact ("Discuss an AI Project").
export const AI_BUILD = {
  label: "AI Solutions",
  heading: "Intelligent systems for real-world workflows.",
  supporting:
    "From individual AI capabilities to complete intelligent platforms, we design solutions around your organization's data, processes, users, and objectives.",
  cta: { to: CTA_ROUTES.contact },
  cards: [
    {
      title: "Generative AI Applications",
      description:
        "Applications that use modern language and generative AI to help people create, understand, summarize, search, and interact with information.",
      examples: [
        "AI Assistants",
        "Knowledge Assistants",
        "Content Generation",
        "Document Summarization",
        "Natural Language Interfaces",
        "Enterprise AI Applications",
      ],
      cta: "Discuss Generative AI",
    },
    {
      title: "AI Agents & Intelligent Workflows",
      description:
        "Intelligent systems that can reason through tasks, interact with tools, retrieve information, and support multi-step business workflows.",
      examples: [
        "Task Automation",
        "Workflow Agents",
        "Tool-Using Agents",
        "Multi-Step Workflows",
        "AI-Powered Operations",
      ],
      cta: "Discuss AI Agents",
    },
    {
      title: "Document Intelligence",
      description:
        "Turn unstructured documents into usable information through AI-powered extraction, classification, processing, and analysis.",
      examples: [
        "OCR",
        "Document Classification",
        "Data Extraction",
        "Invoice Processing",
        "Form Processing",
        "Information Validation",
      ],
      cta: "Discuss Document AI",
    },
    {
      title: "Computer Vision",
      description:
        "Help software understand and analyze visual information from images, video, and other visual data.",
      examples: [
        "Image Classification",
        "Object Detection",
        "Visual Inspection",
        "Image Analysis",
        "Video Analytics",
        "Automated Monitoring",
      ],
      cta: "Discuss Computer Vision",
    },
    {
      title: "Natural Language Processing",
      description: "Turn human language into structured information and intelligent interactions.",
      examples: [
        "Text Classification",
        "Entity Extraction",
        "Sentiment Analysis",
        "Semantic Search",
        "Text Summarization",
        "Language Understanding",
      ],
      cta: "Discuss NLP",
    },
    {
      title: "Predictive Analytics & Machine Learning",
      description:
        "Use historical and operational data to identify patterns, generate predictions, and support better decisions.",
      examples: [
        "Forecasting",
        "Risk Prediction",
        "Classification",
        "Recommendation Systems",
        "Anomaly Detection",
        "Predictive Models",
      ],
      cta: "Discuss Predictive AI",
    },
  ],
};

export const AI_USE_CASES = {
  label: "Business Use Cases",
  heading: "Where can AI create value?",
  supporting:
    "AI can apply across many parts of an organization. The right opportunity depends on your workflows, data, users, and business objectives.",
  cards: [
    {
      title: "Automate Repetitive Work",
      text: "Reduce manual effort by automating tasks that follow predictable workflows and keep needing human intervention.",
    },
    {
      title: "Understand Business Documents",
      text: "Extract and structure information from documents that would otherwise need manual review and data entry.",
    },
    {
      title: "Make Information Easier to Find",
      text: "Give teams smarter ways to search, retrieve, summarize, and interact with organizational knowledge.",
    },
    {
      title: "Improve Decision Making",
      text: "Use data, machine learning, and predictive models to identify patterns and support informed decisions.",
    },
    {
      title: "Improve Customer Experiences",
      text: "Build intelligent assistants and digital experiences that help customers find information and complete tasks more easily.",
    },
    {
      title: "Connect Intelligent Systems",
      text: "Integrate AI capabilities into existing applications, workflows, APIs, and business systems.",
    },
  ],
};

export const AI_APPROACH = {
  label: "How we work",
  headingBefore: "From idea to working AI: ",
  headingAccent: "our process",
  supporting:
    "We prove value early, then build what belongs in production, rather than a demo that never ships.",
  steps: [
    {
      num: "01",
      title: "Discover",
      text: "Understand the business problem, users, data, and what success looks like.",
      milestone: "Problem framed",
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Prototype",
      text: "Build a small proof of concept to test whether AI is the right answer.",
      milestone: "PoC reviewed",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Build",
      text: "Engineer the production solution, integrations, and interfaces your team will use.",
      milestone: "Production build",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Launch & improve",
      text: "Go live with monitoring, then keep improving as data and needs change.",
      milestone: "Live & monitored",
      tone: "teal" as const,
    },
  ],
};

export const AI_PROJECTS = {
  label: "Selected projects",
  heading: "AI-capable platforms we're proud to show.",
  supporting:
    "Live work from our public digital portfolio and platforms. Hover a preview, then open the site.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
};

export const AI_RESPONSIBLE = {
  label: "Responsible AI",
  heading: "AI built with responsibility in mind.",
  supporting:
    "AI systems can influence important business processes and user experiences. We consider reliability, security, privacy, transparency, and human oversight when designing AI-enabled solutions.",
  cards: [
    {
      title: "Human Oversight",
      text: "Keep people involved in workflows where decisions need judgment or accountability.",
    },
    {
      title: "Data Protection",
      text: "Consider data security, privacy, access control, and careful handling of sensitive information.",
    },
    {
      title: "Evaluation",
      text: "Test AI systems against defined requirements rather than assuming model output is automatically reliable.",
    },
    {
      title: "Transparency",
      text: "Make the role and limitations of AI understandable to users where it matters.",
    },
    {
      title: "Security",
      text: "Consider application, model, data, and integration security throughout the solution lifecycle.",
    },
    {
      title: "Continuous Monitoring",
      text: "Evaluate AI systems over time as data, models, and usage patterns change.",
    },
  ],
};

export const AI_TECH = {
  label: "AI Technology",
  heading: "The technology behind intelligent solutions.",
  supporting:
    "We combine machine learning frameworks, language models, data technologies, APIs, cloud infrastructure, and software engineering to build complete AI-enabled systems.",
  categories: [
    { title: "AI & Machine Learning", items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"] },
    {
      title: "Generative AI",
      items: [
        "Large Language Models",
        "Retrieval-Augmented Generation",
        "Embeddings",
        "Vector Search",
        "AI Agents",
        "Prompt Engineering",
      ],
    },
    {
      title: "Computer Vision",
      items: ["OpenCV", "YOLO", "Image Processing", "Object Detection", "Image Classification"],
    },
    {
      title: "NLP",
      items: ["Natural Language Processing", "Text Classification", "Entity Extraction", "Semantic Search", "Text Embeddings"],
    },
    {
      title: "Data & Infrastructure",
      items: ["APIs", "PostgreSQL", "MySQL", "Redis", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud"],
    },
  ],
};

export const AI_INTEGRATION = {
  label: "AI Integration",
  heading: "AI doesn't always mean rebuilding your systems.",
  paragraphs: [
    "Many organizations already have applications, databases, workflows, and internal platforms that are central to how they operate.",
    "In those situations, AI can often arrive as an additional capability rather than replacing the entire system.",
  ],
  cards: [
    {
      title: "Existing Business Applications",
      text: "Add intelligent capabilities to applications your teams already use.",
    },
    {
      title: "Enterprise Knowledge",
      text: "Connect AI assistants to approved organizational information and knowledge sources.",
    },
    {
      title: "Business Workflows",
      text: "Introduce intelligent automation into existing approval, processing, and operational workflows.",
    },
    {
      title: "APIs & Services",
      text: "Connect AI capabilities to existing APIs and third-party platforms.",
    },
    {
      title: "Data Platforms",
      text: "Use structured and unstructured data to support intelligent applications and analytics.",
    },
  ],
  cta: consultationCta("Discuss AI Integration"),
};

export const AI_WORK: WorkShowcaseSection = {
  label: "Selected AI Work",
  heading: "Exploring what AI can build.",
  supporting:
    "Selected AI initiatives and solution concepts that show practical applications of intelligent technology.",
  note: DISCLAIMERS.aiDemonstrations,
  cards: [
    {
      title: "Intelligent Document Processing Platform",
      description:
        "AI-powered document processing that extracts, classifies, structures, and analyzes information from business documents.",
      capabilities: ["OCR", "Document Classification", "Data Extraction", "AI Processing"],
    },
    {
      title: "Predictive Analytics",
      description:
        "Data-driven models that identify patterns and support forecasting, classification, and operational decision-making.",
      capabilities: ["Machine Learning", "Data Analysis", "Prediction", "Visualization"],
    },
    {
      title: "Intelligent Knowledge Assistant",
      description:
        "An AI-powered interface that helps users retrieve and interact with information from approved knowledge sources.",
      capabilities: ["LLMs", "Retrieval", "Semantic Search", "Natural Language"],
    },
  ],
};

export const AI_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "Does my business need AI?",
      a: "Not necessarily. We start with the business problem. If AI can create real value, we’ll say so; if it can’t, we’ll say that too.",
    },
    {
      q: "Can you add AI to our existing software?",
      a: "Yes. AI can often plug into existing apps, workflows, APIs, and data systems without replacing the whole platform.",
    },
    {
      q: "Can you build a private AI solution?",
      a: "Yes, where the project requires it. Architecture depends on your data access, security, privacy, and infrastructure needs.",
    },
    {
      q: "What data do we need?",
      a: "It depends. Document and knowledge use-cases may work with what you already have; predictive models often need historical structured data.",
    },
    {
      q: "How long does an AI project take?",
      a: "It depends on the problem, data, integrations, and production scope. We start with discovery before locking a delivery timeline.",
    },
    {
      q: "Can you start with a proof of concept?",
      a: "Yes. A focused PoC is often the right way to test feasibility and value before a full production build.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const AI_FINAL: FinalCta = {
  label: "Next step",
  heading: "Have an AI opportunity in mind?",
  supporting: `Tell us about the process, challenge, or idea you're exploring. Email ${COMPANY.contact.email} or book a consultation and we'll help you decide whether AI is the right path.`,
  primaryCta: CTA.bookAiConsultation,
  secondaryCta: FINAL_PAIR_TELL_US.secondaryCta,
};
