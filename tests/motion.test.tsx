import { act, render, screen, within } from "@testing-library/react";
import { App } from "@/app/app";
import { reveal } from "@/lib/reveal";

/** A controllable stand-in for IntersectionObserver, which jsdom does not provide. */
class FakeObserver {
  static instances: FakeObserver[] = [];
  targets = new Set<Element>();

  constructor(public callback: IntersectionObserverCallback) {
    FakeObserver.instances.push(this);
  }
  observe(el: Element) {
    this.targets.add(el);
  }
  unobserve(el: Element) {
    this.targets.delete(el);
  }
  disconnect() {
    this.targets.clear();
  }
  takeRecords() {
    return [];
  }
  /** Reports every observed element as on screen. */
  showAll() {
    const entries = [...this.targets].map(
      (target) =>
        ({ target, isIntersecting: true, intersectionRatio: 1 }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

const stubMotion = (reduced: boolean) => {
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduced ? query.includes("reduce") : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  FakeObserver.instances = [];
});

describe("scroll reveal", () => {
  it("builds the attributes that mark an element and stagger its delay", () => {
    const attrs = reveal(2, 90);
    expect(attrs["data-reveal"]).toBe("");
    expect((attrs.style as Record<string, string>)["--d"]).toBe("180ms");
  });

  it("leaves every section visible when IntersectionObserver is unavailable", () => {
    render(<App />);
    expect(document.documentElement).not.toHaveClass("reveal-ready");
  });

  it("hides then reveals marked elements, and cleans up after itself", () => {
    stubMotion(false);
    const { unmount } = render(<App />);
    expect(document.documentElement).toHaveClass("reveal-ready");

    const marked = document.querySelectorAll("[data-reveal]");
    expect(marked.length).toBeGreaterThan(10);
    expect(document.querySelectorAll("[data-in]")).toHaveLength(0);

    act(() => FakeObserver.instances.forEach((observer) => observer.showAll()));
    for (const el of marked) expect(el).toHaveAttribute("data-in");

    unmount();
    expect(document.documentElement).not.toHaveClass("reveal-ready");
  });

  it("never hides content when the visitor prefers reduced motion", () => {
    stubMotion(true);
    render(<App />);
    expect(document.documentElement).not.toHaveClass("reveal-ready");
  });
});

describe("header", () => {
  it("hides the Log in button on phones with a class that beats inline-flex", () => {
    const { container } = render(<App />);
    // The site header is the first <header>; section headings use <header> too.
    const siteHeader = container.querySelector("header") as HTMLElement;
    const login = within(siteHeader).getByRole("link", { name: /^log in$/i });
    // A plain `hidden` loses to the button's `inline-flex`, which is what the old header did.
    expect(login).toHaveClass("max-sm:hidden");
    expect(login).not.toHaveClass("hidden");
  });

  it("marks the navigation link of the section being read", () => {
    stubMotion(false);
    render(<App />);
    const faqSection = document.getElementById("faq") as HTMLElement;
    const spy = FakeObserver.instances.find((observer) => observer.targets.has(faqSection));
    expect(spy).toBeDefined();

    act(() =>
      spy!.callback(
        [{ target: faqSection, isIntersecting: true } as unknown as IntersectionObserverEntry],
        spy as unknown as IntersectionObserver,
      ),
    );

    const mainNav = screen.getByRole("navigation", { name: /^main$/i });
    expect(within(mainNav).getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(within(mainNav).getByRole("link", { name: "Plans" })).not.toHaveAttribute(
      "aria-current",
    );

    // The highlight pill is switched on and told where to slide to.
    const list = mainNav.querySelector("ul") as HTMLElement;
    expect(list.style.getPropertyValue("--pill-o")).toBe("1");
    expect(list.style.getPropertyValue("--pill-w")).not.toBe("");
  });
});
