import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./Ambient.module.css";

export function SoftAura() {
  return (
    <div className={`${styles.layer} ${styles.aura}`} aria-hidden>
      <span className={`${styles.auraBlob} ${styles.auraA}`} />
      <span className={`${styles.auraBlob} ${styles.auraB}`} />
    </div>
  );
}

export function DriftGrid({ className }: { className?: string }) {
  return <div className={`${styles.grid} ${className ?? ""}`} aria-hidden />;
}

/** Large, slow radar rings. */
export function OrbitField({
  className,
  layout = "home",
}: {
  className?: string;
  layout?: "home" | "page";
}) {
  return (
    <div
      className={`${styles.orbitField} ${layout === "page" ? styles.orbitCentered : ""} ${className ?? ""}`}
      aria-hidden
    >
      <div className={styles.orbitRing} />
      <div className={styles.orbitRing} />
      <div className={styles.orbitRing} />
      <div className={styles.orbitRing} />
    </div>
  );
}

export function FloatingMotes({ count = 12 }: { count?: number }) {
  return (
    <div className={styles.layer} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={styles.mote}
          style={{
            left: `${(i * 17) % 92}%`,
            top: `${(i * 23) % 88}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${10 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function LightBeams() {
  return (
    <div className={styles.layer} aria-hidden>
      <span className={styles.beam} style={{ left: "12%", animationDelay: "0s" }} />
      <span className={styles.beam} style={{ left: "48%", animationDelay: "4s" }} />
      <span className={styles.beam} style={{ left: "72%", animationDelay: "8s" }} />
    </div>
  );
}

export function DataStreams({ rows = 4 }: { rows?: number }) {
  return (
    <div className={styles.layer} aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={styles.stream} style={{ top: `${18 + i * 18}%` }}>
          <span className={styles.packet} style={{ animationDelay: `${i * 1.4}s` }} />
        </div>
      ))}
    </div>
  );
}

/**
 * Calm constellation field for heroes.
 * `home` biases nodes to the right (left-aligned copy).
 * `page` spreads nodes more evenly with fewer points (centered copy).
 */
export function ParticleNetwork({ layout = "home" }: { layout?: "home" | "page" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = layout === "page" ? 36 : 52;
    const linkDist = layout === "page" ? 150 : 175;
    const nodes = Array.from({ length: count }, (_, i) => {
      if (layout === "page") {
        // Prefer ring around the center so titled copy stays clear.
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.28 + Math.random() * 0.42;
        return {
          x: 0.5 + Math.cos(angle) * radius * 0.55,
          y: 0.42 + Math.sin(angle) * radius * 0.48,
          vx: (Math.random() - 0.5) * 0.00032,
          vy: (Math.random() - 0.5) * 0.00028,
          r: 0.75 + Math.random() * 1.35,
          phase: Math.random() * Math.PI * 2,
        };
      }

      // Bias toward right / mid — copy stays readable on the left.
      const biasRight = i % 5 !== 0;
      return {
        x: biasRight ? 0.32 + Math.random() * 0.62 : Math.random() * 0.4,
        y: 0.06 + Math.random() * 0.82,
        vx: (Math.random() - 0.5) * 0.00038,
        vy: (Math.random() - 0.5) * 0.00032,
        r: 0.9 + Math.random() * 1.55,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - t0) / 1000;

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
          if (n.y < 0.02 || n.y > 0.92) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = (nodes[i].x - nodes[j].x) * width;
          const dy = (nodes[i].y - nodes[j].y) * height;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * (layout === "page" ? 0.32 : 0.42);
            ctx.strokeStyle = `rgba(140, 220, 230, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * width, nodes[i].y * height);
            ctx.lineTo(nodes[j].x * width, nodes[j].y * height);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const x = n.x * width;
        const y = n.y * height;
        const breath = reduced ? 1 : 0.82 + 0.18 * Math.sin(elapsed * 0.55 + n.phase);
        const core = (layout === "page" ? 0.62 : 0.72) * breath;
        const halo = (layout === "page" ? 0.14 : 0.18) * breath;

        ctx.beginPath();
        ctx.fillStyle = `rgba(46, 242, 208, ${halo})`;
        ctx.arc(x, y, n.r * 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(124, 255, 232, ${core})`;
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduced, layout]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
