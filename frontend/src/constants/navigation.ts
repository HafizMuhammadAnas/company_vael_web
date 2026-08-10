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
 * Primary navigation content (provided by the client).
 * Route slugs are structural placeholders; the target pages are built as
 * their content is supplied.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "AI & Intelligent Automation", to: "/solutions/ai-automation" },
      { label: "Custom Software Development", to: "/solutions/custom-software" },
      { label: "Web Development", to: "/solutions/web-development" },
      { label: "Mobile App Development", to: "/solutions/mobile-development" },
      { label: "Cloud & DevOps", to: "/solutions/cloud-devops" },
      { label: "Technology Consulting", to: "/solutions/technology-consulting" },
    ],
  },
  {
    label: "Industries",
    to: "/industries",
    children: [
      { label: "Government & Public Sector", to: "/industries#government" },
      { label: "Education", to: "/industries#education" },
      { label: "Healthcare", to: "/industries#healthcare" },
      { label: "Agriculture", to: "/industries#agriculture" },
      { label: "Finance & Financial Services", to: "/industries#finance" },
      { label: "Logistics & Supply Chain", to: "/industries#logistics" },
      { label: "Retail & Commerce", to: "/industries#retail" },
    ],
  },
  {
    label: "Work",
    to: "/work",
    children: [
      { label: "Case Studies", to: "/work/case-studies" },
      { label: "Portfolio", to: "/work/portfolio" },
    ],
  },
  {
    label: "Insights",
    to: "/insights",
    children: [
      { label: "Blog", to: "/insights#blog" },
      { label: "Resources", to: "/insights#resources" },
    ],
  },
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
