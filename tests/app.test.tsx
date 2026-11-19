import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "@/app/app";
import { loginLink, registerLink } from "@/config/site";
import { audiences, faq, features, navigation, plans, toolColumns } from "@/content";

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

  it("does not promise pharmacies free registration while their fees are undecided", () => {
    const { container } = render(<App />);
    expect(container.textContent).not.toMatch(/free (to join )?for every role/i);
    expect(container.textContent).not.toMatch(/owners and pharmacies/i);
  });

  it("names no payment method while the payment provider is undecided", () => {
    const { container } = render(<App />);
    expect(container.textContent).not.toMatch(
      /mobile money|momo|mtn|telecel|airteltigo|visa|mastercard/i,
    );
  });

  it("marks every feature and field tool that is not available yet as planned", () => {
    const { container } = render(<App />);
    const planned = [...features, ...toolColumns].filter((item) => item.planned);
    // Pharmacy marketplace, finance, records, reminders and all three field tools are planned.
    expect(planned.length).toBeGreaterThanOrEqual(7);
    expect(within(container).getAllByText("Planned")).toHaveLength(planned.length);
  });

  it("labels every product preview as sample entries", () => {
    const { container } = render(<App />);
    // One preview in each audience card, plus the main feature preview.
    expect(within(container).getAllByText("Sample entries")).toHaveLength(audiences.length + 1);
    // The hero dashboard says so both inside the illustration and in the caption under it.
    expect(within(container).getByText(/sample data, not real records/i)).toBeInTheDocument();
    expect(within(container).getByText(/illustration with sample entries/i)).toBeInTheDocument();
  });

  it("says in the footer which legal and contact pages are not published yet", () => {
    const { container } = render(<App />);
    const footer = container.querySelector("footer") as HTMLElement;
    // No address is configured in tests, so nothing is linked and nothing is made up.
    expect(
      within(footer).getByText(
        /not yet published: privacy notice, terms of use and support contact/i,
      ),
    ).toBeInTheDocument();
    expect(within(footer).queryByRole("link", { name: /privacy|terms|contact/i })).toBeNull();
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
