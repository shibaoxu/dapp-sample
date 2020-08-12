<template>
<v-container>
    <v-card>
        <v-card-title>转账</v-card-title>
        <v-card-contents>
            <v-form class="mx-4 mb-4"> 
                <v-text-field label="对方账户" />
                <v-text-field label="数量" type="number"/>                
                <v-btn>转账</v-btn>
                <v-btn>取消</v-btn>
            </v-form>
        </v-card-contents>
    </v-card>
</v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Transfer"
})
</script>