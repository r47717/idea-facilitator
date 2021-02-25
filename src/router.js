import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Profile from "./components/Profile";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/activities",
      name: "activities",
      component: Activities,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
});
