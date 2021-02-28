<template>
  <v-container>
    <h1>My Activities</h1>
    <v-row class="mt-5">
      <v-col v-for="phase in phases" :key="phase.name">
        <v-card class="phase-card">
          <v-card-title class="justify-center gray--text">
            {{ phase.name }}
          </v-card-title>
          <v-card-subtitle class="text-center">{{
            phase.description
          }}</v-card-subtitle>
          <v-card-text>
            <v-btn
              fab
              x-small
              class="success d-flex ma-auto mb-4"
              @click.stop="newIdeaDialogOpen = true"
              v-if="phase.id === 1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-sheet>
              <v-list>
                <v-slide-y-transition class="py-0" group>
                  <v-list-item
                    v-for="idea in phaseList(phase.id)"
                    :key="idea.id"
                  >
                    <v-card class="flex-grow-1 ma-1">
                      <v-card-title>
                        <v-btn plain :to="`/activity/${idea.id}`">
                          {{ idea.name }}
                        </v-btn>
                      </v-card-title>
                      <v-card-actions class="justify-center pb-4">
                        <v-btn
                          fab
                          x-small
                          v-if="idea.phase > 1"
                          @click="moveIdeaLeft(idea)"
                        >
                          <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          x-small
                          v-if="idea.phase < phases.length"
                          @click="moveIdeaRight(idea)"
                        >
                          <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item>
                </v-slide-y-transition>
              </v-list>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- add new idea dialog -->

    <v-dialog v-model="newIdeaDialogOpen" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Create New Idea
        </v-card-title>

        <v-card-text class="mt-5">
          <v-form v-model="newIdeaForm.valid" ref="newIdeaForm">
            <v-text-field
              v-model="newIdeaForm.title"
              :rules="newIdeaForm.rules.title"
              label="Name"
            ></v-text-field>
            <v-textarea
              v-model="newIdeaForm.description"
              label="Description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.stop="onNewIdeaFormSubmit">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="warning" text @click.stop="newIdeaDialogOpen = false">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { addNewActivity, getActivities, updateActivity } from "../services";

export default {
  data() {
    return {
      phases: [
        {
          id: 1,
          name: "Inbox",
          description: "New ideas come here",
        },
        {
          id: 2,
          name: "Consider",
          description: "First thoughts on the idea",
        },
        {
          id: 3,
          name: "Prototype",
          description: "First prototype is in progress",
        },
        {
          id: 4,
          name: "Develop",
          description: "Idea is approved and is under development",
        },
      ],
      ideas: [],
      newIdeaDialogOpen: false,
      newIdeaForm: {
        valid: false,
        title: "",
        description: "",
        rules: {
          title: [(v) => !!(v && v.trim()) || "Name is required"],
        },
      },
    };
  },

  async mounted() {
    this.ideas = await getActivities();
  },

  methods: {
    phaseList(id) {
      return this.ideas.filter(
        (idea) => idea.phase === id && (this.showArchived || !idea.archived)
      );
    },

    async moveIdeaRight(idea) {
      const newPhase = Math.min(idea.phase + 1, this.phases.length);
      await updateActivity(idea.id, { phase: newPhase });
      this.ideas = await getActivities();
    },

    async moveIdeaLeft(idea) {
      const newPhase = Math.max(idea.phase - 1, 1);
      await updateActivity(idea.id, { phase: newPhase });
      this.ideas = await getActivities();
    },

    async onNewIdeaFormSubmit() {
      if (this.$refs.newIdeaForm.validate()) {
        this.newIdeaDialogOpen = false;
        await addNewActivity({
          name: this.newIdeaForm.title,
          description: this.newIdeaForm.description,
          phase: 1,
        });
        this.ideas = await getActivities();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.phase-card {
  min-width: 200px;
}
</style>
