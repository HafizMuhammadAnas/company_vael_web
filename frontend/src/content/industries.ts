/**
 * VAELKODE /industries — single comprehensive Industries page.
 * All seven industries live on this one page as anchored sections.
 * Approved production copy. No invented clients, statistics, certifications,
 * compliance/regulatory claims, or industry success stories.
 */

export const IND_SEO = {
  title: "Technology Solutions Across Industries | VAELKODE",
  description:
    "VAELKODE builds custom software, digital platforms, AI, automation, cloud, and system integration around the way each industry actually works — government, education, healthcare, agriculture, finance, logistics, and retail.",
};

export const IND_HERO = {
  label: "Industries",
  title: "Technology Built Around the Way Your Industry Works.",
  supporting:
    "Different industries have different processes, users, regulations, operational environments, and technology requirements. VAELKODE develops digital solutions around those realities — from custom software and digital platforms to automation, AI, cloud, and system integration.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Explore Our Solutions", to: "/solutions" },
};

export const IND_INTRO = {
  label: "Industry-Focused Technology",
  heading: "Technology Should Fit the Business — Not the Other Way Around.",
  paragraphs: [
    "Every organization operates within a specific environment. The systems that work for a government organization may not be appropriate for a healthcare provider, educational institution, agricultural operation, financial organization, logistics company, or retailer.",
    "VAELKODE combines software engineering, digital product development, AI, automation, cloud, and technology consulting to build solutions around the actual requirements of each organization.",
    "Our focus is not simply on delivering technology. It is on understanding the process behind the technology and creating systems that support the people, workflows, information, and objectives involved.",
  ],
};

export const IND_NAV = {
  label: "Explore Industries",
  heading: "Technology Solutions Across Industries.",
  supporting: "Explore the industries where VAELKODE can apply its technology capabilities.",
  cards: [
    {
      title: "Government & Public Sector",
      description:
        "Digital platforms, management systems, workflows, reporting, and technology solutions for public-sector operations.",
      cta: "Explore Government",
      anchor: "government",
    },
    {
      title: "Education",
      description:
        "Digital platforms, management systems, portals, workflows, reporting, and technology solutions for education organizations.",
      cta: "Explore Education",
      anchor: "education",
    },
    {
      title: "Healthcare",
      description:
        "Digital systems, operational workflows, portals, reporting, integrations, and technology solutions for healthcare organizations.",
      cta: "Explore Healthcare",
      anchor: "healthcare",
    },
    {
      title: "Agriculture",
      description:
        "Data-driven platforms, monitoring solutions, analytics, automation, and AI applications for agricultural operations.",
      cta: "Explore Agriculture",
      anchor: "agriculture",
    },
    {
      title: "Finance & Financial Services",
      description:
        "Digital platforms, workflow systems, reporting, automation, integrations, and technology solutions for financial operations.",
      cta: "Explore Finance",
      anchor: "finance",
    },
    {
      title: "Logistics & Supply Chain",
      description:
        "Digital systems for operational workflows, tracking, data, coordination, reporting, and logistics processes.",
      cta: "Explore Logistics",
      anchor: "logistics",
    },
    {
      title: "Retail & Commerce",
      description:
        "Digital commerce platforms, management systems, customer experiences, automation, and data-driven retail technology.",
      cta: "Explore Retail",
      anchor: "retail",
    },
  ],
};

export interface IndustrySection {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  capabilitiesLabel: string;
  capabilities: string[];
  useCasesLabel?: string;
  useCases?: string[];
  cta: { label: string; to: string };
}

export const IND_SECTIONS: IndustrySection[] = [
  {
    id: "government",
    label: "Government & Public Sector",
    heading: "Digital Technology for More Connected Public-Sector Operations.",
    paragraphs: [
      "Government organizations manage complex processes involving citizens, employees, departments, applications, records, approvals, reporting, and public services.",
      "VAELKODE develops digital platforms and management systems that can help structure these processes, connect information, automate appropriate workflows, and provide authorized users with better access to operational information.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Digital Government Platforms",
      "Management Systems",
      "Citizen & Staff Portals",
      "Workflow Automation",
      "Data & Reporting",
      "System Integration",
      "AI & Intelligent Automation",
    ],
    cta: { label: "Discuss a Government Technology Project", to: "/consultation" },
  },
  {
    id: "education",
    label: "Education",
    heading: "Digital Solutions for Smarter Education Operations.",
    paragraphs: [
      "Education organizations bring together learners, educators, administrators, departments, and information across a wide range of processes.",
      "VAELKODE develops digital platforms, management systems, portals, workflows, reporting solutions, and intelligent technology applications designed around those operational requirements.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Education Management Systems",
      "Student & Learner Platforms",
      "Institutional Portals",
      "Admissions & Registration",
      "Data & Reporting",
      "Workflow Automation",
      "AI & Intelligent Automation",
    ],
    cta: { label: "Discuss an Education Technology Project", to: "/consultation" },
  },
  {
    id: "healthcare",
    label: "Healthcare",
    heading: "Digital Technology for Better Connected Healthcare Operations.",
    paragraphs: [
      "Healthcare organizations manage complex interactions between patients, healthcare professionals, administrative teams, departments, services, information, and operational processes.",
      "VAELKODE develops digital platforms, management systems, workflows, integrations, and intelligent technology solutions designed around appropriate healthcare operational requirements.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Healthcare Management Systems",
      "Digital Healthcare Platforms",
      "Patient & User Portals",
      "Workflow Digitization",
      "Data & Reporting",
      "System Integration",
      "AI & Automation",
    ],
    cta: { label: "Discuss a Healthcare Technology Project", to: "/consultation" },
  },
  {
    id: "agriculture",
    label: "Agriculture",
    heading: "Technology for Data-Driven Agriculture.",
    paragraphs: [
      "Agriculture increasingly depends on timely information, operational visibility, environmental data, monitoring, analytics, and efficient decision-making.",
      "VAELKODE can develop digital platforms and intelligent technology solutions that bring together agricultural data, operational workflows, monitoring, analytics, and automation.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Agricultural Data Platforms",
      "Monitoring & Visualization",
      "Geospatial Applications",
      "Data Analytics",
      "AI & Machine Learning",
      "Workflow Automation",
      "Digital Management Systems",
    ],
    useCasesLabel: "Potential use cases",
    useCases: [
      "Crop Monitoring",
      "Environmental Data",
      "Agricultural Dashboards",
      "Field Data Collection",
      "Predictive Analytics",
      "Geospatial Mapping",
      "Operational Reporting",
    ],
    cta: { label: "Discuss an Agriculture Technology Project", to: "/consultation" },
  },
  {
    id: "finance",
    label: "Finance & Financial Services",
    heading: "Digital Systems for Structured Financial Operations.",
    paragraphs: [
      "Financial organizations depend on accurate information, structured workflows, reliable systems, reporting, integrations, and appropriate controls.",
      "VAELKODE develops software and digital platforms around defined financial and operational requirements, with emphasis on structured processes, data, automation, and system integration.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Financial Management Systems",
      "Digital Platforms",
      "Workflow Automation",
      "Reporting & Dashboards",
      "Data Processing",
      "System Integration",
      "AI & Automation",
    ],
    cta: { label: "Discuss a Finance Technology Project", to: "/consultation" },
  },
  {
    id: "logistics",
    label: "Logistics & Supply Chain",
    heading: "Connected Technology for Logistics Operations.",
    paragraphs: [
      "Logistics operations depend on coordination between people, processes, information, assets, locations, and systems.",
      "VAELKODE develops digital platforms and operational systems that can support tracking, workflows, information management, reporting, integrations, and automation.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "Logistics Management Systems",
      "Tracking Platforms",
      "Workflow Automation",
      "Operational Dashboards",
      "Data & Reporting",
      "System Integration",
      "Mobile Applications",
    ],
    useCasesLabel: "Potential use cases",
    useCases: [
      "Shipment Tracking",
      "Fleet / Asset Information",
      "Order Workflows",
      "Operational Dashboards",
      "Delivery Management",
      "Notifications",
      "Reporting",
    ],
    cta: { label: "Discuss a Logistics Technology Project", to: "/consultation" },
  },
  {
    id: "retail",
    label: "Retail & Commerce",
    heading: "Digital Experiences for Modern Commerce.",
    paragraphs: [
      "Retail organizations need technology that connects customers, products, operations, orders, payments, inventory, and business information.",
      "VAELKODE develops web platforms, mobile applications, management systems, integrations, automation, and data-driven solutions for retail and commerce environments.",
    ],
    capabilitiesLabel: "Capabilities",
    capabilities: [
      "E-Commerce Platforms",
      "Retail Management Systems",
      "Customer Portals",
      "Mobile Applications",
      "Order Management",
      "Inventory Workflows",
      "Analytics & Reporting",
    ],
    useCasesLabel: "Potential use cases",
    useCases: [
      "E-Commerce",
      "Customer Portals",
      "Product Management",
      "Order Workflows",
      "Inventory",
      "Business Dashboards",
      "Digital Customer Experiences",
    ],
    cta: { label: "Discuss a Retail Technology Project", to: "/consultation" },
  },
];

export const IND_CAPABILITIES = {
  label: "Technology Capabilities",
  heading: "One Technology Foundation. Different Industry Applications.",
  supporting:
    "While every industry has different requirements, many organizations face common technology challenges. VAELKODE brings together complementary capabilities to build solutions around those requirements.",
  cards: [
    {
      title: "Custom Software",
      text: "Purpose-built applications designed around specific business processes and requirements.",
      cta: "Explore Custom Software",
      to: "/solutions/custom-software",
    },
    {
      title: "Web & Digital Platforms",
      text: "Web applications, portals, dashboards, customer experiences, and digital services.",
      cta: "Explore Web Development",
      to: "/solutions/web-development",
    },
    {
      title: "Mobile Applications",
      text: "Mobile experiences designed around users, workflows, and operational requirements.",
      cta: "Explore Mobile Development",
      to: "/solutions/mobile-development",
    },
    {
      title: "AI & Intelligent Automation",
      text: "AI, machine learning, information processing, and automation for appropriate use cases.",
      cta: "Explore AI & Automation",
      to: "/solutions/ai-automation",
    },
    {
      title: "Cloud & DevOps",
      text: "Cloud infrastructure, deployment environments, application operations, and modernization.",
      cta: "Explore Cloud & DevOps",
      to: "/solutions/cloud-devops",
    },
    {
      title: "Technology Consulting",
      text: "Architecture, technology assessment, system modernization, and digital strategy.",
      cta: "Explore Technology Consulting",
      to: "/solutions/technology-consulting",
    },
  ],
};

export const IND_APPROACH = {
  label: "Our Approach",
  heading: "We Start With the Industry Problem — Then Design the Technology.",
  steps: [
    { num: "01", title: "Understand", text: "Understand the organization, industry environment, users, processes, and objectives." },
    { num: "02", title: "Map", text: "Map the workflows, information, systems, integrations, and operational dependencies." },
    { num: "03", title: "Identify", text: "Identify the problems that technology can realistically address." },
    { num: "04", title: "Design", text: "Design the user experience, workflows, architecture, and technical solution." },
    { num: "05", title: "Build", text: "Develop the required software, platform, integration, automation, or AI capability." },
    { num: "06", title: "Validate", text: "Test the solution against agreed requirements." },
    { num: "07", title: "Evolve", text: "Continue improving the solution as requirements and technology evolve." },
  ],
};

export const IND_WORK = {
  label: "Selected Work",
  heading: "Technology in Practice.",
  supporting:
    "Our portfolio will showcase selected projects across industries as they become available for public presentation.",
  emptyState: "Selected industry projects will be featured here as they become available for public presentation.",
  cta: { label: "Explore Our Work", to: "/work" },
};

export const IND_FAQ = {
  label: "Industry Solutions FAQ",
  heading: "Questions About Industry-Focused Technology?",
  items: [
    {
      q: "Does VAELKODE specialize in only one industry?",
      a: "No. VAELKODE applies software engineering, AI, automation, cloud, digital platforms, and technology consulting capabilities across different industries. The solution is adapted to the organization's specific requirements.",
    },
    {
      q: "Can you build a solution for an industry not listed here?",
      a: "Yes. The industries shown represent areas where our capabilities can be applied, but technology requirements are not limited to these sectors. We can evaluate projects based on their specific processes, users, systems, and objectives.",
    },
    {
      q: "Do you build custom software for industry-specific processes?",
      a: "Yes. Custom software can be designed around an organization's workflows, information requirements, integrations, and operational objectives.",
    },
    {
      q: "Can you integrate existing systems?",
      a: "Where suitable technical interfaces and access are available, existing applications can be integrated through APIs, data exchange mechanisms, or other appropriate approaches.",
    },
    {
      q: "Can you introduce AI into an existing business process?",
      a: "Yes. AI and automation can be evaluated for appropriate use cases such as document processing, classification, data analysis, information assistance, and workflow automation.",
    },
    {
      q: "Do you provide industry-specific consulting?",
      a: "We can assess an organization's technology requirements and recommend an appropriate technical approach based on its processes, systems, objectives, and constraints.",
    },
  ],
};

export const IND_FINAL = {
  label: "Have a Project in Mind?",
  heading: "Let's Build Technology Around Your Business.",
  supporting:
    "Whether you need a new digital platform, custom software, workflow automation, AI solution, mobile application, system integration, or technology strategy, start by telling us what you are trying to solve.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Request a Proposal", to: "/request-proposal" },
};
