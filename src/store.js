import Vue from "vue";
import Vuex from "vuex";
import { getProfile } from "../src/services/profile";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: {
      name: "",
    },
  },

  mutations: {
    login: (state, payload) => {
      state.authenticated = true;
      state.user = payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.user = {};
    },
  },

  actions: {
    async login({ commit }, payload) {
      commit("login", await getProfile(payload.name));
      router.push("/");
    },

    logout({ commit }) {
      commit("logout");
      router.push("/login");
    },
  },
});
