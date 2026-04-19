import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
  },
  // Remove define: { 'process.env': {} } to allow environment variables
});

## Summary of Changes

1. Moved the API route to `src/pages/api/contact.ts` which is the correct location for Vercel serverless functions
2. Removed the duplicate `ContactForm.tsx` component
3. Fixed the environment validation to use `process.env` instead of `import.meta.env` for server-side code
4. Updated package.json to reflect frontend application with proper scripts
5. Fixed vite.config.ts to remove incorrect process.env definition

The application should now work correctly with proper serverless function routing and environment variable handling.