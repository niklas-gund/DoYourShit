<template>
  <div class="font-bold">{{ title }}</div>
  <draggable class="list-group" v-model="exampleList" group="todo" itemKey="id">
    <template #item="{element, index}">
      <div class="list-group-item px-4 py-2 rounded bg-gray-200 mb-4">
        <div class="font-bold line">{{ element.title }}</div>
        <div>{{ element.description }}</div>
        <div>{{ element.id }}</div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import draggable from "vuedraggable"
const props = defineProps({
  title: {type:String, required:true}
})

let exampleList = ref([{
  title:"Do something",
  description: "It would be better that way!",
  id: (Math.random()*100000).toString(36),
  priority: 1
},
{
  title:"Do something less important",
  description: "It would be better that way!",
  id: (Math.random()*100000).toString(36),
  priority: 2
},
{
  title:"Do something maybe",
  description: "It would be better that way!",
  id: (Math.random()*100000).toString(36),
  priority: 3
}])
</script>