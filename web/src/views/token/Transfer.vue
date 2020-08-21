<template>
  <v-container>
    <v-card>
      <v-card-title>转账</v-card-title>
      <v-card-text>
        <v-form ref="form" class="mx-4 mb-4">
          <v-text-field
            label="对方账户"
            :rules="formRules.address"
            v-model="to"
          />
          <v-text-field
            label="数量"
            type="number"
            :rules="formRules.amount"
            v-model="amount"
          />
          <div class="text-center">
            <v-btn
              color="primary"
              class="mr-4"
              :loading="loading"
              @click="transfer"
              ><v-icon>mdi-bank-transfer-out</v-icon>转账</v-btn
            >
            <v-btn @click="cancel">取消</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { transfer } from "@/api/tokenApi";
import router from "@/router";
export default Vue.extend({
  name: "Transfer",
  data() {
    return {
      to: "",
      amount: 0,
      loading: false,
      message: "",
      formRules: {
        address: [(v: string) => !!v || "转账地址必填"],
        amount: [(v: number) => v > 0 || "转账金额必须大于0"],
      },
      snackbar: {
        message: "",
        show: false,
        color: "success",
      },
    };
  },
  props: {
    tokenAddr: {
      type: String,
      required: true,
    },
  },
  methods: {
    transfer() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        transfer(this.tokenAddr, this.to, this.amount)
          .then(data => {
            this.snackbar.color = "success";
            this.snackbar.message = "转账成功";
            this.$refs.form.reset();
          })
          .catch(err => {
            this.snackbar.message = "转账失败";
            this.snackbar.color = "error";
            console.error(err);
          })
          .finally(() => {
            this.loading = false;
            this.snackbar.show = true;
          });
      }
    },
    cancel() {
      router.push({
        name: "Token",
        params: { addr: this.tokenAddr },
        query: { openPanel: 1 },
      });
    },
  },
});
</script>
