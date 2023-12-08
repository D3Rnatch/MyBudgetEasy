<template>
    <v-layout class="rounded rounded-md">
        <UIAppBar v-model:sidePanelOpenFlag="drawerOpening" v-model:selectedTab="tab" :title="accountName" :username="currentUser" :tabs="tabs"></UIAppBar>
        <UINavigationDrawer 
            v-model:side-panel-open-flag="drawerOpening" 
            v-model:add-account-flag="addAccountFlag" 
            v-model:join-account="joinAccount"
            :username="currentUser"
            :accounts="accounts"
        ></UINavigationDrawer>
        <v-main>
            <v-window v-model="tab">
                <v-window-item value=0>
                    <AccountDetails></AccountDetails>
                </v-window-item>
                <v-window-item value=1>
                    <AccountSummary></AccountSummary>
                </v-window-item>
                <v-window-item value=2>
                    Window 2
                </v-window-item>
                <v-window-item value=3>
                    Window 3
                </v-window-item>
            </v-window>
        </v-main>
    </v-layout>
    <AddAccountDialog v-model:openFlag="addAccountFlag" v-model:account="account" v-model:categories="categories" @success="onAccountAdditionValidation"></AddAccountDialog>
</template>

<script setup lang="ts">

import AccountDetails from '@/components/AccountDetails.vue';
import AccountSummary from '@/components/AccountSummary.vue';
import AddAccountDialog from '@/components/AddAccountDialog.vue';
import UIAppBar from '@/widgets/UIAppBar.vue';
import UINavigationDrawer from '@/widgets/UINavigationDrawer.vue';
import { ref, watch } from 'vue';
import { Category, Account, AccountImpl } from '@/model/componentModel'

import { dbManagerInterface } from '@/controller/dbManagerInterface';

const accountName = ref("AccountName")
const currentUser = ref("UserName")
const drawerOpening = ref(false)
const joinAccount=ref(false)
const tab = ref("Expenses")

const tabs = ref([
    "Detailed", "Summary", "Account Setup", "Exports"
])


const accounts = ref<Account[]>([])

let tmp:Account = new AccountImpl as Account

tmp.name = "AB_SB_MainAccount"
accounts.value.push(structuredClone(tmp))

tmp.name = "MyBudget"
accounts.value.push(structuredClone(tmp))

tmp.name = "VacAvecLesPotos"
accounts.value.push(structuredClone(tmp))


const addAccountFlag = ref(false)

const account = ref<Account>()
const categories = ref<Category[]>()

watch(account, () => {
    if(account.value)
    {
        console.log("Assigned to " + account.value.name)
    }
})

function onAccountAdditionValidation()
{
    console.log("Adding this account to db")
    dbManagerInterface.getInstance().addAccount(account.value, categories.value)
}


</script>