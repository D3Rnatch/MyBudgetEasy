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
                                    <v-btn density="comfortable" icon="mdi-pencil" class="d-flex mr-2 mb-4" @click="editExpense = true" :disabled="selectedItem.index === -1"></v-btn>
                                    <v-btn density="comfortable" icon="mdi-delete" class="d-flex mr-2 mb-4" @click="onDelete" :disabled="selectedItem.index === -1"></v-btn>
                        </div>
                    </div>
                    <div class="d-flex flex-column">
                        <UIAccountExpenseList :items="items" :categories="categoryMap" v-model="selectedItem" class="w-100 h-100"></UIAccountExpenseList>
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
    <EditExpenseItemDialog v-model="addExpense" :edit="false" :categories="categories" :categoryMap="categoryMap" :users="users" v-model:item="newItem" @save-clicked="onAddEditExpenseSaveClicked"></EditExpenseItemDialog>
    <EditExpenseItemDialog v-model="editExpense" :edit="true" v-model:item="selectedItem.data" :categories="categories" :categoryMap="categoryMap" :users="users" @save-clicked="onAddEditExpenseSaveClicked"></EditExpenseItemDialog>

</template>

<script setup lang="ts">
import UIAccountExpenseList from '@/widgets/UIAccountExpenseList.vue';
import EditExpenseItemDialog from '@/components/EditExpenseItemDialog.vue';
import { ExpenseItem, ExpenseItemImpl, ExpenseItemSelection, ExpenseItemSelectionImpl } from '@/model/componentModel'
import { useAccountDataStore } from '@/store/globalStore'
import { ref, watch, computed } from 'vue';
import { useDataSyncManager } from '@/store/DataSyncManager'
const store = useAccountDataStore()

const items = computed(() => { return store.accountExpenses });

const addExpense = ref<boolean>(false)
const editExpense = ref<boolean>(false)

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

const categories = computed(() => { return store.currentCategories })
const categoryMap = computed(() => { return store.categoriesDetails })
const users = computed(() => { return store.currentAccount.data.users } )

const selectedItem = ref<ExpenseItemSelection>(new ExpenseItemSelectionImpl as ExpenseItemSelection)

const newItem = ref(new ExpenseItemImpl)

function onDelete(){
    console.log("Delete")
}

function onAddEditExpenseSaveClicked()
{
    console.log("onAddEditExpenseSaveClicked " + JSON.stringify(newItem.value))
    // Sync with database the last received expense:
    const sync = useDataSyncManager
    sync.addExpenseToCurrentAccount(newItem.value)
}

watch(newItem, () => {
    console.log("Has changed " + JSON.stringify(newItem.value))
})

watch(selectedItem, () => {
    console.log("Is SelectedItem defined " + selectedItem.value.data.description)
})

</script>