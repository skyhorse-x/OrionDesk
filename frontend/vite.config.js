import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")
const configPath = path.join(projectRoot, "neutralino.config.json")

const neutralinoConfig = (() => {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"))
  } catch {
    return {}
  }
})()

const devPort = (() => {
  try {
    const devUrl = neutralinoConfig.cli?.frontendLibrary?.devUrl
    if (devUrl) return parseInt(new URL(devUrl).port, 10)
  } catch {}
  return 38472
})()

function neutralinoVarsPlugin(command) {
  return {
    name: "neutralino-vars",
    transformIndexHtml(html) {
      try {
        const authPath = path.join(projectRoot, ".tmp/auth_info.json")
        let port = 0, token = ""
        if (fs.existsSync(authPath)) {
          const auth = JSON.parse(fs.readFileSync(authPath, "utf-8"))
          port = auth.nlPort || 0
          token = auth.nlToken || ""
        }
        const cversion = neutralinoConfig.cli?.clientVersion || "6.5.0"
        const appId = neutralinoConfig.applicationId || "com.oriondesk.app"
        const appVersion = neutralinoConfig.version || "1.0.0"
        const appMode = neutralinoConfig.defaultMode || "window"
        const vars = `<script>
window.NL_PORT = ${port};
window.NL_TOKEN = "${token}";
window.NL_CVERSION = "${cversion}";
window.NL_APPID = "${appId}";
window.NL_APPVERSION = "${appVersion}";
window.NL_MODE = "${appMode}";
</script>`
        html = html.replace("</head>", vars + "</head>")
      } catch (e) {
        console.warn("[vite] Could not inject Neutralino vars:", e.message)
      }
      return html
    }
  }
}

export default defineConfig(({ command }) => {
  const backendPortFile = path.join(projectRoot, ".tmp/backend_port")
  let backendPort = "17870"
  try {
    if (fs.existsSync(backendPortFile)) {
      const port = fs.readFileSync(backendPortFile, "utf-8").trim()
      if (port && port !== "0" && !isNaN(parseInt(port))) {
        backendPort = port
      }
    }
  } catch {}

  return {
    root: path.resolve(__dirname),
    plugins: [
      vue(),
      neutralinoVarsPlugin(command)
    ],
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
      outDir: path.resolve(__dirname, "public/dist"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "element-plus": ["element-plus"]
          }
        }
      }
    },
    publicDir: path.resolve(__dirname, "static")
  }
})
