import Vue from "vue";
import App from "./App";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
