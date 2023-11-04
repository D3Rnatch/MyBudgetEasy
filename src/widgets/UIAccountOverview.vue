<template>
    <v-card
        class="mx-auto bg-secondary-30"
        max-width="400"
        variant="tonal"
    >
        <v-card-title>
            Categories Overview
        </v-card-title>
        <v-card-text>
            <v-virtual-scroll
                :items="props.categories"
                height="320"
                item-height="48"
            >
            <template v-slot:default="{ item }">
                <UIAccountOverviewItem :title="item.title" :amount="item.amount" :max="item.max" :color="item.color"></UIAccountOverviewItem>
            </template>
            </v-virtual-scroll>
        </v-card-text>
    </v-card>
</template>


<script setup lang="ts">

import UIAccountOverviewItem from '@/widgets/items/UIAccountOverviewItem.vue'
import { defineProps } from 'vue';

interface Category {
    title: string,
    color: string,
    max: number,
    amount: number
}

const props = defineProps<{
    categories?: Category[]
}>()


</script>