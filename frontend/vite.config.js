import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"
import fs from "node:fs"

const tmpDir = path.resolve(__dirname, "../.tmp")
const configPath = path.resolve(__dirname, "../neutralino.config.json")

const devPort = (() => {
  try {
    const cfg = JSON.parse(fs.readFileSync(configPath, "utf-8"))
    const devUrl = cfg.cli?.frontendLibrary?.devUrl
    if (devUrl) {
      return parseInt(new URL(devUrl).port, 10)
    }
  } catch (e) {
    console.warn("[vite] Could not read devUrl from config, using default port:", e.message)
  }
  return 38472
})()

function getBackendPort() {
  const portFile = path.join(tmpDir, "backend_port")
  let maxAttempts = 30
  while (maxAttempts-- > 0) {
    if (fs.existsSync(portFile)) {
      const port = fs.readFileSync(portFile, "utf-8").trim()
      if (port && port !== "0" && !isNaN(parseInt(port))) {
        return port
      }
    }
    if (maxAttempts > 0) {
      const start = Date.now()
      while (Date.now() - start < 100) {}
    }
  }
  return "17870"
}

function neutralinoVarsPlugin(command) {
  return {
    name: "neutralino-vars",
    transformIndexHtml(html) {
      if (command !== "serve") return html
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
        }
      } catch (e) {
        console.warn("Could not inject Neutralino vars:", e.message)
      }
      return html
    }
  }
}

export default defineConfig(({ command }) => {
  const backendPort = getBackendPort()
  return {
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
      port: devPort,
      strictPort: true,
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${backendPort}`,
          changeOrigin: true,
          secure: false
        },
        "/health": {
          target: `http://127.0.0.1:${backendPort}`,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: path.resolve(__dirname, "../resources"),
      emptyOutDir: true
    }
  }
})