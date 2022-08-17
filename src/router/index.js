import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    redirect: { name: "home" },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/views/LogoutView.vue"),
  },
  {
    path: "/calendar/:year(\\d+)/:month(\\d+)",
    name: "calendar",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    redirect: { name: "home" },
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async to => {
  if (store.state.jwt && to.name === "login") return { name: "home" };
  if (!store.state.jwt && to.name !== "login") return { name: "login" };
});

export default router;
