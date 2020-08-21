<template>
  <v-container>
    <v-expansion-panels :value="openPanel">
      <v-expansion-panel>
        <v-expansion-panel-header>基本信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <basic :addr= "addr"/>
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
          <transaction :transferRecords="transferRecords" :receiveRecords="receiveRecords"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import VerticalTextField from "@/components/VerticalTextField.vue";
import Basic from "./tokenInfo/Basic";
import Account from "./tokenInfo/Account"
import Transaction from "./tokenInfo/Transaction"
import {
  getTokenSummary,
  getBalance,
  getTransferRecords,
  getReceiveRecord,
} from "@/api/tokenApi";

export default Vue.extend({
  name: "Token",
  components: {
    VerticalTextField,
    Basic,
    Account,
    Transaction
  },
  data() {
    return {
      balance: "0",
      transferRecords: [],
      receiveRecords: [],
    };
  },
  props: {
    addr: { type: String, required: true },
    openPanel: { type: Number, default: 0 },
  },
  mounted() {
    getBalance(this.addr).then(data => (this.balance = data));
    getTransferRecords(this.addr)
      .then(events => (this.transferRecords = events))
      .catch(error => console.log(error));

    // getReceiveRecord(this.addr)
    //   .then(events => (this.receiveRecords = events))
    //   .catch(error => console.log(error));
  },
  methods: {},
});
</script>
