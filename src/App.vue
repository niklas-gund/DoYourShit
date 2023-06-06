<script setup lang="ts">
import { useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';
import ThreeLists from "./components/ThreeLists.vue"
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => router.push("/"))

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
