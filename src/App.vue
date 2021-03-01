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
        <v-list-item
          v-for="menuItem in menuItems"
          :key="menuItem.text"
          router
          :to="menuItem.route"
        >
          <v-list-item-title class="white--text d-flex align-center">
            <v-icon left color="white">{{ menuItem.icon }}</v-icon>
            <span class="d-inline-block ml-5">{{ menuItem.text }}</span>
          </v-list-item-title>
        </v-list-item>

        <v-divider
          v-if="pinnedItems.length > 0"
          key="devider"
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
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view
        :key="$route.fullPath"
        @updatePinned="updatePinned"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { getPinnedActivities } from "./services";
export default {
  name: "App",

  components: {},

  data: () => ({
    productName: "Facilitator",
    menuVisible: false,
    menuItems: [
      {
        text: "Activities Board",
        icon: "mdi-star-four-points",
        route: "/",
      },
      {
        text: "Archive",
        icon: "mdi-archive",
        route: "/archive",
      },
      { text: "Profile", icon: "mdi-account", route: "/profile" },
    ],
    pinnedItems: [],
  }),

  async mounted() {
    await this.updatePinned();
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    async updatePinned() {
      this.pinnedItems = await getPinnedActivities();
    },
  },
};
</script>
