<template>
  <div>
    <div class="mb-1">{{ isSell ? "卖单" : "买单" }}</div>
    <div
      v-for="(item, index) in quotations"
      :key="index"
      class="mb-1 px-2 py-1 text-caption"
      :class="isSell ? dealColor.sellColor : dealColor.buyColor"
    >
      <div class="d-flex justify-space-around">
        <div>ETH</div>
        <div>BAT</div>
      </div>
      <div class="text-center">{{ announce(item) }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import dealColor from "./utils";
export default Vue.extend({
  name: "QuotationList",
  data: () => {
    return {
      quotations: [
        { amount: 120, price: 200 },
        { amount: 120, price: 200 },
        { amount: 120, price: 200 },
        { amount: 120, price: 200 },
        { amount: 120, price: 200 },
        { amount: 120, price: 200 },
      ],
      dealColor,
    };
  },
  props: {
    isSell: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    announce(item: { amount: number; price: number }): string {
      if (!this.isSell) {
        return `Buy ${item.amount} ETH at ${item.price} BAT each`;
      } else {
        return `Sell ${item.amount} ETH at ${item.price} BAT each`;
      }
    },
  },
});
</script>
