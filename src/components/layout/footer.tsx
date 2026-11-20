import { navigation } from "@/content";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { resolveLegal } from "@/config/legal";

const legal = resolveLegal(import.meta.env);

const toSentenceList = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

/**
 * `homePath` is put in front of the section links, so pages other than the home page can send
 * visitors back to a section (for example "/" turns "#plans" into "/#plans").
 */
export function Footer({ homePath = "" }: { homePath?: string }) {
  return (
    <footer className="bg-deep text-on-deep-muted py-12 text-sm">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.6fr]">
        <div>
          <a href={`${homePath}#top`} aria-label="ZOVETO home">
            <Logo inverse />
          </a>
          <p className="mt-3 max-w-[40ch]">
            ZOVETO is being developed for animal owners, veterinary professionals and pharmacies in
            Ghana.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={`${homePath}${item.href}`} className="hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {legal.links.length > 0 ? (
            <ul aria-label="Legal and contact" className="mt-5 space-y-2">
              {legal.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-cream underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          {legal.missing.length > 0 ? (
            <p className="mt-5 max-w-[34ch]">
              Not yet published: {toSentenceList(legal.missing)}. These will be added before launch.
            </p>
          ) : null}
        </nav>
        <p className="max-w-[60ch]">
          Features on this page are still in development and may not be available yet. ZOVETO is
          intended to support record-keeping and connections, not diagnose or prescribe. It does not
          replace official disease reporting.
        </p>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6">
        <p>© {new Date().getFullYear()} ZOVETO. All rights reserved.</p>
      </Container>
    </footer>
  );
}
