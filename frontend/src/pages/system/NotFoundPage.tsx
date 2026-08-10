import { useEffect } from "react";

import { Button } from "@/components/ui";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — VAELKODE";
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
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 14vw, 9rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            textShadow: "0 0 40px rgba(0,212,255,0.3)",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <p
          style={{
            fontSize: "1.15rem",
            color: "var(--text-secondary)",
            marginTop: "1.5rem",
          }}
        >
          Looks like this page took a wrong turn.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          <Button variant="primary" to="/">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
