import { navigation } from "@/content";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="bg-deep text-on-deep-muted py-12 text-sm">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.6fr]">
        <div>
          <a href="#top" aria-label="ZOVETO home">
            <Logo />
          </a>
          <p className="mt-3 max-w-[40ch]">
            Connecting animal owners, veterinary professionals and pharmacies across Ghana.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-lime">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="max-w-[60ch]">
          ZOVETO supports professional decisions and does not diagnose or prescribe. It does not
          replace official disease reporting to the relevant authorities.
        </p>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6">
        <p>© {new Date().getFullYear()} ZOVETO. All rights reserved.</p>
      </Container>
    </footer>
  );
}
