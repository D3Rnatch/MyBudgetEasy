<template>
  <v-app full-height>
    <router-view/>
  </v-app>
</template>

<style>
.background {
  height:100vh;
  width: 100lvw;
  background-color: rgb(var(--v-theme-background));
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script setup lang="ts">

  // screen.orientation.lock("portrait-primary");

</script>
