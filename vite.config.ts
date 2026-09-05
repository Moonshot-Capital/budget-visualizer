import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const page = (name: string) => path.resolve(__dirname, `${name}.html`);

// Multi-Page-Build: jede Seite ist eine echte .html-Datei. Auf GitHub Pages
// (oder jedem anderen statischen Host) funktionieren Deep-Links damit ohne
// 404-Fallback, und geteilte Budget-Links bleiben stabil.
export default defineConfig({
  base: "./", // ortsunabhängig: Repo-Unterordner, eigene Domain oder lokal per Doppelklick
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    rollupOptions: {
      input: {
        index: page("index"),
        app: page("app"),
        "how-it-works": page("how-it-works"),
        blog: page("blog"),
        feedback: page("feedback"),
        support: page("support"),
        legal: page("legal"),
      },
    },
  },
});
