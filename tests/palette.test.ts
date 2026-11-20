import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The palette comes from the ZOVETO product guide (deep green, teal, grey) and the guide asks for
 * a restrained look and readable contrast. These tests keep the page on that palette and keep
 * every text and background pair readable in both themes.
 */
const sources = import.meta.glob("/src/**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Vitest turns imported stylesheets into empty strings, so read the real file from disk.
const css = readFileSync(resolve(process.cwd(), "src/styles/index.css"), "utf8");
sources["/src/styles/index.css"] = css;

const channel = (value: number) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) => {
  const n = Number.parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
  );
};
/** WCAG contrast ratio between two #rrggbb colours. */
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

const block = (pattern: RegExp) => css.match(pattern)?.[1] ?? "";
const light = block(/:root\s*\{([^}]*)\}/);
const dark = block(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/);
const theme = block(/@theme inline\s*\{([^}]*)\}/);

const token = (scope: string, name: string): string => {
  const value = scope.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  if (!value) throw new Error(`Token --${name} not found as a hex colour`);
  return value.toLowerCase();
};

describe("palette", () => {
  it("is built on the three colours in the product guide", () => {
    expect(token(theme, "color-deep")).toBe("#123b35");
    expect(token(light, "accent")).toBe("#167c6a");
    expect(token(light, "muted")).toBe("#646e73");
  });

  it("brings back none of the bright accents the guide's restrained palette rules out", () => {
    const banned = /#b6f23b|#c8f65c|#eaf8d2|#f0a21b|#245c36|#5fd28a/i;
    const offenders = Object.entries(sources)
      .filter(([, text]) => banned.test(text))
      .map(([path]) => path);
    expect(offenders).toEqual([]);
  });
});

describe("contrast", () => {
  const AA_TEXT = 4.5;
  const AA_UI = 3;

  const lightPairs: [string, string, string][] = [
    ["ink on page", token(light, "ink"), token(light, "bg")],
    ["body text on page", token(light, "body"), token(light, "bg")],
    ["muted text on page", token(light, "muted"), token(light, "bg")],
    ["muted text on surface", token(light, "muted"), token(light, "surface")],
    ["accent text on page", token(light, "accent"), token(light, "bg")],
    ["accent text on surface", token(light, "accent"), token(light, "surface")],
    ["white on accent button", "#ffffff", token(light, "accent")],
  ];
  const darkPairs: [string, string, string][] = [
    ["ink on page", token(dark, "ink"), token(dark, "bg")],
    ["body text on card", token(dark, "body"), token(dark, "card")],
    ["muted text on page", token(dark, "muted"), token(dark, "bg")],
    ["muted text on card", token(dark, "muted"), token(dark, "card")],
    ["accent text on page", token(dark, "accent"), token(dark, "bg")],
    ["accent text on card", token(dark, "accent"), token(dark, "card")],
    ["deep text on accent button", token(theme, "color-deep"), token(dark, "accent")],
  ];
  const deepPairs: [string, string, string][] = [
    ["white on deep", "#ffffff", token(theme, "color-deep")],
    ["body text on deep", token(theme, "color-on-deep"), token(theme, "color-deep")],
    ["muted text on deep", token(theme, "color-on-deep-muted"), token(theme, "color-deep")],
    ["mint on deep", token(theme, "color-mint"), token(theme, "color-deep")],
    ["deep text on mint button", token(theme, "color-deep"), token(theme, "color-mint")],
    ["waiting colour on deep", token(theme, "color-waiting"), token(theme, "color-deep")],
    ["mint on lighter deep", token(theme, "color-mint"), token(theme, "color-deep-2")],
  ];
  const appPairs: [string, string, string][] = [
    ["app ink on white", token(theme, "color-app-ink"), "#ffffff"],
    ["app body on white", token(theme, "color-app-body"), "#ffffff"],
    ["app muted on white", token(theme, "color-app-muted"), "#ffffff"],
    ["app muted on app background", token(theme, "color-app-muted"), token(theme, "color-app-bg")],
    ["app brand on white", token(theme, "color-app-brand"), "#ffffff"],
  ];

  for (const [group, pairs] of Object.entries({
    "light theme": lightPairs,
    "dark theme": darkPairs,
    "deep green panels": deepPairs,
    "product illustrations": appPairs,
  })) {
    it(`keeps text readable in the ${group}`, () => {
      for (const [name, fg, bg] of pairs) {
        expect(contrast(fg, bg), `${name}: ${fg} on ${bg}`).toBeGreaterThanOrEqual(AA_TEXT);
      }
    });
  }

  it("keeps every status tag readable", () => {
    const statusSource = sources["/src/components/dashboard/dashboard-status-badge.tsx"] ?? "";
    const pairs = [...statusSource.matchAll(/bg-\[(#[0-9a-f]{6})\] text-\[(#[0-9a-f]{6})\]/gi)];
    expect(pairs.length).toBeGreaterThanOrEqual(2);
    for (const [, bg, fg] of pairs) {
      expect(contrast(fg!, bg!), `${fg} on ${bg}`).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it("keeps the focus ring visible on every surface it appears on", () => {
    expect(contrast(token(light, "accent"), token(light, "bg"))).toBeGreaterThanOrEqual(AA_UI);
    expect(contrast(token(light, "accent"), token(light, "surface"))).toBeGreaterThanOrEqual(AA_UI);
    expect(contrast(token(dark, "accent"), token(dark, "bg"))).toBeGreaterThanOrEqual(AA_UI);
    expect(contrast(token(theme, "color-mint"), token(theme, "color-deep"))).toBeGreaterThanOrEqual(
      AA_UI,
    );
  });
});
