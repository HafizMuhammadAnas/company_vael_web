/**
 * VAELKODE /solutions/technology-consulting — Technology Consulting.
 * Approved production copy. No invented consulting clients, certifications,
 * consultants, project outcomes, savings percentages, technology partnerships,
 * or measurable results. Requirements-driven, advisory positioning.
 */

export const TC_SEO = {
  title: "Technology Consulting Services | VAELKODE",
  description:
    "VAELKODE provides technology consulting, solution architecture, system assessments, digital transformation, technology strategy, technical roadmaps, and technology evaluation.",
};

export const TC_HERO = {
  label: "Technology Consulting",
  title: "Make Better Technology Decisions With a Clearer Path Forward.",
  supporting:
    "VAELKODE helps organizations evaluate technology, define digital strategies, design technical architectures, and create practical roadmaps for building, modernizing, and improving software systems.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Discuss Your Technology Challenge", to: "/contact" },
  tags: [
    "Technology Strategy",
    "Solution Architecture",
    "System Assessment",
    "Digital Transformation",
    "Technical Roadmaps",
    "Technology Advisory",
  ],
};

export const TC_INTRO = {
  label: "Technology Decisions",
  heading: "Technology Should Solve a Business Problem.",
  paragraphs: [
    "Choosing a technology stack, developing a new platform, replacing an existing system, or moving to the cloud can involve significant time and investment.",
    "The challenge is not simply knowing what technologies exist. It is understanding which approach makes sense for your organization, your users, your existing systems, and your long-term objectives.",
    "VAELKODE helps turn complex technology questions into clear technical options, priorities, and actionable next steps.",
  ],
  cards: [
    {
      title: "Understand",
      text: "Assess your current environment, business requirements, technical constraints, and opportunities.",
    },
    {
      title: "Decide",
      text: "Compare practical approaches and make technology decisions based on requirements rather than trends.",
    },
    {
      title: "Execute",
      text: "Turn the selected direction into an actionable architecture, roadmap, and implementation plan.",
    },
  ],
};

export const TC_SERVICES = {
  label: "What We Help With",
  heading: "Technology Guidance for Complex Decisions.",
  supporting:
    "Our consulting services can support organizations at different stages—from defining a new product to improving an existing technology environment.",
  cards: [
    {
      title: "Technology Strategy",
      description:
        "Define how technology can support your business objectives, operational requirements, and future growth.",
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
        "Define the technical structure required to turn business requirements into a practical software solution.",
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
        "Help organizations identify opportunities to replace manual or fragmented processes with more connected digital systems.",
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
      description: "Evaluate technology options against the actual requirements of the product or organization.",
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
  heading: "Not Sure What Technology Approach You Need?",
  supporting:
    "Technology decisions become difficult when there are multiple possible approaches and the consequences of choosing incorrectly can be expensive.",
  cards: [
    {
      title: "\u201CWe have an idea, but don't know where to start.\u201D",
      text: "You need to understand the product requirements, technical options, scope, and appropriate first steps.",
      focus: "Product & Technical Discovery",
    },
    {
      title: "\u201COur existing system is becoming difficult to maintain.\u201D",
      text: "You need an objective assessment before deciding whether to improve, modernize, replace, or extend the system.",
      focus: "System Assessment",
    },
    {
      title: "\u201CWe want to move to the cloud.\u201D",
      text: "You need to understand whether migration makes sense and what architecture and migration strategy are appropriate.",
      focus: "Cloud Strategy & Architecture",
    },
    {
      title: "\u201CWe have too many disconnected systems.\u201D",
      text: "You need to understand how applications, data, and workflows can be connected.",
      focus: "Integration Architecture",
    },
    {
      title: "\u201CWe need to automate our processes.\u201D",
      text: "You need to identify which processes are suitable for automation and what technology should support them.",
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
  heading: "Understand Your Technology Before You Change It.",
  paragraphs: [
    "Replacing or rebuilding a system without understanding the current environment can introduce unnecessary cost, risk, and disruption.",
    "An assessment provides a structured view of the existing technology environment and helps identify what should be retained, improved, replaced, or redesigned.",
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
  cta: { label: "Request a Technology Assessment", to: "/consultation" },
};

export const TC_ARCHITECTURE = {
  label: "Architecture",
  heading: "Turn Requirements Into a Technical Blueprint.",
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
    { title: "Infrastructure", text: "Determine the appropriate environment for running and supporting the application." },
    {
      title: "Security",
      text: "Consider access, authentication, authorization, data protection, and other relevant security requirements.",
    },
  ],
};

export const TC_TRANSFORM = {
  label: "Transform Operations",
  heading: "Move From Fragmented Processes to Connected Digital Systems.",
  supporting:
    "Digital transformation is not simply replacing paper with software. It involves understanding how an organization operates and identifying where technology can improve information flow, workflows, decision-making, and service delivery.",
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
  heading: "Build, Buy, Integrate—or Combine?",
  paragraphs: [
    "Not every business problem requires custom software.",
    "Sometimes an existing product is the right choice. Sometimes customization or integration is sufficient. In other situations, the organization's requirements justify building a purpose-built solution.",
    "The right decision depends on the requirements, costs, constraints, integrations, ownership, flexibility, and long-term objectives.",
  ],
  cards: [
    {
      title: "Build",
      text: "Appropriate when requirements are highly specific or existing products cannot adequately support the desired workflow.",
    },
    {
      title: "Buy",
      text: "Appropriate when an established product already meets most requirements and can be adopted effectively.",
    },
    {
      title: "Integrate",
      text: "Appropriate when existing systems can satisfy different parts of the requirement but need to work together.",
    },
    {
      title: "Combine",
      text: "Use commercial products alongside custom software where that provides the most practical overall solution.",
    },
  ],
  cta: { label: "Discuss Your Options", to: "/consultation" },
};

export const TC_EVALUATION = {
  label: "Technology Selection",
  heading: "Choose Technology Based on Requirements—not Hype.",
  paragraphs: [
    "New frameworks, platforms, cloud services, and AI technologies appear constantly. The newest technology is not automatically the best technology for your project.",
    "We evaluate technical options according to the actual needs of the product and organization.",
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
      text: "Is there an appropriate ecosystem, tooling, documentation, and support around the technology?",
    },
  ],
};

export const TC_AI = {
  label: "Emerging Technology",
  heading: "Understand Where New Technology Actually Fits.",
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
  heading: "A Strategy Is Only Useful If You Can Act on It.",
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
  label: "Our Approach",
  heading: "From Technology Question to Actionable Direction.",
  steps: [
    {
      num: "01",
      title: "Understand",
      text: "Learn about your organization, current systems, users, business objectives, and technical challenges.",
    },
    {
      num: "02",
      title: "Assess",
      text: "Review the relevant applications, processes, architecture, infrastructure, data, and constraints.",
    },
    {
      num: "03",
      title: "Explore",
      text: "Identify potential approaches and evaluate their technical and business implications.",
    },
    {
      num: "04",
      title: "Recommend",
      text: "Present practical recommendations based on the available information and project requirements.",
    },
    { num: "05", title: "Roadmap", text: "Define priorities, dependencies, implementation phases, and next steps." },
    {
      num: "06",
      title: "Support",
      text: "Where required, continue into architecture, development, modernization, cloud, AI, or other implementation work.",
    },
  ],
};

export const TC_DELIVERABLES = {
  label: "What You Receive",
  heading: "Consulting Should Produce Something Useful.",
  supporting:
    "The exact deliverables depend on the engagement, but a consulting engagement should result in practical outputs that help the organization make and execute technology decisions.",
  note: "Possible deliverables — actual outputs depend on the engagement.",
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
  heading: "Technology Guidance for Organizations at Different Stages.",
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
export const TC_WORK = {
  label: "Selected Work",
  heading: "Technology Decisions That Lead to Real Solutions.",
  supporting:
    "Selected consulting, architecture, and technology initiatives will be presented here as projects become available for public presentation.",
  emptyState: "Consulting and architecture projects will be featured here as they become available for public presentation.",
  cta: { label: "View Available Work", to: "/work" },
};

export const TC_FAQ = {
  label: "Technology Consulting FAQ",
  heading: "Questions About Technology Consulting?",
  items: [
    {
      q: "What does a technology consultant actually do?",
      a: "Technology consulting helps organizations understand technology-related problems, evaluate possible approaches, make technical decisions, and create practical plans for implementation.",
    },
    {
      q: "Do we need to know exactly what technology we want before contacting VAELKODE?",
      a: "No. Consulting can begin with a business problem, technical challenge, or project idea. The purpose of an initial discussion is to understand what you are trying to achieve and determine what type of technical guidance may be useful.",
    },
    {
      q: "Can you assess our existing software?",
      a: "Yes. An assessment can examine areas such as application architecture, code maintainability, integrations, data, infrastructure, performance considerations, and technical risks.",
    },
    {
      q: "Can you help us decide whether to build or buy software?",
      a: "Yes. Build-versus-buy decisions can be evaluated based on requirements, available products, customization needs, integration requirements, costs, ownership, and long-term considerations.",
    },
    {
      q: "Can you design the architecture before development starts?",
      a: "Yes. Architecture planning can be performed before development to establish how application components, data, APIs, integrations, infrastructure, and other technical elements should work together.",
    },
    {
      q: "Can consulting continue into development?",
      a: "Yes. Where appropriate, consulting can lead into architecture, software development, AI implementation, web development, mobile development, cloud, or other technical services.",
    },
    {
      q: "Can you work with our existing IT or development team?",
      a: "Yes. Consulting can be structured to complement an existing technical team, depending on the organization's requirements and responsibilities.",
    },
    {
      q: "Do you provide a fixed consulting package?",
      a: "Consulting requirements vary significantly between organizations. The appropriate scope, deliverables, and engagement model can be discussed after understanding the specific challenge.",
    },
    {
      q: "Can you help with AI strategy?",
      a: "Yes. AI opportunities can be assessed in relation to business processes, available data, existing systems, expected value, technical feasibility, and implementation requirements.",
    },
  ],
  cta: { label: "Book a Consultation", to: "/consultation" },
};

export const TC_FINAL = {
  label: "Start With Clarity",
  heading: "Have a Technology Decision to Make?",
  supporting:
    "You don't need to have every technical answer before starting the conversation. Tell us what you're trying to achieve, what you're struggling with, or what you're considering—and we can explore the right path forward.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Request a Proposal", to: "/request-proposal" },
};
