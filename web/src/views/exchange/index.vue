<template>
  <v-row>
    <v-col cols="12" md="3">
      <Side />
    </v-col>
    <v-col cols="12" md="6">
      <QuotationSheet />
    </v-col>
    <v-col cols="12" md="3">
      <DealHistory />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Side from "./Side.vue";
import QuotationSheet from "./QuotationSheet.vue";
import DealHistory from "./DealHistory.vue";
export default Vue.extend({
  name: "Exchange",
  components: {
    Side,
    QuotationSheet,
    DealHistory,
  },
});
</script>
