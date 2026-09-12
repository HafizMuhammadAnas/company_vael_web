/**
 * VAELKODE /solutions/technology-consulting. Technology Consulting.
 * Approved production copy. No invented consulting clients, certifications,
 * consultants, project outcomes, savings percentages, technology partnerships,
 * or measurable results. Requirements-driven, advisory positioning.
 */

import { COMPANY } from "@/constants/company";
import { CTA, DISCLAIMERS, FINAL_PAIR_TELL_US, consultationCta, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkEmptySection } from "@/content/shared";


export const TC_SEO: SeoMeta = {
  title: "Technology Consulting Services | VAELKODE",
  description:
    "VAELKODE provides technology consulting, solution architecture, system assessments, digital transformation, technology strategy, technical roadmaps, and technology evaluation.",
};

export const TC_HERO: PageHero = {
  label: "Technology Consulting",
  title: "Clarity before you build or buy.",
  supporting:
    "We help you choose the right approach, architecture, and plan so money and time go into solutions that fit your business.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss Your Technology Challenge"),
  tags: [
    "Discovery",
    "Architecture",
    "Build vs buy",
    "Roadmaps",
    "Audits",
    "Scoping",
  ],
};

export const TC_SUB_SERVICES = {
  label: "Consulting services",
  heading: "Clarity before you commit budget.",
  supporting: "Use consulting when the decision is expensive and guessing would cost more.",
  items: [
    {
      title: "Discovery & requirements workshops",
      text: "Map the problem, users, constraints, and success criteria before anyone writes code or buys a platform.",
      highlights: ["Users and goals clarified", "Constraints on the table", "Success criteria agreed"],
      stacks: ["Workshops", "Requirements", "Success criteria"],
    },
    {
      title: "Architecture & tech selection",
      text: "Choose a stack and structure that can grow with you, without over-engineering from the start.",
      highlights: ["System shape that fits", "Stack trade-offs explained", "Pragmatic starting point"],
      stacks: ["System design", "Stack selection", "Trade-offs"],
    },
    {
      title: "Build vs buy advice",
      text: "Decide when to use existing products and when custom software is worth it, against your real requirements.",
      highlights: ["Vendor options mapped", "Cost and fit trade-offs", "Clear recommendation"],
      stacks: ["Vendor options", "Cost trade-offs", "Fit analysis"],
    },
    {
      title: "Digital & product roadmaps",
      text: "A practical sequence of what to ship first, next, and later so teams stop debating forever.",
      highlights: ["Priorities you can defend", "Phased delivery", "Sensible sequencing"],
      stacks: ["Priorities", "Phases", "Sequencing"],
    },
    {
      title: "Technical due diligence & audits",
      text: "Review systems, risks, and debt so you know what you’re inheriting or investing in.",
      highlights: ["Architecture review", "Risk and debt map", "Clear recommendations"],
      stacks: ["Technical review", "Risk assessment", "Debt map"],
    },
    {
      title: "Vendor & platform evaluation",
      text: "Compare tools and partners against your real requirements rather than marketing promises.",
      highlights: ["Requirements-led comparison", "Side-by-side evaluation", "Selection rationale"],
      stacks: ["Requirements fit", "Comparison", "Selection"],
    },
    {
      title: "Delivery planning & scoping",
      text: "Turn ideas into a clear scope, phases, and decision points your team can run with.",
      highlights: ["Scoped phases", "Decision points", "Handoff-ready plan"],
      stacks: ["Scope", "Phases", "Decision points"],
    },
  ],
};

export const TC_INTRO = {
  label: "Technology Decisions",
  heading: "Technology should solve a business problem.",
  paragraphs: [
    "Choosing a stack, replacing a system, or moving to the cloud can involve significant time and investment.",
    "The hard part isn't knowing what technologies exist; it's knowing which approach fits your users, systems, and long-term objectives.",
    "VAELKODE turns complex technology questions into clear options, priorities, and practical next steps.",
  ],
  cards: [
    {
      title: "Assess",
      text: "Understand your current environment, requirements, constraints, and opportunities.",
    },
    {
      title: "Compare",
      text: "Weigh practical approaches and decide based on requirements rather than trends.",
    },
    {
      title: "Plan",
      text: "Turn the selected direction into a clear architecture, roadmap, and implementation plan.",
    },
  ],
};

export const TC_SERVICES = {
  label: "What We Help With",
  heading: "Technology guidance for complex decisions.",
  supporting:
    "Our consulting can support organizations at different stages, from defining a new product to improving an existing technology environment.",
  cards: [
    {
      title: "Technology Strategy",
      description:
        "Define how technology can support your business objectives, operational needs, and future growth.",
      items: [
        "Technology Assessment",
        "Strategic Planning",
        "Technology Priorities",
        "Digital Roadmaps",
        "Platform Decisions",
        "Technical Planning",
      ],
    },
    {
      title: "Solution Architecture",
      description:
        "Define the technical structure needed to turn business requirements into a practical software solution.",
      items: ["Application Architecture", "System Components", "APIs", "Data Architecture", "Integrations", "Infrastructure"],
    },
    {
      title: "System & Application Assessment",
      description:
        "Evaluate existing applications and technology environments to identify technical issues, risks, limitations, and opportunities for improvement.",
      items: [
        "Architecture Review",
        "Codebase Assessment",
        "Infrastructure Review",
        "Performance Considerations",
        "Security Considerations",
        "Technical Debt",
      ],
    },
    {
      title: "Digital Transformation",
      description:
        "Help organizations find opportunities to replace manual or fragmented processes with more connected digital systems.",
      items: [
        "Process Digitization",
        "Workflow Improvement",
        "System Integration",
        "Data Centralization",
        "Automation Opportunities",
        "Digital Platforms",
      ],
    },
    {
      title: "Technology & Platform Selection",
      description: "Evaluate technology options against what the product or organization actually needs.",
      items: [
        "Framework Selection",
        "Cloud Platforms",
        "Database Selection",
        "Architecture Options",
        "Integration Technologies",
        "Build vs. Buy Considerations",
      ],
    },
    {
      title: "Technical Roadmaps",
      description:
        "Turn technical goals into prioritized implementation plans that provide a practical path from the current state to the desired future state.",
      items: [
        "Current-State Assessment",
        "Target State",
        "Priorities",
        "Phased Implementation",
        "Dependencies",
        "Technical Milestones",
      ],
    },
  ],
};

export const TC_WHEN = {
  label: "Common Questions",
  heading: "Not sure what technology approach you need?",
  supporting:
    "Technology decisions get difficult when there are multiple possible approaches and choosing incorrectly can be expensive.",
  cards: [
    {
      title: "\u201CWe have an idea, but don't know where to start.\u201D",
      text: "You need to understand the product requirements, technical options, scope, and sensible first steps.",
      focus: "Product & Technical Discovery",
    },
    {
      title: "\u201COur existing system is becoming difficult to maintain.\u201D",
      text: "You need an objective assessment before deciding whether to improve, modernize, replace, or extend the system.",
      focus: "System Assessment",
    },
    {
      title: "\u201CWe want to move to the cloud.\u201D",
      text: "You need to understand whether migration makes sense and what architecture and migration strategy fit.",
      focus: "Cloud Strategy & Architecture",
    },
    {
      title: "\u201CWe have too many disconnected systems.\u201D",
      text: "You need to understand how applications, data, and workflows can be connected.",
      focus: "Integration Architecture",
    },
    {
      title: "\u201CWe need to automate our processes.\u201D",
      text: "You need to identify which processes suit automation and what technology should support them.",
      focus: "Automation Strategy",
    },
    {
      title: "\u201CWe are not sure whether to build or buy.\u201D",
      text: "You need to compare commercial products and custom development based on actual requirements.",
      focus: "Technology Evaluation",
    },
  ],
};

export const TC_ASSESSMENT = {
  label: "Assess Before You Invest",
  heading: "Understand your technology before you change it.",
  paragraphs: [
    "Replacing or rebuilding a system without understanding the current environment can introduce unnecessary cost, risk, and disruption.",
    "An assessment gives a structured view of the existing technology environment and helps identify what should be retained, improved, replaced, or redesigned.",
  ],
  cards: [
    {
      title: "Application Architecture",
      text: "How the application is structured and how its major components interact.",
    },
    {
      title: "Code & Maintainability",
      text: "Areas that may create development challenges, technical debt, or future maintenance concerns.",
    },
    { title: "Data", text: "How information is stored, accessed, structured, and exchanged across systems." },
    { title: "Integrations", text: "How the application communicates with external and internal systems." },
    {
      title: "Infrastructure",
      text: "The environments, hosting, deployment, and operational components supporting the application.",
    },
    {
      title: "Security Considerations",
      text: "Relevant authentication, authorization, access, configuration, and infrastructure considerations.",
    },
    {
      title: "Performance",
      text: "Areas that may affect application responsiveness, scalability, or operational behavior.",
    },
  ],
  cta: consultationCta("Request a Technology Assessment"),
};

export const TC_ARCHITECTURE = {
  label: "Architecture",
  heading: "Turn requirements into a technical blueprint.",
  paragraphs: [
    "Before development begins, important architectural decisions can shape the future of the product.",
    "We translate business and functional requirements into a technical structure that defines how the major components of the system should work together.",
  ],
  flow: ["Users", "Frontend / Mobile", "API Layer", "Application Services", "Data Layer", "External Systems", "Cloud / Infrastructure"],
  cards: [
    { title: "Application Structure", text: "Define how application components and services should be organized." },
    { title: "APIs", text: "Determine how systems and services should communicate." },
    { title: "Data Architecture", text: "Plan how important information is stored, accessed, and exchanged." },
    { title: "Integrations", text: "Identify required connections with internal and external systems." },
    { title: "Infrastructure", text: "Determine the right environment for running and supporting the application." },
    {
      title: "Security",
      text: "Consider access, authentication, authorization, data protection, and other relevant security requirements.",
    },
  ],
};

export const TC_TRANSFORM = {
  label: "Transform Operations",
  heading: "Move from fragmented processes to connected digital systems.",
  supporting:
    "Digital transformation isn't simply replacing paper with software. It means understanding how an organization operates and finding where technology can improve information flow, workflows, decision-making, and service delivery.",
  cards: [
    { title: "Discover", text: "Understand existing processes, systems, users, information flows, and operational challenges." },
    { title: "Prioritize", text: "Identify which problems have the greatest business and operational value to address." },
    { title: "Design", text: "Define the digital processes, systems, integrations, and user experiences required." },
    { title: "Implement", text: "Build and introduce the selected technology in manageable phases." },
    { title: "Improve", text: "Measure, learn, and continuously improve the digital environment." },
  ],
};

export const TC_BUILD_BUY = {
  label: "Make the Right Choice",
  heading: "Build, buy, integrate, or combine?",
  paragraphs: [
    "Not every business problem requires custom software.",
    "Sometimes an existing product is the right choice. Sometimes customization or integration is enough. In other situations, the organization's requirements justify building a purpose-built solution.",
    "The right decision depends on the requirements, costs, constraints, integrations, ownership, flexibility, and long-term objectives.",
  ],
  cards: [
    {
      title: "Build",
      text: "Makes sense when requirements are highly specific or existing products can't adequately support the desired workflow.",
    },
    {
      title: "Buy",
      text: "Makes sense when an established product already meets most requirements and can be adopted effectively.",
    },
    {
      title: "Integrate",
      text: "Makes sense when existing systems can satisfy different parts of the requirement but need to work together.",
    },
    {
      title: "Combine",
      text: "Use commercial products alongside custom software where that provides the most practical overall solution.",
    },
  ],
  cta: consultationCta("Discuss Your Options"),
};

export const TC_EVALUATION = {
  label: "Technology Selection",
  heading: "Choose technology based on requirements, not hype.",
  paragraphs: [
    "New frameworks, platforms, cloud services, and AI technologies appear constantly. The newest technology isn't automatically the best technology for your project.",
    "We evaluate technical options according to what the product and organization actually need.",
  ],
  cards: [
    { title: "Business Requirements", text: "Does the technology support what the organization actually needs?" },
    {
      title: "Technical Requirements",
      text: "Can it provide the required functionality, integrations, performance, and flexibility?",
    },
    { title: "Team Capability", text: "Can the organization develop, maintain, and operate the selected technology?" },
    { title: "Cost", text: "What are the development, infrastructure, licensing, and ongoing maintenance implications?" },
    { title: "Maintainability", text: "Can the system reasonably be maintained and evolved over time?" },
    { title: "Scalability", text: "Can the technology support expected future requirements?" },
    {
      title: "Ecosystem",
      text: "Is there a solid ecosystem, tooling, documentation, and support around the technology?",
    },
  ],
};

export const TC_AI = {
  label: "Emerging Technology",
  heading: "Understand where new technology actually fits.",
  paragraphs: [
    "AI and emerging technologies can create valuable opportunities, but they should be introduced where they solve a meaningful business problem.",
    "We can help organizations evaluate potential applications of AI, automation, data-driven systems, and other emerging technologies within their existing or planned digital environment.",
  ],
  cards: [
    { title: "AI Opportunity Assessment", text: "Identify processes and use cases where AI may provide practical value." },
    { title: "Automation Opportunities", text: "Identify repetitive workflows that may benefit from automation." },
    {
      title: "AI Integration",
      text: "Evaluate how AI capabilities can be incorporated into existing applications and platforms.",
    },
    {
      title: "Data Readiness",
      text: "Consider whether the organization's data, processes, and systems are suitable for the proposed use case.",
    },
  ],
  cta: { label: "Explore AI & Intelligent Automation", to: "/solutions/ai-automation" },
};

export const TC_ROADMAP = {
  label: "From Strategy to Execution",
  heading: "A strategy is only useful if you can act on it.",
  paragraphs: [
    "Technology recommendations should result in clear next steps.",
    "We translate technical direction into a practical roadmap that can guide implementation and investment decisions.",
  ],
  flow: [
    "Current State",
    "Business Objectives",
    "Technical Gaps",
    "Target Architecture",
    "Priorities",
    "Implementation Phases",
    "Future State",
  ],
  phases: [
    { num: "01", title: "Foundation", text: "Address essential technical and architectural requirements." },
    { num: "02", title: "Core Implementation", text: "Build or modernize the highest-priority capabilities." },
    { num: "03", title: "Integration", text: "Connect systems, data, workflows, and services where required." },
    {
      num: "04",
      title: "Optimization",
      text: "Improve performance, usability, automation, monitoring, and operational capabilities.",
    },
    {
      num: "05",
      title: "Evolution",
      text: "Continue developing the platform according to business priorities and emerging requirements.",
    },
  ],
};

export const TC_PROCESS = {
  label: "How we work",
  headingBefore: "From question to clear next move: ",
  headingAccent: "our process",
  supporting: "Consulting should end with something you can act on, not a deck that gathers dust.",
  steps: [
    {
      num: "01",
      title: "Understand",
      text: "Learn your goals, systems, users, and constraints.",
      milestone: "Brief locked",
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Assess",
      text: "Review what you have and where the real friction is.",
      milestone: "Findings shared",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Recommend",
      text: "Compare practical options and recommend a clear path.",
      milestone: "Options compared",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Roadmap",
      text: "Define priorities and next steps, including build support if needed.",
      milestone: "Clear plan",
      tone: "teal" as const,
    },
  ],
};

export const TC_PROJECTS = {
  label: "Selected projects",
  heading: "Consulting work we'll share as it goes public.",
  supporting: "We don't invent case studies. Public consulting and architecture projects will appear here when they're ready to show.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
  emptyState: "Consulting and architecture projects will be featured here as they become available for public presentation.",
};

export const TC_DELIVERABLES = {
  label: "What You Receive",
  heading: "Consulting should produce something useful.",
  supporting:
    "The exact deliverables depend on the engagement, but consulting should leave you with practical outputs that help the organization make and execute technology decisions.",
  note: DISCLAIMERS.deliverablesDepend,
  cards: [
    { title: "Technology Assessment", text: "Findings from the review of the relevant technology environment." },
    { title: "Architecture Recommendations", text: "Proposed technical architecture and key architectural decisions." },
    { title: "Technology Evaluation", text: "Comparison of relevant technology or platform options." },
    { title: "Digital Roadmap", text: "Prioritized technical initiatives and implementation phases." },
    { title: "System Modernization Plan", text: "Recommended approach for improving or replacing an existing system." },
    { title: "Integration Strategy", text: "Proposed approach for connecting applications, data, and services." },
    {
      title: "AI Opportunity Assessment",
      text: "Potential AI and automation opportunities aligned with business requirements.",
    },
    {
      title: "Technical Requirements",
      text: "Structured requirements that can guide subsequent design and development.",
    },
  ],
};

export const TC_WHO = {
  label: "Who We Work With",
  heading: "Technology guidance for organizations at different stages.",
  cards: [
    {
      title: "Startups & Founders",
      text: "Turn an idea into a practical technical direction before investing heavily in development.",
    },
    {
      title: "Growing Businesses",
      text: "Modernize systems, improve processes, and establish technology foundations for continued growth.",
    },
    {
      title: "Established Organizations",
      text: "Assess existing technology environments and plan modernization, integration, or digital transformation initiatives.",
    },
    {
      title: "Technology Teams",
      text: "Provide additional architecture, assessment, or technical expertise for complex initiatives.",
    },
    {
      title: "Organizations With Legacy Systems",
      text: "Understand technical limitations and identify practical modernization paths.",
    },
  ],
};

// Selected Work: no publicly approved consulting case studies yet.
export const TC_WORK: WorkEmptySection = {
  label: "Selected Work",
  heading: "Technology decisions that lead to real solutions.",
  supporting:
    "Selected consulting, architecture, and technology initiatives will appear here as projects become available for public presentation.",
  emptyState: "Consulting and architecture projects will be featured here as they become available for public presentation.",
  cta: CTA.viewAvailableWork,
};

export const TC_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "What does technology consulting cover?",
      a: "Helping you understand the problem, compare approaches, make technical decisions, and leave with a practical plan.",
    },
    {
      q: "Do we need to know the technology already?",
      a: "No. Start with the business problem or idea. We’ll help figure out what guidance is useful.",
    },
    {
      q: "Can you assess our existing software?",
      a: "Yes. Architecture, maintainability, integrations, data, infrastructure, and technical risk.",
    },
    {
      q: "Can you help with build vs buy?",
      a: "Yes. We weigh requirements, available products, customization, integration, ownership, and long-term cost.",
    },
    {
      q: "Can consulting lead into development?",
      a: "Yes. Where it fits, advice can continue into architecture, software, AI, web, mobile, or cloud delivery.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Yes. Engagements can complement your IT or development team based on roles and needs.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const TC_FINAL: FinalCta = {
  label: "Next step",
  heading: "Have a technology decision to make?",
  supporting: `You don’t need every answer first. Tell us what you’re trying to achieve. Email ${COMPANY.contact.email} or book a consultation and we’ll explore the right path.`,
  ...FINAL_PAIR_TELL_US,
};
