<template>
<v-card :color="color"  class="pa-2" :width="width">
    <template v-slot:title>
        <div class="mt-2 font-weight-normal text-uppercase ma-2">{{ title }}</div>
    </template>
    <template v-slot:text>
        <div class="d-flex flex-row">
            <v-text-field
                v-model="itemToAdd"
                required
                clearable
                clear-icon="mdi-close"
                variant="solo-filled"
                label="Add"
                bg-color="primary-lighten-1"
                density="compact"
                rounded
            ></v-text-field>
            <v-btn
                class="ml-2 font-size:24px; font-weight-bold font-capitalize elevation-8"
                icon
                :disabled="!itemToAdd"
                @click="addItemToList"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <v-divider :thickness="1" class="border-opacity-100" color="white"></v-divider>
        <v-list :max-height="maxHeight" :bg-color="color">
            <v-list-item v-for="(item, index) in itemList" :key="index">
                <v-card height="45" color="primary-lighten-2" compact>
                <v-container>
                    <v-row dense>
                        <v-col cols="8">
                            <div class="font-size:10px;">{{item}}</div>
                        </v-col>
                        <v-col>
                            <v-icon @click="removeItemFromList(index)">mdi-trash-can-outline</v-icon>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card>
            </v-list-item>
        </v-list>
    </template>
</v-card>

</template>

<style>
</style>

<script setup lang="ts">
import { computed, ref, defineEmits, defineProps } from 'vue';


const props = defineProps<{ width:string, maxHeight:string, color:string, title:string}>()
const emit = defineEmits(['itemListChanged'])

const width = computed(() => { return props.width })
const title = computed(() => { return props.title })
const color = computed(() => { return props.color })

const itemToAdd = ref("")
const itemList = ref(new Array<string>())


function addItemToList()
{
    itemList.value.push(itemToAdd.value)
    itemToAdd.value = ""
    emit('itemListChanged', itemList.value)
}

function removeItemFromList(index:number)
{
    itemList.value.splice(index, 1)
    emit('itemListChanged', itemList.value)
}

</script>