import { PRIVACY_PAGE_PATH, resolveLegal } from "@/config/legal";

describe("footer legal links", () => {
  it("lists every link that is configured", () => {
    const { links, missing } = resolveLegal({
      VITE_PRIVACY_URL: "https://zoveto.example/privacy",
      VITE_TERMS_URL: "/terms",
      VITE_SUPPORT_EMAIL: "help@zoveto.example",
    });
    expect(links).toEqual([
      { label: "Privacy notice", href: "https://zoveto.example/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Contact support", href: "mailto:help@zoveto.example" },
    ]);
    expect(missing).toEqual([]);
  });

  it("names what is not published instead of inventing it", () => {
    // The draft privacy notice ships with the site, so it is linked by default.
    expect(resolveLegal({})).toEqual({
      links: [{ label: "Privacy notice", href: PRIVACY_PAGE_PATH }],
      missing: ["terms of use", "support contact"],
    });
    expect(resolveLegal({ VITE_TERMS_URL: "  ", VITE_SUPPORT_EMAIL: "" }).missing).toContain(
      "terms of use",
    );
  });

  it("keeps the links that are set and reports only the rest", () => {
    const { links, missing } = resolveLegal({ VITE_PRIVACY_URL: "https://zoveto.example/p" });
    expect(links).toHaveLength(1);
    expect(missing).toEqual(["terms of use", "support contact"]);
  });

  it("refuses links that are not plain web addresses, paths or email addresses", () => {
    const { links, missing } = resolveLegal({
      VITE_PRIVACY_URL: "javascript:alert(1)",
      VITE_TERMS_URL: "//evil.example/terms",
      VITE_SUPPORT_EMAIL: "not an email",
    });
    // A rejected privacy address falls back to the built-in page, never to the unsafe value.
    expect(links).toEqual([{ label: "Privacy notice", href: PRIVACY_PAGE_PATH }]);
    expect(missing).toEqual(["terms of use", "support contact"]);
  });
});
