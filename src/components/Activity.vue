<template>
  <v-container>
    <h1>Activity Editor</h1>

    <v-tabs v-model="tab">
      <v-tab>General</v-tab>
      <v-tab>Tasks</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="general" transition="false">
        <v-sheet class="pa-5">
          <v-row>
            <v-col xs="12" lg="8" xl="6">
              <v-form v-model="valid" ref="form">
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  :rules="rules.name"
                ></v-text-field>

                <v-textarea
                  v-model="form.description"
                  label="Description"
                ></v-textarea>

                <v-select
                  :items="phases"
                  label="Phase"
                  v-model="form.phase"
                ></v-select>

                <v-text-field
                  v-model="form.repo"
                  label="Repository URL"
                ></v-text-field>

                <v-switch v-model="form.archived" label="Archived"> </v-switch>

                <v-switch v-model="form.pinned" label="Pinned"> </v-switch>

                <div class="d-flex mt-5">
                  <v-btn class="success" left text @click.stop="onSaveChanges"
                    >Save changes</v-btn
                  >
                  <v-spacer></v-spacer>
                  <v-btn class="error" right text @click.stop="onResetChanges">
                    Reset changes
                  </v-btn>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-sheet>
      </v-tab-item>

      <v-tab-item key="tasks" transition="false">
        <v-sheet class="pa-5">
          <v-simple-table>
            <thead>
              <tr>
                <th
                  v-for="header in tasks.headers"
                  :key="header.text"
                  class="text-left"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks.items" :key="task.name">
                <td>
                  <v-text-field v-model="task.name"></v-text-field>
                </td>
                <td>
                  <v-text-field v-model="task.description"></v-text-field>
                </td>
                <td>
                  <v-select
                    v-model="task.status"
                    :items="tasks.statuses"
                  ></v-select>
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        x-small
                        elevation="1"
                        v-bind="attrs"
                        v-on="on"
                        class="success mr-2"
                        @click="onTaskSave(task.id)"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </template>
                    <span>Save task</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        x-small
                        elevation="1"
                        v-bind="attrs"
                        v-on="on"
                        class="error"
                        @click="onTaskDelete(task.id)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete task</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-btn fab small text class="success mt-4" @click="onNewTaskClick">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-sheet>
      </v-tab-item>
    </v-tabs-items>

    <v-snackbar v-model="snackbar" color="success">
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { getActivityById, getTasksByActivity } from "../services";
export default {
  data() {
    return {
      data: {
        id: 0,
        name: "",
        description: "",
        phase: 1,
        archived: false,
        pinned: false,
      },
      phases: [
        {
          value: 1,
          text: "Inbox",
          description: "New ideas come here",
        },
        {
          value: 2,
          text: "Consider",
          description: "First thoughts on the idea",
        },
        {
          value: 3,
          text: "Prototype",
          description: "First prototype is in progress",
        },
        {
          value: 4,
          text: "Develop",
          description: "Idea is approved and is under development",
        },
      ],
      tab: null,
      valid: false,
      form: {
        name: "",
        description: "",
        phase: 1,
        archived: false,
        pinned: false,
      },
      rules: {
        name: [(v) => !!(v && v.trim()) || "Name is required"],
      },
      tasks: {
        headers: [
          { text: "Name", value: "name" },
          { text: "Description", value: "description" },
          { text: "status", value: "status" },
          { text: "Actions", value: "actions" },
        ],
        items: [],
        statuses: ["TODO", "In Progress", "Done"],
      },
      snackbar: false,
      snackBarText: "",
    };
  },

  async mounted() {
    this.$api(async () => {
      this.data = await getActivityById(Number(this.$route.params.id));
      this.form = { ...this.data };
      this.tasks.items = await getTasksByActivity(
        Number(this.$route.params.id)
      );
    });
  },

  methods: {
    async onSaveChanges() {
      if (this.$refs.form.validate()) {
        this.snackBarText = "Saving changes...";
        this.snackbar = true;
        this.$store.dispatch("updateActivity", {
          id: this.data.id,
          data: this.form,
        });
        this.data = await getActivityById(Number(this.$route.params.id));
        this.snackBarText = "Changes saved successfully";
        this.$emit("updatePinned");
      }
    },

    async onResetChanges() {
      const res = await this.$confirm(
        "Do you really want to discard all changes?",
        {
          title: "Discard changes?",
        }
      );
      if (res) {
        this.$api(async () => {
          this.data = await getActivityById(Number(this.$route.params.id));
          this.form = { ...this.data };
        });
      }
    },

    async onTaskDelete(id) {
      const res = await this.$confirm(
        "Do you really want to delete the task?",
        {
          title: "Delete task?",
        }
      );
      if (res) {
        console.log(id);
      }
    },

    onTaskSave(id) {
      console.log(id);
    },

    onNewTaskClick() {
      this.tasks.items.push({
        name: "",
        description: "",
        status: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* why do you guys make so specific selectors which are hard to override?? */
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #ffffff;
}
</style>
