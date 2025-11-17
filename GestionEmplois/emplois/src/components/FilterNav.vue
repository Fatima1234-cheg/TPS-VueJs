<template>
  <div class="filter-nav">
    <input 
      type="text" 
      v-model="searchTerm" 
      placeholder="Rechercher un job par titre..."
      @input="sendFilter"
    />
  </div>
</template>

<script>
export default {
  name: "FilterNav",
  data() {
    return {
      searchTerm: ""
    }
  },
  methods: {
    sendFilter() {
      this.$emit("filter-jobs", this.searchTerm);
    }
  }
}
</script>

<style>
.filter-nav input {
  padding: 8px;
  margin-bottom: 12px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
