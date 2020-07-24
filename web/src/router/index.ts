import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/Home.vue";
import Exchange from "@/views/exchange/index.vue";
import Dashboard from "@/views/home/Dashboard.vue";
import Token from "@/views/token/index.vue";
import Issure from "@/views/token/Issure.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "exchange",
        name: "Exchange",
        component: Exchange,
      },
      {
        path: "token",
        name: "Token",
        component: Token,
      },
    ],
  },
  {
    path: "/token/issure",
    name: "Issure",
    component: Issure,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
