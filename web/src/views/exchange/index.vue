<template>
  <v-row>
    <v-col cols="12" lg="3">
      <Side />
    </v-col>
    <v-col cols="12" lg=6>
      <QuotationSheet />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import Side from "./Side.vue";
import QuotationSheet from "./QuotationSheet.vue";
export default Vue.extend({
  name: "Exchange",
  components: {
    Side,
    QuotationSheet,
  },
});
</script>
