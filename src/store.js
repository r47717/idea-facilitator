import Vue from "vue";
import Vuex from "vuex";
import { getProfile } from "../src/services/profile";
import router from "./router";
import {
  getPinnedActivities,
  addNewActivity,
  getActivities,
  updateActivity,
  removeActivity,
} from "./services";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    loader: false,
    error: null,
    activities: [],
    pinnedActivities: [],
  },

  mutations: {
    login(state, payload) {
      state.authenticated = true;
      state.user = payload;
    },
    logout(state) {
      state.authenticated = false;
      state.user = {};
    },
    loaderOn(state) {
      state.loader = true;
    },
    loaderOff(state) {
      state.loader = false;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setActivities(state, activities) {
      state.activities = activities;
    },
    setPinnedActivities(state, activities) {
      state.pinnedActivities = activities;
    },
  },

  actions: {
    async login(context, payload) {
      await api(getProfile, payload.name, "login", "/");
    },

    async logout({ commit }) {
      commit("loaderOn");
      commit("logout");
      commit("loaderOff");
      router.push("/login");
    },

    async fetchPinnedActivities() {
      await api(getPinnedActivities, [], "setPinnedActivities");
    },

    async fetchActivities() {
      await api(getActivities, [], "setActivities");
    },

    async updateActivity({ dispatch }, { id, data }) {
      await api(updateActivity, [id, data]);
      dispatch("fetchActivities");
    },

    async addNewActivity({ dispatch }, { data }) {
      await api(addNewActivity, [data]);
      dispatch("fetchActivities");
    },

    async removeActivity({ dispatch }, { id }) {
      await api(removeActivity, [id]);
      dispatch("fetchActivities");
    },
  },
});

async function api(apiCall, paramsArr, actionAfter, routeToAfter) {
  const { commit } = store;

  commit("loaderOn");
  try {
    const response = await apiCall(...paramsArr);

    if (actionAfter) {
      commit(actionAfter, response);
    }

    if (routeToAfter) {
      router.push(routeToAfter);
    }
  } catch (err) {
    commit("setError", err);
  } finally {
    commit("loaderOff");
  }
}

export default store;
