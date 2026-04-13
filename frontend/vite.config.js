import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"
import fs from "node:fs"

function neutralinoVarsPlugin(command) {
  return {
    name: "neutralino-vars",
    transformIndexHtml(html) {
      if (command !== "serve") {
        return html
      }

      try {
        const authPath = path.resolve(__dirname, "../.tmp/auth_info.json")
        if (fs.existsSync(authPath)) {
          const auth = JSON.parse(fs.readFileSync(authPath, "utf-8"))
          const vars = `
          <script>
            window.NL_PORT = ${auth.nlPort};
            window.NL_TOKEN = "${auth.nlToken}";
            window.NL_CVERSION = "6.5.0";
            window.NL_APPID = "com.oriondesk.app";
            window.NL_APPVERSION = "1.0.0";
            window.NL_MODE = "window";
          </script>
          `
          html = html.replace("</head>", vars + "</head>")
          html = html.replace(
            /src="[^"]*neutralino\.js"/,
            `src="http://localhost:${auth.nlPort}/neutralino.js"`
          )
          return html
        }
      } catch (e) {
        console.warn("Could not inject Neutralino vars:", e.message)
      }
      return html
    }
  }
}

export default defineConfig(({ command }) => ({
  root: path.resolve(__dirname),
  plugins: [vue(), neutralinoVarsPlugin(command)],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:17870",
        changeOrigin: true,
        secure: false
      },
      "/health": {
        target: "http://127.0.0.1:17870",
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, "../resources"),
    emptyOutDir: true
  }
}))
