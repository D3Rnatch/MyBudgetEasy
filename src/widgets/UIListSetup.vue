<template>
        <v-text-field
            v-model="value"
            :append-icon="'mdi-plus'"
            variant="filled"
            clearable
            :label=props.title
            type="text"
            class="pt-6"
            :rules="[rules]"
            @click:append="addToList"
        ></v-text-field>
        <v-sheet border="md" class="pa-2 mx-auto">
        <v-list>
            <v-list-item v-for="(item, index) in tmpArray" :value="item" v-bind:key="item.title">
                <template v-slot:append>
                <v-icon :icon="'mdi-delete'" @click="removeItem(index)"></v-icon>
                </template>
                <v-list-item-title>
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
        </v-sheet>
</template>

<script setup lang="ts">
import { push } from 'firebase/database';
import { computed, ref, defineProps, defineEmits } from 'vue';

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
  listChanged: [list: Array]
}>()

const value = ref("")
const tmpArray = ref<ItemList[]>([])
const catNames = ref([])
const rules = computed(() => {
    const condition = (
        (props.notEmpty && (tmpArray.value.length > 0))
        || (!props.notEmpty)
    )

  return condition ? true : 'At least one item must be provided'
})


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