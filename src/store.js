import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
  },

  mutations: {
    login: (state) => (state.authenticated = true),
    logout: (state) => (state.authenticated = false),
  },

  actions: {
    login({ commit }) {
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
  },

  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
});
