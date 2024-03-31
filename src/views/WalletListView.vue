<template>
    <v-main>
        <v-container>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <div class="text-h5 text-uppercase ma-2 text-primary-lighten-1 font-weight-black">WELCOME BACK,</div>
                    <div class="text-h5 text-uppercase ma-2 text-primary-lighten-1 font-weight-black">{{ userName }} !</div>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        text="JOIN"
                        class="mt-2 font-size:24px; font-weight-bold text-uppercase ma-2"
                    >
                    </v-btn> 
                </v-col>
                <v-col>
                    <v-btn
                        text="ADD"
                        class="mt-2 font-size:24px; font-weight-bold text-uppercase ma-2"
                        @click="onAddWalletClicked"
                    >
                    </v-btn> 
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-divider :thickness="1" class="border-opacity-100" color="white"></v-divider>
                </v-col>
            </v-row>
            <v-row v-if="dataLoadPending">
                <v-spacer></v-spacer>
                <v-col>
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
            <v-row v-if="!dataLoadPending">
                <v-col>
                    <!-- List of accounts to be put there -->
                    <v-list class="the-list">
                        <v-list-item v-for="(item) in walletList" :key="item.id">
                            <UIWalletListItem width="70%" :title="item.data.name" :data="item.id" @click="displayAccount" />
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<style>
.the-list {
  background-color: rgb(var(--v-theme-background)) !important;
}
</style>

<script setup lang="ts">
import { useDataSyncManager } from '@/store/DataSyncManager';
import { useAccountDataStore } from '@/store/globalStore';
import { computed, onBeforeMount, ref } from 'vue';
import UIWalletListItem from '@/widgets/UIWalletListItem.vue';
import { useRouter } from 'vue-router';

const dataSyncManager = useDataSyncManager
const store = useAccountDataStore()
const userName = ref("--")
const dataLoadPending = ref(true)
const router = useRouter()

const walletList = computed(() => {
    return store.accountsList
})

function displayAccount(data:string)
{
    console.log("Test " + data)
}

function onAddWalletClicked()
{
    router.push('createwallet')
}

onBeforeMount(() => {
  // Start loading stuff:
  dataSyncManager.syncData(() => {
    dataLoadPending.value = false

    userName.value = store.currentUser.name
  })
})


</script>