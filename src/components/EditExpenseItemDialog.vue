<template>
<v-dialog
v-model="value"
width="1024"
>
    <v-card width="1024" class="d-flex mx-auto mt-2" variant="elevated" color="grey-lighten-8">
        <v-sheet
            class="d-flex align-end text-white"
            height="100"
            color="secondary-darken-1"
            cover
        >
            <v-card-title>Add Item</v-card-title>
        </v-sheet>
        <v-card-item>
            <v-form fast-fail @submit.prevent>
                <v-container>
                    <v-row>
                        <v-col class="flex-column fill-width">
                            <v-text-field
                                v-model="currentItem.description"
                                required
                                clearable
                                clear-icon="mdi-close"
                                :rules="pwdRules"
                                label="Description"
                            ></v-text-field>
                            <v-text-field
                                v-model="currentItem.date"
                                required
                                clearable
                                clear-icon="mdi-close"
                                :rules="pwdRules"
                                label="Date (YYYY/MM/DD)"
                                :disabled=true
                            ></v-text-field>
                            <v-combobox
                                v-model="selectedUser"
                                :items="users"
                                density="comfortable"
                                label="User"
                                rounded="1"
                            ></v-combobox>
                            <p>
                                Amount: {{ currentItem.totalAmount }} €
                            </p>
                        </v-col>
                        <v-col>
                            <UIExpenseAddition @added="increaseTotalAmount" @removed="decreaseTotalAmount" v-model="amounts" :categories="categories"></UIExpenseAddition>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-btn color="primary" block @click="value = false" class="w-50" :disabled="!isValid">Save</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" block @click="value = false">Cancel</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-item>
    </v-card>
</v-dialog>

</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, ref, watch } from 'vue'
import UIExpenseAddition from '@/widgets/UIExpenseAddition.vue';

//*************************************** */
// Component interface definition
interface Category {
    title: string,
    color: string,
    max: number,
    amount: number
}

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

interface User {
    uid:string
    name:string
}

interface PropsInterface {
    categories?: Category[]
    expense?:ExpenseItem
    users?:string[]
}

const props = defineProps<{ modelValue:boolean, edit:boolean, index?:number }>()
const emit = defineEmits(['update:modelValue'])


//*************************************** */
// Ref definition
const amounts = ref<ExpenseSubItem[]>([])
const currentItem = ref({date:"", totalAmount:0, description:"", user:"", id:0, amounts:[]})

const pwdRules = [
    value => {
        if (value && ((value as string).length >= 6)) return true
        return 'You must enter a description of minimum 6 characters.'
    },
]

const categories = ref([
    {title: "Title1", color:"#0c0c0c", max:253, amount: 300},
    {title: "Title2", color:"cyan", max:278, amount: 90},
    {title: "Title3", color:"#555555", max:115, amount: 50},
    {title: "Title3", color:"#555555", max:115, amount: 50},
])

const users = ref([
    {uid:"123456", title: "Norman"},
    {uid:"123456", title: "Jacob"},
    {uid:"123456", title: "Pierre"}
])

const selectedUser = ref(users.value.at(0))

//*************************************** */
// Computed definition
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isValid = computed(() => {
    let status = true;

    status = status && currentItem.value.totalAmount
    status = status && currentItem.value.description

    return status
})


//*************************************** */
// Component methods

function increaseTotalAmount(amount:number)
{
    currentItem.value.totalAmount += amount
    console.log("amounts " + amounts.value.length)
}

function decreaseTotalAmount(amount:number)
{
    currentItem.value.totalAmount -= amount
    console.log("total " + currentItem.value.totalAmount + " amount " + amount)
    console.log("amounts " + amounts.value.length)
}

</script>