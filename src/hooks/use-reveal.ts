import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Fades elements marked with `data-reveal` into view as they scroll on screen.
 * Content stays fully visible when IntersectionObserver is missing or motion is reduced, because
 * the hidden state in CSS only applies once this hook has added the `reveal-ready` class.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) return;

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    root.classList.add("reveal-ready");
    document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
