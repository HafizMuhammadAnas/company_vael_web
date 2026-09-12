/**
 * VAELKODE /solutions/web-development. Web & Digital Platforms.
 * Approved production copy. No invented clients, statistics, awards,
 * testimonials, project results, certifications, or unsupported capabilities.
 */

import { COMPANY } from "@/constants/company";
import { CTA, DISCLAIMERS, FINAL_PAIR_TELL_US, consultationCta, contactCta } from "@/content/shared";
import type { FaqSection, FinalCta, PageHero, SeoMeta, WorkSection } from "@/content/shared";


export const WEB_SEO: SeoMeta = {
  title: "Web Development & Digital Platforms | VAELKODE",
  description:
    "VAELKODE designs and develops modern websites, web applications, customer portals, e-commerce platforms, SaaS products, and digital experiences.",
};

export const WEB_HERO: PageHero = {
  label: "Web Development",
  title: "Websites and digital platforms that work for your business.",
  supporting:
    "From a clear company website to portals, stores, and web apps. We build digital experiences people understand and trust.",
  primaryCta: CTA.bookConsultation,
  secondaryCta: contactCta("Discuss Your Web Project"),
  tags: [
    "Business websites",
    "E-commerce",
    "Portals",
    "Web apps",
    "Redesigns",
    "Integrations",
  ],
};

export const WEB_SUB_SERVICES = {
  label: "Web services",
  heading: "Everything we can build for you on the web.",
  supporting: "Each service includes the stacks we commonly use. We pick what fits your project.",
  items: [
    {
      title: "Business & marketing websites",
      text: "A multi-page site that presents your company, services, and proof points clearly, so visitors understand who you are and how to get in touch.",
      highlights: ["Home, about, services, contact", "Brand-led layout & messaging", "Contact paths that are easy to find"],
      stacks: ["React", "Next.js", "TypeScript", "SEO-ready"],
    },
    {
      title: "Landing pages",
      text: "Single-purpose pages for campaigns and launches: one message, one offer, one clear next step. Built to turn attention into enquiries.",
      highlights: ["Campaign or product focus", "Strong headline + CTA", "Form or booking handoff"],
      stacks: ["Next.js", "Forms", "Analytics", "A/B ready"],
    },
    {
      title: "E-commerce stores",
      text: "Online shops where customers can browse products, add to cart, and check out, with catalogue, payments, and order basics that match how you sell.",
      highlights: ["Product catalogue & detail pages", "Cart and checkout flow", "Payment provider integration"],
      stacks: ["Shopify", "WooCommerce", "Payments", "Catalogue"],
    },
    {
      title: "CMS websites",
      text: "Editable sites your team can update without waiting on a developer. Pages, posts, and media managed from a clear content admin.",
      highlights: ["Pages, posts, and media", "Roles for editors & admins", "WordPress or headless CMS"],
      stacks: ["WordPress", "Headless CMS", "Custom admin"],
    },
    {
      title: "Website redesign & migration",
      text: "Move from an outdated look or fragile platform to a modern build while keeping URLs, content, and SEO foundations intact where it matters.",
      highlights: ["Content & URL mapping", "Responsive rebuild", "Launch with redirects in place"],
      stacks: ["Migration", "Responsive", "Performance"],
    },
    {
      title: "Web apps & portals",
      text: "Secure, logged-in experiences for customers or internal teams. Dashboards, workflows, documents, and accounts behind authentication.",
      highlights: ["Sign-in and user roles", "Dashboards & task flows", "API-backed data"],
      stacks: ["React", "APIs", "Auth", "PostgreSQL"],
    },
    {
      title: "Performance & SEO foundations",
      text: "Technical groundwork so pages load cleanly, stay stable on mobile, and give search engines a clear structure to work with.",
      highlights: ["Core Web Vitals focus", "Clean headings & metadata", "Accessibility basics"],
      stacks: ["Core Web Vitals", "Schema", "Accessibility"],
    },
    {
      title: "Booking & lead capture",
      text: "Enquiry forms, booking steps, and confirmation paths that collect the right details and route them to your inbox, CRM, or calendar.",
      highlights: ["Custom forms & validation", "Booking or request flow", "Email, SMS, or CRM handoff"],
      stacks: ["Forms", "CRM sync", "Email / SMS"],
    },
  ],
};

export const WEB_INTRO = {
  label: "Beyond a Brochure",
  heading: "Start with presence, grow into a product when you need it.",
  paragraphs: [
    "Your digital presence is often the first interaction a customer, partner, or stakeholder has with your organization.",
    "A modern platform should communicate your value clearly, guide people to the right action, and stay reliable as traffic and features grow.",
    "When the brief goes beyond a brochure into portals, applications, or commerce, we treat the experience as a product rather than a one-off page.",
  ],
  cards: [
    {
      title: "Communicate",
      text: "Present your organization, products, and services through a clear, professional digital experience.",
    },
    {
      title: "Engage",
      text: "Create intuitive experiences that help people find information, interact with your business, and complete tasks.",
    },
    {
      title: "Convert",
      text: "Shape journeys that guide visitors toward useful next steps: getting in touch, requesting a service, or completing a purchase.",
    },
  ],
};

export const WEB_BUILD = {
  label: "Digital Solutions",
  heading: "From business websites to full digital platforms.",
  supporting:
    "From a high-performance corporate site to a complex web application, we build around your users and how your organization actually works.",
  cards: [
    {
      title: "Corporate & Business Websites",
      description:
        "Professional websites that communicate your organization's capabilities, establish credibility, and open doors for growth.",
      items: [
        "Corporate Websites",
        "Company Profiles",
        "Service Websites",
        "Professional Landing Pages",
        "Multi-Page Websites",
        "Content Management",
      ],
    },
    {
      title: "Marketing & Lead Generation Websites",
      description:
        "Digital experiences shaped around your marketing objectives, messaging, audience, and conversion journey.",
      items: [
        "Landing Pages",
        "Campaign Pages",
        "Lead Generation",
        "Conversion-Focused UX",
        "Forms & CTAs",
        "Analytics Integration",
      ],
    },
    {
      title: "Web Applications",
      description:
        "Interactive software in the browser, built around specific workflows, users, data, and business requirements.",
      items: ["Business Applications", "Dashboards", "Portals", "Workflow Systems", "User Management", "API Integration"],
    },
    {
      title: "Customer & Client Portals",
      description:
        "Secure environments where customers and partners can access services, information, documents, applications, and workflows.",
      items: [
        "User Accounts",
        "Authentication",
        "Document Management",
        "Application Tracking",
        "Notifications",
        "Self-Service",
      ],
    },
    {
      title: "E-commerce Platforms",
      description:
        "Commerce experiences that help you present products, manage customers, process orders, and connect with operational systems.",
      items: [
        "Product Catalogues",
        "Shopping Experience",
        "Customer Accounts",
        "Order Management",
        "Payment Integration",
        "Inventory Integration",
      ],
    },
    {
      title: "SaaS & Digital Products",
      description:
        "Browser-based products and platforms that serve users through scalable digital experiences.",
      items: ["SaaS Applications", "User Management", "Subscription Systems", "Dashboards", "APIs", "Cloud Deployment"],
    },
  ],
};

export const WEB_MODERN = {
  label: "Digital Experience",
  heading: "Built for people, tuned for performance.",
  supporting:
    "A successful digital platform needs more than an attractive interface. It has to work reliably across devices, communicate clearly, perform well, and support the goals behind the project.",
  cards: [
    {
      title: "User Experience",
      text: "Create intuitive journeys that help visitors find information and complete important actions.",
    },
    {
      title: "Responsive Design",
      text: "Deliver consistent experiences across desktops, tablets, and phones.",
    },
    {
      title: "Performance",
      text: "Build interfaces and applications with speed and efficient delivery in mind.",
    },
    {
      title: "Accessibility",
      text: "Consider accessibility and usability so a broader range of people can use the experience.",
    },
    {
      title: "SEO Foundation",
      text: "Structure sites with clear content, metadata, performance, and technical foundations that search engines can work with.",
    },
    {
      title: "Conversion",
      text: "Shape calls to action, forms, navigation, and page journeys around outcomes that matter to the business.",
    },
  ],
};

export const WEB_CAPABILITIES = {
  label: "Engineering Capabilities",
  heading: "Everything behind the digital experience.",
  supporting:
    "Our web work covers the visible experience and the systems that power it.",
  cards: [
    { title: "Frontend Development", text: "Build responsive, interactive interfaces with modern frontend technologies." },
    {
      title: "Backend Development",
      text: "Develop application logic, APIs, workflows, authentication, and data services.",
    },
    {
      title: "API Integration",
      text: "Connect sites and apps with business systems, third-party services, payment platforms, and other APIs.",
    },
    {
      title: "Database Development",
      text: "Design data structures that support reliability, performance, and what the application needs to do.",
    },
    {
      title: "Authentication & Authorization",
      text: "Build secure account systems, permissions, roles, and protected application experiences.",
    },
    {
      title: "Content Management",
      text: "Set up content structures and editing workflows that fit the project.",
    },
    {
      title: "Analytics & Tracking",
      text: "Wire in analytics and measurement so you can understand performance and how people use the site.",
    },
    {
      title: "Deployment & Infrastructure",
      text: "Prepare applications for reliable deployment and operation on the right cloud or hosting setup.",
    },
  ],
};

export const WEB_PROCESS = {
  label: "How we work",
  headingBefore: "From idea to launch: ",
  headingAccent: "our process",
  supporting: "Transparent and collaborative. You’re involved at every milestone.",
  steps: [
    {
      num: "01",
      title: "Discovery & briefing",
      text: "We learn your business, audience, and goals before anything is designed. A clear brief keeps everyone aligned from the start.",
      milestone: null,
      tone: "sky" as const,
    },
    {
      num: "02",
      title: "Design & structure",
      text: "We shape layouts, visual direction, and key pages so you can see the site before development starts.",
      milestone: "Design review shared",
      tone: "violet" as const,
    },
    {
      num: "03",
      title: "Feedback & approval",
      text: "You request changes to layout, content blocks, and look-and-feel until the direction feels right.",
      milestone: "You sign off",
      tone: "amber" as const,
    },
    {
      num: "04",
      title: "Build & live preview",
      text: "We turn the approved design into a working site and share a private preview link so you can follow progress.",
      milestone: "Preview link shared",
      tone: "teal" as const,
    },
    {
      num: "05",
      title: "Content & polish",
      text: "We refine copy, images, forms, and details so the site matches your brand and converts visitors.",
      milestone: null,
      tone: "gold" as const,
    },
    {
      num: "06",
      title: "QA & go live",
      text: "Final checks for speed, mobile, forms, and browsers. Then launch and a clear handover for your team.",
      milestone: "Site live",
      tone: "rose" as const,
    },
  ],
};

export const WEB_MORE = {
  label: "More Than a Website",
  heading: "When your website needs to do more.",
  paragraphs: [
    "Not every project is simply a website.",
    "Sometimes the platform needs authentication, dashboards, business workflows, payments, integrations, data processing, or user-specific experiences.",
    "In those cases, we combine web development with backend engineering, APIs, databases, cloud infrastructure, and related work to build a complete digital application.",
  ],
  flow: [
    "Marketing Website",
    "Interactive Website",
    "Customer Portal",
    "Web Application",
    "Integrated Business Platform",
  ],
  cta: consultationCta("Discuss Your Requirements"),
};

export const WEB_INTEGRATIONS = {
  label: "Connected Digital Experiences",
  heading: "Connect your website to the systems you already use.",
  supporting:
    "A modern digital platform often needs to talk to other services and systems. We design integrations around what your business and application actually need.",
  cards: [
    { title: "Payment Services", text: "Connect digital platforms with the right payment providers." },
    {
      title: "CRM & Business Systems",
      text: "Keep website activity and customer information in sync with your business applications.",
    },
    { title: "Communication", text: "Integrate email, messaging, notifications, and related workflows." },
    { title: "Authentication", text: "Connect identity and authentication services where you need them." },
    { title: "External APIs", text: "Consume and expose APIs so different applications and services can work together." },
    {
      title: "Internal Systems",
      text: "Link customer-facing platforms with internal databases and operational applications where it makes sense.",
    },
  ],
};

export const WEB_TECH = {
  label: "Technology stack",
  heading: "Which tools can we use to build your website?",
  supporting:
    "We pick the stack that fits your goals, timeline, and maintenance rather than a one-size catalogue. These are the tools we commonly use for web work.",
  categories: [
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"] },
    { title: "Backend", items: ["Node.js", "Python", "FastAPI", "Django", "Laravel"] },
    { title: "CMS & content", items: ["WordPress", "Headless CMS", "Custom admin"] },
    { title: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
    { title: "Cloud & delivery", items: ["AWS", "Azure", "Google Cloud", "Docker", "CI/CD"] },
    {
      title: "Integrations",
      items: ["REST APIs", "Payments", "CRM", "Email / SMS", "Analytics"],
    },
  ],
};

export const WEB_QUALITY = {
  label: "Quality checks",
  heading: "How we verify your site before launch.",
  supporting:
    "Each check has a clear method: what the team does, in order, before we call it ready.",
  checks: [
    {
      id: "performance",
      title: "Performance",
      summary: "Fast on real devices, not only on a fast office Wi‑Fi.",
      outcome: "Key pages feel quick on phone and desktop.",
      steps: [
        "Open the site on a mid-range phone and a desktop browser.",
        "Walk the main journeys (home, key service page, contact/form).",
        "Note slow images, heavy scripts, or layout jumps.",
        "Compress images, defer non-critical scripts, and re-check.",
      ],
    },
    {
      id: "responsive",
      title: "Responsive layout",
      summary: "Clean layouts on phone, tablet, and desktop.",
      outcome: "No broken columns, overlapping text, or cut-off buttons.",
      steps: [
        "Resize through phone, tablet, and desktop breakpoints.",
        "Check navigation, hero, forms, and footer at each size.",
        "Fix wrapping, spacing, and tap targets that feel too small.",
        "Confirm landscape and common device widths look intentional.",
      ],
    },
    {
      id: "seo",
      title: "SEO foundations",
      summary: "Search engines can understand the pages you care about.",
      outcome: "Titles, headings, and structure are clear and consistent.",
      steps: [
        "Review page titles, meta descriptions, and H1/H2 hierarchy.",
        "Confirm important pages are linked from the main navigation.",
        "Check image alt text on key visuals.",
        "Validate a clean URL structure and basic indexing readiness.",
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility basics",
      summary: "More people can read, navigate, and complete actions.",
      outcome: "Keyboard paths and contrast work for common journeys.",
      steps: [
        "Tab through menus, links, and forms without a mouse.",
        "Check contrast on text, buttons, and form labels.",
        "Confirm focus states are visible on interactive elements.",
        "Fix any traps, missing labels, or unreadable contrast.",
      ],
    },
    {
      id: "security",
      title: "Security basics",
      summary: "Forms and integrations use sensible defaults.",
      outcome: "Enquiries and sensitive flows are handled carefully.",
      steps: [
        "Review forms for validation and spam protection where needed.",
        "Confirm HTTPS and secure form submission endpoints.",
        "Check third-party embeds (chat, analytics, payments) are intentional.",
        "Remove leftover test credentials, debug flags, or open admin paths.",
      ],
    },
    {
      id: "handover",
      title: "Handover ready",
      summary: "Your team knows how to update and what happens next.",
      outcome: "You can maintain content without guessing.",
      steps: [
        "Walk through how to edit common content (pages, images, forms).",
        "Share where assets, logins, and hosting details live.",
        "Confirm backup / update expectations after launch.",
        "Leave a short punch-list of recommended next improvements.",
      ],
    },
  ],
};

export const WEB_WHY = {
  label: "Why VAELKODE",
  heading: "A web partner who starts with your business rather than a template pitch.",
  supporting: "Clear scope, practical choices, and a site your team can actually run.",
  items: [
    {
      num: "01",
      title: "Clarity before code",
      text: "We agree who the site is for, what it must do, and what “done” looks like.",
    },
    {
      num: "02",
      title: "Design that converts",
      text: "Structure and messaging that guide visitors to enquire, book, or buy.",
    },
    {
      num: "03",
      title: "Built to maintain",
      text: "Clean build and content setup so the next update isn’t a rewrite.",
    },
    {
      num: "04",
      title: "Plain communication",
      text: "Visible progress each week, in plain language.",
    },
  ],
};

export const WEB_PROJECTS = {
  label: "Selected projects",
  heading: "Websites we're proud to show.",
  supporting: "Hover a preview to scroll the full page, then open the live site.",
  viewAll: { label: "View full portfolio", to: "/portfolio" },
};

export const WEB_PITCH = {
  label: "Start a conversation",
  heading: "Tell us about the website you want to build.",
  supporting:
    "Share your goals, timeline, and any references. We’ll reply with a practical next step, without a hard sell.",
  points: [
    "Business site, store, portal, or redesign",
    "Rough timeline and budget if you have them",
    "Links to sites you like (optional)",
  ],
};

export const WEB_WORK: WorkSection = {
  label: "Selected Work",
  heading: "Digital platforms built around real requirements.",
  supporting:
    "Selected digital solutions and platform concepts that show how we approach modern web development and software engineering.",
  note: DISCLAIMERS.digitalPlatformDemonstrations,
  cta: CTA.viewAllWork,
};

export const WEB_FAQ: FaqSection = {
  label: "FAQ",
  heading: "Common questions",
  items: [
    {
      q: "Do you build websites and web apps?",
      a: "Yes. From business and marketing sites to portals, stores, and fuller web applications.",
    },
    {
      q: "Can you work from an existing design?",
      a: "Yes. Brand guidelines, Figma files, or wireframes can be the foundation for development.",
    },
    {
      q: "Do you design and develop?",
      a: "Yes. Engagements can include UX/UI, frontend, backend, integrations, and launch.",
    },
    {
      q: "Can you redesign an existing site?",
      a: "Yes. We assess structure, content, performance, and experience, then rebuild what needs to change.",
    },
    {
      q: "Will it be mobile responsive?",
      a: "Yes. Responsive behavior is part of design and development across supported devices.",
    },
    {
      q: "Can you maintain the site after launch?",
      a: "Yes. Updates, improvements, security, and ongoing development can continue after go-live.",
    },
  ],
  cta: CTA.bookConsultation,
};

export const WEB_FINAL: FinalCta = {
  label: "Next step",
  heading: "Ready to build a better website?",
  supporting: `Tell us what you need: a new site, a redesign, a store, or a portal. Email ${COMPANY.contact.email} or book a consultation and we’ll help you find the right approach.`,
  ...FINAL_PAIR_TELL_US,
};
