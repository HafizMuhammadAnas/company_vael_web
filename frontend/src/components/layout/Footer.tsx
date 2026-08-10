import { Link } from "react-router-dom";

import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { Button } from "@/components/ui";
import {
  FOOTER_BRAND,
  FOOTER_COLUMNS,
  FOOTER_CTA,
  FOOTER_LEGAL,
  FOOTER_SOCIALS,
} from "@/constants/footer";

import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = FOOTER_SOCIALS.filter((social) => social.href && social.href !== "#");

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Column 1 — brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.brandRow}>
            <LogoGlyph size={36} />
            <span className={styles.brandName}>{FOOTER_BRAND.name}</span>
          </Link>
          <p className={styles.brandText}>{FOOTER_BRAND.blurb}</p>

          <div className={styles.cta}>
            <p className={styles.ctaPrompt}>{FOOTER_CTA.prompt}</p>
            <p className={styles.ctaText}>{FOOTER_CTA.text}</p>
            <Button variant="primary" to={FOOTER_CTA.button.to}>
              {FOOTER_CTA.button.label}
            </Button>
          </div>

          {socials.length > 0 && (
            <ul className={styles.socials}>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Columns 2–5 — link groups */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className={styles.colTitle}>// {col.title}</div>
            <ul className={styles.links}>
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>
          © {year} <span>{FOOTER_LEGAL.companyName}</span>. All rights reserved.
        </div>
        <div className={styles.legal}>
          {FOOTER_LEGAL.companyName} · Company No. {FOOTER_LEGAL.companyNumber} · Registered office:{" "}
          {FOOTER_LEGAL.registeredOffice}
        </div>
      </div>
    </footer>
  );
}
