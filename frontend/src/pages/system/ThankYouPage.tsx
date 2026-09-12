import { useEffect } from "react";

import { HeroAmbient } from "@/components/ambient/HeroAmbient";
import { LogoGlyph } from "@/components/brand/LogoGlyph";
import { Button } from "@/components/ui";

export function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank you | VAELKODE";
  }, []);

  return (
    <section className="systemPage">
      <HeroAmbient layout="page" />
      <div className="systemInner">
        <div style={{ filter: "drop-shadow(0 0 24px rgba(0,212,255,0.6))" }}>
          <LogoGlyph size={80} />
        </div>
        <h1 className="systemTitle">Thank you. We&rsquo;ve received your message.</h1>
        <p className="systemText">Our team will review your request and get back to you.</p>
        <div className="systemActions">
          <Button variant="outline" to="/">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
