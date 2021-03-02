<template>
  <v-container>
    <h1>Export/Import Data</h1>
    <v-sheet class="mt-5">
      <v-card class="pa-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              link
              :href="
                'data:application/json;charset=utf-8,' +
                  encodeURIComponent(JSON.stringify(dump))
              "
              download="facilitator-data.json"
              target="_blank"
            >
              <v-icon left>mdi-download</v-icon>
              <span>Download JSON File</span>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              outlined
              dense
              label="Upload JSON file"
              @change="onChange"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import { restoreDataFromJSON, saveDataToJSON } from "../services";

export default {
  data() {
    return {
      dump: {},
    };
  },

  async mounted() {
    this.dump = await saveDataToJSON();
  },

  methods: {
    onChange(file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        const text = ev.target.result;
        try {
          const data = JSON.parse(text);
          restoreDataFromJSON(data);
        } catch (err) {
          console.log("Loaded data is incorrect! Try reloading");
        }
      };
      reader.readAsText(file);
    },
  },
};
</script>
