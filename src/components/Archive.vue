<template>
  <v-container>
    <h1>Achived Activities</h1>
    <v-sheet class="pa-5">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <v-chip :to="`/activity/${item.id}`" link>
            {{ item.name }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-chip color="success" @click="onClickUnarchive(item)">
            Unarchive
          </v-chip>
        </template>
      </v-data-table></v-sheet
    >
  </v-container>
</template>

<script>
import {
  getArchivedActivities,
  getTasksByActivity,
  unArchiveActivity,
} from "../services";
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "Tasks",
          value: "tasks",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      items: [],
    };
  },

  async mounted() {
    await this.updateActivities();
  },

  methods: {
    async updateActivities() {
      const items = await getArchivedActivities();
      for (let item of items) {
        const tasks = await getTasksByActivity(this.items.id);
        item.tasks = tasks.length;
      }
      this.items = items;
    },

    async onClickUnarchive(item) {
      await unArchiveActivity(item.id);
      await this.updateActivities();
    },
  },
};
</script>
