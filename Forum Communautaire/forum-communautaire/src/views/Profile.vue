<template>
  <div class="row">
    <div class="col-md-8">
      <UserProfile />
    </div>
    <div class="col-md-4">
      <b-card title="Statistiques" class="mb-3">
        <b-list-group>
          <b-list-group-item>
            <b-icon-chat></b-icon-chat> Discussions créées: {{ stats.discussions }}
          </b-list-group-item>
          <b-list-group-item>
            <b-icon-chat-square></b-icon-chat-square> Réponses: {{ stats.responses }}
          </b-list-group-item>
          <b-list-group-item>
            <b-icon-calendar></b-icon-calendar> Membre depuis: {{ memberSince }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import UserProfile from '../components/UserProfile.vue'
import { useAuth } from '../composables/useAuth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../composables/useFirestore'

export default {
  name: 'Profile',
  components: {
    UserProfile
  },
  setup() {
    const { user } = useAuth()
    const stats = ref({
      discussions: 0,
      responses: 0
    })
    const loading = ref(true)

    const memberSince = computed(() => {
      if (user.value?.createdAt) {
        const date = new Date(user.value.createdAt)
        return date.toLocaleDateString('fr-FR')
      }
      return 'Récemment'
    })

    async function loadStats() {
      if (!user.value?.uid) return
      
      // Compter les discussions
      const discussionsQuery = query(
        collection(db, 'discussions'),
        where('authorId', '==', user.value.uid)
      )
      const discussionsSnapshot = await getDocs(discussionsQuery)
      stats.value.discussions = discussionsSnapshot.size

      // Compter les réponses
      const responsesQuery = query(
        collection(db, 'responses'),
        where('authorId', '==', user.value.uid)
      )
      const responsesSnapshot = await getDocs(responsesQuery)
      stats.value.responses = responsesSnapshot.size
      
      loading.value = false
    }

    onMounted(() => {
      loadStats()
    })

    return {
      user,
      stats,
      loading,
      memberSince
    }
  }
}
</script>