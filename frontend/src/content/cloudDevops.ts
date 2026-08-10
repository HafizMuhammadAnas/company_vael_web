/**
 * VAELKODE /solutions/cloud-devops — Cloud & DevOps Engineering.
 * Approved production copy. No invented certifications, client infrastructure
 * projects, uptime percentages, cost savings, deployment statistics, or
 * absolute security guarantees. Technology is presented as requirements-driven.
 */

export const CLOUD_SEO = {
  title: "Cloud & DevOps Engineering Services | VAELKODE",
  description:
    "VAELKODE provides cloud and DevOps engineering services including cloud infrastructure, CI/CD, containerization, deployment automation, cloud migration, monitoring, and infrastructure modernization.",
};

export const CLOUD_HERO = {
  label: "Cloud & DevOps Engineering",
  title: "Infrastructure That Helps Your Software Run Reliably.",
  supporting:
    "VAELKODE helps organizations deploy, modernize, automate, and operate their applications through practical cloud and DevOps engineering.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Discuss Your Infrastructure", to: "/contact" },
  tags: [
    "Cloud Infrastructure",
    "CI/CD",
    "Docker & Containers",
    "Deployment Automation",
    "Monitoring",
    "Cloud Migration",
  ],
};

export const CLOUD_INTRO = {
  label: "Beyond Development",
  heading: "Building Software Is Only Part of the Journey.",
  paragraphs: [
    "An application needs a reliable environment in which to run, deploy, monitor, and evolve.",
    "As applications grow, teams can encounter deployment bottlenecks, inconsistent environments, infrastructure complexity, limited visibility, or difficulty scaling their systems.",
    "VAELKODE helps address these challenges by connecting application development with practical infrastructure and DevOps practices.",
  ],
  cards: [
    {
      title: "Reliable Delivery",
      text: "Establish repeatable processes for building, testing, and deploying applications.",
    },
    {
      title: "Consistent Environments",
      text: "Reduce differences between development, testing, and production environments through appropriate automation and containerization.",
    },
    {
      title: "Operational Visibility",
      text: "Introduce appropriate monitoring, logging, and diagnostics to help teams understand application behavior.",
    },
  ],
};

export const CLOUD_SERVICES = {
  label: "What We Do",
  heading: "Practical Cloud & DevOps Engineering.",
  supporting:
    "Our services cover the infrastructure and delivery practices required to deploy and maintain modern applications.",
  cards: [
    {
      title: "Cloud Infrastructure",
      description:
        "Design and configure cloud environments appropriate for your application's architecture, workloads, security requirements, and operational needs.",
      items: ["Compute", "Storage", "Networking", "Databases", "Access Management", "Environment Configuration"],
    },
    {
      title: "CI/CD & Deployment Automation",
      description:
        "Automate appropriate parts of the software delivery process so applications can move through development, testing, and deployment more consistently.",
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
        "Package applications and their dependencies into consistent environments that simplify development, deployment, and operational management.",
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
        "Help organizations move suitable applications, services, and workloads from existing environments to appropriate cloud infrastructure.",
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
        "Improve existing deployment and infrastructure environments where outdated processes or architecture are limiting development and operations.",
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
        "Establish appropriate monitoring, logging, and diagnostics to help teams understand system health and investigate operational issues.",
      items: ["Application Monitoring", "Infrastructure Monitoring", "Logs", "Alerts", "Health Checks", "Diagnostics"],
    },
  ],
};

export const CLOUD_CHALLENGES = {
  label: "Common Challenges",
  heading: "When Deployment Becomes a Bottleneck.",
  supporting:
    "As development teams and applications grow, infrastructure and deployment processes can become increasingly difficult to manage manually.",
  cards: [
    {
      title: "Manual Deployments",
      text: "Releases depend heavily on manual steps, making deployments slower and more difficult to reproduce.",
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
      text: "Teams have difficulty understanding application or infrastructure health.",
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
  heading: "From Code Commit to Deployment.",
  supporting:
    "A well-structured delivery pipeline can reduce repetitive manual work and provide a more consistent path from development to production.",
  flow: ["Developer", "Code Repository", "Build", "Automated Tests", "Package", "Staging", "Validation", "Production"],
  note: "The exact pipeline depends on the application, team, infrastructure, testing strategy, and release requirements. We design the workflow around the project rather than forcing every application into the same deployment model.",
};

export const CLOUD_CONTAINERS = {
  label: "Consistent Environments",
  heading: "Build Once. Deploy Consistently.",
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
  heading: "Cloud Infrastructure Aligned With Your Application.",
  supporting:
    "Cloud architecture should follow the application's actual requirements. There is no single infrastructure model that is appropriate for every product.",
  cards: [
    {
      title: "AWS",
      text: "Cloud infrastructure and application services using Amazon Web Services where appropriate to the project.",
    },
    {
      title: "Microsoft Azure",
      text: "Cloud infrastructure and services for applications requiring Microsoft's cloud ecosystem.",
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
  heading: "Infrastructure Should Be Reproducible Too.",
  supporting:
    "Where appropriate, infrastructure configuration can be managed through code and automation rather than relying entirely on manual configuration.",
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
  heading: "Infrastructure With Security in Mind.",
  supporting:
    "Infrastructure decisions affect application security, data access, deployment processes, and operational risk.",
  cards: [
    {
      title: "Access Control",
      text: "Apply appropriate permissions to infrastructure, services, applications, and deployment systems.",
    },
    {
      title: "Secrets Management",
      text: "Avoid exposing credentials and sensitive configuration through application code or public repositories.",
    },
    {
      title: "Network Security",
      text: "Configure appropriate network boundaries, access rules, and service communication.",
    },
    {
      title: "Secure Deployment",
      text: "Protect deployment processes and production environments from unnecessary access.",
    },
    { title: "Updates", text: "Keep infrastructure and application dependencies appropriately maintained." },
  ],
};

export const CLOUD_MONITORING = {
  label: "See What Is Happening",
  heading: "You Can't Improve What You Can't See.",
  supporting:
    "Applications and infrastructure need appropriate visibility so teams can understand system health, investigate problems, and identify operational issues.",
  cards: [
    { title: "Application Monitoring", text: "Understand application health and important runtime conditions." },
    { title: "Infrastructure Monitoring", text: "Monitor relevant infrastructure resources and services." },
    { title: "Logging", text: "Centralize or structure application and infrastructure logs where appropriate." },
    { title: "Alerts", text: "Configure meaningful alerts around important conditions and failures." },
    {
      title: "Health Checks",
      text: "Provide mechanisms for identifying whether important services are operating as expected.",
    },
  ],
};

export const CLOUD_CONTINUITY = {
  label: "Engineering Continuity",
  heading: "Development and Infrastructure Should Work Together.",
  supporting:
    "When application development and infrastructure decisions are considered together, teams can make better decisions about deployment, environments, scalability, monitoring, and operational requirements.",
  flow: ["Product", "Application", "API & Services", "Containers", "CI/CD", "Cloud Infrastructure", "Monitoring"],
  statement:
    "VAELKODE can work across the application and infrastructure layers where the project requires an integrated engineering approach.",
};

export const CLOUD_PROCESS = {
  label: "Our Approach",
  heading: "Understand. Design. Automate. Improve.",
  steps: [
    {
      num: "01",
      title: "Assess",
      text: "Understand the current application, infrastructure, deployment process, environments, dependencies, and operational requirements.",
    },
    {
      num: "02",
      title: "Plan",
      text: "Define the target architecture, migration approach, automation priorities, environments, and implementation sequence.",
    },
    {
      num: "03",
      title: "Build",
      text: "Configure infrastructure, containers, pipelines, monitoring, integrations, and supporting services according to the agreed architecture.",
    },
    {
      num: "04",
      title: "Test",
      text: "Validate deployments, application behavior, infrastructure configuration, integrations, and recovery procedures where required.",
    },
    {
      num: "05",
      title: "Deploy",
      text: "Move the application into the target environment using the agreed release and deployment process.",
    },
    { num: "06", title: "Monitor", text: "Establish appropriate monitoring, logging, alerts, and operational visibility." },
    {
      num: "07",
      title: "Improve",
      text: "Continue optimizing infrastructure, deployment processes, reliability, and operational workflows as requirements evolve.",
    },
  ],
};

export const CLOUD_WHO = {
  label: "Cloud & DevOps for Different Teams",
  heading: "Support for Different Stages of Technical Growth.",
  supporting:
    "Cloud and DevOps requirements vary depending on the organization's size, application maturity, infrastructure, and development practices.",
  cards: [
    {
      title: "Startups & New Products",
      text: "Establish practical environments and deployment workflows without introducing unnecessary infrastructure complexity.",
    },
    {
      title: "Growing Technology Teams",
      text: "Improve deployment automation, environments, monitoring, and infrastructure practices as applications and teams expand.",
    },
    {
      title: "Established Organizations",
      text: "Modernize existing infrastructure, improve deployment processes, and connect applications with more appropriate cloud environments.",
    },
    {
      title: "Development Teams",
      text: "Support teams that need help with infrastructure, deployment automation, cloud configuration, or operational engineering.",
    },
  ],
};

// Selected Work: no publicly approved Cloud/DevOps case studies yet — neutral
// empty state instead of fabricated infrastructure projects.
export const CLOUD_WORK = {
  label: "Selected Work",
  heading: "Infrastructure Behind Digital Products.",
  supporting:
    "Selected infrastructure and engineering work will be presented here as projects become available for public presentation.",
  emptyState: "Cloud and DevOps projects will be featured here as they become available for public presentation.",
  cta: { label: "View Available Work", to: "/work" },
};

export const CLOUD_FAQ = {
  label: "Cloud & DevOps FAQ",
  heading: "Questions About Cloud & DevOps Engineering?",
  items: [
    {
      q: "What is DevOps?",
      a: "DevOps brings development and operations practices closer together to improve how software is built, tested, deployed, and operated.",
    },
    {
      q: "Can VAELKODE deploy our existing application?",
      a: "Yes. An existing application can be assessed and deployed to an appropriate environment based on its architecture, dependencies, infrastructure requirements, and deployment model.",
    },
    {
      q: "Can you migrate our application to the cloud?",
      a: "Yes. Cloud migration can include assessment, planning, infrastructure configuration, application migration, database migration where required, testing, and production deployment.",
    },
    {
      q: "Can you set up CI/CD for our development team?",
      a: "Yes. CI/CD pipelines can automate appropriate parts of the build, testing, packaging, and deployment process.",
    },
    {
      q: "Do you work with Docker?",
      a: "Docker and containerization can be used where they provide a practical benefit for application packaging, development environments, or deployment.",
    },
    {
      q: "Do we need Kubernetes?",
      a: "Not necessarily. Kubernetes can be valuable for certain architectures and operational requirements, but it should not be introduced simply because an application is running in the cloud. Infrastructure should match the actual requirements of the project.",
    },
    {
      q: "Can you work with our existing development team?",
      a: "Yes. Cloud and DevOps work can be delivered alongside an existing development team where responsibilities, environments, and technical requirements are clearly defined.",
    },
    {
      q: "Can you monitor our application after deployment?",
      a: "Appropriate monitoring, logging, alerts, and operational support can be included depending on the project's requirements and agreed support model.",
    },
    {
      q: "Which cloud provider should we use?",
      a: "The appropriate provider depends on the application's architecture, requirements, existing systems, team capabilities, cost considerations, and operational needs. The decision should be made based on the project rather than a fixed provider preference.",
    },
  ],
  cta: { label: "Book a Consultation", to: "/consultation" },
};

export const CLOUD_FINAL = {
  label: "Modernize Your Infrastructure",
  heading: "Make Your Software Easier to Deploy, Operate, and Evolve.",
  supporting:
    "Whether you are launching a new application, improving an existing deployment process, or moving workloads to the cloud, let's discuss your infrastructure requirements.",
  primaryCta: { label: "Book a Consultation", to: "/consultation" },
  secondaryCta: { label: "Request a Proposal", to: "/request-proposal" },
};
