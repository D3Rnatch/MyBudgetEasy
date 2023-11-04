<template>
    <v-card
        class="mx-auto bg-secondary-30"
        max-width="400"
        variant="tonal"
    >
    <v-card-title>
        Summary
    </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col>Income</v-col>
                    <v-col>{{ props.income }}€</v-col>
                </v-row>
                <v-row>
                    <v-col>Outcome</v-col>
                    <v-col>{{ props.outcome }}€</v-col>
                </v-row>
                <v-row>
                    <v-col>Highest</v-col>
                    <v-col>{{ props.highest }}€</v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>


<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps<{
    income?: number,
    outcome?: number,
    highest?: number
}>()

</script> 