<template>
    <v-list
        open-strategy="single"
        class="flex"
        max-height=500
    >
        <v-list-group v-for="(item, i) in props.items" :key="i" :value="i" color="primary">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                    <template v-slot:title>
                        {{ item.description }} 
                    </template>
                    <template v-slot:subtitle>
                        {{ item.date }} - {{ item.totalAmount }} €
                    </template>
                    <template v-slot:prepend>
                        <v-icon :icon="'mdi-account-circle'"></v-icon>
                        {{ item.user }}
                    </template>
                </v-list-item>
            </template>
            <v-list-item v-for="(subitms, i) in item.amounts" :key="i" >
                <v-list-item-subtitle>{{ subitms.category }} | {{ subitms.amount }} €</v-list-item-subtitle>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface ExpenseSubItem {
    amount:number
    category:string
}

interface ExpenseItem {
    date:string
    totalAmount:number
    amounts: ExpenseSubItem[]
    description:string
    id:number
    user:string
}

const props = defineProps<{ items:ExpenseItem[] }>()

</script>