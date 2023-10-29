<template>
    <v-sheet width="500" class="pa-6 mx-auto"
        border="md"
        rounded
        >
        <v-form fast-fail @submit.prevent v-model="isFormValid" @submit="onSubmit">
            <v-text-field
                v-model="accountName"
                required
                clearable
                variant="filled"
                label="AccountName"
                :rules="[accountNameRules.required]"
            ></v-text-field>
            <UIListSetup title="Add a category" @listChanged="updateLocalRef" :notEmpty="notEmptyLists" />
            <UIListSetup title="Add a user" @listChanged="updateUsersLocalRef" :notEmpty="notEmptyLists" />
            <v-combobox
                label="Who are you ?"
                class="pt-6"
                :items="users"
                clearable
                v-model="associatedUser"
                :rules="[accountNameRules.required]"
            />
            <v-btn type="submit" block class="mt-2" :disabled="!isFormValid">Add account</v-btn>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">

import { ref, defineEmits, computed } from 'vue'
import UIListSetup from '@/widgets/UIListSetup.vue'; // @ is an alias to /src
import { useAccountDataStore, useGlobalStore } from '@/store/globalStore'
import { AccountImpl, CategoryImpl } from '@/store/accountModel'
const categoryName = ref("")
const marker = ref(true)
const categories = ref([])
const users = ref([])
const associatedUser = ref("")
const accountName = ref("")
const store = useAccountDataStore()
const gStore = useGlobalStore()
const notEmptyLists = ref(true)


const emit = defineEmits(['submitAccount'])


const isFormValid = computed(() => {
    return (
        (categories.value.length > 0)
        && (users.value.length > 0)
        && (accountName.value)
        && (associatedUser.value)
    )
})

const accountNameRules = ref({
    required: value => !!value || 'Account name must be present'
})

const associatedUserRules = ref({
    required: value => !!value || 'A user must be assigned'
})

function updateLocalRef(valueList) {
    categories.value = valueList
}

function updateUsersLocalRef(valueList){
    users.value = valueList
}

function onSubmit() {
    let localAccount = new AccountImpl
    localAccount.name = accountName.value
    for(let i=0; i< users.value.length; ++i){
        let tmp = users.value.at(i)
        if(tmp === associatedUser.value){
            localAccount.users.push({uid: gStore.auth_userid, name: tmp})
        }
    }
    store.tmpAccount = localAccount

    let localCtegories:CategoryImpl[] = []
    for(let i=0; i< categories.value.length; ++i){
        localCtegories.push({color: "#0c0c0c", title: categories.value.at(i), timestamp:null})
    }

    store.tmpCategories = localCtegories

    emit('submitAccount')
}
</script>