<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs"  class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" @change="updateTab">
        <option v-for="tab in tabs"  @change="updateTab(tab)" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
        <a v-for="(tab, tabIdx) in tabs" @click="updateTab(tab)" :key="tab.name" :href="tab.href" :class="[tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10']" :aria-current="tab.current ? 'page' : undefined">
          <span>{{ tab.name }}</span>
          <span aria-hidden="true" :class="[tab.current ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
        </a>
      </nav>
    </div>
      <div class="mx-auto max-w-7xl px-4 mt-4 sm:mt-8 sm:p-6 lg:p-8">
        <div class="mx-auto">
          <component :is="currentTab"></component>
        </div>
      </div>

  </div>
</template>

<script setup>
import SearchMaterial from "@/components/SearchMaterial.vue";
import CreateMaterial from "@/components/CreateMaterial.vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";
import {computed, ref} from "vue";

const tabs = ref([
  { component: CreateMaterial, name: 'Create Material', href: '#', current: true },
  { component: SearchMaterial, name: 'Search Material', href: '#', current: false },
  { component: AdvancedSearch, name: 'Advanced Search', href: '#', current: false },
]);

const currentTab = computed(() => {
  const currentTabObject = tabs.value.find((tab) => tab.current);
  return currentTabObject ? currentTabObject.component : null;
});

const updateTab = (clickedTab) => {
  tabs.value.forEach((tab) => {
    tab.current = (tab === clickedTab);
  });
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
