<template>
  <div>
    <div class="text-caption font-weight-light">{{label}}</div>
    <div style="overflow-wrap:anywhere">{{text}}</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "VerticalTextField",
  props: {
    label: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
  },
});
</script>
