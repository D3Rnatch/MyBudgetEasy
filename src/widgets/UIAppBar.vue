<template>
    <v-app-bar color="secondary-darken-1">
        <v-app-bar-nav-icon @click="drawerOpening = !drawerOpening"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ props.title }}</v-toolbar-title>
        <template v-slot:extension>
            <v-tabs
            v-model="selectedTab"
            align-tabs="title"
            >
                <v-tab
                    v-for="(item, index) in props.tabs"
                    :key="index"
                    :value="index"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
        </template>
        <div class="d-flex">
            <v-icon :icon="'mdi-account-circle'" class="ma-4 mr-0"></v-icon>
            <p class="ma-4">{{ props.username }}</p>
        </div>
    </v-app-bar>

</template>

<script setup lang="ts">

import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps<{ title:string, username:string, tabs:string[], sidePanelOpenFlag:boolean, selectedTab:string }>()

const emits = defineEmits(['update:sidePanelOpenFlag', 'update:selectedTab'])

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

const selectedTab = computed({
    get()
    {
        return props.selectedTab
    },
    set(value:string)
    {
        emits('update:selectedTab', value)
    }
})

</script>