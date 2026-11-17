import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "@/app/app";
import { loginLink, registerLink } from "@/config/site";
import { audiences, faq, navigation, plans } from "@/content";

describe("landing page", () => {
  it("has one main landmark, a single h1 and a skip link", () => {
    render(<App />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });

  it("points every navigation link at a section that exists", () => {
    const { container } = render(<App />);
    for (const item of navigation) {
      expect(container.querySelector(item.href), `missing section for ${item.href}`).not.toBeNull();
    }
  });

  it("links every sign-up and sign-in button into the application", () => {
    render(<App />);
    expect(
      screen
        .getAllByRole("link", { name: /^log in$/i })
        .every((a) => a.getAttribute("href") === loginLink()),
    ).toBe(true);
    for (const audience of audiences) {
      const links = screen.getAllByRole("link", { name: new RegExp(audience.cta, "i") });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) expect(link).toHaveAttribute("href", registerLink(audience.role));
    }
  });

  it("renders every plan and every question", () => {
    render(<App />);
    for (const plan of plans)
      expect(screen.getByRole("heading", { name: plan.name })).toBeInTheDocument();
    for (const entry of faq) expect(screen.getByText(entry.question)).toBeInTheDocument();
  });

  it("never mentions prices it has not been given", () => {
    const { container } = render(<App />);
    expect(container.textContent).not.toMatch(/GH₵|GHS|\$\s?\d/);
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();

    await user.click(toggle);
    const menu = screen.getByRole("navigation", { name: /mobile/i });
    expect(within(menu).getAllByRole("link").length).toBeGreaterThanOrEqual(navigation.length);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull();
  });
});
