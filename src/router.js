import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

import Activities from "./components/Activities";
import Activity from "./components/Activity";
import Archive from "./components/Archive";
import Export from "./components/Export";
import Login from "./components/Login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "activities",
      component: Activities,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/activity/:id",
      name: "activity",
      component: Activity,
    },
    {
      path: "/archive",
      name: "archive",
      component: Archive,
    },
    {
      path: "/export",
      name: "export",
      component: Export,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !store.state.authenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
