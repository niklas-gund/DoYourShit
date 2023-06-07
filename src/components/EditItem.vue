<template>
  <div class="mt-2 flex">
    <div class="mx-auto w-1/3 bg-gray-100 p-4 rounded">
      <div class="text-xl font-bold mb-6">{{ pageTitle }}</div>
      <div class="grid grid-cols-3 gap-1">
        <div>Title:</div>
        <input class="col-span-2 border-2 rounded-md border-gray-500 focus:border-blue-500 px-2" placeholder="A cool item"
          type="text" v-model="title" />
      </div>
      <div class="grid grid-cols-3 gap-1 mt-4">
        <div>Priority:</div>
        <select v-model="priority" class="px-2 py-1">
          <option :value="PRIORITY.HIGHEST">Highest</option>
          <option :value="PRIORITY.HIGH">High</option>
          <option :value="PRIORITY.MEDIUM">Medium</option>
          <option :value="PRIORITY.LOW">Low</option>
          <option :value="PRIORITY.LOWEST">Lowest</option>
        </select>
      </div>
      <div class="grid grid-cols-3 gap-1 mt-4">
        <div>Description:</div>
        <textarea class="col-span-3 h-32 border-2 rounded-md border-gray-500 focus:border-blue-500 px-2 resize-none"
          placeholder="Short description" v-model="description" />
      </div>
      <div class="flex mt-4">
        <button v-if="completed" @click="saveItem()"
          class="ms-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SAVE</button>
        <button v-if="completed && !itemWithID" @click="saveItem()"
          class="ms-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">ADD MORE</button>
        <button v-if="itemWithID" @click="removeItem()"
          class="ms-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">REMOVE</button>
        <button @click="router.push('/')"
          :class="`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${completed ? 'ml-4' : 'ml-auto'}`">CANCEL</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import DYSStore, { Item, ItemState, PRIORITY } from "../store/localStoragePersistor";

const pageTitle = ref("Create new item")

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id.toString());
const title = ref("")
const description = ref("")
const priority = ref(PRIORITY.MEDIUM)

const completed = computed(() => {
  return title.value != ""
})

// check if element already exists
const itemWithID = DYSStore.getItemByID(id);
if (itemWithID != null) {
  pageTitle.value = "Edit item"
  title.value = itemWithID.title
  description.value = itemWithID.description
  priority.value = itemWithID.priority
}

function saveItem(addMore = false) {
  if (itemWithID) {
    DYSStore.editItem(title.value, description.value, priority.value, id)
    router.push("/");
    return;
  } else {
    // create new item
    DYSStore.addItem(title.value, description.value, priority.value, ItemState.BACKLOG)
  }
  if (addMore) {
    router.push("/edit/" + DYSStore.nextID)
  }
  else {
    router.push("/")
  }
}

function removeItem() {
  DYSStore.removeItemByID(id);
  router.push("/")
}

</script>