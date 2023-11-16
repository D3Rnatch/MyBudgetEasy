<template>
    <div class="d-flex flex-column ma-4 pa-4">
        <p class="text-h6">Categories</p>
        <v-divider class="border-opacity-100"></v-divider>
        <v-virtual-scroll
                :items="props.categories"
                height="100%"
                item-height="48"
            >
            <template v-slot:default="{ item }">
                <UIAccountOverviewItem :title="item.title" :amount="item.amount" :max="item.max" :color="item.color"></UIAccountOverviewItem>
            </template>
        </v-virtual-scroll>
    </div>
</template>


<script setup lang="ts">

import UIAccountOverviewItem from '@/widgets/items/UIAccountOverviewItem.vue'
import { defineProps } from 'vue';
import { Category } from '@/model/componentModel'

const props = defineProps<{
    categories?: Category[]
}>()


</script>