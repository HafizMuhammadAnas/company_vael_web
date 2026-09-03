import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Auto-cycles an index until the user locks interaction. */
export function useCycledIndex(length: number, intervalMs: number, locked: boolean) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || locked || length < 2) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % length), intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, locked, length, intervalMs]);

  return [active, setActive] as const;
}
