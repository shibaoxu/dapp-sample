<template>
  <div>
    <v-btn :loading="installing" large @click="onInstall"
      >点击安装MetaMask</v-btn
    >
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// import MetaMaskOnboarding from "@metamask/onboarding";
export default Vue.extend({
  name: "Setup",
  data() {
    return {
      installing: false,
    };
  },
  methods: {
    onInstall() {
      // const onboarding = new MetaMaskOnboarding();
      // onboarding.startOnboarding();
      // this.installing = false;
    },
  },
});
</script>
