<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn left plain @click="toggleMenu"><v-icon>mdi-menu</v-icon></v-btn>

      <router-link to="/" class="d-flex align-center white--text">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-app-bar-title>{{ productName }}</v-app-bar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn plain>
        Logout
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app left color="blue lighten-1" v-model="menuVisible">
      <v-list>
        <v-list-item>
          <v-list-item-avatar class="mx-auto">
            <v-img :src="profile.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ profile.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider key="devider1" class="my-5" color="white"></v-divider>

        <v-list-item key="Activities Board" router to="/">
          <v-list-item-title class="white--text d-flex align-center">
            <v-icon left color="white">mdi-star-four-points</v-icon>
            <span class="d-inline-block ml-5">Activities</span>
          </v-list-item-title>
        </v-list-item>

        <v-divider
          v-if="pinnedItems.length > 0"
          key="devider2"
          class="my-5"
          color="white"
        ></v-divider>

        <v-list-item
          v-for="pinnedItem in pinnedItems"
          :key="pinnedItem.name"
          router
          :to="`/activity/${pinnedItem.id}`"
        >
          <v-list-item-title class="white--text d-flex align-center">
            <v-icon left color="white">mdi-pin</v-icon>
            <span class="d-inline-block ml-5">{{ pinnedItem.name }}</span>
          </v-list-item-title>
        </v-list-item>

        <v-divider key="devider3" class="my-5" color="white"></v-divider>

        <v-list-item key="Archive" router to="/archive">
          <v-list-item-title class="white--text d-flex align-center">
            <v-icon left color="white">mdi-archive</v-icon>
            <span class="d-inline-block ml-5">Archived activities</span>
          </v-list-item-title>
        </v-list-item>

        <v-divider key="devider4" class="my-5" color="white"></v-divider>

        <v-list-item key="Export" router to="/export">
          <v-list-item-title class="white--text d-flex align-center">
            <v-icon left color="white">mdi-download</v-icon>
            <span class="d-inline-block ml-5">Export/Import Data</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-overlay :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-main>
      <router-view
        :key="$route.fullPath"
        @updatePinned="updatePinned"
        @loaderOn="loader = true"
        @loaderOff="loader = false"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { getPinnedActivities, getProfile } from "../services";
export default {
  name: "App",

  components: {},

  data: () => ({
    productName: "Facilitator",
    menuVisible: false,
    profile: {},
    pinnedItems: [],
    loader: false,
  }),

  async mounted() {
    this.$api(async () => {
      await this.updatePinned();
      this.profile = await getProfile();
    });
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    async updatePinned() {
      this.$api(async () => {
        this.pinnedItems = await getPinnedActivities();
      });
    },
  },
};
</script>
