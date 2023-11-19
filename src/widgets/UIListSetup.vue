<template>
        <!-- Defines the input to add an expense with input button -->
        <div class="d-flex flex-row">
        <v-text-field
            :label="props.title"
            v-model="value"
            class="mr-3"
            clearable
            clear-icon="mdi-close"
            variant="solo-filled"
            :rules="[rules]"
        ></v-text-field>
        <v-btn density="comfortable" icon="mdi-plus" class="ma-0 mt-3 mr-3" @click="addToList" :disabled="!value"></v-btn>
    </div>
    <v-list height="195" bg-color="grey-lighten-2">
        <v-list-item v-for="(item, index) in tmpArray" :key="index">
            <v-list-item-title>
                {{ item.title }}
            </v-list-item-title>
            <template v-slot:append>
                    <v-icon :icon="'mdi-delete'" @click="removeItem(index)"></v-icon>
            </template>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits } from 'vue';

//*************************************** */
// Component interface definition

interface ItemList{
    title:string,
    value:string
    props:any
}

const props = defineProps({
    title: { type: String, required: true },
    notEmpty: { type: Boolean, required: true }
})

const emit = defineEmits<{
  listChanged: [list: Array<ItemList>]
}>()

//*************************************** */
// Refs definition

const value = ref("")
const tmpArray = ref<ItemList[]>([])
const catNames = ref([])

//*************************************** */
// Computed definition

const rules = computed(() => {
    const condition = (
        (props.notEmpty && (tmpArray.value.length > 0))
        || (!props.notEmpty)
    )

  return condition ? true : 'At least one item must be provided'
})

//*************************************** */
// Component functions definition

function addToList(){
    if(value.value){
        tmpArray.value.push( { 
            title: value.value,
            value: value.value,
            props: {
                appendIcon: 'mdi-plus',
            }
        })
        catNames.value.push(value.value)

        value.value = ""

        emit('listChanged', catNames.value)
    }
}

function removeItem(index:number) {
    if(index >= 0 || index < tmpArray.value.length){
        tmpArray.value.splice(index, 1);
        catNames.value.splice(index, 1);
        emit('listChanged', catNames.value)
    }
}

</script>