<template>
  <input type="text" id="includeElements" v-model="inputValue" @keydown.enter="addToList"
         placeholder="Press enter to insert" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
</template>

<script setup>
import { ref, defineEmits } from "vue";

const inputValue = ref('');
const emitSearchListUpdate = defineEmits(['searchListUpdate']);

let list = [];
const addToList = () => {
  const trimmedElement = inputValue.value.trim();
  if (trimmedElement) {
    list = [...list, trimmedElement];
    inputValue.value = '';
    emitSearchListUpdate('searchListUpdate', list);
  }
}
</script>
