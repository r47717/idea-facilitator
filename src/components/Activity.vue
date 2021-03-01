<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-text-field
        v-model="form.name"
        label="Name"
        :rules="rules.name"
      ></v-text-field>

      <v-textarea v-model="form.description" label="Description"></v-textarea>

      <v-checkbox v-model="form.archived">
        <template v-slot:label>Archived</template>
      </v-checkbox>

      <v-checkbox v-model="form.pinned">
        <template v-slot:label>Pinned</template>
      </v-checkbox>

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
import { getActivityById, updateActivity } from "../services";
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
      snackbar: false,
      snackBarText: "",
    };
  },

  async mounted() {
    this.data = await getActivityById(Number(this.$route.params.id));
    this.form = { ...this.data };
  },

  methods: {
    async onSaveChanges() {
      if (this.$refs.form.validate()) {
        this.snackBarText = "Saving changes...";
        this.snackbar = true;
        await updateActivity(this.data.id, this.form);
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
        this.data = await getActivityById(Number(this.$route.params.id));
        this.form = { ...this.data };
      }
    },
  },
};
</script>
