<template>
  <div>
    <v-btn @click="onConnect">Connect</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Introduce",
  methods: {
    async onConnect() {
      // window.ethereum.enable();
      // const accounts = await ethereum.request({ method: 'eth_accounts' })
      // console.log(accounts)
    },
  },
});
</script>
