import { createI18n } from "vue-i18n"

const messages = {
  en: {
    hello: "Hello",
    settings: "Settings",
    home: "Home"
  },
  zh: {
    hello: "你好",
    settings: "设置",
    home: "首页"
  }
}

const i18n = createI18n({
  locale: "zh",
  fallbackLocale: "en",
  messages
})

export default i18n