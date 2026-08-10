import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const menu =
    open &&
    createPortal(
      <div className={styles.mobileRoot} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div id="mobile-nav-drawer" className={styles.panel}>
          <nav className={styles.panelNav} aria-label="Mobile">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className={styles.group}>
                  {item.to ? (
                    <Link to={item.to} className={styles.groupLabel}>
                      {item.label}
                    </Link>
                  ) : (
                    <p className={styles.groupLabel}>{item.label}</p>
                  )}
                  {item.children.map((child) => (
                    <Link key={child.to} to={child.to} className={styles.itemLink}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.label} to={item.to ?? "/"} className={styles.topLink}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Button variant="cta" to={CONSULTATION_CTA.to} className={styles.panelCta} block>
            {CONSULTATION_CTA.label}
          </Button>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <nav
        className={[styles.nav, scrolled ? styles.scrolled : "", open ? styles.navOpen : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
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
            className={[styles.burger, open ? styles.burgerOpen : ""].filter(Boolean).join(" ")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {menu}
    </>
  );
}
