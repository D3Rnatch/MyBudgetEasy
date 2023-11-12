<template>
    <v-container>
        <v-row no-gutters >
            <v-col>
                <v-sheet :elevation="10" color="grey-lighten-2" rounded class="d-flex flex-column">
                    <div class="d-flex">
                        <v-combobox
                            v-model="selectedFilter"
                            :items="filters"
                            density="comfortable"
                            label="Display since"
                            class="pa-4"
                        ></v-combobox>
                        <v-combobox
                            v-model="selectedItemsPerPageFilter"
                            :items="itemsPerPageFilters"
                            density="comfortable"
                            label="Items per page"
                            rounded="1"
                            class="pa-4"
                        ></v-combobox>
                        <div class="d-flex flex-row pa-6 justify-end">
                                    <v-btn density="comfortable" icon="mdi-magnify" class="d-flex mr-2 mb-4"></v-btn>
                                    <v-btn density="comfortable" icon="mdi-plus" class="d-flex mr-2 mb-4" @click="addExpense = true"></v-btn>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <UIAccountExpenseList :items="items" class="w-100 h-100"></UIAccountExpenseList>
                        <v-pagination
                            v-model="currentPage"
                            :length="numberOfPages"
                            rounded="circle"
                        ></v-pagination>
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    <EditExpenseItemDialog v-model="addExpense" :edit=false></EditExpenseItemDialog>

</template>

<script setup lang="ts">
import UIAccountSummary from '@/widgets/UIAccountSummary.vue';
import UIAccountOverview from '@/widgets/UIAccountOverview.vue';
import UIAccountExpenseList from '@/widgets/UIAccountExpenseList.vue';
import EditExpenseItemDialog from '@/components/EditExpenseItemDialog.vue';

import { ref } from 'vue';

const items = ref([
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"}, {amount: 15, category:"Title2" } ], description:"BlaBlaBla", id:7, user:"Toto"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"sfgsdfgxbbxv", id:6, user:"Toto"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"BlaBlaBla", id:5, user:"Alex"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"BlaBlaBla", id:4, user:"Francis"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"BlaBla", id:3, user:"Toto"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"BlaBlaBla", id:2, user:"George"},
    {date:"2023/10/12", totalAmount: 27, amounts: [ {amount: 12, category:"Title1"} ], description:"BlaBlaBla", id:1, user:"Toto"},
])

const addExpense = ref(false)

const filters = ref([
    "Past Month",
    "2 Months",
    "3 Months"
])

const itemsPerPageFilters = ref([
    "30",
    "60",
    "all"
])
const selectedItemsPerPageFilter = ref("30")

const numberOfPages = ref(4)

const currentPage = ref(1)

const selectedFilter = ref("Past Month")

const categories = ref([
    {title: "Title1", color:"#0c0c0c", max:253, amount: 300},
    {title: "Title2", color:"cyan", max:278, amount: 90},
    {title: "Title3", color:"#555555", max:115, amount: 50},
    {title: "Title3", color:"#555555", max:115, amount: 50},
])

</script>