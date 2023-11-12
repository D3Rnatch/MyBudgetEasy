<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="secondary-darken-1">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
</template>

<script setup lang="ts">

import AccountDetails from '@/components/AccountDetails.vue';
import AccountSummary from '@/components/AccountSummary.vue';
import { ref, computed } from 'vue';

const accountName = ref("AccountName")
const currentUser = ref("UserName")

const tab = ref("Expenses")

const tabs = ref([
    "Detailed", "Summary", "Account Setup", "Exports"
])

</script>