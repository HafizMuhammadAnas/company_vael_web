import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { Button } from "@/components/ui";
import {
  BRAND_NAME,
  CONSULTATION_CTA,
  NAV_ITEMS,
  type NavItem,
} from "@/constants/navigation";
import { useScrolled } from "@/hooks/useScrolled";

import styles from "./Nav.module.css";

function DesktopItem({ item }: { item: NavItem }) {
  if (!item.children) {
    return (
      <li className={styles.item}>
        <Link to={item.to ?? "/"} className={styles.link}>
          {item.label}
        </Link>
      </li>
    );
  }
  return (
    <li className={styles.item}>
      {item.to ? (
        <Link to={item.to} className={styles.trigger} aria-haspopup="true">
          {item.label}
          <span className={styles.caret}>▾</span>
        </Link>
      ) : (
        <button type="button" className={styles.trigger} aria-haspopup="true">
          {item.label}
          <span className={styles.caret}>▾</span>
        </button>
      )}
      <div className={styles.dropdown} role="menu">
        {item.children.map((child) => (
          <Link key={child.to} to={child.to} className={styles.dropdownLink} role="menuitem">
            {child.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

export function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className={[styles.nav, scrolled ? styles.scrolled : ""].filter(Boolean).join(" ")}>
      <Link to="/" className={styles.logo}>
        <LogoGlyph size={44} className={styles.logoGlyph} />
        <span className={styles.brand}>{BRAND_NAME}</span>
      </Link>

      <ul className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <DesktopItem key={item.label} item={item} />
        ))}
      </ul>

      <div className={styles.actions}>
        <Button variant="cta" to={CONSULTATION_CTA.to} className={styles.cta}>
          {CONSULTATION_CTA.label}
        </Button>
        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.drawer}>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label} className={styles.drawerGroup}>
                {item.to ? (
                  <Link to={item.to} className={styles.drawerLabel}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.drawerLabel}>{item.label}</span>
                )}
                {item.children.map((child) => (
                  <Link key={child.to} to={child.to} className={styles.drawerLink}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <div key={item.label} className={styles.drawerGroup}>
                <Link to={item.to ?? "/"} className={styles.drawerLink}>
                  {item.label}
                </Link>
              </div>
            ),
          )}
          <Button variant="cta" to={CONSULTATION_CTA.to} className={styles.drawerCta} block>
            {CONSULTATION_CTA.label}
          </Button>
        </div>
      )}
    </nav>
  );
}
