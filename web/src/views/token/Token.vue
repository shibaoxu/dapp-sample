<template>
  <v-container>
    <v-expansion-panels :value="openPanel">
      <v-expansion-panel>
        <v-expansion-panel-header>基本信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <basic :addr="addr" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>账户信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <account :addr="addr" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>交易记录</v-expansion-panel-header>
        <v-expansion-panel-content>
          <transaction :addr="addr" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Basic from "./tokenInfo/Basic.vue";
import Account from "./tokenInfo/Account.vue";
import Transaction from "./tokenInfo/Transaction.vue";

export default Vue.extend({
  name: "Token",
  components: {
    Basic,
    Account,
    Transaction,
  },
  data() {
    return {};
  },
  props: {
    addr: { type: String, required: true },
    openPanel: { type: Number, default: 0 },
  },
  methods: {},
});
</script>
