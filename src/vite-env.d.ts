/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_DEV_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
