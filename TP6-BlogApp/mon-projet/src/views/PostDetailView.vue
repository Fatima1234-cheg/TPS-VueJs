<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <!-- Conteneur du post -->
    <div v-if="post" class="post-detail-container">
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-body">{{ post.body }}</p>

      <!-- Tags -->
      <div class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">
          <router-link :to="`/tags/${tag}`">{{ tag }}</router-link>
        </span>
      </div>
    </div>

    <!-- TagCloud à droite -->
    <TagCloud class="tag-cloud" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TagCloud from "@/components/TagCloud.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPost } from "@/composables/getPost.js";

export default {
  components: { NavBar, TagCloud },
  setup() {
    const route = useRoute();
    const post = ref(null);

    onMounted(async () => {
      try {
        const id = route.params.id;
        post.value = await getPost(id);
      } catch (error) {
        console.error("Erreur lors de la récupération du post :", error);
      }
    });

    return { post };
  },
};
</script>

<style scoped>
/* Conteneur principal */
.post-detail-container {
  max-width: 800px;
  margin: 100px auto;
  padding: 25px;
  border: 2px solid #333;
  border-radius: 10px;
  background-color: #fdfdfd;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: left;
}

/* Titre du post */
.post-title {
  font-size: 2em;
  margin-bottom: 15px;
  color: #222;
}

/* Corps du post */
.post-body {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Tags */
.tags {
  margin-top: 15px;
}
.tag {
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  transition: 0.2s;
}
.tag:hover {
  background-color: #c0c0c0;
}

/* Style TagCloud */
.tag-cloud {
  position: absolute;
  top: 120px;
  right: 50px;
}

/* Responsive */
@media (max-width: 900px) {
  .tag-cloud {
    position: static;
    margin-top: 20px;
  }
}
</style>
