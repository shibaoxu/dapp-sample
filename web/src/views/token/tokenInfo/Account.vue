<template>
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
</template>
<script lang="ts">
import Vue from "vue";
import VerticalTextField from "@/components/VerticalTextField.vue";
import { getBalance } from "@/api/tokenApi";
export default Vue.extend({
  name: "Account",
  components: {
    VerticalTextField,
  },
  props: {
    addr: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      balance: "0",
    };
  },
  mounted: function() {
    getBalance(this.addr).then(balance => (this.balance = balance));
  },
});
</script>
