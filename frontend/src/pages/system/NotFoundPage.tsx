import { useEffect } from "react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { Button } from "@/components/ui";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — VAELKODE";
  }, []);

  return (
    <section className="systemPage">
      <HeroAmbient layout="page" />
      <div className="systemInner">
        <div className="systemCode">404</div>
        <p className="systemText">Looks like this page took a wrong turn.</p>
        <div className="systemActions">
          <Button variant="primary" to="/">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
