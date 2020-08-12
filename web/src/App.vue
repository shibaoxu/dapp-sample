<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense nav shaped>
        <v-list-item v-for="dapp in dapps" :key="dapp.title" link :to="dapp.to">
          <v-list-item-icon>
            <v-icon>{{ dapp.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ dapp.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span>DApp示例</span>
      </v-toolbar-title>
      <v-spacer/>
      <current-account/>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app dark>
      <v-spacer />
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>
<script>
import CurrentAccount from "@/components/CurrentAccount"
export default {
  name: "App",
  components: {
    CurrentAccount
  },

  data: () => ({
    dapps: [
      { title: "首页", icon: "mdi-home", to: "/Dashboard" },
      { title: "Token", icon: "mdi-ethereum", to: "/tokens" },
      { title: "交易所", icon: "mdi-view-dashboard", to: "/Exchange" },
      { title: "社交音乐", icon: "mdi-image", to: "Home" },
      { title: "About", icon: "mdi-help-box", to: "Home" },
    ],
    drawer: null,
  }),
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint;
    },
  },
};
</script>
