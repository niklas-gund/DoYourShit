<template>
  <div class="font-bold">{{ title }}</div>
  <draggable class="list-group" v-model="list" group="todo" itemKey="id"
    @change="() => { DYSStore.sortAllByPriority(); DYSStore.saveData() }">
    <template #item="{ element, index }">
      <div class="list-group-item px-4 py-2 rounded mb-4"
        :style="`background: ${colorPallette.get(element.priority)};color:${(element.priority == PRIORITY.LOW || element.priority == PRIORITY.LOWEST) ? 'black' : 'white'};`">
        <div class="flex">
          <div class="font-bold line">{{ element.title }}</div>
          <button @click="() => router.push('/edit/' + element.id)" class="group ms-auto hover:bg-white px-1 rounded">
            <div class="group-hover:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg></div>
          </button>
        </div>
        <div>{{ element.description == "" ? "<no description>" : element.description }}</div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { Ref, ref, PropType, toRefs } from "vue";
import draggable from "vuedraggable"
import DYSStore, { Item, PRIORITY } from "../store/localStoragePersistor";
import { useRouter } from "vue-router";
const props = defineProps({
  title: { type: String, required: true },
  list: { type: Object as PropType<Ref<Item[]>>, required: true }
})

const router = useRouter()

const colorPallette = new Map<PRIORITY, string>()
colorPallette.set(PRIORITY.HIGHEST, "#003049")
colorPallette.set(PRIORITY.HIGH, "#D62828")
colorPallette.set(PRIORITY.MEDIUM, "#F77F00")
colorPallette.set(PRIORITY.LOW, "#FCBF49")
colorPallette.set(PRIORITY.LOWEST, "#EAE2B7")

const { title, list } = toRefs(props)
</script>