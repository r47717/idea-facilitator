<template>
  <v-container>
    <h1>Export/Import Activities & Tasks</h1>
    <v-sheet class="pa-5">
      <v-card class="pa-5">
        <v-textarea outlined rows="15" label="Data"></v-textarea>
        <div class="d-flex">
          <v-btn>
            <v-icon left>mdi-download</v-icon>
            <span>Generate</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn>
            <v-icon left>mdi-upload</v-icon>
            <span>Upload</span>
          </v-btn>
        </div>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
