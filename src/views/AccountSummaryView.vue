<template>
    <v-layout class="rounded rounded-md" v-if="dataLoadPending">
        <v-main>
            <v-progress-circular color="primary" indeterminate ></v-progress-circular>
        </v-main>
    </v-layout>
    <v-layout class="rounded rounded-md" v-if="!dataLoadPending">
        <UIAppBar v-model:sidePanelOpenFlag="drawerOpening" v-model:selectedTab="tab" :title="accountName" :username="currentUser" :tabs="tabs"></UIAppBar>
        <UINavigationDrawer 
            v-model:side-panel-open-flag="drawerOpening" 
            v-model:add-account-flag="addAccountFlag" 
            v-model:join-account="joinAccount"
            :username="currentUser"
            :accounts="accountsList"
            @selected-account-changed="onAccountSelectionChange"
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
import { onBeforeMount } from 'vue'
import AccountDetails from '@/components/AccountDetails.vue';
import AccountSummary from '@/components/AccountSummary.vue';
import AddAccountDialog from '@/components/AddAccountDialog.vue';
import UIAppBar from '@/widgets/UIAppBar.vue';
import UINavigationDrawer from '@/widgets/UINavigationDrawer.vue';
import { computed, ref, watch } from 'vue';
import { Category, Account, AccountImpl, DBObject } from '@/model/componentModel'
import { useAccountDataStore } from '@/store/globalStore'
import { dbManagerInterface } from '@/controller/dbManagerInterface';
import { useDataSyncManager } from '@/store/DataSyncManager';

const dataSyncManager = useDataSyncManager
const store = useAccountDataStore()
const accountsList = computed(() => { return store.accountsList });
const accountName = computed(() => { return store.currentAccount.data.name });
const dataLoadPending = ref(true) // Init of component is about loading data
const currentUser = ref("UserName")
const drawerOpening = ref(false)
const joinAccount=ref(false)
const tab = ref("Expenses")

const tabs = ref([
    "Detailed", "Summary", "Account Setup", "Exports"
])

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

function onAccountSelectionChange(item:DBObject<Account>, index:number)
{
    console.log("onAccountSelectionChange " + JSON.stringify(item) + " at " + index)
    store.currentAccount = item
    dataSyncManager.syncCurrentAccount(() => {
        console.log("Current Account Synched")
    })
}

onBeforeMount(() => {
  console.log(`the component is now mounted.`)

  // Start loading stuff:
  dataSyncManager.syncData(() => {
    dataLoadPending.value = false

    // If no account is associated to the User, open the Add Account Dialog:
    if(store.currentUser.value.accounts.length === 0)
    {
        addAccountFlag.value = true
    }

    console.log("Loaded categories " + JSON.stringify(store.currentCategories))
  })
})



</script>