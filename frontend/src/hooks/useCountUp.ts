import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type UseCountUpOptions = {
  /** Final integer to reach. */
  to: number;
  /** Animation length in ms. */
  duration?: number;
  /** Delay before starting, in ms. */
  delay?: number;
  /** When false, stay at 0 until true (e.g. after mount). Default true. */
  enabled?: boolean;
};

/**
 * Ease-out count from 0 → `to`. Respects prefers-reduced-motion (jumps to end).
 */
export function useCountUp({
  to,
  duration = 1400,
  delay = 0,
  enabled = true,
}: UseCountUpOptions): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    if (reduced || to <= 0) {
      setValue(to);
      return;
    }

    let frame = 0;
    let startAt = 0;
    let delayTimer = 0;

    const tick = (now: number) => {
      if (!startAt) startAt = now;
      const t = Math.min(1, (now - startAt) / duration);
      // Ease-out cubic
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * to));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    delayTimer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay, enabled, reduced]);

  return value;
}
