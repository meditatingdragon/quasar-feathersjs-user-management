<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { onMounted, watch } from "@vue/composition-api";

export default {
  name: "App",
  watch: {
    currentUser(newUser, oldUser) {
      if (newUser === null) {
        this.$router.push("/");
      } else {
        if (this.$route.path === "/login") {
          this.$router.push("/account");
        }
      }
    }
  },
  setup(props, context) {
    const { $store } = context.root;
    // Attempt jwt auth when the app mounts.
    onMounted(() => {
      $store.dispatch("auth/authenticate").catch(error => {
        if (!error.message.includes("Could not find stored JWT")) {
          console.error(error);
        }
      });
    });
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
