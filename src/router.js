import Vue from "vue";
import Router from "vue-router";
import Activities from "./components/Activities";
import Activity from "./components/Activity";
import Profile from "./components/Profile";
import Archive from "./components/Archive";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "activities",
      component: Activities,
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
      path: "/profile",
      name: "profile",
      component: Profile,
    },
  ],
});
