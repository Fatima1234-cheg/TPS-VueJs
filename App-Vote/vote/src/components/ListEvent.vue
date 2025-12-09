<template>
  <div class="event-list">
    <h2>Événements</h2>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>Date: {{ formatDate(event.date) }}</p>
        <p>Yes: {{ event.yesVotes }} | No: {{ event.noVotes }}</p>
        <button @click="vote(event.id, 'yes')" :disabled="hasVoted(event.id)">Yes</button>
        <button @click="vote(event.id, 'no')" :disabled="hasVoted(event.id)">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, auth } from "../Firebase/config.js";
import { 
  collection, getDocs, doc, updateDoc, increment, 
  query, where, addDoc 
} from "firebase/firestore";

const events = ref([]);
const votes = ref([]);
const loading = ref(true);

const fetchEvents = async () => {
  const snapshot = await getDocs(collection(db, "events"));
  events.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  loading.value = false;
};

const fetchVotes = async () => {
  if (!auth.currentUser) return;
  const q = query(
    collection(db, "votes"),
    where("userId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  votes.value = snap.docs.map(d => d.data().eventId);
};

const hasVoted = id => votes.value.includes(id);

const vote = async (eventId, type) => {
  if (!auth.currentUser || hasVoted(eventId)) return;

  await updateDoc(doc(db, "events", eventId), {
    [`${type}Votes`]: increment(1)
  });

  await addDoc(collection(db, "votes"), {
    eventId,
    userId: auth.currentUser.uid,
    vote: type,
    createdAt: new Date()
  });

  votes.value.push(eventId);
};

onMounted(() => {
  fetchEvents();
  fetchVotes();
});

const formatDate = (timestamp) =>
  timestamp ? timestamp.toDate().toLocaleString() : "";
</script>

