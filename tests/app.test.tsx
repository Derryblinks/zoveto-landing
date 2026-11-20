import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "@/app/app";
import { loginLink, registerLink } from "@/config/site";
import { audiences, faq, navigation, plans } from "@/content";
import { beforeEach } from "vitest";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  localStorage.clear();
  sessionStorage.clear();
});

describe("landing page", () => {
  it("has one main landmark, a single h1 and a skip link", () => {
    render(<App />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
    expect(
      screen.getByRole("img", { name: /veterinary professional caring for a dog/i }),
    ).toHaveAttribute("src", "/images/veterinary-care.jpg");
    expect(screen.getByText(/some features are still in development/i)).toBeInTheDocument();
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

  it("says in the footer which legal and contact pages are not published yet", () => {
    const { container } = render(<App />);
    const footer = container.querySelector("footer") as HTMLElement;
    // The draft privacy page is linked. No terms or contact address is configured in tests, so
    // those are named as not published and nothing is made up.
    expect(
      within(footer).getByText(/not yet published: terms of use and support contact/i),
    ).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: /privacy notice/i })).toHaveAttribute(
      "href",
      "/privacy/",
    );
    expect(within(footer).queryByRole("link", { name: /terms|contact/i })).toBeNull();
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

  it("creates a local role-specific profile from the registration page", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("link", { name: /create an account/i }));
    await user.type(screen.getByLabelText(/full name/i), "Ama Owusu");
    await user.type(screen.getByLabelText(/email address/i), "ama.owusu@example.test");
    await user.type(screen.getByLabelText(/^password/i), "demo-password");
    await user.selectOptions(screen.getByLabelText(/i am a/i), "farmer");
    await user.click(screen.getByRole("button", { name: /create demo profile/i }));

    expect(await screen.findByRole("heading", { name: /hello, ama/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/dashboard/farmer");
    expect(JSON.parse(localStorage.getItem("zoveto.demo.workspace.v1") ?? "{}").profiles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: "ama.owusu@example.test", role: "farmer" }),
      ]),
    );
  });

  it("opens a sample workspace and persists dashboard changes locally", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginLink = screen.getAllByRole("link", { name: /^log in$/i })[0];
    if (!loginLink) throw new Error("The login link is missing.");
    await user.click(loginLink);
    await user.click(screen.getByRole("button", { name: "Veterinary professional" }));
    expect(await screen.findByRole("heading", { name: /hello, demo/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Appointments" }));
    await user.selectOptions(screen.getByLabelText("Update Ama’s herd appointment"), "Confirmed");

    const workspace = JSON.parse(localStorage.getItem("zoveto.demo.workspace.v1") ?? "{}");
    expect(workspace.appointments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "appointment-2", status: "Confirmed" }),
      ]),
    );
  });

  it("carries a pharmacy enquiry through acceptance and stock updates", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginLinks = screen.getAllByRole("link", { name: /^log in$/i });
    if (!loginLinks[0]) throw new Error("The login link is missing.");
    await user.click(loginLinks[0]);
    await user.click(screen.getByRole("button", { name: "Livestock farmer" }));
    await user.click(await screen.findByRole("link", { name: "Pharmacy products" }));
    const enquiryButtons = screen.getAllByRole("button", { name: "Send enquiry" });
    if (!enquiryButtons[0]) throw new Error("No sample product can be enquired about.");
    await user.click(enquiryButtons[0]);
    await user.click(screen.getByRole("link", { name: "My product enquiries" }));
    expect(await screen.findByText("Enquiry")).toBeInTheDocument();

    const signOutButtons = screen.getAllByRole("button", { name: "Sign out" });
    if (!signOutButtons[0]) throw new Error("The sign-out button is missing.");
    await user.click(signOutButtons[0]);
    const returnLoginLinks = screen.getAllByRole("link", { name: /^log in$/i });
    if (!returnLoginLinks[0]) throw new Error("The login link is missing.");
    await user.click(returnLoginLinks[0]);
    await user.click(screen.getByRole("button", { name: "Veterinary pharmacy" }));
    await user.click(await screen.findByRole("link", { name: "Orders & enquiries" }));

    const farmerOrder = screen.getByRole("row", { name: /demo farmer/i });
    await user.click(within(farmerOrder).getByRole("button", { name: "Accept" }));

    const workspace = JSON.parse(localStorage.getItem("zoveto.demo.workspace.v1") ?? "{}");
    expect(workspace.orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ customer: "demo farmer", status: "Accepted" }),
      ]),
    );
    expect(workspace.products).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "product-1", quantity: 23 })]),
    );
  });

  it("supports local admin review actions in development", async () => {
    const user = userEvent.setup();
    render(<App />);

    const loginLinks = screen.getAllByRole("link", { name: /^log in$/i });
    if (!loginLinks[0]) throw new Error("The login link is missing.");
    await user.click(loginLinks[0]);
    await user.click(screen.getByRole("button", { name: "Admin preview" }));
    expect(await screen.findByRole("heading", { name: /hello, demo/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Verifications" }));
    await user.click(await screen.findByRole("button", { name: "Mark reviewed" }));

    const workspace = JSON.parse(localStorage.getItem("zoveto.demo.workspace.v1") ?? "{}");
    expect(workspace.profiles).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "profile-vet", verified: true })]),
    );
  });
});
