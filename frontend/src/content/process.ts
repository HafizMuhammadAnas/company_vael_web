/**
 * VAELKODE /about/process — how an engagement actually works.
 * Approved production copy.
 */

export const PROCESS_SEO = {
  title: "Our Process | VAELKODE",
  description:
    "A clear path from problem to product: how VAELKODE discovers, analyzes, designs, builds, validates, launches, and evolves software projects.",
};

export const PROCESS_HERO = {
  label: "Our Process",
  title: "A Clear Path From Problem to Product.",
  supporting:
    "Good software development starts before the first line of code. Our process is designed to understand the problem, define the right solution, build it systematically, and continuously improve it.",
  primaryCta: { label: "Start a Project", to: "/consultation" },
};

export interface ProcessStep {
  num: string;
  title: string;
  text: string;
  activitiesLabel: string;
  activities: string[];
  output?: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    text: "We begin by understanding what you are trying to achieve.",
    activitiesLabel: "Activities",
    activities: [
      "Business Objectives",
      "User Requirements",
      "Existing Processes",
      "Current Systems",
      "Pain Points",
      "Constraints",
      "Project Scope",
    ],
    output: "A clearer understanding of the problem, objectives, users, and initial solution direction.",
  },
  {
    num: "02",
    title: "Analyze",
    text: "We examine how the existing process or product works and identify the technical and functional requirements.",
    activitiesLabel: "Activities",
    activities: [
      "Requirement Analysis",
      "Process Mapping",
      "Technical Assessment",
      "Data Requirements",
      "Integration Requirements",
      "User Roles",
      "Risk Identification",
    ],
    output: "A structured understanding of what needs to be built and how it should work.",
  },
  {
    num: "03",
    title: "Design",
    text: "We translate requirements into the structure of the product.",
    activitiesLabel: "Activities",
    activities: [
      "UX / UI Design",
      "System Architecture",
      "Database Design",
      "API Design",
      "Workflow Design",
      "Technology Selection",
      "Technical Planning",
    ],
    output: "A defined product experience and technical direction.",
  },
  {
    num: "04",
    title: "Build",
    text: "The solution is developed in structured increments so progress can be reviewed throughout the project.",
    activitiesLabel: "Activities",
    activities: [
      "Frontend Development",
      "Backend Development",
      "API Development",
      "Database Implementation",
      "Integrations",
      "AI / Automation",
      "Testing",
    ],
  },
  {
    num: "05",
    title: "Validate",
    text: "Before release, the system is tested against the agreed requirements and expected user workflows.",
    activitiesLabel: "Areas",
    activities: [
      "Functional Testing",
      "UI Testing",
      "Integration Testing",
      "API Testing",
      "Performance Considerations",
      "Security Testing",
      "User Acceptance",
      "Bug Resolution",
    ],
  },
  {
    num: "06",
    title: "Launch",
    text: "Once the solution has passed the agreed validation process, it can be prepared for the target production environment.",
    activitiesLabel: "Activities",
    activities: [
      "Environment Setup",
      "Deployment",
      "Configuration",
      "Database Migration",
      "Monitoring",
      "Documentation",
      "Handover",
    ],
  },
  {
    num: "07",
    title: "Evolve",
    text: "A digital product does not have to stop evolving after launch. New requirements, user feedback, operational needs, integrations, and technology opportunities can create opportunities for continued improvement.",
    activitiesLabel: "Ongoing",
    activities: [],
  },
];

export const PROCESS_ENGAGEMENT = {
  label: "Engagement Models",
  heading: "Different Projects Need Different Delivery Models.",
  models: [
    { title: "Fixed Scope", text: "Suitable when requirements and deliverables are clearly defined." },
    {
      title: "Iterative Delivery",
      text: "Suitable when the product needs to evolve through regular feedback and releases.",
    },
    {
      title: "Dedicated Engineering Support",
      text: "Suitable when an organization needs additional technical capacity alongside an existing team.",
    },
    {
      title: "Discovery First",
      text: "Suitable when the problem is clear but the exact solution still needs to be explored.",
    },
  ],
};

export const PROCESS_FINAL = {
  label: "Let's Define the First Step",
  heading: "Have a Project in Mind? Let's Define the First Step.",
  supporting:
    "Tell us what you're trying to build or improve. We'll start by understanding the problem and mapping a practical path forward.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Request a Proposal", to: "/request-proposal" },
};
