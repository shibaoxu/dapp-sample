<template>
    <v-container>
        <div>

        </div>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "DealHistory",
    data: ()=>{
        return {
            history: [
                {tradeType: 'BUY', amount: 10, price: 200},
                {tradeType: 'BUY', amount: 10, price: 200},
                {tradeType: 'SELL', amount: 10, price: 200},
                {tradeType: 'SELL', amount: 10, price: 200},
            ]
        }
    }
})
</script>