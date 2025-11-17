<template>
  <div>
    <NavBar />

    <h2 class="page-title">Liste des articles</h2>

    <div class="main-container">
      <!-- Posts -->
      <div class="posts-container">
        <SinglePost
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </div>
  </div>
      <!-- Tag Cloud à droite -->
      <div class="tagcloud-container">
        <h3>Tags</h3>
        <div class="tags">
          <span 
            v-for="tag in uniqueTags" 
            :key="tag"
            class="tag"
            :class="{ active: selectedTag === tag }"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </span>
          <span class="tag all" @click="selectTag(null)">Tous</span>
        </div>
    
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SinglePost from "@/components/SinglePost.vue";
import { getPosts } from "@/composables/getPosts";

export default {
  name: "HomePage",
  components: { NavBar, SinglePost },
  data() {
    return {
      posts: [],
      selectedTag: null
    };
  },
  computed: {
    // Extraire les tags uniques
    uniqueTags() {
      const allTags = this.posts.flatMap(post => post.tags || []);
      return [...new Set(allTags)];
    },
    // Filtrer les posts par tag sélectionné
    filteredPosts() {
      if (!this.selectedTag) return this.posts;
      return this.posts.filter(post => post.tags?.includes(this.selectedTag));
    }
  },
  methods: {
    selectTag(tag) {
      this.selectedTag = tag;
    }
  },
  async created() {
    try {
      this.posts = await getPosts();
    } catch (error) {
      console.error("Erreur lors de la récupération des posts :", error);
    }
  }
};
</script>

<style scoped>
.page-title {
  padding: 20px;
  font-size: 1.8em;
  text-align: center;
}

/* Conteneur principal flex : posts + tag cloud */
.main-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: flex-start;
}

/* Container des posts */
.posts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 3;
}

/* Container TagCloud */
.tagcloud-container {
  flex: 1;
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #f5f5f5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tag {
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tag.active {
  background-color: #0056b3;
  color: white;
}

.tag.all {
  background-color: #888;
  color: white;
}

.tag:hover {
  background-color: #0f529a;
  color: white;
}
</style>
