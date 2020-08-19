<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar + FeatherJS User Auth + User Roles Workflow
        </q-toolbar-title>
        <div>
          <q-btn
            v-if="!$store.state.auth.user"
            flat
            to="/register"
            stretch
            class="text-bold"
            ><q-icon
              name="fas fa-user-plus"
              class="q-mr-sm text-white"
              size="xs"
            ></q-icon
            >Register</q-btn
          >
          <q-btn
            v-if="!$store.state.auth.user"
            to="/login"
            flat
            stretch
            class="text-bold"
          >
            <q-icon
              name="fas fa-sign-in-alt"
              class="q-mr-sm text-white"
              size="xs"
            ></q-icon
            >Login</q-btn
          >
          <q-btn
            v-if="$store.state.auth.user"
            to="/account"
            flat
            stretch
            class="text-bold"
            ><q-icon
              name="fas fa-user-circle"
              class="q-mr-sm text-white"
              size="xs"
            ></q-icon
            >Account</q-btn
          >
          <q-btn v-if="isAdmin" to="/admin" flat stretch class="text-bold"
            ><q-icon
              name="fas fa-chart-line"
              class="q-mr-sm text-white"
              size="xs"
            ></q-icon
            >Admin Dashboard</q-btn
          >

          <q-btn
            v-if="$store.state.auth.user"
            @click="logout"
            flat
            stretch
            class="text-bold"
          >
            <q-icon
              name="fas fa-sign-out-alt"
              class="q-mr-sm text-white"
              size="xs"
            ></q-icon
            >Logout</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev"
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework"
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev"
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev"
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev"
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev"
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },
  computed: {
    isAdmin() {
      let user = this.$store.state.auth.user;
      if (user) {
        if (user.permissions) {
          return user.permissions.includes("admin");
        }
      }
      return false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
