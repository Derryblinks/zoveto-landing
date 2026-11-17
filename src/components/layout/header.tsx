import { Menu, X } from "lucide-react";
import { loginLink, registerLink } from "@/config/site";
import { navigation } from "@/content";
import { useDisclosure } from "@/hooks/use-disclosure";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const menu = useDisclosure();

  return (
    <header className="bg-deep sticky top-0 z-50">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <a href="#top" aria-label="ZOVETO home" onClick={menu.close}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-on-deep hover:text-lime text-[15px] font-medium transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ButtonLink
            href={loginLink()}
            variant="outline-light"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Log in
          </ButtonLink>
          <ButtonLink href={registerLink()} variant="lime" size="sm">
            Create account
          </ButtonLink>
          <button
            type="button"
            onClick={menu.toggle}
            aria-expanded={menu.open}
            aria-controls="mobile-menu"
            aria-label={menu.open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
          >
            {menu.open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {menu.open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="bg-deep border-t border-white/10 md:hidden"
        >
          <ul className="mx-auto max-w-[1160px] px-6 py-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={menu.close}
                  className="text-on-deep hover:text-lime flex min-h-12 items-center text-base font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={loginLink()}
                className="text-on-deep hover:text-lime flex min-h-12 items-center text-base font-medium"
              >
                Log in
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
