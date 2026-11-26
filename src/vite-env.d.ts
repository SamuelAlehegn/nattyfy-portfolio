/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_FORMSPREE_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
