import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/connect",
    name: "Connect",
    component: () => import("@/views/Connection.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    component: () => import("@/views/Profil.vue"),
  },
  {
    path: "/allposts",
    name: "AllPosts",
    component: () => import("@/views/AllPosts.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
