<template>
    <v-dialog
        v-model="openFlag"
        width="1024"
    >
        <v-card width="1024" class="d-flex mx-auto mt-2" variant="elevated" color="grey-lighten-8">
            <v-sheet
                class="d-flex align-end text-white"
                height="100"
                color="secondary-darken-1"
                cover
            >
                <v-card-title>Add Account</v-card-title>
            </v-sheet>
            <v-card-item>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    required
                                    clearable
                                    variant="filled"
                                    label="AccountName"
                                    :rules="[accountNameRules.required]"
                                    v-model="accountName"
                                ></v-text-field>
                                </v-col><v-col>
                                <v-combobox
                                    label="Who are you ?"
                                    :items="users"
                                    clearable
                                    :rules="[associatedUserRules.required]"
                                    :disabled="!users.length"
                                    v-model="associatedUser"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                                <v-col>
                                    <UIListSetup title="Add a category" @listChanged="updateLocalRef" :notEmpty="notEmptyLists" />
                                </v-col>
                                <v-col>
                                    <UIListSetup title="Add a user" @listChanged="updateUsersLocalRef" :notEmpty="notEmptyLists" />
                                </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-btn color="primary" block @click="saveAccount" class="w-50" :disabled="!isFormValid">Save</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn color="primary" block @click="openFlag = false">Cancel</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

import UIListSetup from '@/widgets/UIListSetup.vue';
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { Account, AccountImpl, Category, CategoryImpl } from '@/model/componentModel'

//*************************************** */
// Component interface definition

const props = defineProps<{ openFlag:boolean, account:Account, categories:Category[] }>()
const emit = defineEmits(['update:openFlag', 'update:account', 'update:categories'])


//*************************************** */
// Computed definition
const openFlag = computed({
    get(){
        return props.openFlag
    },
    set(value:boolean) {
        emit('update:openFlag', value)
    }
})

const account = computed({
    get(){
        return props.account
    },
    set(value:Account) {
        emit('update:account', value)
    }
})

const categoryList = computed({
    get(){
        return props.categories
    },
    set(value:Category[]) {
        emit('update:categories', value)
    }
})


const isFormValid = computed(() => {
    return (
        (categories.value.length > 0)
        && (users.value.length > 0)
        && (accountName.value)
        && (associatedUser.value)
    )
})



//*************************************** */
// Refs definition
const categories = ref([])
const users = ref([])
const associatedUser = ref("")
const accountName = ref("")
const notEmptyLists = ref(true)

const accountNameRules = ref({
    required: value => !!value || 'Account name must be present'
})

const associatedUserRules = ref({
    required: value => !!value || 'A user must be assigned'
})


//*************************************** */
// Component functions

watch(openFlag, () => {
    if(openFlag.value)
    {
        accountName.value = ""
        associatedUser.value = ""
        categories.value = []
        users.value = []
    }
})

function updateLocalRef(valueList) {
    categories.value = valueList
}

function updateUsersLocalRef(valueList){
    users.value = valueList
}

function saveAccount(){
    let tmp:Account = (new AccountImpl as Account)
    tmp.name = accountName.value
    for(let item in users.value)
    {
        tmp.users.push({ name:item, uid:"" })
    } 
    
    account.value = tmp

    let tmpCat:Category[] = new Array<CategoryImpl>()
    for(let item in categories)
    {
        let cat = new CategoryImpl()
        cat.title = item
        tmpCat.push(cat as Category)
    }

    categoryList.value = tmpCat

    openFlag.value = false
}

</script>