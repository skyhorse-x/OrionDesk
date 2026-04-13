import { createApp } from "vue"
import { createPinia } from "pinia"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import App from "./App.vue"
import router from "./router"
import i18n from "./i18n"
import "./styles.css"

if (typeof window !== 'undefined' && window.Neutralino) {
  window.Neutralino.init()
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(i18n)

app.mount("#app")
