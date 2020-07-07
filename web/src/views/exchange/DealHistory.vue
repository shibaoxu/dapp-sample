<template>
  <v-sheet class="grey lighten-5 pt-2 ">
    <div class="mb-1 pt-1">近期交易记录</div>
    <div
      v-for="(item, index) in history"
      :key="index"
      class="text-caption px-1"
      :class="item.tradeType === 'Buy' ? color.buyColor : color.sellColor"
    >
      {{
        `${item.tradeType} ${item.eth} ETH for ${item.bat} BAT at ${item.price} each`
      }}
    </div>
  </v-sheet>
</template>
<script lang="ts">
import Vue from "vue";
import color from "./utils";
export default Vue.extend({
  name: "DealHistory",
  data: () => {
    return {
      history: [
        { tradeType: "Buy", eth: 10, bat: 200, price: 20 },
        { tradeType: "Sell", eth: 3, bat: 140, price: 23 },
        { tradeType: "Buy", eth: 2, bat: 40, price: 22 },
        { tradeType: "Sell", eth: 5, bat: 240, price: 50 },
      ],
      color,
    };
  },
  methods: {},
});
</script>
