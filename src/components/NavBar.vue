<template>
  <div class="bg-gray-100 py-4 rounded-b-lg px-4 flex">
    <div class="my-auto font-bold text-4xl">DO YOUR 💩</div>
    <div class="my-auto ml-auto">Backlog: {{ DYSStore.backlog.value.length }} Doing: {{ DYSStore.backlog.value.length }} Done: {{ DYSStore.backlog.value.length }}</div>
  </div>
</template>

<script setup lang="ts">
import DYSStore from '../store/localStoragePersistor';


</script>