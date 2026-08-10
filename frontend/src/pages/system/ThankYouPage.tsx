import { useEffect } from "react";

import { Button } from "@/components/ui";
import { LogoGlyph } from "@/components/brand/LogoGlyph";

export function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank you — VAELKODE";
  }, []);

  return (
    <section
      style={{
        minHeight: "calc(100vh - var(--nav-height))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        position: "relative",
      }}
    >
      <div className="circuit-bg" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
        <div style={{ filter: "drop-shadow(0 0 24px rgba(0,212,255,0.6))" }}>
          <LogoGlyph size={80} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginTop: "1.5rem",
          }}
        >
          Thank you. We&rsquo;ve received your message.
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "1rem" }}>
          Our team will review your request and get back to you.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          <Button variant="outline" to="/">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
