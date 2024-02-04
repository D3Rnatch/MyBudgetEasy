<template>
    <!-- Defines the input to add an expense with input button -->
    <div class="d-flex flex-row">
        <v-text-field
            label="Expense amount"
            v-model="newAmount"
            class="mr-2"
            clearable
            clear-icon="mdi-close"
            variant="solo-filled"
        ></v-text-field>
        <v-combobox
            label="Category"
            :items="props.categories"
            class="ml-2 mr-2 h-0 w-0"
            v-model="currentCategory"
            item-title="data.title"
        />
        <v-btn density="comfortable" icon="mdi-plus" class="ma-0 mt-3" @click="add" :disabled="!conditionValid"></v-btn>
    </div>
    <v-list height="195" bg-color="grey-lighten-2">
        <v-list-item v-for="(item, index) in value" :key="index">
            <v-list-item-title>
                {{ item.amount }} €
            </v-list-item-title>
            <template v-slot:subtitle>
                {{ item.category }}
            </template>
            <template v-slot:append>
                    <v-icon :icon="'mdi-delete'" @click="remove(index)"></v-icon>
            </template>
        </v-list-item>
    </v-list>
</template>


<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from 'vue'
import { Category, ExpenseSubItem, DBObject } from '@/model/componentModel'

interface Props {
    modelValue:ExpenseSubItem[]
    categories:DBObject<Category>[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'added', amount: number): void
  (event: 'removed', amount: number): void
  (event: 'update:modelValue', value:ExpenseSubItem[])
}>()

const value = computed(() => {
    return props.modelValue
})

const newAmount = ref<string>("")
const currentCategory=ref<DBObject<Category>>(props.categories.at(0))


const conditionValid = computed(() => {
    let status = false
    
    if(newAmount.value){
        status = !isNaN(+(newAmount.value))
    }

    return status
})

function add(){
    value.value.push({amount: +(newAmount.value), category:currentCategory.value.id})
    emit('update:modelValue', value.value)
    emit('added', Number(newAmount.value))
    newAmount.value=""
}

function remove(index:number){
    const val = value.value.at(index).amount
    value.value.splice(index, 1)
    emit('update:modelValue', value.value)
    emit('removed', Number(val))
}

</script>