<template>
  <SectionBox>
    <form @submit.prevent="retrieveMaterial" class="mb-4 grid grid-cols-5 gap-2 items-center">
        <label for="materialId" class="block text-gray-700 mr-2 min-w-max col-span-1">Material ID:</label>
        <input type="text" id="materialId" v-model="materialId"
               class=" col-span-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <button type="submit"  class="col-span-1 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline">
          Search
      </button>
    </form>

    <div v-if="material">
      <p><span class="font-semibold">Formula: </span>{{ material.formula }}</p>
      <p><span class="font-semibold">Density: </span>{{ material.density }}</p>
    </div>
    <p v-else-if="error" class="text-red-500">{{errorMessage}}</p>
  </SectionBox>
</template>

<script>
import SectionBox from "@/components/UI/SectionBox.vue";
import axios from "axios";

export default {
  name: 'SearchMaterial',
  components: {
    SectionBox
  },
  data() {
    return {
      materialId: '',
      material: null,
      error: false,
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async retrieveMaterial() {
      this.material = null;
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:8000/material/${this.materialId}`);
        this.material = response.data;
      } catch (error) {
        this.errorMessage = error.message
        console.error('Error retrieving material:', error);
        this.error = true;
        this.loading = false;
      } finally {
        this.loading = false;

      }
    }
  }
};

</script>
