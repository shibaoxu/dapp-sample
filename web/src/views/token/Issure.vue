<template>
  <v-card class="mx-auto mt-4 pb-2" width="400">
    <v-card-title>发行新Token</v-card-title>
    <v-form v-model="valid" class="ma-4" ref="form">
      <v-text-field
        v-model="formData.name"
        :rules="formRules.nameRules"
        label="名称"
        required
      />
      <v-text-field
        v-model="formData.symbol"
        :rules="formRules.symbolRules"
        label="代码"
        required
      />
      <v-text-field
        v-model="formData.decimal"
        :rules="formRules.decimalRules"
        label="精度"
        type="number"
        required
      />
      <v-text-field
        v-model="formData.supply"
        :rules="formRules.suppleRules"
        label="发行量"
        type="number"
        required
      />
      <div class="my-4 text-center">
        <v-btn dark large class="mr-2" @click="issureToken">确定</v-btn>
        <v-btn dark large exact to="/token">取消</v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { issueToken } from "@/api/tokenApi";
import router from "@/router" 
export default Vue.extend({
  name: "Issure",
  data() {
    return {
      valid: false,
      formData: {
        name: "",
        symbol: "",
        decimal: 2,
        supply: 10000,
      },
      formRules: {
        nameRules: [
          (v: string) => !!v || "Name is required",
          (v: string) =>
            (v && v.length >= 2 && v.length <= 20) ||
            "Name must be less than 20 and more than 2",
        ],
        symbolRules: [
          (v: string) => !!v || "Symbol is required",
          (v: string) =>
            (v && v.length >= 2 && v.length <= 4) ||
            "Symbol must be less that 4 and more than 2",
        ],
        decimalRules: [
          (v: number) => !!v || "Decimal is required",
          (v: number) =>
            (v >= 0 && v <= 16) ||
            "Decimal must be less than 16 and more than 0",
        ],
        suppleRules: [
          (v: number) => !!v || "Supply is required",
          (v: number) => v >= 1000 || "supply must be more than 1000",
        ],
      },
    };
  },
  methods: {
    issureToken: function() {
      // eslint-disable-next-line
      if ((this.$refs.form as any).validate()) {
        issueToken(this.formData).then(d => {
          router.push({name: "Tokens"})
        })
      }
    },
  },
});
</script>
