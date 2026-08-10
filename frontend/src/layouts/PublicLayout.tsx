import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

/**
 * Handles scroll behaviour on navigation:
 * - with a `#hash`, scroll the matching section into view (used by the
 *   single-page Industries anchors and the redirected /industries/* routes);
 * - otherwise reset to the top of the page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Defer so the target section is mounted (also covers redirects).
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export function PublicLayout() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
