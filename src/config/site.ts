export type Role = "farmer" | "keeper" | "vet" | "pharmacy";

/** Site-wide constants. A configured app URL can override local same-origin routes. */
export const site = {
  name: "ZOVETO",
  tagline: "Helping animal owners and vets stay connected.",
  appUrl: import.meta.env.VITE_APP_URL?.trim() ?? "",
} as const;

/** Builds an application link, using local routes unless a separate app URL is configured. */
export const appLink = (path: string): string =>
  site.appUrl ? new URL(path, site.appUrl).toString() : path;

export const loginLink = (): string => appLink("/login");
export const registerLink = (role?: Role): string =>
  appLink(role ? `/register?role=${role}` : "/register");
