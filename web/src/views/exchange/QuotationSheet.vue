<template>
  <v-sheet class="grey lighten-4 px-4">
    <v-row>
      <v-col cols='6'>
        <QuotationList tradeType="BUY" />
      </v-col>
      <v-col cols='6' >
        <QuotationList tradeType="SELL"/>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts">
import Vue from "vue";
import QuotationList from "./QuotationList.vue";

export default Vue.extend({
  name: "QuotationSheet",
  components: {
    QuotationList,
  },
});
</script>
