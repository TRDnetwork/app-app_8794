/* a11y fix: Security + type safety for environment variables */
/* Ensures required server-side env vars are present and typed */
export function validateEnv() {
  const required = ['RESEND_API_KEY'] as const;
  type EnvKey = (typeof required)[number];
  const env: Record<EnvKey, string> = {} as any;

  for (const key of required) {
    // For serverless functions, use process.env instead of import.meta.env
    const value = process.env[key];
    if (!value) {
      console.error(`Missing environment variable: ${key}`);
      throw new Error(`Missing environment variable: ${key}`);
    }
    env[key] = value;
  }

  return env;
}