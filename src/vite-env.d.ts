/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the ZOVETO web application, used by every sign-in and sign-up link. */
  readonly VITE_APP_URL?: string;
  /** Address of the privacy notice. Leave empty until one is published. */
  readonly VITE_PRIVACY_URL?: string;
  /** Address of the terms of use. Leave empty until they are published. */
  readonly VITE_TERMS_URL?: string;
  /** Support email address. Leave empty until a support contact is confirmed. */
  readonly VITE_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
