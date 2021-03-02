import Vue from "vue";
import Router from "vue-router";
import Activities from "./components/Activities";
import Activity from "./components/Activity";
import Archive from "./components/Archive";
import Export from "./components/Export";

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
      path: "/export",
      name: "export",
      component: Export,
    },
  ],
});
