import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    legalComments: 'none',
  },
  server: {
    strictPort: true,
    hmr: {
      clientPort: 443, // Ensures it works over HTTPS if needed
    }
  }
});
