import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { AppLink } from "@/components/ui/app-link";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonLinkProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <AppLink className={buttonClasses(variant, size, className)} {...props} />;
}
