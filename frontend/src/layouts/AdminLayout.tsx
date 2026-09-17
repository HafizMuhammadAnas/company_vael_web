import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Briefcase,
  Building2,
  FolderKanban,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AdminLayout.module.css";

type NavItem = {
  to?: string;
  label: string;
  icon: typeof Inbox;
  soon?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Inbox",
    items: [{ to: "/admin/leads", label: "Leads", icon: Inbox }],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/projects", label: "Projects", icon: FolderKanban },
      { to: "/admin/clients", label: "Client logos", icon: Users },
      { to: "/admin/insights", label: "Insights", icon: Newspaper },
      { to: "/admin/reviews", label: "Google reviews", icon: MessageSquareQuote },
      { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { label: "Careers", icon: Briefcase, soon: true },
      { label: "Industries", icon: Building2, soon: true },
    ],
  },
];

function isItemActive(pathname: string, to?: string) {
  if (!to) return false;
  if (to === "/admin/leads") {
    return pathname === "/admin" || pathname === "/admin/" || pathname.startsWith("/admin/leads");
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const sidebar = (
    <>
      <div className={styles.sidebarBrand}>
        <LayoutDashboard size={18} aria-hidden />
        <div>
          <strong>VAELKODE</strong>
          <span>Admin CMS</span>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Admin sections">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className={styles.navGroup}>
            <p className={styles.navGroupLabel}>{group.label}</p>
            <ul className={styles.navList}>
              {group.items.map((item) => {
                const Icon = item.icon;
                if (item.soon || !item.to) {
                  return (
                    <li key={item.label}>
                      <span className={styles.navSoon} title="Coming next">
                        <Icon size={17} strokeWidth={1.75} aria-hidden />
                        <span>{item.label}</span>
                        <em>Soon</em>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={() =>
                        [
                          styles.navLink,
                          isItemActive(location.pathname, item.to) ? styles.navLinkActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }
                    >
                      <Icon size={17} strokeWidth={1.75} aria-hidden />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFoot}>
        <Link to="/" className={styles.viewSite} target="_blank" rel="noreferrer">
          View website
        </Link>
      </div>
    </>
  );

  return (
    <div className={styles.admin}>
      <aside className={styles.sidebar} aria-label="Admin navigation">
        {sidebar}
      </aside>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link to="/admin/projects" className={styles.mobileBrand}>
              VAELKODE Admin
            </Link>
          </div>
          <div className={styles.meta}>
            {user ? (
              <span className={styles.userChip}>
                <span className={styles.userEmail}>{user.email}</span>
                <span className={styles.userRole}>{user.role}</span>
              </span>
            ) : null}
            <Button variant="outline" onClick={logout}>
              Log out
            </Button>
          </div>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <div
        className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!mobileOpen}
        aria-label="Admin navigation"
      >
        {sidebar}
      </aside>
    </div>
  );
}
