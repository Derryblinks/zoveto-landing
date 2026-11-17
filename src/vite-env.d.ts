/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the ZOVETO web application, used by every sign-in and sign-up link. */
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
