import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { buttonClasses } from "@/components/ui/button-styles";

/**
 * Guards the writing and design rules agreed for this site, so they cannot quietly regress.
 * The rules: plain words and short sentences, no emoji or hype, no gradient text or borders,
 * no looping motion, no heavy shadows.
 */
const sources = import.meta.glob("/src/**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Vitest turns imported stylesheets into empty strings, so a glob would let every CSS rule pass
// without checking anything. Read the real file from disk instead.
const stylesheet = readFileSync(resolve(process.cwd(), "src/styles/index.css"), "utf8");
sources["/src/styles/index.css"] = stylesheet;

const files = Object.entries(sources);

/** Returns the files whose text matches `pattern`, for a readable failure message. */
const filesMatching = (pattern: RegExp) =>
  files.filter(([, text]) => pattern.test(text)).map(([path]) => path);

describe("writing rules", () => {
  it("finds the source files, including the real stylesheet", () => {
    expect(files.length).toBeGreaterThan(20);
    expect(stylesheet.length).toBeGreaterThan(1000);
  });

  it("uses no em dashes or en dashes", () => {
    expect(filesMatching(/[—–]/)).toEqual([]);
  });

  it("uses no emoji", () => {
    // The copyright sign counts as pictographic, so it is allowed explicitly.
    const withoutCopyright = (text: string) => text.replaceAll("©", "");
    const offenders = files
      .filter(([, text]) => /\p{Extended_Pictographic}/u.test(withoutCopyright(text)))
      .map(([path]) => path);
    expect(offenders).toEqual([]);
  });

  it("avoids hype and empty claims", () => {
    expect(
      filesMatching(
        /\b(powerful|seamless(ly)?|innovative|cutting-edge|revolutionary|game-changing|supercharge[d]?|blazing|bank-grade|built different|second brain|ai-powered|ai magic|waitlist)\b/i,
      ),
    ).toEqual([]);
  });
});

describe("design rules", () => {
  it("keeps outline buttons visible: no variant shares a border colour with the base", () => {
    // Classes are joined without merging, so two border colours on one element are decided by
    // stylesheet order, and `border-transparent` wins over `border-ink/25`.
    for (const variant of [
      "cream",
      "mint",
      "outline-light",
      "primary",
      "outline",
      "dark",
    ] as const) {
      const colours = buttonClasses(variant)
        .split(" ")
        .filter((c) => /^border-(transparent|ink|white|line|accent|deep|cream)(\/|$)/.test(c));
      expect(colours, `${variant} has more than one border colour`).toHaveLength(1);
    }
  });

  it("has no looping, scroll-driven or decorative motion", () => {
    // The product guide asks for no blinking elements and no decorative animation.
    const css = files.filter(([path]) => path.endsWith(".css")).map(([, text]) => text);
    for (const text of css) {
      expect(text).not.toMatch(/\binfinite\b/);
      expect(text).not.toMatch(/animation-timeline|view-transition/);
    }
    expect(filesMatching(/startViewTransition/)).toEqual([]);
    expect(filesMatching(/\banimate-(orbit|float|pulse|spin|bounce|ping)\b/)).toEqual([]);
  });

  it("has no heavy drop shadows anywhere", () => {
    // The product guide asks to avoid heavy shadows. Thin rings and inset edges are fine.
    // Tailwind arbitrary values: shadow-[x_y_blur...]. Stylesheet: box-shadow with a y offset
    // and blur of 10px or more, such as "0 18px 44px".
    expect(filesMatching(/shadow-\[-?\d+px_\d+px_\d+px/)).toEqual([]);
    expect(filesMatching(/box-shadow:[^;]*?\s-?\d+px\s+\d{2,}px\s+-?\d*px?/)).toEqual([]);
    expect(filesMatching(/\bshadow-(md|lg|xl|2xl)\b/)).toEqual([]);
  });

  it("has no gradient text", () => {
    expect(filesMatching(/bg-clip-text|text-gradient|background-clip:\s*text/)).toEqual([]);
  });

  it("has no gradient borders", () => {
    // Gradient borders are built with border-image or by masking a gradient down to a ring.
    // (The donut chart uses a conic gradient as data, which is fine; the stylesheet never should.)
    expect(filesMatching(/border-image|mask-composite/)).toEqual([]);
    const css = files.filter(([path]) => path.endsWith(".css"));
    expect(css.filter(([, text]) => /conic-gradient/.test(text))).toEqual([]);
  });
});
