<template>
  <v-sheet class="pa-4 grey lighten-5">
    <div class="text-button" v-text="'选择的资产'" />
    <div class="d-flex justify-space-around">
      <div class="text-h5 pa-4" v-text="'ETH'" />
      <div class="text-h5 pa-4" v-text="'BAT'" />
    </div>
    <div class="text-button" v-text="'投资组合'" />
    <div class="d-flex justify-space-around">
      <div class="text-body-2 pa-4" v-text="'ETH:'" />
      <div class="text-body-2 pa-4" v-text="'10'" />
    </div>
    <div class="d-flex justify-space-around">
      <div class="text-body-2 pa-0" v-text="'BAT:'" />
      <div class="text-body-2 pa-0" v-text="'200'" />
    </div>
    <div class="text-button" v-text="'资金管理'" />
    <div class="text-center">
      <v-btn class="mr-2">存款</v-btn>
      <v-btn>取款</v-btn>
    </div>
    <div class="text-button" v-text="'操作'" />
    <div class="text-center">
      <v-btn class="mr-2" :class="dealColor.buyColor">买</v-btn>
      <v-btn :class="dealColor.sellColor">卖</v-btn>
    </div>
    <div>
      <v-text-field type="number" placeholder="市价订单"></v-text-field>
    </div>
  </v-sheet>
</template>
<script lang="ts">
import Vue from "vue";
import DealColor from "./utils";
export default Vue.extend({
  name: "Side",
  data: () => {
    return {
      dealColor: DealColor,
    };
  },
});
</script>
