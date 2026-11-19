/** Media-query helpers. They are safe to call where `matchMedia` does not exist (tests, old browsers). */
const matches = (query: string): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(query).matches;

/** True when the visitor has asked their system to reduce motion. */
export const prefersReducedMotion = (): boolean => matches("(prefers-reduced-motion: reduce)");

/** True on devices with a real hovering pointer (mouse, trackpad), not on touch screens. */
export const canHover = (): boolean => matches("(hover: hover) and (pointer: fine)");
