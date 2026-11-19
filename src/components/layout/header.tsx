import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { loginLink, registerLink } from "@/config/site";
import { navigation } from "@/content";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { order } from "@/lib/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const SECTION_IDS = navigation.map((item) => item.href.slice(1));

export function Header() {
  const menu = useDisclosure();
  const active = useScrollSpy(SECTION_IDS);
  const list = useRef<HTMLUListElement>(null);

  // Slides the highlight pill under the link of the section being read.
  useEffect(() => {
    const el = list.current;
    if (!el) return;

    const place = () => {
      // Measure the <li> (positioned inside the list), not the link inside it.
      const item = active ? el.querySelector(`a[href="#${active}"]`)?.parentElement : null;
      if (!item) {
        el.style.setProperty("--pill-o", "0");
        return;
      }
      el.style.setProperty("--pill-x", `${item.offsetLeft}px`);
      el.style.setProperty("--pill-w", `${item.offsetWidth}px`);
      el.style.setProperty("--pill-o", "1");
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass-bar pointer-events-auto mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-2 rounded-full pr-2 pl-4 sm:gap-4 sm:pl-5">
        <a href="#top" aria-label="ZOVETO home" onClick={menu.close}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul ref={list} className="relative flex gap-1">
            <li aria-hidden="true" className="nav-pill" />
            {navigation.map((item) => (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? "location" : undefined}
                  className="text-on-deep hover:text-mint aria-[current=location]:text-mint block rounded-full px-4 py-2 text-[15px] font-medium transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="max-sm:hidden" />
          {/* `max-sm:hidden`, not `hidden`: button classes set `inline-flex`, which would win over a plain `hidden`. */}
          <ButtonLink
            href={loginLink()}
            variant="outline-light"
            size="sm"
            className="max-sm:hidden"
          >
            Log in
          </ButtonLink>
          <ButtonLink
            href={registerLink()}
            variant="mint"
            size="sm"
            className="max-sm:px-4 max-sm:text-[13px]"
          >
            Create account
          </ButtonLink>
          <button
            type="button"
            onClick={menu.toggle}
            aria-expanded={menu.open}
            aria-controls="mobile-menu"
            aria-label={menu.open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {menu.open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menu.open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="menu-in glass-bar pointer-events-auto mx-auto mt-2 max-w-[1160px] rounded-3xl p-3 md:hidden"
        >
          <ul>
            {navigation.map((item, index) => (
              <li key={item.href} style={order(index)}>
                <a
                  href={item.href}
                  onClick={menu.close}
                  aria-current={active === item.href.slice(1) ? "location" : undefined}
                  className="text-on-deep hover:text-mint aria-[current=location]:text-mint flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition-colors aria-[current=location]:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden" style={order(navigation.length)}>
              <a
                href={loginLink()}
                className="text-on-deep hover:text-mint flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition-colors"
              >
                Log in
              </a>
            </li>
            <li
              className="flex items-center justify-between px-4 pt-2 sm:hidden"
              style={order(navigation.length + 1)}
            >
              <span className="text-on-deep text-base font-medium">Appearance</span>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
