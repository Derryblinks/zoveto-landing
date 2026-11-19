export interface LegalEnv {
  VITE_PRIVACY_URL?: string;
  VITE_TERMS_URL?: string;
  VITE_SUPPORT_EMAIL?: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface Legal {
  /** Links that are configured and safe to show. */
  links: LegalLink[];
  /** Names of the ones that are not published yet, in plain words. */
  missing: string[];
}

/** Only web addresses and site paths. Rejects `javascript:`, `data:` and protocol-relative `//` links. */
const cleanUrl = (value?: string): string | undefined => {
  const url = value?.trim();
  if (!url || url.startsWith("//")) return undefined;
  return /^(https?:\/\/|\/)/i.test(url) ? url : undefined;
};

const cleanEmail = (value?: string): string | undefined => {
  const email = value?.trim();
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
};

/**
 * The privacy notice, terms and support contact are launch decisions for the ZOVETO team, so
 * none is invented here. Each one is set through the environment. Until it is, the footer says
 * it is not published yet instead of linking to a page that does not exist.
 */
export function resolveLegal(env: LegalEnv): Legal {
  const privacy = cleanUrl(env.VITE_PRIVACY_URL);
  const terms = cleanUrl(env.VITE_TERMS_URL);
  const email = cleanEmail(env.VITE_SUPPORT_EMAIL);

  const links: LegalLink[] = [];
  const missing: string[] = [];

  if (privacy) links.push({ label: "Privacy notice", href: privacy });
  else missing.push("privacy notice");

  if (terms) links.push({ label: "Terms of use", href: terms });
  else missing.push("terms of use");

  if (email) links.push({ label: "Contact support", href: `mailto:${email}` });
  else missing.push("support contact");

  return { links, missing };
}
