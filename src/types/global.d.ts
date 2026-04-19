/* a11y fix: Type safety for environment variables */
interface ImportMetaEnv {
  readonly VITE_RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}