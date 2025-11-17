<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <div class="tags">
      <router-link 
        v-for="tag in uniqueTags" 
        :key="tag" 
        :to="`/tags/${tag}`" 
        class="tag-link"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagCloud",
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  computed: {
    // Extraire les tags uniques de tous les posts
    uniqueTags() {
      const tagsSet = new Set();
      this.posts.forEach(post => {
        (post.tags || []).forEach(tag => tagsSet.add(tag));
      });
      return Array.from(tagsSet);
    }
  }
}
</script>

<style scoped>
.tag-cloud {
  padding: 10px;
  border-left: 2px solid #ddd;
  margin-left: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag-link {
  padding: 4px 8px;
  background-color: #eee;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
}

.tag-link:hover {
  background-color: #ddd;
  color: #000;
}
</style>
