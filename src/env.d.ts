/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_TOKEN: string
    readonly VITE_API_URL: string
    readonly PORT: string
    readonly MODE: string
    readonly DEV: boolean
    readonly PROD: boolean
    readonly BASE_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }