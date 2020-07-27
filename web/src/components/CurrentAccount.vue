<template>
  <div class="mb-2">
    <v-chip color="primary" class="d-none d-md-inline-block">
      <v-icon left>mdi-account-circle-outline</v-icon>
      {{ account }}
    </v-chip>
    <v-chip color="success">
      <v-icon left>mdi-account-circle-outline</v-icon>
      {{balance}}ETH
    </v-chip>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getAccounts, getBalance } from "@/api/eth";

export default Vue.extend({
  name: "CurrentAccount",
  data() {
    return {
      account: "",
      balance: "0",
    };
  },
  methods: {
    getCurrentAccountInfo: async function(){
      const accouts = await getAccounts();
      this.account = accouts[0];
      this.balance = await getBalance(this.account);
    }
  },
  mounted() {
    this.getCurrentAccountInfo();
  },
});
</script>
