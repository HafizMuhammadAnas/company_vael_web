import { COMPANY } from "./company";

export interface FooterLink {
  label: string;
  to: string;
}

export interface FooterSocial {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_BRAND = {
  name: COMPANY.name,
  blurb: COMPANY.footerBlurb,
};

/** Direct conversion point in the footer. */
export const FOOTER_CTA = {
  prompt: "Have a project in mind?",
  text: "Let's discuss how we can help.",
  button: { label: "Book a Consultation", to: "/consultation" },
};

/**
 * Social channels. Any entry whose href is still a "#" placeholder is hidden
 * in the UI, so no broken links ship to production. Add the real profile URLs
 * here as the accounts are created and they will appear automatically.
 */
export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Web Development", to: "/solutions/web-development" },
      { label: "Custom Software", to: "/solutions/custom-software" },
      { label: "AI & Automation", to: "/solutions/ai-automation" },
      { label: "Mobile Development", to: "/solutions/mobile-development" },
      { label: "Cloud & DevOps", to: "/solutions/cloud-devops" },
      { label: "Technology Consulting", to: "/solutions/technology-consulting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Our Process", to: "/about/process" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQs", to: "/faqs" },
      { label: "Insights", to: "/insights" },
      { label: "Portfolio", to: "/portfolio" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Cookie Policy", to: "/cookie-policy" },
    ],
  },
];

/** Official registration details, sourced from the central company config. */
export const FOOTER_LEGAL = {
  companyName: COMPANY.legal.registeredName,
  companyNumber: COMPANY.legal.companyNumber,
  registeredOffice: COMPANY.legal.registeredOffice,
};
