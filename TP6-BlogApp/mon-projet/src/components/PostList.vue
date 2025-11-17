<template>
  <div>
    <NavBar /> <!-- barre de navigation en haut -->
    
    <div v-if="post" class="post-container">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <p>Tags: 
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPost } from "@/composables/getPost.js";
import NavBar from "@/components/NavBar.vue"; 

export default {
  components: { NavBar },
  setup() {
    const route = useRoute();
    const post = ref(null);

    onMounted(async () => {
      const id = route.params.id;
      post.value = await getPost(id);
    });

    return { post };
  }
}
</script>

<style scoped>
.post-container {
  max-width: 600px;        
  margin: 120px auto;       /* espace entre navbar et conteneur */
  padding: 20px;           
  border: 2px solid #333;  
  border-radius: 10px;     
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
  text-align: center;      
  background-color: #f9f9f9; 
}
.post-container span {
  display: inline-block;
  margin: 0 5px;
  padding: 2px 8px;
  background-color: #e0e0e0;
  border-radius: 5px;
}
</style>
