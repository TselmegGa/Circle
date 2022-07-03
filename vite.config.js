import { fileURLToPath, URL } from "url";
import fs from 'fs';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [ mkcert(), vue() ],
  https: {
    key: fs.readFileSync('certificate/test/localhost.key'),
    cert: fs.readFileSync('certificate/test/localhost.crt'),
    ca: fs.readFileSync('certificate/test/RootCA.crt')
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      
    },
  },
});
