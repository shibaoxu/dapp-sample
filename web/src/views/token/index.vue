<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="tokens"
        show-expand
        :expanded.sync="expanded"
        item-key="symbol"
      >
        <template v-slot:item.totalSupply="{ value }">
          <span>{{ formatCurrency(value) }}</span>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="py-2 px-1 px-sm-4">
            <div class="d-flex justify-start pb-1">
              <div style="width: 80px">精度</div>
              <div>
                <kbd>{{ item.decimal }}</kbd>
              </div>
            </div>
            <div class="d-flex justify-start flex-wrap pb-1">
              <div style="width: 80px">发行者</div>
              <div>
                <kbd>{{ item.creator }}</kbd>
              </div>
            </div>
            <div class="d-flex justify-start flex-wrap">
              <div style="width: 80px">合约地址</div>
              <div class="text-caption text-md-body-1">
                <kbd>{{ item.addr }}</kbd>
              </div>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center mt-4">
      <v-btn dark large append to="issure">发行Token</v-btn>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { getTokens } from "@/api/tokenApi";
import numeral from "numeral";
export default Vue.extend({
  name: "Token",
  components: {
  },
  data() {
    return {
      expanded: [],
      tokens: [],
      headers: [
        { text: "名称", align: "start", sortable: false, value: "name" },
        { text: "代码", align: "start", sortable: false, value: "symbol" },
        { text: "发行量", align: "end", sortable: false, value: "totalSupply" },
      ],
    };
  },
  methods: {
    formatCurrency(value: number): string {
      return numeral(value).format("0,0");
    },
  },
  mounted: function() {
    getTokens().then(data => (this.tokens = data));
  },
});
</script>
