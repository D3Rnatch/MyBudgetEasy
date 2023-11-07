<template>
    <div class="d-flex flex-column ma-4 pa-4">
        <p class="text-h6">Summary</p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-container>
            <v-row>
                <v-col>Balance:</v-col>
                <v-col>{{ props.income - props.outcome }}€</v-col>
            </v-row>
            <v-row>
                <v-col>Balance (income/outcome):</v-col>
                <v-col>{{ props.income }}€ / {{ props.outcome }}€</v-col>
            </v-row>
            <v-row>
                <v-col>Highest:</v-col>
                <v-col>{{ props.highest }}€</v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps<{
    income?: number,
    outcome?: number,
    highest?: number
}>()

</script> 