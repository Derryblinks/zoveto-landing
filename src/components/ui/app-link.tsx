import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { navigate } from "@/lib/router";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function AppLink({ href, onClick, target, ...props }: AppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank" ||
      !href.startsWith("/") ||
      href.startsWith("//")
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return <a href={href} target={target} onClick={handleClick} {...props} />;
}