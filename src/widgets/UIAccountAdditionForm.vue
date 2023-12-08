<template>
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
                        v-model="account.name"
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
</template>

<script setup lang="ts">

import UIListSetup from '@/widgets/UIListSetup.vue';
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { Account, AccountImpl, Category, CategoryImpl } from '@/model/componentModel'

//*************************************** */
// Component interface definition

const props = defineProps<{ account:Account, categories:Category[] }>()
const emit = defineEmits(['update:account', 'update:categories'])


//*************************************** */
// Computed definition

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


function updateLocalRef(valueList) {
    categoryList.value = valueList
}

function updateUsersLocalRef(valueList){
    //users.value = valueList
    account.value.users = valueList
}


</script>