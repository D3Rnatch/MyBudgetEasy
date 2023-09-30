<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
/*export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
}); */

import { useGlobalStore } from '@/store/globalStore'

const store = useGlobalStore()

console.log("Is User authenticated " + store.authenticated)

</script>
