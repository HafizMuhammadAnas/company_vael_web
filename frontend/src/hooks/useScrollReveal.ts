import { useEffect } from "react";

/**
 * Adds the `visible` class to every `.reveal` element as it scrolls into view,
 * mirroring the IntersectionObserver behavior from the wireframe.
 * Re-runs whenever `deps` change (e.g. after async content renders).
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.visible)");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            window.setTimeout(() => el.classList.add("visible"), i * 80);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
