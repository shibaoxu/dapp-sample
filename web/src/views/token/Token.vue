<template>
  <v-container>
    <v-expansion-panels :value="openPanel">
      <v-expansion-panel>
        <v-expansion-panel-header>基本信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="9">
              <v-row>
                <v-col cols="6" md="3">
                  <vertical-text-field label="名称" :text="tokenSummary.name" />
                </v-col>
                <v-col cols="6" md="3">
                  <vertical-text-field
                    label="代码"
                    :text="tokenSummary.symbol"
                  />
                </v-col>
                <v-col cols="6" md="3">
                  <vertical-text-field
                    label="精度"
                    :text="tokenSummary.decimals"
                  />
                </v-col>
                <v-col cols="6" md="3">
                  <vertical-text-field
                    label="发行量"
                    :text="tokenSummary.totalSupply"
                  />
                </v-col>
                <v-col cols="12">
                  <vertical-text-field
                    label="合约地址"
                    :text="tokenSummary.addr"
                  />
                </v-col>
                <v-col cols="12">
                  <vertical-text-field
                    label="创建者"
                    :text="tokenSummary.creator"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="3" class="d-flex flex-column justify-center">
              <v-btn color="primary" class="mb-2">增发</v-btn>
              <v-btn color="primary">销毁</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>账户信息</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="8">
              <vertical-text-field label="余额" :text="balance" />
            </v-col>
            <v-col cols="12" md="4" class="text-right">
              <v-btn color="primary" class="mr-2" to="transfer" append>转账</v-btn>
              <v-btn color="primary" class="mr-2">授权</v-btn>
              <v-btn color="primary">划账</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>交易记录</v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import VerticalTextField from "@/components/VerticalTextField.vue";
import { getTokenSummary, getBalance } from "@/api/tokenApi";

export default Vue.extend({
  name: "Token",
  components: {
    VerticalTextField,
  },
  data() {
    return {
      openPanel: 0,
      balance: "0",
      tokenSummary: {
        name: "",
        symbol: "",
        decimals: "0",
        totalSupply: "",
        addr: "",
        creator: "",
      },
    };
  },
  props: {
    addr: { type: String, required: true },
  },
  mounted() {
    getTokenSummary(this.addr).then(data => {
      this.tokenSummary = data;
      this.tokenSummary.addr = this.addr;
    });

    getBalance(this.addr).then(data => (this.balance = data));
  },
  methods: {},
});
</script>
