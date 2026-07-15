import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite abrir pelo celular na mesma rede Wi-Fi
    port: 5173,
  },
});
