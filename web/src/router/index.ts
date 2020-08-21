import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/Home.vue";
import Exchange from "@/views/exchange/index.vue";
import Dashboard from "@/views/home/Dashboard.vue";
import Tokens from "@/views/token/Tokens.vue";
import Token from "@/views/token/Token.vue";
import Issure from "@/views/token/Issure.vue";
import Transfer from "@/views/token/Transfer.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/tokens/issure",
    name: "Issure",
    component: Issure,
  },
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
        path: "tokens",
        name: "Tokens",
        component: Tokens,
      },
      {
        path: "tokens/:addr",
        name: "Token",
        component: Token,
        // props: true,
        props: route => ({
          addr: route.params.addr,
          openPanel: route.query.openPanel ? Number(route.query.openPanel) : 0,
        }),
      },
      {
        path: "tokens/:tokenAddr/transfer",
        name: "Transfer",
        component: Transfer,
        props: true,
      },
    ],
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
