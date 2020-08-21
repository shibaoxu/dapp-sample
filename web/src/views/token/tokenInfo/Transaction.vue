<template>
  <v-tabs centered icons-and-text>
    <v-tab>转账 <v-icon>mdi-bank-transfer-out</v-icon></v-tab>
    <v-tab>收款 <v-icon>mdi-bank-transfer-in</v-icon></v-tab>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="(event, index) in transferRecords">
          <v-list-item :key="index" @click="">
            <v-list-item-content>
              <v-list-item-title>2009-12-11 18:02:27</v-list-item-title>
              <v-list-item-subtitle>{{
                event.returnValues.to
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{
                event.returnValues.value
              }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-tab-item>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="(event, index) in receiveRecords">
          <v-list-item :key="index" @click="">
            <v-list-item-content>
              <v-list-item-title>{{
                event.returnValues.value
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                event.returnValues.to
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>2009-12-11</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </v-tab-item>
  </v-tabs>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Transaction",
    props: {
        transferRecords: {
            type: Array,
            default: []
        },
        receiveRecords: {
            type: Array,
            default: []
        }
    }
});
</script>
