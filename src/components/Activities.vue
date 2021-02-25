<template>
  <v-container>
    <h1>My Activities</h1>
    <v-row class="mt-5">
      <v-col v-for="phase in phases" :key="phase.name">
        <v-card>
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
              class="success d-flex ma-auto"
              @click.stop="newIdeaDialog = true"
              v-if="phase.id === 1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-sheet>
              <v-list>
                <v-list-item v-for="idea in phaseList(phase.id)" :key="idea.id">
                  <v-card class="flex-grow-1 ma-1">
                    <v-card-title>
                      <v-btn plain @click.stop="showActivityDialog(idea.id)">{{
                        idea.name
                      }}</v-btn>
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
              </v-list>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ dialogActivity ? dialogActivity.name : null }}
        </v-card-title>

        <v-card-text class="mt-5">
          {{ dialogActivity ? dialogActivity.description : null }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="newIdeaDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Create New Idea
        </v-card-title>

        <v-card-text class="mt-5">
          <v-form v-model="newIdeaForm.valid" ref="form">
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
          <v-btn color="primary" text @click.stop="onFormSubmit">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="warning" text @click.stop="newIdeaDialog = false">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      phases: [
        {
          id: 1,
          name: "Fresh idea",
          description: "Just some new thoughts",
        },
        {
          id: 2,
          name: "Considering",
          description: "First thoughts on the idea",
        },
        {
          id: 3,
          name: "Prototype",
          description: "First quick prototype is in progress or done",
        },
        {
          id: 4,
          name: "Development",
          description: "Idea is approved and is under development",
        },
        {
          id: 5,
          name: "Deployed",
          description:
            "Idea has been implemented and is under support and enhancements",
        },
      ],
      ideas: [
        {
          id: 1,
          name: "idea #1",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 1,
        },
        {
          id: 2,
          name: "idea #2",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 1,
        },
        {
          id: 3,
          name: "idea #3",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 1,
        },
        {
          id: 4,
          name: "idea #4",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 2,
        },
        {
          id: 5,
          name: "idea #5",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 3,
        },
        {
          id: 6,
          name: "idea #6",
          description:
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
          phase: 4,
        },
      ],
      dialog: false,
      dialogActivity: null,
      newIdeaDialog: false,
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
  methods: {
    phaseList(id) {
      return this.ideas.filter((idea) => idea.phase === id);
    },
    moveIdeaRight(idea) {
      idea.phase = Math.min(idea.phase + 1, this.phases.length);
    },
    moveIdeaLeft(idea) {
      idea.phase = Math.max(idea.phase - 1, 1);
    },
    showActivityDialog(id) {
      this.dialog = true;
      this.dialogActivity = this.ideas.find((idea) => idea.id === id);
    },
    onFormSubmit() {
      if (this.$refs.form.validate()) {
        this.newIdeaDialog = false;
        this.ideas.push({
          name: this.newIdeaForm.title,
          description: this.newIdeaForm.description,
          phase: 1,
          id: this.ideas[this.ideas.length - 1].id + 1,
        });
      }
    },
  },
};
</script>
