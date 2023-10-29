<template>
    <v-card width="400">
        <v-card-title>
            This is a title
        </v-card-title>
        <v-card-item>
            Some Text BlaBla
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const accountName = ref("MyAccount")
</script>