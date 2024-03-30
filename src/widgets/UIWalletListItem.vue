<template>
    <v-card
        class="mx-auto"
        color="primary"
        :width="cardWidth"
        link
        @click="onClick"
    >
        <template v-slot:prepend>
            <img :src="image" width="32" height="32"/>
        </template>
        <template v-slot:title>
            <div class="mt-2 font-size:18px; font-weight-bold text-uppercase ma-2">{{ cardContent }}</div>
        </template>
    </v-card>

</template>


<script setup lang="ts">
import image from "@/assets/cash-cash.png"
import group from "@/assets/group.png"
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps<{ width:string, title:string, data?:string }>()
const emit = defineEmits(['click'])

const cardWidth = computed(() => { return props.width } )
const cardContent = computed(() => { return props.title } )

function onClick() {
    emit('click', props.data)
}

</script>