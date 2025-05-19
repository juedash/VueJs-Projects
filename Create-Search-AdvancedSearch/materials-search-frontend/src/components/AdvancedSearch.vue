<template>
<h2 class="text-left mb-6 leading-3 font-semibold">Filter Material</h2>
    <form @submit.prevent="searchMaterials" class="mb-4 text-left grid xl:grid-cols-5 sm:grid-col-3 gap-2">
      <div class="col-span-1">
        <label for="minDensity" class="block text-gray-700 mr-2">Minimal Density:</label>
        <input type="number" id="minDensity" v-model="minDensity" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="col-span-1">
        <label for="maxDensity" class="block text-gray-700 mr-2">Maximal Density:</label>
        <input type="number" id="maxDensity" v-model="maxDensity" required
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="col-span-1">
        <label for="includeElements" class="block  text-gray-700 mr-2">Elements to Include:</label>
        <MultipleSelect @searchListUpdate="includeElements=$event"/>
      </div>
      <div class="col-span-1">
        <label for="excludeElements" class="block  text-gray-700 mr-2">Elements to Exclude:</label>
        <MultipleSelect @searchListUpdate="excludeElements=$event"/>
      </div>
      <button type="submit" class="h-max w-full self-end mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Filter
      </button>
    </form>
  <div class="grid-cols-5">
    <div class="col-start-4 col-end-5 mb-2" v-if="includeElements.length">Include elements: <span v-for="(element, index) in includeElements" :key="index" class="bg-gray-200 py-0.5 px-1 mx-1 rounded-md">{{ element }}</span>
    </div>
    <div class="col-start-4 col-end-5" v-if="excludeElements.length">Exclude elements: <span v-for="(element, index) in excludeElements" :key="index" class="bg-gray-200 py-0.5 px-1 mx-1 rounded-md">{{ element }}</span>
    </div>
  </div>
  <div class="w-full md:max-w-xl md:mx-auto mt-8">
    <ResultsTable :data="searchResults" v-if="searchResults && searchResults.length > 0" />
    <p v-else-if="error" class="mt-4 text-red-500 ">{{errorMessage}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import ResultsTable from "@/components/UI/ResultsTable.vue";
import MultipleSelect from "@/components/UI/MultipleSelect.vue";

export default {
  components: {
    ResultsTable,
    MultipleSelect
  },
  data() {
    return {
      minDensity: null,
      maxDensity: null,
      includeElements: [],
      excludeElements: [],
      searchResults: [],
      error: false,
      errorMessage: '',
      loading: false
    };
  },
  mounted() {
    this.searchMaterials();
  },
  methods: {
    async searchMaterials() {
      try {
        const params = {
          'min-density': this.minDensity,
          'max-density': this.maxDensity
        };

        if (this.includeElements.length > 0) {
          params['include-elements'] = this.includeElements;
        }

        if (this.excludeElements.length > 0) {
          params['exclude-elements'] = this.excludeElements;
        }
        this.loading = true;
        const response = await axios.get('http://localhost:8000/search', { params });
        this.searchResults = response.data;
        this.error = false; // Reset error flag upon successful response
      } catch (error) {
        this.loading = false
        console.error('Error searching materials:', error);
        this.searchResults = [];
        this.error = true;
        this.errorMessage= error.message
      } finally {
        this.loading = false
      }
    }
  }
};

</script>