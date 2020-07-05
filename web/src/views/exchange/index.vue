<template>
  <v-container fluid>
    <Side />
    <Quotations />
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import Side from './Side.vue'
import Quotations from './Quotations.vue'
export default Vue.extend({
  name: "Exchange",
  components: {
    Side,
    Quotations
  }
})
</script>