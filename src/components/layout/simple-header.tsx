import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/** A plain header for inner pages: the logo, the theme switch and a way back to the home page. */
export function SimpleHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass-bar pointer-events-auto mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-2 rounded-full pr-2 pl-4 sm:gap-4 sm:pl-5">
        <a href="/" aria-label="ZOVETO home">
          <Logo />
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/" variant="outline-light" size="sm">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
