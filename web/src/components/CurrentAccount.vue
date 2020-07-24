<template>
  <div class="mb-2">
    <v-chip color="primary"
      ><v-icon left>mdi-account-circle-outline</v-icon
      >0xE87444Df32535993308470E97C53407916612303</v-chip
    >
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getAccounts } from "../utils/web3";

export default Vue.extend({
  name: "CurrentAccount",
  mounted() {
      getAccounts().then(accounts => console.log(accounts)).catch(err => console.log(err))
  },
});
</script>
