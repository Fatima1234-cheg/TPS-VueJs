<template>
  <div>
    <b-row>
      <b-col cols="4">
        <b-card title="Catégorie">
          <h5>{{ category?.name }}</h5>
          <p>{{ category?.description }}</p>
        </b-card>
      </b-col>

      <b-col cols="8">
        <b-card>
          <h5>Discussions dans cette catégorie</h5>
          <Loader v-if="loading" />
          <div v-else>
            <DiscussionCard v-for="d in discussions" :key="d.id" :discussion="d" />
            <div v-if="discussions.length === 0" class="text-muted">Aucune discussion dans cette catégorie.</div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { doc, getDoc, collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebase/config';
import DiscussionCard from '../components/DiscussionList.vue';
import Loader from '../components/AdminPanel.vue';

export default {
  components: { DiscussionCard, Loader },
  props: ['id'],
  setup(props) {
    const category = ref(null);
    const discussions = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      // récupérer la catégorie (si tu stockes des catégories)
      const catRef = doc(db, "categories", props.id);
      const snap = await getDoc(catRef);
      if (snap.exists()) category.value = snap.data();

      // écouter discussions de la catégorie
      const q = query(collection(db, "discussions"), where("categoryId", "==", props.id), orderBy("createdAt", "desc"));
      onSnapshot(q, snap => {
        discussions.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        loading.value = false;
      }, err => {
        console.error(err);
        loading.value = false;
      });
    });

    return { category, discussions, loading };
  }
};
</script>
