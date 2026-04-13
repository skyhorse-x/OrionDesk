import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/doc",
    name: "Doc",
    component: () => import("@/views/DocView.vue")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView.vue")
  },
  {
    path: "/neutralino-demo",
    name: "NeutralinoDemo",
    component: () => import("@/views/NeutralinoDemo.vue")
  },
  {
    path: "/window-control",
    name: "WindowControl",
    component: () => import("@/views/WindowControl.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router