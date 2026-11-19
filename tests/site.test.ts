import { appLink, loginLink, registerLink, site } from "@/config/site";

describe("site links", () => {
  it("uses same-origin routes unless a separate application URL is configured", () => {
    expect(appLink("/x")).toBe(site.appUrl ? new URL("/x", site.appUrl).toString() : "/x");
    expect(loginLink()).toMatch(/\/login$/);
    expect(registerLink("farmer")).toMatch(/\/register\?role=farmer$/);
    expect(registerLink()).toMatch(/\/register$/);
  });
});
