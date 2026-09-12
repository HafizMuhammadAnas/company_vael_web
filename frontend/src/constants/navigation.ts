export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

/**
 * Primary navigation content.
 * Labels and routes should stay aligned with footer links and page content.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    to: "/solutions",
    children: [
      { label: "Web Development", to: "/solutions/web-development" },
      { label: "Custom Software", to: "/solutions/custom-software" },
      { label: "AI & Automation", to: "/solutions/ai-automation" },
      { label: "Mobile Development", to: "/solutions/mobile-development" },
      { label: "Cloud & DevOps", to: "/solutions/cloud-devops" },
      { label: "Technology Consulting", to: "/solutions/technology-consulting" },
    ],
  },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Insights", to: "/insights" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About VAELKODE", to: "/about" },
      { label: "Our Process", to: "/about/process" },
      { label: "Careers", to: "/careers" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const BRAND_NAME = "VAELKODE";

export const CONSULTATION_CTA = { label: "Book a Consultation", to: "/consultation" };
