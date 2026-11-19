import { ArrowUp } from "lucide-react";
import { resolveLegal } from "@/config/legal";
import { navigation } from "@/content";
import { reveal } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

const legal = resolveLegal(import.meta.env);

/** "a", "a and b", "a, b and c". */
const toSentenceList = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

export function Footer() {
  return (
    <footer className="bg-deep text-on-deep-muted py-12 text-sm">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.6fr]">
        <div {...reveal(0, 100)}>
          <a href="#top" aria-label="ZOVETO home">
            <Logo />
          </a>
          <p className="mt-3 max-w-[40ch]">
            Connecting animal owners, veterinary professionals and pharmacies across Ghana.
          </p>
        </div>
        <div {...reveal(1, 100)}>
          <nav aria-label="Footer">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-mint inline-block transition duration-200 hover:translate-x-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {legal.links.length > 0 ? (
            <nav aria-label="Legal and contact" className="mt-6">
              <ul className="space-y-2">
                {legal.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-mint underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {legal.missing.length > 0 ? (
            <p className="mt-6 max-w-[34ch]">
              Not yet published: {toSentenceList(legal.missing)}. These will be added before launch.
            </p>
          ) : null}
        </div>
        <p className="max-w-[60ch]" {...reveal(2, 100)}>
          ZOVETO supports professional decisions and does not diagnose or prescribe. It does not
          replace official disease reporting to the relevant authorities.
        </p>
      </Container>
      <Container className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
        <p>© {new Date().getFullYear()} ZOVETO. All rights reserved.</p>
        <a
          href="#top"
          className="group hover:text-mint inline-flex min-h-11 items-center gap-2 transition-colors"
        >
          Back to top
          <ArrowUp
            className="size-4 transition-transform duration-200 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </a>
      </Container>
    </footer>
  );
}
