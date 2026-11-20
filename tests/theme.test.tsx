import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "@/app/app";
import { THEME_KEY, getTheme, initTheme, setTheme } from "@/lib/theme";

const stubSystem = (dark: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: dark && query.includes("dark"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

const html = document.documentElement;

beforeEach(() => {
  window.localStorage.clear();
  delete html.dataset.theme;
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete (document as { startViewTransition?: unknown }).startViewTransition;
});

describe("theme choice", () => {
  it("follows the system setting when nothing is saved", () => {
    stubSystem(true);
    expect(getTheme()).toBe("dark");
    stubSystem(false);
    expect(getTheme()).toBe("light");
  });

  it("falls back to light when the browser cannot report a preference", () => {
    expect(getTheme()).toBe("light");
  });

  it("prefers the saved choice over the system setting", () => {
    window.localStorage.setItem(THEME_KEY, "light");
    stubSystem(true);
    expect(getTheme()).toBe("light");
  });

  it("ignores a corrupted saved value", () => {
    window.localStorage.setItem(THEME_KEY, "purple");
    stubSystem(true);
    expect(getTheme()).toBe("dark");
  });

  it("applies the theme to the page and remembers it", () => {
    setTheme("dark");
    expect(html.dataset.theme).toBe("dark");
    expect(html.style.colorScheme).toBe("dark");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("dark");
  });

  it("sets the theme at start-up from the saved choice", () => {
    window.localStorage.setItem(THEME_KEY, "dark");
    initTheme();
    expect(html.dataset.theme).toBe("dark");
  });

  it("still switches when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => setTheme("dark")).not.toThrow();
    expect(html.dataset.theme).toBe("dark");
    vi.restoreAllMocks();
  });
});

describe("theme toggle", () => {
  it("switches between light and dark and updates its label", async () => {
    const user = userEvent.setup();
    stubSystem(false);
    render(<App />);

    // One in the header and one in the mobile menu are never both on screen, but the header's is always present.
    const toDark = screen.getAllByRole("button", { name: /switch to dark mode/i })[0]!;
    await user.click(toDark);
    expect(html.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("dark");

    const toLight = screen.getAllByRole("button", { name: /switch to light mode/i })[0]!;
    await user.click(toLight);
    expect(html.dataset.theme).toBe("light");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("light");
  });

  it("switches instantly, with no decorative view transition", async () => {
    const user = userEvent.setup();
    stubSystem(false);
    const start = vi.fn();
    (document as unknown as { startViewTransition: typeof start }).startViewTransition = start;

    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /switch to dark mode/i })[0]!);

    expect(start).not.toHaveBeenCalled();
    expect(html.dataset.theme).toBe("dark");
  });
});
