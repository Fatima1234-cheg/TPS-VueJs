<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body ? post.body.substring(0, 50) : "" }}...</p>
    <p>{{ (post.tags || []).join(", ") }}</p>

    <router-link :to="`/posts/${post.id}`">
      <button class="details-btn">Voir détails</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  props: {
    post: { type: Object, required: true }
  }
}
</script>

<style scoped>
.post {
  flex: 1 1 calc(25% - 20px);
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
  text-align: center;
}

.post:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.post h3 {
  margin: 0 0 5px 0;
}

.post p {
  margin: 3px 0;
}

.details-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.details-btn:hover {
  background-color: #053267;
}

/* Responsive */
@media (max-width: 1200px) {
  .post { flex: 1 1 calc(33.33% - 20px); }
}

@media (max-width: 900px) {
  .post { flex: 1 1 calc(50% - 20px); }
}

@media (max-width: 600px) {
  .post { flex: 1 1 100%; }
}
</style>
