<template>
  <div>
    <div>{{ isBuy ? "Buy" : "Sell" }}</div>
    <div
      v-for="(item, index) in quotations"
      :key="index"
      class="mb-1 px-2 py-1 text-caption"
      :class="color"
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
    };
  },
  props: {
    tradeType: {
      validator: (value: string) => {
        return ["BUY", "SELL"].indexOf(value) != -1;
      },
    },
  },
  computed: {
    isBuy(): boolean {
      return this.tradeType === "BUY";
    },
    isSell(): boolean {
      return this.tradeType === "SELL";
    },
    color(): object {
      return this.isBuy
        ? { blue: true, "lighten-3": true }
        : { red: true, "lighten-3": true };
    },
  },
  methods: {
    announce(item: { amount: number; price: number }): string {
      if (this.isBuy) {
        return `Buy ${item.amount} at ${item.price} BAT each`;
      } else {
        return `Sell ${item.amount} at ${item.price} BAT each`;
      }
    },
  },
});
</script>
