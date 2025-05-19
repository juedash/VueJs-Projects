<template>
      <SectionBox >
            <form @submit.prevent="createMaterial">
              <div class="mb-4 flex items-center">
                <label for="formula" class="block w-1/4  text-gray-700  mr-2">Formula:</label>
                <input type="text" id="formula" v-model="formula" required
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4 flex items-center">
                <label for="density" class="block  w-1/4  text-gray-700 mr-2 ">Density:</label>
                <input type="number" id="density" v-model="density" step="any" required min="0"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <button type="submit" class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Material
              </button>
            </form>

        <p class="mt-4" :class="creationResult ? 'text-green-500' : 'text-red-500'">
          {{ creationResult ? creationResult : errorResult }}
        </p>
      </SectionBox>
</template>

<script>
import axios from 'axios';
import SectionBox from "@/components/UI/SectionBox.vue";
export default {
  data() {
    return {
      formula: "",
      density: null,
      creationResult: "",
      errorResult: "",
      loading: false
    };
  },
  components: {
    SectionBox
  },
  methods: {
    async createMaterial() {
      this.loading = true
      try {
        const response = await axios.post('http://localhost:8000/material/', {
          formula: this.formula,
          density: this.density
        });
        this.creationResult = `Material created with ID: ${response.data}`;
      } catch (error) {
        console.error('Error creating material:', error);
        this.loading = false
        this.errorResult = error.message
      } finally {
        this.loading = false
      }
    }
  }
};
</script>
