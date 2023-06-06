<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import ThreeLists from "./components/ThreeLists.vue"

</script>

<template>
  <main class="container mx-auto">
    <NavBar></NavBar>
    <RouterView>
    </RouterView>
  </main>
  
</template>

<style>

</style>
