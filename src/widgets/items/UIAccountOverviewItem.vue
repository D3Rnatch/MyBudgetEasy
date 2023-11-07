<template>
    <div class="bg-neutral-20">
        <v-container> 
            <v-row align="start" justify="start" no-gutters>
                <v-col align-self="start">
                    <p class="pl-0 ml-n2 mt-5">
                        {{ props.title }} 
                    </p>
                </v-col>
                <v-col>
                    <p class="pl-0 ml-n2 mt-5">
                        {{props.amount}}€ / {{props.max}}€
                    </p>
                </v-col>
                <v-col></v-col>
                <v-col></v-col>
            </v-row>
            <v-row align="start" justify="start" no-gutters>
                <v-col align-self="start">
                    <v-progress-linear :color="props.color" :model-value=props.amount :max=props.max :height="12"></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Input{
    title: string,
    amount: number,
    max: number,
    color: string
}

const props = defineProps<Input>()

</script>