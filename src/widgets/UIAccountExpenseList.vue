<template>
    <v-list
        open-strategy="single"
        class="flex"
        max-height=500
    >
        <v-list-group v-for="(item, i) in props.items" :key="i" :value="i" color="primary" @click="onSelected(i, item.data)">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                    <template v-slot:title>
                        {{ item.data.description }} 
                    </template>
                    <template v-slot:subtitle>
                        {{ item.data.date }} | {{ item.data.totalAmount }} €
                    </template>
                    <template v-slot:prepend>
                        <v-icon :icon="'mdi-account-circle'"></v-icon>
                        {{ item.data.user }}
                    </template>
                </v-list-item>
            </template>
            <v-list-item v-for="(subitms, i) in item.data.amounts" :key="i" >
                <v-list-item-subtitle>{{ getCategoryName(subitms.category) }} | {{ subitms.amount }} €</v-list-item-subtitle>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { ExpenseItem, ExpenseSubItem, ExpenseItemSelection, Category, DBObject } from '@/model/componentModel'

const props = defineProps<{ items:DBObject<ExpenseItem>[], categories:Map<string, Category>, modelValue:ExpenseItemSelection }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value:ExpenseItemSelection)
}>()

const selected = ref<ExpenseItemSelection>()

function getCategoryName(key:string)
{
    let ret = "unknown"
    if(props.categories.has(key))
    {
        ret = props.categories.get(key).title
    }

    return ret
}

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
        selected.value = { index:index, data:props.items.at(index).data }
        console.log("Selected " + index)
        emit('update:modelValue', selected.value)
    }
}

</script>