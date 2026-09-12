/**
 * Client / brand marks. Single source for Portfolio + Home logo marquee.
 *
 * Put real logo files in /public/clients/ and point logoSrc there.
 * Default view is monochrome; hover restores full brand color and pauses scroll.
 */

export interface ClientLogo {
  id: string;
  /** Display name (fallback + alt text). */
  name: string;
  /** Logo image path (SVG/PNG under /public). */
  logoSrc: string;
  logoAlt?: string;
}

export const CLIENT_LOGOS_SECTION = {
  label: "Clients",
  heading: "Brands we've worked with",
  supporting: "A selection of organizations and products we've partnered with.",
} as const;

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "solara-grid",
    name: "Solara Grid",
    logoSrc: "/clients/solara-grid.svg",
    logoAlt: "Solara Grid logo",
  },
  {
    id: "cinemark-premiere",
    name: "Cinemark Premiere",
    logoSrc: "/clients/cinemark-premiere.svg",
    logoAlt: "Cinemark Premiere logo",
  },
  {
    id: "northline-university",
    name: "Northline University",
    logoSrc: "/clients/northline-university.svg",
    logoAlt: "Northline University logo",
  },
  {
    id: "harbor-residences",
    name: "Harbor Residences",
    logoSrc: "/clients/harbor-residences.svg",
    logoAlt: "Harbor Residences logo",
  },
  {
    id: "meridian-clinic",
    name: "Meridian Clinic",
    logoSrc: "/clients/meridian-clinic.svg",
    logoAlt: "Meridian Clinic logo",
  },
  {
    id: "atelier-commerce",
    name: "Atelier Commerce",
    logoSrc: "/clients/atelier-commerce.svg",
    logoAlt: "Atelier Commerce logo",
  },
  {
    id: "ledger-ops",
    name: "Ledger Ops",
    logoSrc: "/clients/ledger-ops.svg",
    logoAlt: "Ledger Ops logo",
  },
  {
    id: "greenfield-logistics",
    name: "Greenfield Logistics",
    logoSrc: "/clients/greenfield-logistics.svg",
    logoAlt: "Greenfield Logistics logo",
  },
];
