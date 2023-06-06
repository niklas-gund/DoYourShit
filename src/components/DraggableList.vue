<template>
  <div class="font-bold">{{ title }}</div>
  <draggable class="list-group" v-model="list" group="todo" itemKey="id" @change="() => {DYSStore.sortAllByPriority();DYSStore.saveData()}">
    <template #item="{element, index}">
      <div class="list-group-item px-4 py-2 rounded mb-4" :style="`background: ${colorPallette.get(element.priority)};color:${(element.priority==PRIORITY.LOW||element.priority ==PRIORITY.LOWEST)?'black':'white'};`">
        <div class="font-bold line">{{ element.title }}</div>
        <div >{{ element.description == ""?"<no description>":element.description }}</div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { Ref, ref, PropType, toRefs } from "vue";
import draggable from "vuedraggable"
import DYSStore, { Item,PRIORITY } from "../store/localStoragePersistor";
const props = defineProps({
  title: {type:String, required:true},
  list: {type: Object as PropType<Ref<Item[]>>, required:true}
})

const colorPallette = new Map<PRIORITY,string>()
colorPallette.set(PRIORITY.HIGHEST,"#003049")
colorPallette.set(PRIORITY.HIGH, "#D62828")
colorPallette.set(PRIORITY.MEDIUM, "#F77F00")
colorPallette.set(PRIORITY.LOW, "#FCBF49")
colorPallette.set(PRIORITY.LOWEST, "#EAE2B7")

const {title, list} = toRefs(props)
</script>