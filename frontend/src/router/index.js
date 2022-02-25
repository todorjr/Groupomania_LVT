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
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/views/SignIn.vue"),
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
