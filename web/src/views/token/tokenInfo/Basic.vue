<template>
  <v-row>
    <v-col cols="12" md="9">
      <v-row>
        <v-col cols="6" md="3">
          <vertical-text-field label="名称" :text="token.name" />
        </v-col>
        <v-col cols="6" md="3">
          <vertical-text-field label="代码" :text="token.symbol" />
        </v-col>
        <v-col cols="6" md="3">
          <vertical-text-field label="精度" :text="token.decimal" />
        </v-col>
        <v-col cols="6" md="3">
          <vertical-text-field label="发行量" :text="token.totalSupply" />
        </v-col>
        <v-col cols="12">
          <vertical-text-field label="合约地址" :text="token.addr" />
        </v-col>
        <v-col cols="12">
          <vertical-text-field label="创建者" :text="token.creator" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-center">
      <v-btn color="primary" class="mb-2">增发</v-btn>
      <v-btn color="primary">销毁</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import VerticalTextField from "@/components/VerticalTextField.vue";
import { getTokenSummary } from "@/api/tokenApi";

export default Vue.extend({
  name: "Basic",
  props: {
    addr: {
      type: String,
      required: true,
    },
  },
  components: {
    VerticalTextField,
  },
  data: () => {
    return {
      token: {},
    };
  },
  mounted() {
    getTokenSummary(this.addr).then(token => {
      this.token = token;
    });
  },
});
</script>
