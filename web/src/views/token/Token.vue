<template>
  <v-container>
    <v-card>
      <v-card-title>基本信息</v-card-title>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Token",
  props: {
    name: { type: String, required: true },
    addr: { type: String, required: true },
    decimal: { type: Number, required: true },
    totalSuplly: { type: String, required: true },
    createor: { type: String, required: true },
    symbol: { type: String, required: true },
  },
});
</script>
