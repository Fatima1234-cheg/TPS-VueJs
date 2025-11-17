<template>
  <div>
    <NavBar />

    <form @submit.prevent="addPost" class="post-form">
      <h1>Créer un nouveau post</h1>

      <div class="form-group">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="body">Contenu :</label>
        <textarea id="body" v-model="body" required></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags (séparés par des virgules) :</label>
        <input type="text" id="tags" v-model="tagsInput" placeholder="ex: tech, vue, blog" />
      </div>

      <button type="submit">Ajouter le post</button>
    </form>

    <!-- POPUP -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <h2>Post créé :</h2>
        <p><strong>Titre :</strong> {{ newPost.title }}</p>
        <p><strong>Body :</strong> {{ newPost.body }}</p>
        <p><strong>Tags :</strong> {{ newPost.tags.join(', ') }}</p>

        <button class="close-btn" @click="closePopup">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CreatePostView",
  components: { NavBar },
  data() {
    return {
      title: "",
      body: "",
      tagsInput: "",
      newPost: null,
      showPopup: false
    };
  },

  methods: {
   addPost() {

  // Construire ton objet newPost ici
  this.newPost = {
    title: this.title,
    body: this.body,
    tags: this.tagsInput
      ? this.tagsInput.split(",").map(t => t.trim())
      : []
  };

  // Envoyer au JSON server
  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.newPost)
  })
  .then(response => response.json())
 
    this.showPopup = true;

    // Réinitialiser les champs
    this.title = "";
    this.body = "";
    this.tagsInput = "";
}
,

    closePopup() {
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
.post-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.post-form h1 {
  text-align: center;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #0056b3;
  color: white;
  border: none;
  width: 600px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 19px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #053267;
}

/* POPUP */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.close-btn {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: #444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.close-btn:hover {
  background: #222;
}
</style>
