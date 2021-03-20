<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset="0" md="6" offset-md="3">
        <v-card class="pa-5">
          <h1>Login</h1>
          <v-form v-model="loginForm.valid" ref="loginForm">
            <v-text-field
              v-model="loginForm.name"
              label="Name"
              :rules="loginForm.rules.name"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="loginForm.password"
              label="Password"
              :rules="loginForm.rules.password"
            ></v-text-field>
            <v-row>
              <v-col class="text-right">
                <v-btn color="primary" text @click.stop="onLogin">
                  <v-icon>mdi-check</v-icon>Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        valid: false,
        name: "",
        password: "",
        rules: {
          name: [(v) => !!(v && v.trim()) || "Name is required"],
          password: [(v) => !!(v && v.trim()) || "Password is required"],
        },
      },
    };
  },

  methods: {
    async onLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$api(async () => {
          this.$store.dispatch("login", {
            name: this.loginForm.name,
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
