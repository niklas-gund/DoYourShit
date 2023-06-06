<template>
  <div class="flex gap-2 mt-4 h-full">
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Backlog"></DraggableList>
    </div>
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Doing"></DraggableList>
    </div>
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Done"></DraggableList>
    </div>
  </div>
</template>

<script setup lang="ts">
import DraggableList from './DraggableList.vue';

</script>