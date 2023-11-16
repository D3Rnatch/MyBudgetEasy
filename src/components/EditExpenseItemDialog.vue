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
                            <UIExpenseAddition @added="increaseTotalAmount" @removed="decreaseTotalAmount" v-model="currentItem.amounts" :categories="categories"></UIExpenseAddition>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-btn color="primary" block @click="onSave" class="w-50" :disabled="!isValid">Save</v-btn>
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
import { ExpenseItemImpl, Category, ExpenseSubItem, ExpenseItem } from '@/model/componentModel'

//*************************************** */
// Component interface definition
const props = defineProps<{ modelValue:boolean, edit:boolean, item?:ExpenseItem }>()
const emit = defineEmits(['update:modelValue', 'update:item'])


//*************************************** */
// Ref definition
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

watch(selectedUser, () => {
    currentItem.value.user = selectedUser.value.title
})

watch(value, () => {
    // Tracks when this is displayed or hidden
    console.log("Watch Value value.value " + (value.value === true) + ", edit " + (props.edit === true)
                    + ", item " + (props.item)
    )

    if(props.edit)
    {
        if(value.value)
        {
            console.log("Setting up edition ON")
            currentItem.value = structuredClone(props.item);
            console.log("Setting up edition END")
        }
    }
    else
    {
        if(!value.value)
        {
            console.log("restoring to default ON")
            currentItem.value = (new ExpenseItemImpl as ExpenseItem)
            currentItem.value.user = users.value.at(0).title
            console.log("restoring to default END is amounts valid " + currentItem.value.totalAmount)
        }
    }

/*    if(value.value && props.edit && props.item)
    {
        // When displaying the popup,
        currentItem.value = structuredClone(props.item);
    }
    /*else if(!value.value)
    {
        console.log("TEST 2a")
        // Clear all fields
        currentItem.value.amounts = []
        currentItem.value.date = ""
        currentItem.value.description = ""
        currentItem.value.id = -1
        currentItem.value.totalAmount = 0
        currentItem.value.user = users.value.at(0).title
        console.log("TEST 2b")
    } */
})

function onSave()
{
    emit('update:item', currentItem.value)
    value.value = false
}

function increaseTotalAmount(amount:number)
{
    currentItem.value.totalAmount += amount
}

function decreaseTotalAmount(amount:number)
{
    currentItem.value.totalAmount -= amount
}

</script>