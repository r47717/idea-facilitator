import Vue from "vue";
import App from "./components/App";
import vuetify from "./plugins/vuetify";
import loader from "./plugins/loader";
import router from "./router";
import VuetifyConfirm from "vuetify-confirm";

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "OK",
  buttonFalseText: "Cancel",
  buttonTrueColor: "primary",
  buttonFalseColor: "grey",
  buttonTrueFlat: true,
  buttonFalseFlat: true,
  color: "warning",
  icon: "mdi-alert-circle",
  title: "",
  width: 350,
  property: "$confirm",
});

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";

new Vue({
  router,
  vuetify,
  loader,
  render: (h) => h(App),
}).$mount("#app");
