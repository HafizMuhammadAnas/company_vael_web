/**
 * VAELKODE /solutions/cloud-devops. Cloud & DevOps Engineering.
 * Approved production copy. No invented certifications, client infrastructure
 * projects, uptime percentages, cost savings, deployment statistics, or
 * absolute security guarantees. Technology is presented as requirements-driven.
 */

import { COMPANY } from "@/constants/company";
import { CTA, FINAL_PAIR_TELL_US, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkEmptySection } from "@/content/shared";

export const CLOUD_SEO: SeoMeta = {
  title: "Cloud & DevOps Engineering Services | VAELKODE",
  description:
    "VAELKODE provides cloud and DevOps engineering services including cloud infrastructure, CI/CD, containerization, deployment automation, cloud migration, monitoring, and infrastructure modernization.",
};

export const CLOUD_HERO: PageHero = {
  label: "Cloud & DevOps",
  title: "Reliable hosting, calm releases, clear visibility.",
  supporting:
    "We set up cloud environments, automated deployments, and monitoring so shipping software is repeatable, and problems show up before customers feel them.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss Your Infrastructure"),
  tags: [
    "Cloud setup",
    "CI/CD",
    "Migration",
    "Monitoring",
    "Security basics",
    "Environments",
  ],
};

export const CLOUD_SUB_SERVICES = {
  label: "Cloud & DevOps services",
  heading: "What we set up for reliable delivery.",
  supporting: "Infrastructure should support the product rather than slow every release.",
  items: [
    {
      title: "Cloud setup",
      text: "Practical AWS, Azure, or Google Cloud environments sized for your application, with networks, compute, and data basics included.",
      highlights: ["Provider fit for your stack", "App, data, and CDN pieces", "Environments you can operate"],
      stacks: ["AWS", "Azure", "Google Cloud"],
    },
    {
      title: "Cloud migration",
      text: "Move suitable apps and workloads from older hosting to modern cloud infrastructure with a planned cutover.",
      highlights: ["Workload assessment", "Cutover plan", "Aligned environments"],
      stacks: ["Assessment", "Cutover", "Environments"],
    },
    {
      title: "CI/CD & release pipelines",
      text: "Automated build and deploy paths so releases are consistent and less stressful for the team.",
      highlights: ["Build → test → deploy", "Repeatable releases", "Fewer manual steps"],
      stacks: ["CI/CD", "Docker", "Automated deploy"],
    },
    {
      title: "Monitoring & alerting",
      text: "See when services slow down or fail, and get notified before users complain.",
      highlights: ["Health and latency signals", "Alerts that matter", "Logs you can follow"],
      stacks: ["Alerts", "Logging", "Health checks"],
    },
    {
      title: "Security hardening basics",
      text: "Sensible access controls, secrets handling, and secure defaults for your stack, without theatre.",
      highlights: ["Access roles", "Secrets management", "Hardened defaults"],
      stacks: ["Access control", "Secrets", "Hardening"],
    },
    {
      title: "Cost optimization",
      text: "Reduce wasteful spend without cutting the reliability your product needs. Right-size and trim idle capacity.",
      highlights: ["Right-sizing reviews", "Idle waste reduction", "Ongoing cost checks"],
      stacks: ["Right-sizing", "Waste reduction", "Reviews"],
    },
    {
      title: "Dev, staging & production environments",
      text: "Keep environments aligned so “it worked on my machine” stops being a surprise at release time.",
      highlights: ["Dev / staging / prod parity", "Shared config patterns", "Safer promotions"],
      stacks: ["Dev / Staging / Prod", "Consistency", "Config"],
    },
  ],
};

export const CLOUD_INTRO = {
  label: "Beyond Development",
  heading: "Building software is only part of the journey.",
  paragraphs: [
    "An application needs a reliable place to run, deploy, monitor, and evolve.",
    "As products grow, teams often hit deployment bottlenecks, inconsistent environments, limited visibility, or difficulty scaling.",
    "VAELKODE connects application development with practical infrastructure and DevOps practices so delivery stays predictable.",
  ],
  cards: [
    {
      title: "Reliable Delivery",
      text: "Establish repeatable processes for building, testing, and deploying applications.",
    },
    {
      title: "Consistent Environments",
      text: "Reduce differences between development, testing, and production through automation and containerization where they help.",
    },
    {
      title: "Operational Visibility",
      text: "Introduce monitoring, logging, and diagnostics so teams can understand application behavior in production.",
    },
  ],
};

export const CLOUD_SERVICES = {
  label: "What We Do",
  heading: "Practical cloud and DevOps engineering.",
  supporting:
    "Our services cover the infrastructure and delivery practices needed to deploy and maintain modern applications.",
  cards: [
    {
      title: "Cloud Infrastructure",
      description:
        "Design and configure cloud environments that fit your application's architecture, workloads, security needs, and how you operate day to day.",
      items: ["Compute", "Storage", "Networking", "Databases", "Access Management", "Environment Configuration"],
    },
    {
      title: "CI/CD & Deployment Automation",
      description:
        "Automate the parts of software delivery that should be automatic, so applications move through development, testing, and deployment more consistently.",
      items: [
        "Build Pipelines",
        "Automated Testing",
        "Deployment Pipelines",
        "Environment Management",
        "Release Workflows",
        "Deployment Automation",
      ],
    },
    {
      title: "Containers & Application Packaging",
      description:
        "Package applications and their dependencies into consistent environments that simplify development, deployment, and day-to-day operations.",
      items: [
        "Docker",
        "Container Images",
        "Environment Configuration",
        "Container Deployment",
        "Service Configuration",
        "Development Environments",
      ],
    },
    {
      title: "Cloud Migration",
      description:
        "Help organizations move suitable applications, services, and workloads from existing environments to the right cloud infrastructure.",
      items: [
        "Migration Planning",
        "Environment Assessment",
        "Application Migration",
        "Database Migration",
        "Configuration",
        "Post-Migration Validation",
      ],
    },
    {
      title: "Infrastructure Modernization",
      description:
        "Improve existing deployment and infrastructure setups where outdated processes or architecture are holding development and operations back.",
      items: [
        "Infrastructure Assessment",
        "Environment Modernization",
        "Deployment Improvements",
        "Containerization",
        "Automation",
        "Architecture Improvements",
      ],
    },
    {
      title: "Monitoring & Operational Visibility",
      description:
        "Set up monitoring, logging, and diagnostics so teams can understand system health and investigate operational issues.",
      items: ["Application Monitoring", "Infrastructure Monitoring", "Logs", "Alerts", "Health Checks", "Diagnostics"],
    },
  ],
};

export const CLOUD_CHALLENGES = {
  label: "Common Challenges",
  heading: "When deployment becomes a bottleneck.",
  supporting:
    "As development teams and applications grow, infrastructure and deployment processes can get harder to manage by hand.",
  cards: [
    {
      title: "Manual Deployments",
      text: "Releases depend heavily on manual steps, making deployments slower and harder to reproduce.",
      approach: "Deployment Automation",
    },
    {
      title: "Environment Differences",
      text: "Applications behave differently across development, testing, and production environments.",
      approach: "Containerization & Environment Standardization",
    },
    {
      title: "Slow Releases",
      text: "Teams spend significant time preparing and deploying releases.",
      approach: "CI/CD Pipelines",
    },
    {
      title: "Limited Visibility",
      text: "Teams struggle to understand application or infrastructure health.",
      approach: "Monitoring, Logging & Alerts",
    },
    {
      title: "Infrastructure Complexity",
      text: "Multiple services and environments become difficult to manage consistently.",
      approach: "Infrastructure Standardization & Automation",
    },
    {
      title: "Cloud Migration",
      text: "Existing applications need to move from traditional hosting or infrastructure into a cloud environment.",
      approach: "Migration Assessment & Implementation",
    },
  ],
};

export const CLOUD_PIPELINE = {
  label: "Continuous Delivery",
  heading: "From code commit to deployment.",
  supporting:
    "A well-structured delivery pipeline can cut repetitive manual work and give you a more consistent path from development to production.",
  flow: ["Developer", "Code Repository", "Build", "Automated Tests", "Package", "Staging", "Validation", "Production"],
  note: "The exact pipeline depends on the application, team, infrastructure, testing strategy, and release requirements. We design the workflow around the project rather than forcing every application into the same deployment model.",
};

export const CLOUD_CONTAINERS = {
  label: "Consistent Environments",
  heading: "Build once, deploy consistently.",
  paragraphs: [
    "Differences between development, testing, and production environments can introduce avoidable deployment problems.",
    "Containerization can help package applications and their dependencies into consistent environments, making development and deployment easier to manage.",
  ],
  cards: [
    { title: "Development", text: "Create reproducible application environments for development teams." },
    { title: "Testing", text: "Run applications in environments that more closely reflect deployment conditions." },
    { title: "Deployment", text: "Package applications into deployable units with defined dependencies and configuration." },
    { title: "Operations", text: "Manage application services consistently across supported environments." },
  ],
};

export const CLOUD_PLATFORMS = {
  label: "Cloud Technology",
  heading: "Cloud infrastructure aligned with your application.",
  supporting:
    "Cloud architecture should follow what the application actually needs. There's no single infrastructure model that fits every product.",
  cards: [
    {
      title: "AWS",
      text: "Cloud infrastructure and application services using Amazon Web Services where they fit the project.",
    },
    {
      title: "Microsoft Azure",
      text: "Cloud infrastructure and services for applications that need Microsoft's cloud ecosystem.",
    },
    {
      title: "Google Cloud",
      text: "Cloud services and infrastructure for suitable application workloads and architectures.",
    },
  ],
  capabilitiesLabel: "Supporting capabilities",
  capabilities: [
    "Compute",
    "Storage",
    "Networking",
    "Databases",
    "Identity & Access",
    "Application Services",
    "Monitoring",
    "Deployment",
  ],
};

export const CLOUD_IAC = {
  label: "Automated Infrastructure",
  heading: "Infrastructure should be reproducible too.",
  supporting:
    "Where it helps, infrastructure configuration can be managed through code and automation rather than relying entirely on manual setup.",
  cards: [
    { title: "Reproducibility", text: "Recreate environments using defined configurations." },
    { title: "Version Control", text: "Track infrastructure changes alongside the development lifecycle." },
    { title: "Consistency", text: "Reduce configuration differences between environments." },
    { title: "Collaboration", text: "Give development and infrastructure teams a clearer way to review changes." },
  ],
  technologyLabel: "Technology examples",
  technology: ["Infrastructure as Code", "Configuration Management", "Containerization", "CI/CD", "Cloud APIs"],
};

export const CLOUD_SECURITY = {
  label: "Secure Infrastructure",
  heading: "Infrastructure with security in mind.",
  supporting:
    "Infrastructure decisions affect application security, data access, deployment processes, and operational risk.",
  cards: [
    {
      title: "Access Control",
      text: "Apply the right permissions to infrastructure, services, applications, and deployment systems.",
    },
    {
      title: "Secrets Management",
      text: "Avoid exposing credentials and sensitive configuration through application code or public repositories.",
    },
    {
      title: "Network Security",
      text: "Configure sensible network boundaries, access rules, and service communication.",
    },
    {
      title: "Secure Deployment",
      text: "Protect deployment processes and production environments from unnecessary access.",
    },
    { title: "Updates", text: "Keep infrastructure and application dependencies properly maintained." },
  ],
};

export const CLOUD_MONITORING = {
  label: "See What Is Happening",
  heading: "You can't improve what you can't see.",
  supporting:
    "Applications and infrastructure need enough visibility so teams can understand system health, investigate problems, and spot operational issues.",
  cards: [
    { title: "Application Monitoring", text: "Understand application health and important runtime conditions." },
    { title: "Infrastructure Monitoring", text: "Monitor relevant infrastructure resources and services." },
    { title: "Logging", text: "Centralize or structure application and infrastructure logs where it helps." },
    { title: "Alerts", text: "Configure meaningful alerts around important conditions and failures." },
    {
      title: "Health Checks",
      text: "Provide ways to tell whether important services are operating as expected.",
    },
  ],
};

export const CLOUD_CONTINUITY = {
  label: "Engineering Continuity",
  heading: "Development and infrastructure should work together.",
  supporting:
    "When application development and infrastructure decisions are considered together, teams make better choices about deployment, environments, scalability, monitoring, and day-to-day operations.",
  flow: ["Product", "Application", "API & Services", "Containers", "CI/CD", "Cloud Infrastructure", "Monitoring"],
  statement:
    "VAELKODE can work across the application and infrastructure layers when the project needs an integrated engineering approach.",
};

export const CLOUD_PROCESS = {
  label: "How we work",
  headingBefore: "From assessment to calmer releases: ",
  headingAccent: "our process",
  supporting: "We start from your current setup rather than rewriting everything from scratch.",
  steps: [
    {
      num: "01",
      title: "Assess",
      text: "Understand your apps, environments, and how you ship today.",
      milestone: "Current-state map",
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Plan",
      text: "Agree the target setup, automation priorities, and sequence.",
      milestone: "Target agreed",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Build",
      text: "Configure infrastructure, pipelines, and monitoring.",
      milestone: "Pipelines live",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Run & improve",
      text: "Go live carefully, then keep improving reliability and delivery.",
      milestone: "Stable delivery",
      tone: "teal" as const,
    },
  ],
};

export const CLOUD_PROJECTS = {
  label: "Selected projects",
  heading: "Infrastructure work we'll share as it goes public.",
  supporting: "We don't invent case studies. Public cloud and DevOps projects will appear here when they're ready to show.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
  emptyState: "Cloud and DevOps projects will be featured here as they become available for public presentation.",
};

export const CLOUD_WHO = {
  label: "Cloud & DevOps for Different Teams",
  heading: "Support for different stages of technical growth.",
  supporting:
    "Cloud and DevOps needs vary with the organization's size, application maturity, infrastructure, and development practices.",
  cards: [
    {
      title: "Startups & New Products",
      text: "Establish practical environments and deployment workflows without unnecessary infrastructure complexity.",
    },
    {
      title: "Growing Technology Teams",
      text: "Improve deployment automation, environments, monitoring, and infrastructure practices as applications and teams expand.",
    },
    {
      title: "Established Organizations",
      text: "Modernize existing infrastructure, improve deployment processes, and connect applications with more suitable cloud environments.",
    },
    {
      title: "Development Teams",
      text: "Support teams that need help with infrastructure, deployment automation, cloud configuration, or operational engineering.",
    },
  ],
};

// Selected Work: no publicly approved Cloud/DevOps case studies yet. Neutral
// empty state instead of fabricated infrastructure projects.
export const CLOUD_WORK: WorkEmptySection = {
  label: "Selected Work",
  heading: "Infrastructure behind digital products.",
  supporting:
    "Selected infrastructure and engineering work will appear here as projects become available for public presentation.",
  emptyState: "Cloud and DevOps projects will be featured here as they become available for public presentation.",
  cta: CTA.viewAvailableWork,
};

export const CLOUD_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "What is DevOps?",
      a: "Practices that bring development and operations closer so software is easier to build, test, deploy, and run.",
    },
    {
      q: "Can you deploy our existing application?",
      a: "Yes. We assess architecture and dependencies, then deploy to an environment that fits the app.",
    },
    {
      q: "Can you migrate us to the cloud?",
      a: "Yes. Assessment, planning, infrastructure, migration, testing, and production cutover where needed.",
    },
    {
      q: "Can you set up CI/CD for our team?",
      a: "Yes. Pipelines can automate build, testing, packaging, and deployment for your stack.",
    },
    {
      q: "Do we need Kubernetes?",
      a: "Not always. We introduce it only when the architecture and operations actually benefit, not by default.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Yes. Cloud and DevOps work can sit alongside your developers when roles and environments are clear.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const CLOUD_FINAL: FinalCta = {
  label: "Next step",
  heading: "Make shipping and running software calmer.",
  supporting: `If you're launching, migrating, or tightening how you deploy, email ${COMPANY.contact.email} or book a consultation and we’ll map a practical path.`,
  ...FINAL_PAIR_TELL_US,
};
