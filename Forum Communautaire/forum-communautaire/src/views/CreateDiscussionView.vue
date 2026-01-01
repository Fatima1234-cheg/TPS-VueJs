<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-card title="Créer une discussion">
        <b-form @submit.prevent="createDiscussion">
          <b-form-group label="Titre">
            <b-form-input v-model="title" required />
          </b-form-group>

          <b-form-group label="Catégorie (optionnel)">
            <b-form-select v-model="categoryId" :options="categoryOptions" />
          </b-form-group>

          <b-form-group label="Contenu">
            <b-form-textarea v-model="content" rows="6" required />
          </b-form-group>

          <b-button type="submit" variant="success">Publier</b-button>
        </b-form>

        <b-alert v-if="error" show variant="danger" class="mt-3">{{ error }}</b-alert>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const title = ref('');
    const content = ref('');
    const categoryId = ref('');
    const error = ref('');
    const categoryOptions = ref([]);
    const router = useRouter();

    onMounted(async () => {
      // charger options catégories (si présentes)
      try {
        const snap = await getDocs(collection(db, "categories"));
        categoryOptions.value = snap.docs.map(d => ({ value: d.id, text: d.data().name }));
      } catch (e) {
        console.warn("Pas de catégories", e);
      }
    });

    const createDiscussion = async () => {
      error.value = '';
      if (!auth.currentUser) {
        error.value = "Vous devez être connecté pour créer une discussion.";
        return;
      }
      try {
        await addDoc(collection(db, "discussions"), {
          title: title.value,
          content: content.value,
          authorId: auth.currentUser.uid,
          authorName: auth.currentUser.displayName || auth.currentUser.email,
          categoryId: categoryId.value || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        title.value = '';
        content.value = '';
        categoryId.value = '';
        router.push('/');
      } catch (e) {
        error.value = e.message;
      }
    };

    return { title, content, categoryId, error, categoryOptions, createDiscussion };
  }
};
</script>
