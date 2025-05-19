<template>
  <div>
    <table class="table-auto w-full">
      <thead>
      <tr>
        <th class="px-4 py-2 capitalize" v-for="(key, idx) in tableKeys" :key="idx">{{ key }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in props.data" :key="index">
        <td class="border px-4 py-2">{{ item.formula }}</td>
        <td class="border px-4 py-2">{{ item.density }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';
const props = defineProps({
  data: {
    type: Array,
  }
});

const tableKeys = computed(() =>{
  if (props.data.length > 0) {
    return Object.keys(props.data[0]);
  }
  return [];
});

</script>

<style>
/* Add your custom table styles here */
.table-auto {
  width: auto;
}
.table-auto th,
.table-auto td {
  border: 1px solid #e2e8f0;
}
</style>
