import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { loginLink, registerLink } from "@/config/site";
import { navigation } from "@/content";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const SECTION_IDS = navigation.map((item) => item.href.slice(1));

export function Header() {
  const menu = useDisclosure();
  const active = useScrollSpy(SECTION_IDS);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element) return;

    const placePill = () => {
      const item = active ? element.querySelector(`a[href="#${active}"]`)?.parentElement : null;
      if (!item) {
        element.style.setProperty("--pill-o", "0");
        return;
      }
      element.style.setProperty("--pill-x", `${item.offsetLeft}px`);
      element.style.setProperty("--pill-w", `${item.offsetWidth}px`);
      element.style.setProperty("--pill-o", "1");
    };

    placePill();
    window.addEventListener("resize", placePill);
    return () => window.removeEventListener("resize", placePill);
  }, [active]);

  return (
    <header className="bg-bg/95 border-line sticky top-0 z-50 border-b">
      <Container className="flex h-[72px] items-center justify-between gap-3">
        <a href="#top" aria-label="ZOVETO home" onClick={menu.close}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul ref={list} className="relative flex gap-2">
            <li aria-hidden="true" className="nav-pill" />
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? "location" : undefined}
                  className="text-body hover:text-forest aria-[current=location]:text-forest relative block rounded-full px-3 py-2 text-[15px] font-medium transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle className="max-sm:hidden" />
          <ButtonLink href={loginLink()} variant="outline" size="sm" className="max-sm:hidden">
            Log in
          </ButtonLink>
          <ButtonLink href={registerLink()} variant="primary" size="sm">
            Create account
          </ButtonLink>
          <button
            type="button"
            onClick={menu.toggle}
            aria-expanded={menu.open}
            aria-controls="mobile-menu"
            aria-label={menu.open ? "Close menu" : "Open menu"}
            className="text-ink hover:bg-surface grid size-11 place-items-center rounded-full md:hidden"
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
        <nav id="mobile-menu" aria-label="Mobile" className="bg-bg border-line border-t md:hidden">
          <ul className="mx-auto max-w-[1160px] px-6 py-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={menu.close}
                  aria-current={active === item.href.slice(1) ? "location" : undefined}
                  className="text-body hover:text-forest flex min-h-12 items-center text-base font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={loginLink()}
                className="text-body hover:text-forest flex min-h-12 items-center text-base font-medium"
              >
                Log in
              </a>
            </li>
            <li className="border-line flex items-center justify-between border-t py-2 sm:hidden">
              <span className="text-body text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
