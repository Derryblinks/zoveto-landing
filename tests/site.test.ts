import { appLink, loginLink, registerLink, site } from "@/config/site";

describe("site links", () => {
  it("builds absolute links from the configured application URL", () => {
    expect(appLink("/x")).toBe(new URL("/x", site.appUrl).toString());
    expect(loginLink()).toMatch(/\/login$/);
    expect(registerLink("farmer")).toMatch(/\/register\?role=farmer$/);
    expect(registerLink()).toMatch(/\/register$/);
  });
});
