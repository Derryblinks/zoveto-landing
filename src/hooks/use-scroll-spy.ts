import { useEffect, useState } from "react";

/**
 * Returns the id of the section the visitor is currently reading, so navigation can highlight it.
 * Pass a stable array (define it outside the component). Returns null before any section is reached.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActive(ids.find((id) => inBand.has(id)) ?? null);
      },
      // A thin band just above the middle of the screen decides which section is "current".
      { rootMargin: "-35% 0px -55% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
