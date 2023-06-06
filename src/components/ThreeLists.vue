<template>
  <button @click="router.push('/edit/' + DYSStore.nextID.value)" class="rounded bg-green-500 h-8 w-8 flex items-center mt-2">
    <div class="m-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>
    </div>
  </button>
  <div class="flex gap-2 mt-2 h-full">
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Backlog" :list="DYSStore.backlog"></DraggableList>
    </div>
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Doing" :list="DYSStore.doing"></DraggableList>
    </div>
    <div class="bg-gray-100 p-4 h-full rounded w-full">
      <DraggableList title="Done" :list="DYSStore.done
      "></DraggableList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import DraggableList from "./DraggableList.vue";
import DYSStore from "../store/localStoragePersistor";

const router = useRouter();
</script>
