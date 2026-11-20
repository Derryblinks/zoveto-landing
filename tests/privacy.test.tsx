import { render, screen, within } from "@testing-library/react";
import { PrivacyPage } from "@/app/privacy-page";
import { privacy, privacySections } from "@/content";
import { THEME_KEY } from "@/lib/theme";

const sources = import.meta.glob("/src/**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const filesMatching = (pattern: RegExp, skip: RegExp = /$^/) =>
  Object.entries(sources)
    .filter(([path, text]) => !skip.test(path) && pattern.test(text))
    .map(([path]) => path);

describe("privacy page", () => {
  it("has one main landmark, one h1 and a skip link", () => {
    render(<PrivacyPage />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1, name: privacy.title })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });

  it("shows every section with a heading", () => {
    render(<PrivacyPage />);
    for (const section of privacySections) {
      expect(screen.getByRole("heading", { level: 2, name: section.heading })).toBeInTheDocument();
    }
  });

  it("says plainly that it is a draft and lists what is still to be confirmed", () => {
    render(<PrivacyPage />);
    expect(privacy.draft).toBe(true);
    expect(screen.getByText(privacy.draftNotice)).toBeInTheDocument();

    const pending = privacySections.flatMap((section) => section.toConfirm ?? []);
    expect(pending.length).toBeGreaterThan(5);
    for (const item of pending) expect(screen.getByText(item)).toBeInTheDocument();
    expect(screen.getAllByText(/to be confirmed before launch/i).length).toBeGreaterThan(0);
  });

  it("sends section links in the footer back to the home page", () => {
    const { container } = render(<PrivacyPage />);
    const footer = container.querySelector("footer") as HTMLElement;
    expect(within(footer).getByRole("link", { name: "Plans" })).toHaveAttribute("href", "/#plans");
    expect(within(footer).getByRole("link", { name: /zoveto home/i })).toHaveAttribute(
      "href",
      "/#top",
    );
  });

  it("keeps search engines away while it is a draft", () => {
    // Read from the page's HTML. The draft flag and the noindex tag must change together.
    const html = import.meta.glob("/privacy/index.html", {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;
    const text = html["/privacy/index.html"] ?? "";
    expect(text.length).toBeGreaterThan(100);
    expect(/name="robots" content="noindex/.test(text)).toBe(privacy.draft);
  });
});

describe("privacy notice stays true", () => {
  // The notice says the website sets no cookies, runs no analytics, makes no requests to other
  // companies, saves only the browser items it names and never saves a password. These tests fail
  // if the code stops being true to that, so the notice has to be updated with the code.
  it("sets no cookies and uses no analytics or tracking", () => {
    expect(filesMatching(/document\.cookie/)).toEqual([]);
    expect(
      filesMatching(
        /gtag|googletagmanager|analytics|plausible|posthog|hotjar|sentry/i,
        /\/content\/privacy\.ts$/,
      ),
    ).toEqual([]);
  });

  it("makes no network requests and loads nothing from other companies", () => {
    expect(filesMatching(/\bfetch\(|XMLHttpRequest|sendBeacon|new WebSocket|EventSource/)).toEqual(
      [],
    );
    // Only the local default for the application address may appear as a web address.
    expect(filesMatching(/https?:\/\/(?!localhost)[a-z0-9]/i)).toEqual([]);
  });

  it("keeps only the browser items the notice names", () => {
    const storage = filesMatching(/localStorage|sessionStorage|indexedDB/).sort();
    expect(storage).toEqual([
      "/src/auth/demo-session.ts",
      "/src/data/demo-workspace.ts",
      "/src/lib/theme.ts",
    ]);

    // Each name the notice gives must be the name the code really uses.
    const wording = privacySections.flatMap((section) => section.paragraphs).join(" ");
    for (const [name, file] of [
      [THEME_KEY, "/src/lib/theme.ts"],
      ["zoveto.demo.workspace.v1", "/src/data/demo-workspace.ts"],
      ["zoveto.demo.session.v1", "/src/auth/demo-session.ts"],
    ] as const) {
      expect(wording).toContain(name);
      expect(sources[file]).toContain(name);
    }
  });

  it("never saves the password the demonstration forms ask for", () => {
    expect(filesMatching(/password/i, /\/(components|content)\//)).toEqual([]);
    const wording = privacySections.flatMap((section) => section.paragraphs).join(" ");
    expect(wording).toMatch(/password is never saved/i);
  });

  it("asks for personal details only in the demonstration forms, and the notice says so", () => {
    expect(filesMatching(/<form\b|<input\b|<textarea\b|<select\b/).sort()).toEqual([
      "/src/components/dashboard/dashboard-shell.tsx",
      "/src/components/pages/auth-page.tsx",
      "/src/components/pages/dashboard-admin-pages.tsx",
      "/src/components/pages/dashboard-page.tsx",
    ]);
    const wording = privacySections.flatMap((section) => section.paragraphs).join(" ");
    expect(wording).toMatch(/do not enter real personal/i);
  });
});
