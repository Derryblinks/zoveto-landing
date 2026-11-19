import type { CSSProperties } from "react";

/** Sets the `--d` custom property that CSS entrance animations use as their delay. */
export const delay = (ms: number): CSSProperties => ({ "--d": `${ms}ms` }) as CSSProperties;

/** How an element arrives: "" rises, "left" and "right" slide in from the side, "scale" grows in. */
export type RevealVariant = "" | "left" | "right" | "scale";

/**
 * Spread onto an element to fade it in when it scrolls into view (see `useReveal`).
 * Pass the element's index to stagger siblings. Do not use on elements that are hidden by CSS
 * at some screen sizes, because a hidden element never scrolls into view.
 */
export const reveal = (index = 0, step = 90, variant: RevealVariant = "") => ({
  "data-reveal": variant,
  style: delay(index * step),
});

/** Sets the `--i` custom property used to stagger children (rows in a panel, items in a menu). */
export const order = (index: number): CSSProperties => ({ "--i": index }) as CSSProperties;
