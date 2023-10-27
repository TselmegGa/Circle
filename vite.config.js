import { fileURLToPath, URL } from "url";
import fs from 'fs';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
        key: fs.readFileSync('certificate/test/localhost.key'),
        cert: fs.readFileSync('certificate/test/localhost.crt'),
        ca: fs.readFileSync('certificate/test/RootCA.crt')
    } 
  },
  plugins: [ vue() ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['crypto'] // <= The libraries that need shimming should be excluded from dependency optimization.
  }
});
