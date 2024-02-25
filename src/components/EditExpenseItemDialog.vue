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
                                :items="props.users"
                                density="comfortable"
                                label="User"
                                rounded="1"
                                item-title="name"
                            ></v-combobox>
                            <p>
                                Amount: {{ currentItem.totalAmount }} €
                            </p>
                        </v-col>
                        <v-col>
                            <UIExpenseAddition @added="increaseTotalAmount" @removed="decreaseTotalAmount" v-model="currentItem.amounts" :categories="categories" :categoryMap="props.categoryMap"></UIExpenseAddition>
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
import { ExpenseItemImpl, Category, DBObject, ExpenseItem, UserLink } from '@/model/componentModel'

//*************************************** */
// Component interface definition
const props = defineProps<{ modelValue:boolean, edit:boolean, categories:DBObject<Category>[], categoryMap:Map<string, Category>, users:UserLink[], item?:DBObject<ExpenseItem> }>()
const emit = defineEmits(['update:modelValue', 'update:item', 'saveClicked'])


//*************************************** */
// Ref definition
const refId = ref(props.item? props.item.id : "")

const currentItem = ref(new ExpenseItemImpl as ExpenseItem)

const pwdRules = [
    value => {
        if (value && ((value as string).length >= 6)) return true
        return 'You must enter a description of minimum 6 characters.'
    },
]

const selectedUser = ref(props.users.at(0))

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

const inputItem = computed({
    get() {
    return props.item
  },
  set(value) {
    emit('update:item', value)
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
    currentItem.value.user = selectedUser.value.uid
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
            currentItem.value = structuredClone(props.item.data);
            refId.value = (props.item? props.item.id : "")
            console.log("Setting up edition END")
        }
    }
    else
    {
        if(!value.value)
        {
            console.log("restoring to default ON")
            currentItem.value = (new ExpenseItemImpl as ExpenseItem)
            currentItem.value.user = props.users.at(0).uid
            console.log("restoring to default END is amounts valid " + currentItem.value.totalAmount)
        }
    }
})

function onSave()
{
    console.log("Item to save " + JSON.stringify(currentItem.value) + " refId " + refId.value)
    
    if(!props.edit)
    {
        console.log("Adding item ")
        currentItem.value.date = new Date().toISOString()
    }

    const item = new DBObject<ExpenseItem>(currentItem.value, refId.value)
    
    emit('saveClicked', item)
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