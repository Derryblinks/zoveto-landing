export type Role = "farmer" | "keeper" | "vet" | "pharmacy";

const DEFAULT_APP_URL = "http://localhost:3000";

/** Site-wide constants. The app URL is the only value that changes between environments. */
export const site = {
  name: "ZOVETO",
  tagline: "Veterinary care, connected across Ghana.",
  appUrl: import.meta.env.VITE_APP_URL?.trim() || DEFAULT_APP_URL,
} as const;

/** Builds an absolute link into the ZOVETO web application. */
export const appLink = (path: string): string => new URL(path, site.appUrl).toString();

export const loginLink = (): string => appLink("/login");
export const registerLink = (role?: Role): string =>
  appLink(role ? `/register?role=${role}` : "/register");
