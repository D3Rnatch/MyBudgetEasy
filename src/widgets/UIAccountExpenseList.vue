<template>
    <v-list
        open-strategy="single"
        class="flex"
        max-height=500
    >
        <v-list-group v-for="(item, i) in props.items" :key="i" :value="i" color="primary" @click="onSelected(i, item)">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                    <template v-slot:title>
                        {{ item.description }} 
                    </template>
                    <template v-slot:subtitle>
                        {{ item.date }} | {{ item.totalAmount }} €
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
import { defineProps, defineEmits, ref } from 'vue';
import { ExpenseItem, ExpenseSubItem, ExpenseItemSelection } from '@/model/componentModel'

const props = defineProps<{ items:ExpenseItem[], modelValue:ExpenseItemSelection }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value:ExpenseItemSelection)
}>()

const selected = ref<ExpenseItemSelection>()

function onSelected(index:number, data:ExpenseItem)
{
    let replace=true
    if(selected.value)
    {
        if(selected.value.index === index)
        {
            // unselecting the index:
            selected.value.index=-1
            emit('update:modelValue', selected.value)
            replace = false
            console.log("Unselecting " + index)
        }
    }

    if(replace)
    {
        selected.value = { index:index, data:props.items.at(index) }
        console.log("Selected " + index)
        emit('update:modelValue', selected.value)
    }
}

</script>