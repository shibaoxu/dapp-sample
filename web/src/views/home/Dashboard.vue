<template>
  <Introduce v-if="isMetaMashInstalled()" />
  <Setup v-else />
</template>
<script lang="ts">
import { isMetaMashInstalled } from "@/utils/web3.ts";
import Introduce from "./Introduce.vue";
import Setup from "./Setup.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    Setup,
    Introduce,
  },
  methods: {
    isMetaMashInstalled,
  },
});
</script>
