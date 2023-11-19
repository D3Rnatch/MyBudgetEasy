<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="secondary-darken-1">
            <v-app-bar-nav-icon @click="drawerOpening = !drawerOpening"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ accountName }}</v-toolbar-title>
            <template v-slot:extension>
                <v-tabs
                v-model="tab"
                align-tabs="title"
                >
                    <v-tab
                        v-for="(item, index) in tabs"
                        :key="index"
                        :value="index"
                    >
                        {{ item }}
                    </v-tab>
                </v-tabs>
            </template>
            <div class="d-flex">
                <v-icon :icon="'mdi-account-circle'" class="ma-4 mr-0"></v-icon>
                <p class="ma-4">{{ currentUser }}</p>
            </div>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawerOpening"
            width="300"
            temporary
        >
            <div class="d-flex flex-row justify-space-between">
                <v-list-item
                    prepend-icon="mdi-account-circle"
                    :title="currentUser"
                ></v-list-item>
                <v-btn density="comfortable" icon="mdi-plus" @click="addAccountFlag = true"></v-btn>
            </div>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item v-for="(item, i) in accounts" :key="i" :value="i" prepend-icon="mdi-view-dashboard" :title="item" @click="action(item, i)">
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                <v-btn prepend-icon="mdi-logout">
                    Logout
                </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
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
    <AddAccountDialog v-model:openFlag="addAccountFlag" v-model:account="account" v-model:categories="categories"></AddAccountDialog>
</template>

<script setup lang="ts">

import AccountDetails from '@/components/AccountDetails.vue';
import AccountSummary from '@/components/AccountSummary.vue';
import AddAccountDialog from '@/components/AddAccountDialog.vue';
import { ref, watch } from 'vue';
import { Category, Account } from '@/model/componentModel'

const accountName = ref("AccountName")
const currentUser = ref("UserName")
const drawerOpening = ref(false)

const tab = ref("Expenses")

const tabs = ref([
    "Detailed", "Summary", "Account Setup", "Exports"
])

const accounts = ref([
    "AB_SB_MainAccount",
    "MyBudget",
    "VacAvecLesPotos"
])

const addAccountFlag = ref(false)

const account = ref<Account>()
const categories = ref<Category[]>()

function action(item:string, index:number)
{
    console.log("action clicked for " + item)
}

watch(account, () => {
    if(account.value)
    {
        console.log("Assigned to " + account.value.name)
    }
})

</script>