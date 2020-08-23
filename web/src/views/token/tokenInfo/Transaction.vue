<template>
  <v-tabs centered icons-and-text>
    <v-tab
      >转账
      <v-icon>mdi-bank-transfer-out</v-icon>
    </v-tab>
    <v-tab
      >收款
      <v-icon>mdi-bank-transfer-in</v-icon>
    </v-tab>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="(event, index) in transferRecords">
          <v-list-item :key="'transfer' + index" @click="doNothing">
            <v-list-item-content>
              <v-list-item-title>{{ event.timestamp }}</v-list-item-title>
              <v-list-item-subtitle>{{ event.to }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text
                >{{ event.value }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-tab-item>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="(event, index) in receiveRecords">
          <v-list-item :key="'receive' + index" @click="doNothing">
            <v-list-item-content>
              <v-list-item-title>{{ event.timestamp }} </v-list-item-title>
              <v-list-item-subtitle>{{ event.from }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{
                event.value
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="'divider' + index"></v-divider>
        </template>
      </v-list>
    </v-tab-item>
  </v-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import {
  getReceiveRecords,
  getTransferRecords,
  TransferEventLog,
} from "@/api/tokenApi";
export default Vue.extend({
  name: "Transaction",
  props: {
    addr: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transferRecords: [] as TransferEventLog[],
      receiveRecords: [] as TransferEventLog[],
    };
  },
  methods: {
    doNothing: function() {
      return;
    },
  },
  mounted() {
    getTransferRecords(this.addr).then(
      events => (this.transferRecords = events),
    );
    getReceiveRecords(this.addr).then(events => (this.receiveRecords = events));
  },
});
</script>
