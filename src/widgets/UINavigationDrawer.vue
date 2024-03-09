<template>
    <v-navigation-drawer
        v-model="drawerOpening"
        width="300"
        temporary
    >
        <div class="d-flex flex-row justify-space-between">
            <v-list-item
                prepend-icon="mdi-account-circle"
                :title="props.username"
            ></v-list-item>
            <v-btn density="comfortable" icon="mdi-plus" @click="addAccountFlag = true"></v-btn>
        </div>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-for="(item, i) in props.accounts" :key="i" :value="i" prepend-icon="mdi-view-dashboard" :title="item.data.name" @click="emits('selectedAccountChanged',item, i)">
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn prepend-icon="mdi-logout" @click="emits('logoutClicked')">
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">

import { defineProps, defineEmits, ref, computed } from 'vue'
import { Account, DBObject } from '@/model/componentModel'

const props = defineProps<{ sidePanelOpenFlag:boolean, addAccountFlag:boolean, joinAccount:boolean, username:string, accounts:DBObject<Account>[] }>()

const emits = defineEmits(['update:sidePanelOpenFlag', 'update:addAccountFlag', 'logoutClicked', 'update:joinAccount', 'selectedAccountChanged'])

const drawerOpening = computed({
    get()
    {
        return props.sidePanelOpenFlag
    },
    set(value:boolean)
    {
        emits('update:sidePanelOpenFlag', value)
    }
})

const addAccountFlag = computed({
    get()
    {
        return props.addAccountFlag
    },
    set(value:boolean)
    {
        emits('update:addAccountFlag', value)
    }
})

const joinAccount = computed({
    get()
    {
        return props.joinAccount
    },
    set(value:boolean)
    {
        emits('update:joinAccount', value)
    }
})

</script>