/**
 * VAELKODE /solutions/mobile-development. Mobile Application Development.
 * Approved production copy. No invented mobile client projects, download
 * numbers, app-store ratings, user counts, performance figures, testimonials,
 * or claims that a particular framework is used for every project.
 */

import { COMPANY } from "@/constants/company";
import { CTA, FINAL_PAIR_TELL_US, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkEmptySection } from "@/content/shared";

export const MOB_SEO: SeoMeta = {
  title: "Mobile App Development Services | VAELKODE",
  description:
    "VAELKODE designs and develops mobile applications for customers, businesses, and digital products, including iOS, Android, cross-platform apps, APIs, integrations, and backend services.",
};

export const MOB_HERO: PageHero = {
  label: "Mobile App Development",
  title: "Mobile apps that stay useful beyond the first download.",
  supporting:
    "We design and build iOS, Android, and cross-platform apps, with the APIs, logins, and backends that keep them working in the real world.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss Your Mobile App"),
  tags: [
    "iOS",
    "Android",
    "Cross-platform",
    "PWA",
    "App backends",
    "Updates",
  ],
};

export const MOB_SUB_SERVICES = {
  label: "Mobile services",
  heading: "What we can build for your app.",
  supporting: "Customer app or field tool. We keep the experience and the system behind it aligned.",
  items: [
    {
      title: "iOS & Android apps",
      text: "Native-feeling apps for customers, staff, or partners on Apple and Google devices, with journeys that fit how people use phones.",
      highlights: ["iOS and Android delivery", "Clear primary journeys", "Store-ready packaging"],
      stacks: ["React Native", "Flutter", "Store release"],
    },
    {
      title: "Cross-platform apps",
      text: "One codebase for both platforms when speed and shared features matter most, without ignoring platform differences that users notice.",
      highlights: ["Shared feature core", "Faster dual release", "Platform-aware polish"],
      stacks: ["React Native", "Flutter", "Shared codebase"],
    },
    {
      title: "Progressive web apps (PWA)",
      text: "App-like experiences from the browser when a full store release isn’t required yet, installable and offline-aware where it helps.",
      highlights: ["Installable web app", "Offline-aware flows", "Push where appropriate"],
      stacks: ["PWA", "Offline-aware", "Web push"],
    },
    {
      title: "App + backend & APIs",
      text: "The screens plus the secure services that power accounts, data, and notifications so the app stays useful after launch.",
      highlights: ["Auth and user accounts", "REST APIs and data", "Push notifications"],
      stacks: ["REST APIs", "Auth", "Push"],
    },
    {
      title: "App redesign & store release",
      text: "Refresh an existing app and support a clean path to the App Store and Google Play with clearer UX and release basics.",
      highlights: ["UX and visual refresh", "App Store checklist", "Google Play checklist"],
      stacks: ["UX refresh", "App Store", "Google Play"],
    },
    {
      title: "Maintenance & version updates",
      text: "Keep the app compatible, secure, and improving after launch as OS versions and devices change.",
      highlights: ["OS compatibility updates", "Bug fixes and patches", "Basic monitoring"],
      stacks: ["OS updates", "Bug fixes", "Monitoring"],
    },
  ],
};

export const MOB_INTRO = {
  label: "Mobile Products",
  heading: "Build more than screens: build a connected experience.",
  paragraphs: [
    "A successful mobile application is more than a collection of screens. It needs a clear user journey while connecting reliably to the systems, data, and services behind it.",
    "VAELKODE approaches mobile as product engineering, from the journey and interface to APIs, testing, and production readiness.",
  ],
  cards: [
    {
      title: "On the Go",
      text: "Design for the context where people actually use the app: field, commute, store floor, or customer self-service.",
    },
    {
      title: "Connected",
      text: "Connect mobile experiences with APIs, databases, authentication, notifications, and existing business systems.",
    },
    {
      title: "Built to Evolve",
      text: "Create a foundation that can support future features, users, integrations, and product improvements.",
    },
  ],
};

export const MOB_BUILD = {
  label: "Mobile Solutions",
  heading: "Mobile applications for different digital needs.",
  supporting:
    "We develop mobile experiences for customer-facing products, internal operations, services, and digital platforms.",
  cards: [
    {
      title: "Customer & Consumer Apps",
      description:
        "Give customers a convenient way to access your products, services, information, and digital experiences from their phones.",
      items: ["Customer Accounts", "Service Access", "Product Discovery", "Orders & Transactions", "Notifications", "Self-Service"],
    },
    {
      title: "Business & Workforce Apps",
      description:
        "Equip employees and field teams with mobile tools for accessing information, completing tasks, and managing workflows away from the desktop.",
      items: ["Employee Applications", "Field Operations", "Task Management", "Attendance", "Approvals", "Data Collection"],
    },
    {
      title: "Mobile Commerce",
      description:
        "Create mobile shopping experiences that connect customers with products, orders, payments, and related business systems.",
      items: ["Product Catalogues", "Search", "Shopping Cart", "Checkout", "Customer Accounts", "Order Tracking"],
    },
    {
      title: "Digital Service Applications",
      description:
        "Build mobile experiences that let users access services, submit information, track requests, and interact with an organization digitally.",
      items: ["Applications", "Request Tracking", "Document Submission", "Notifications", "Status Updates", "Self-Service"],
    },
    {
      title: "Field Data & Operational Apps",
      description:
        "Give field teams structured mobile tools for collecting, reviewing, and submitting operational information.",
      items: ["Data Collection", "Forms", "Location-Based Data", "Image Capture", "Inspection Workflows", "Offline-Aware Workflows"],
    },
    {
      title: "Mobile Product Development",
      description:
        "Turn a product idea into a mobile application with the supporting backend services, APIs, authentication, and infrastructure needed to run it.",
      items: ["MVPs", "Digital Products", "Subscription Applications", "User Platforms", "Mobile Services", "Connected Applications"],
    },
  ],
};

export const MOB_CAPABILITIES = {
  label: "What We Deliver",
  heading: "The engineering behind the mobile experience.",
  supporting:
    "Mobile applications often depend on much more than the mobile interface itself. We consider the full technical environment needed to operate the application.",
  cards: [
    {
      title: "Mobile UI Development",
      text: "Build responsive, intuitive interfaces shaped around how people use phones.",
    },
    {
      title: "Authentication",
      text: "Implement account registration, login, authentication flows, and the right access controls.",
    },
    {
      title: "API Integration",
      text: "Connect applications to backend services, databases, third-party platforms, and business systems.",
    },
    {
      title: "Push Notifications",
      text: "Support relevant notifications and communication workflows where the product needs them.",
    },
    {
      title: "Data Management",
      text: "Connect mobile applications to the data and services required for useful, reliable experiences.",
    },
    {
      title: "Location Services",
      text: "Integrate location capabilities where they're relevant to the application's requirements.",
    },
    {
      title: "Camera & Device Features",
      text: "Use device capabilities such as camera access and image capture when the product needs them.",
    },
    {
      title: "Analytics",
      text: "Integrate analytics and product measurement so you can understand how people use the application.",
    },
  ],
};

export const MOB_BACKEND = {
  label: "Behind the App",
  heading: "A mobile app is only one part of the product.",
  paragraphs: [
    "Most production mobile applications depend on backend services that manage users, data, business logic, authentication, notifications, and integrations.",
    "VAELKODE can develop the mobile experience together with the supporting backend architecture, or connect the application to systems that already exist.",
  ],
  flow: ["iOS / Android", "API Layer", "Business Logic", "Database", "External Services"],
  cards: [
    {
      title: "Backend Services",
      text: "Build APIs and backend services that provide the functionality the mobile application needs.",
    },
    {
      title: "Existing Systems",
      text: "Connect mobile applications to existing business platforms where APIs or other integration paths are available.",
    },
    {
      title: "Third-Party Services",
      text: "Integrate external services such as payments, communications, maps, authentication, or other APIs.",
    },
    {
      title: "Cloud Infrastructure",
      text: "Deploy supporting services on infrastructure that fits the application's requirements.",
    },
  ],
};

export const MOB_UX = {
  label: "Mobile UX",
  heading: "Designed for how people actually use mobile products.",
  supporting:
    "Mobile users interact with apps differently from desktop users. Interfaces need to account for smaller screens, touch, device capabilities, connectivity, and the context in which the app is used.",
  cards: [
    { title: "Simple Navigation", text: "Keep important actions and information easy to find." },
    { title: "Touch-Friendly Interfaces", text: "Design controls and interactions that work well on mobile devices." },
    { title: "Clear User Journeys", text: "Reduce unnecessary steps and guide users toward important actions." },
    { title: "Responsive Experiences", text: "Support different screen sizes and device environments." },
    {
      title: "Feedback & States",
      text: "Provide clear loading, success, validation, error, and empty states so users understand what is happening.",
    },
    { title: "Accessibility", text: "Consider accessibility throughout the interface and interaction design." },
  ],
};

export const MOB_APPROACH = {
  label: "Technology Approach",
  heading: "Choose the right approach for the product.",
  supporting:
    "Different mobile products have different technical needs. The right development approach depends on platform requirements, device capabilities, performance, team structure, development speed, and long-term maintenance.",
  options: [
    {
      title: "Cross-Platform Development",
      text: "Use a shared application codebase where it balances development efficiency, user experience, and technical requirements well.",
      suitable: [
        "Business Applications",
        "Customer Applications",
        "MVPs",
        "Digital Services",
        "Many Standard Mobile Experiences",
      ],
    },
    {
      title: "Native Development",
      text: "Use platform-specific development when the product needs capabilities, performance, or platform integration that make native the better fit.",
      suitable: [
        "Platform-Specific Features",
        "Specialized Device Capabilities",
        "High-Performance Requirements",
        "Advanced Native Integrations",
      ],
    },
  ],
};

export const MOB_TECH = {
  label: "Mobile Technology",
  heading: "Modern mobile and application technologies.",
  supporting:
    "We select technologies based on the application's requirements, target platforms, backend architecture, integrations, performance needs, and long-term maintenance.",
  categories: [
    { title: "Mobile", items: ["React Native", "Flutter", "iOS / Android native (where required)"] },
    { title: "Backend", items: ["Python", "FastAPI", "Django", "Laravel", "Node.js"] },
    { title: "APIs", items: ["REST APIs", "Authentication", "Webhooks", "Third-Party APIs"] },
    { title: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
    { title: "Infrastructure", items: ["AWS", "Azure", "Google Cloud", "Docker"] },
    {
      title: "Supporting Technologies",
      items: ["Push Notifications", "Analytics", "Cloud Services", "Application Monitoring"],
    },
  ],
};

export const MOB_PROCESS = {
  label: "How we work",
  headingBefore: "From idea to app store: ",
  headingAccent: "our process",
  supporting: "We keep product, design, and engineering aligned the whole way.",
  steps: [
    {
      num: "01",
      title: "Discover",
      text: "Understand users, goals, platforms, and must-have features.",
      milestone: "Shared brief",
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Design",
      text: "Map journeys and design screens people can actually use.",
      milestone: "Design review",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Build",
      text: "Develop the app and the APIs behind it, with regular demos.",
      milestone: "Demo builds",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Release & improve",
      text: "Ship to the right stores, then iterate from real use.",
      milestone: "Store live",
      tone: "teal" as const,
    },
  ],
};

export const MOB_PROJECTS = {
  label: "Selected projects",
  heading: "Mobile work we'll share as it goes public.",
  supporting: "We don't invent case studies. Public mobile projects will appear here when they're ready to show.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
  emptyState: "Mobile projects will be featured here as they become available for public presentation.",
};

export const MOB_QUALITY = {
  label: "Quality & Security",
  heading: "Built for real-world use.",
  supporting:
    "Mobile applications can handle personal information, business data, transactions, and access to organizational systems. Security and quality need attention throughout development.",
  cards: [
    {
      title: "Secure Authentication",
      text: "Protect account access through solid authentication and authorization.",
    },
    { title: "Data Protection", text: "Consider how information is transmitted, stored, accessed, and managed." },
    { title: "Secure APIs", text: "Protect communication between the mobile application and backend services." },
    {
      title: "Error Handling",
      text: "Handle failures and unexpected conditions without exposing unnecessary technical detail to users.",
    },
    { title: "Testing", text: "Test important workflows and supported device environments before release." },
    {
      title: "Monitoring",
      text: "Use operational monitoring and diagnostics to spot issues after deployment.",
    },
  ],
};

// Selected Work: approved homepage items do not represent mobile projects,
// so this page uses a neutral empty state rather than fabricating a portfolio.
export const MOB_WORK: WorkEmptySection = {
  label: "Selected Work",
  heading: "Digital products built around real needs.",
  supporting:
    "Selected digital solutions and technology initiatives that show how we approach connected digital products.",
  emptyState: "Mobile projects will be featured here as they become available for public presentation.",
  cta: CTA.viewAvailableWork,
};

export const MOB_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "Can you build for both iOS and Android?",
      a: "Yes. We choose native or cross-platform based on your product’s requirements and long-term plan.",
    },
    {
      q: "Can you build the backend too?",
      a: "Yes. Apps can ship with APIs, auth, databases, integrations, and supporting infrastructure where needed.",
    },
    {
      q: "Can you connect to our existing software?",
      a: "Yes, through APIs or other integration paths where the required access is available.",
    },
    {
      q: "Should we build native or cross-platform?",
      a: "It depends on platform needs, device features, performance, and maintenance. We’ll help you choose honestly.",
    },
    {
      q: "Can you build an MVP first?",
      a: "Yes. A focused first version is often the right way to validate the product before expanding.",
    },
    {
      q: "Can you maintain the app after launch?",
      a: "Yes. Bug fixes, OS updates, improvements, and new features under an agreed support model.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const MOB_FINAL: FinalCta = {
  label: "Next step",
  heading: "Have a mobile product in mind?",
  supporting: `Tell us about the idea, the platform you want to extend, or the app you need for customers or teams. Email ${COMPANY.contact.email} or book a consultation.`,
  ...FINAL_PAIR_TELL_US,
};
