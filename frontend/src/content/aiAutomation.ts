/**
 * VAELKODE /solutions/ai-automation — AI & Intelligent Automation.
 * Approved production copy. No unsupported AI claims, accuracy figures,
 * client names, testimonials, or certifications.
 */

export const AI_SEO = {
  title: "AI & Intelligent Automation Solutions | VAELKODE",
  description:
    "VAELKODE builds practical AI and intelligent automation solutions including generative AI, AI agents, document intelligence, computer vision, NLP, and predictive analytics.",
};

export const AI_HERO = {
  label: "AI & Intelligent Automation",
  title: "Turn AI Into a Practical Business Advantage.",
  supporting:
    "VAELKODE helps organizations apply artificial intelligence and intelligent automation to real business problems—from understanding documents and data to automating workflows and building intelligent digital experiences.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Discuss an AI Project", to: "/contact" },
  tags: [
    "Generative AI",
    "AI Agents",
    "Document Intelligence",
    "Computer Vision",
    "NLP",
    "Intelligent Automation",
  ],
};

export const AI_INTRO = {
  label: "The Opportunity",
  heading: "AI Is Most Valuable When It Solves a Real Problem.",
  paragraphs: [
    "Artificial intelligence is rapidly changing how organizations work, but successful AI adoption is not about adding AI to everything.",
    "The real opportunity is identifying processes where intelligence, automation, prediction, or natural-language interaction can create measurable value.",
    "VAELKODE works with organizations to identify those opportunities and turn them into practical, usable systems.",
  ],
  cards: [
    { title: "Understand", text: "Identify where AI can improve an existing process, product, or decision." },
    { title: "Apply", text: "Select the right models, data, architecture, and automation approach for the problem." },
    { title: "Integrate", text: "Connect AI capabilities with the systems and workflows your organization already uses." },
  ],
};

// Section 03 — What We Build. No dedicated child routes exist yet, so each
// card CTA opens a conversation via /contact ("Discuss an AI Project").
export const AI_BUILD = {
  label: "AI Solutions",
  heading: "Intelligent Systems Built for Real-World Workflows.",
  supporting:
    "From individual AI capabilities to complete intelligent platforms, we design solutions around your organization's data, processes, users, and objectives.",
  cta: { to: "/contact" },
  cards: [
    {
      title: "Generative AI Applications",
      description:
        "Build applications that use modern language and generative AI capabilities to help users create, understand, summarize, search, and interact with information.",
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
        "Develop intelligent systems that can reason through tasks, interact with tools, retrieve information, and support multi-step business workflows.",
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
        "Transform unstructured documents into usable information through AI-powered extraction, classification, processing, and analysis.",
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
        "Enable software to understand and analyze visual information from images, video, and other visual data.",
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
  heading: "Where Can AI Create Value?",
  supporting:
    "AI can be applied across many parts of an organization. The right opportunity depends on your workflows, data, users, and business objectives.",
  cards: [
    {
      title: "Automate Repetitive Work",
      text: "Reduce manual effort by automating tasks that follow predictable workflows and require repeated human intervention.",
    },
    {
      title: "Understand Business Documents",
      text: "Extract and structure information from documents that would otherwise require manual review and data entry.",
    },
    {
      title: "Make Information Easier to Find",
      text: "Give teams intelligent ways to search, retrieve, summarize, and interact with organizational knowledge.",
    },
    {
      title: "Improve Decision Making",
      text: "Use data, machine learning, and predictive models to identify patterns and support informed decisions.",
    },
    {
      title: "Improve Customer Experiences",
      text: "Build intelligent assistants and digital experiences that help customers find information and complete tasks more efficiently.",
    },
    {
      title: "Connect Intelligent Systems",
      text: "Integrate AI capabilities into existing applications, workflows, APIs, and business systems.",
    },
  ],
};

export const AI_INDUSTRIES = {
  label: "AI Across Industries",
  heading: "AI Applied to Industry-Specific Challenges.",
  supporting:
    "AI becomes more valuable when it understands the context in which an organization operates. We explore use cases according to industry requirements, workflows, data, and regulatory considerations.",
  cards: [
    {
      title: "Government",
      text: "Document processing, citizen services, workflow automation, knowledge systems, and intelligent data analysis.",
    },
    {
      title: "Education",
      text: "Intelligent learning systems, document processing, institutional analytics, knowledge assistants, and administrative automation.",
    },
    {
      title: "Healthcare",
      text: "Document intelligence, operational automation, information retrieval, analytics, and workflow support.",
    },
    {
      title: "Agriculture",
      text: "Predictive analytics, computer vision, environmental data analysis, crop monitoring, and intelligent decision support.",
    },
    {
      title: "Finance",
      text: "Document processing, anomaly detection, workflow automation, customer assistance, and data-driven decision support.",
    },
    {
      title: "Logistics",
      text: "Predictive analytics, route intelligence, document processing, operational automation, and anomaly detection.",
    },
    {
      title: "Retail",
      text: "Customer intelligence, recommendation systems, demand forecasting, document processing, and workflow automation.",
    },
  ],
  cta: { label: "Explore Industries", to: "/industries" },
};

export const AI_APPROACH = {
  label: "Our AI Approach",
  heading: "From AI Idea to Production System.",
  supporting:
    "Successful AI projects require more than a model. They require the right problem definition, data, architecture, user experience, integration, evaluation, and operational strategy.",
  steps: [
    { num: "01", title: "Discover", text: "Understand the business problem, users, workflows, available data, and desired outcome." },
    { num: "02", title: "Assess", text: "Determine whether AI is appropriate and identify the most practical approach." },
    { num: "03", title: "Prototype", text: "Build a focused proof of concept to test feasibility, usability, and expected value." },
    { num: "04", title: "Engineer", text: "Develop the production solution, integrations, APIs, interfaces, and supporting infrastructure." },
    { num: "05", title: "Evaluate", text: "Test model behavior, accuracy, reliability, security, performance, and user experience." },
    { num: "06", title: "Deploy", text: "Move the solution into a production environment with appropriate monitoring and operational controls." },
    { num: "07", title: "Improve", text: "Continuously evaluate and improve the system as data, users, and business requirements evolve." },
  ],
};

export const AI_RESPONSIBLE = {
  label: "Responsible AI",
  heading: "AI Built With Responsibility in Mind.",
  supporting:
    "AI systems can influence important business processes and user experiences. We consider reliability, security, privacy, transparency, and human oversight when designing AI-enabled solutions.",
  cards: [
    {
      title: "Human Oversight",
      text: "Keep appropriate human involvement in workflows where decisions require judgment or accountability.",
    },
    {
      title: "Data Protection",
      text: "Consider data security, privacy, access control, and appropriate handling of sensitive information.",
    },
    {
      title: "Evaluation",
      text: "Test AI systems against defined requirements rather than assuming that model output is automatically reliable.",
    },
    {
      title: "Transparency",
      text: "Make the role and limitations of AI understandable to users where appropriate.",
    },
    {
      title: "Security",
      text: "Consider application, model, data, and integration security throughout the solution lifecycle.",
    },
    {
      title: "Continuous Monitoring",
      text: "AI systems should be evaluated over time as data, models, and usage patterns change.",
    },
  ],
};

export const AI_TECH = {
  label: "AI Technology",
  heading: "The Technology Behind Intelligent Solutions.",
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
  heading: "AI Doesn't Always Require Rebuilding Your Systems.",
  paragraphs: [
    "Many organizations already have applications, databases, workflows, and internal platforms that are central to their operations.",
    "In these situations, AI can often be introduced as an additional capability rather than replacing the entire system.",
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
  cta: { label: "Discuss AI Integration", to: "/consultation" },
};

export const AI_WORK = {
  label: "Selected AI Work",
  heading: "Exploring What AI Can Build.",
  supporting:
    "Explore selected AI initiatives and solution concepts demonstrating practical applications of intelligent technology.",
  note: "AI solution demonstrations — not client case studies or production deployments.",
  cards: [
    {
      title: "Intelligent Document Processing Platform",
      description:
        "AI-powered document processing designed to extract, classify, structure, and analyze information from business documents.",
      capabilities: ["OCR", "Document Classification", "Data Extraction", "AI Processing"],
    },
    {
      title: "Predictive Analytics",
      description:
        "Data-driven models designed to identify patterns and support forecasting, classification, and operational decision-making.",
      capabilities: ["Machine Learning", "Data Analysis", "Prediction", "Visualization"],
    },
    {
      title: "Intelligent Knowledge Assistant",
      description:
        "An AI-powered interface designed to help users retrieve and interact with information from approved knowledge sources.",
      capabilities: ["LLMs", "Retrieval", "Semantic Search", "Natural Language"],
    },
  ],
};

export const AI_FAQ = {
  label: "AI Questions",
  heading: "Questions About AI & Intelligent Automation?",
  items: [
    {
      q: "Does my business need AI?",
      a: "Not necessarily. We recommend starting with the business problem rather than the technology. If AI can create meaningful value, we can identify an appropriate use case and approach.",
    },
    {
      q: "Can you integrate AI into our existing software?",
      a: "Yes. AI capabilities can often be integrated into existing applications, workflows, APIs, and data systems without replacing the entire platform.",
    },
    {
      q: "Can you build a private AI solution for our organization?",
      a: "AI architectures can be designed around organizational requirements for data access, security, privacy, infrastructure, and model usage. The appropriate approach depends on the specific project.",
    },
    {
      q: "What data do we need for an AI project?",
      a: "It depends on the use case. Some solutions can work with existing documents or organizational knowledge, while predictive machine-learning applications may require historical structured data.",
    },
    {
      q: "How long does an AI project take?",
      a: "The timeline depends on the problem, complexity, integrations, data, and desired production scope. We recommend starting with discovery and feasibility assessment before defining a delivery timeline.",
    },
    {
      q: "Can you start with a proof of concept?",
      a: "Yes. A focused proof of concept can be useful when the feasibility, expected behavior, or business value of an AI solution needs to be evaluated before a full production implementation.",
    },
  ],
  cta: { label: "Book a Consultation", to: "/consultation" },
};

export const AI_FINAL = {
  label: "Start With the Problem",
  heading: "Have an AI Opportunity in Mind?",
  supporting:
    "Tell us about the process, challenge, or idea you're exploring. We'll help you determine whether AI can create meaningful value and what the right path forward could look like.",
  primaryCta: { label: "Book an AI Consultation", to: "/consultation" },
  secondaryCta: { label: "Tell Us About Your Project", to: "/contact" },
};
