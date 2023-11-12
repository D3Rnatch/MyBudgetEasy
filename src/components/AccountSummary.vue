<template>
    <v-container>
        <v-row>
            <v-col>
                <v-sheet :elevation="10" color="grey-lighten-2" rounded class="d-flex flex-column ml-4">
                    <UIAccountOverview :categories="categories"></UIAccountOverview>
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet :elevation="10" color="grey-lighten-2" rounded class="d-flex flex-column ml-4">
                    <UIAccountSummary  :income=155 :outcome=358 :highest=75></UIAccountSummary>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import UIAccountSummary from '@/widgets/UIAccountSummary.vue';
import UIAccountOverview from '@/widgets/UIAccountOverview.vue';

import { ref } from 'vue'

const categories = ref([
    {title: "Title1", color:"#0c0c0c", max:253, amount: 300},
    {title: "Title2", color:"cyan", max:278, amount: 90},
    {title: "Title3", color:"#555555", max:115, amount: 50},
    {title: "Title3", color:"#555555", max:115, amount: 50},
])

</script>