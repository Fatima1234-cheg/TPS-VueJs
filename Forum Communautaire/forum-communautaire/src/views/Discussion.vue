<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <router-link to="/" class="text-decoration-none">
        <b-icon-arrow-left></b-icon-arrow-left> Retour aux discussions
      </router-link>
      
      <b-button v-if="canEdit" variant="outline-primary" size="sm" @click="editDiscussion">
        <b-icon-pencil></b-icon-pencil> Modifier
      </b-button>
    </div>

    <DiscussionDetail
      v-if="discussion"
      :discussion="discussion"
      @edit="editDiscussion"
      @delete="deleteDiscussion"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DiscussionDetail from '../components/DiscussionDetail.vue'
import { useFirestore } from '../composables/useFirestore'
import { useAuth } from '../composables/useAuth'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'Discussion',
  components: {
    DiscussionDetail
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { getDiscussion, deleteDiscussion: deleteDiscussionFirestore } = useFirestore()
    const { user, isAdmin } = useAuth()
    const { success, error: showError } = useNotification()
    
    const discussion = ref(null)
    const loading = ref(true)

    const canEdit = computed(() => {
      return isAdmin.value || user.value?.uid === discussion.value?.authorId
    })

    async function loadDiscussion() {
      loading.value = true
      const result = await getDiscussion(route.params.id)
      if (result.success) {
        discussion.value = result.data
      } else {
        router.push('/')
      }
      loading.value = false
    }

    async function deleteDiscussion() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette discussion ?')) {
        const result = await deleteDiscussionFirestore(discussion.value.id)
        if (result.success) {
          success('Discussion supprimée')
          router.push('/')
        } else {
          showError(result.error)
        }
      }
    }

    function editDiscussion() {
      // TODO: Implémenter l'édition
      console.log('Éditer la discussion:', discussion.value.id)
    }

    onMounted(() => {
      loadDiscussion()
    })

    return {
      discussion,
      loading,
      canEdit,
      deleteDiscussion,
      editDiscussion,
      loadDiscussion
    }
  }
}
</script>