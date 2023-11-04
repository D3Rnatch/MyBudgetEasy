<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Application bar"></v-app-bar>
        <v-main>
            <v-container>
                <v-row align="start" justify="start" no-gutters>
                    <v-col cols="8">
                            <v-table
                                fixed-header
                            >
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                        Name
                                        </th>
                                        <th class="text-left">
                                        Calories
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </v-table>
                    </v-col>
                    <v-col>
                        <UIAccountSummary :income=155 :outcome=358 :highest=75></UIAccountSummary>
                        <UIAccountOverview :categories="categories"></UIAccountOverview>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">

import UIAccountSummary from '@/widgets/UIAccountSummary.vue';
import UIAccountOverview from '@/widgets/UIAccountOverview.vue';
import { ref } from 'vue';

const categories = ref([
    {title: "Title1", color:"#0c0c0c", max:253, amount: 300},
    {title: "Title2", color:"cyan", max:278, amount: 90},
    {title: "Title3", color:"#555555", max:115, amount: 50},
    {title: "Title3", color:"#555555", max:115, amount: 50},
])

</script>