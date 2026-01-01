<template>
  <div v-if="discussion">
    <b-card>
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">{{ discussion.title }}</h4>
          <b-badge variant="secondary">{{ discussion.category || 'Général' }}</b-badge>
        </div>
      </template>

      <div class="d-flex mb-3">
        <b-avatar
          :src="discussion.authorPhoto"
          :text="discussion.authorName?.charAt(0)"
          size="lg"
          class="me-3"
        ></b-avatar>
        <div>
          <h6>{{ discussion.authorName }}</h6>
          <small class="text-muted">{{ formatDate(discussion.createdAt) }}</small>
        </div>
      </div>

      <div class="mb-4">
        {{ discussion.content }}
      </div>

      <template #footer>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">
            <b-icon-eye></b-icon-eye> {{ discussion.viewCount || 0 }} vues
            <b-icon-chat class="ms-2"></b-icon-chat> {{ discussion.responseCount || 0 }} réponses
          </small>
          
          <div v-if="canEdit" class="btn-group btn-group-sm">
            <b-button variant="outline-secondary" size="sm" @click="$emit('edit')">
              <b-icon-pencil></b-icon-pencil> Modifier
            </b-button>
            <b-button variant="outline-danger" size="sm" @click="$emit('delete')">
              <b-icon-trash></b-icon-trash> Supprimer
            </b-button>
          </div>
        </div>
      </template>
    </b-card>

    <ResponseList
      :discussion-id="discussion.id"
      @response-deleted="loadDiscussion"
    />

    <NewResponseForm
      :discussion-id="discussion.id"
      @response-created="loadDiscussion"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ResponseList from './ResponseList.vue'
import NewResponseForm from './NewResponseForm.vue'
import { useFirestore } from '../composables/useFirestore'
import { useAuth } from '../composables/useAuth'

export default {
  name: 'DiscussionDetail',
  components: {
    ResponseList,
    NewResponseForm
  },
  emits: ['edit', 'delete'],
  setup(props, { emit }) {
    const route = useRoute()
    const { getDiscussion } = useFirestore()
    const { user, isAdmin } = useAuth()
    
    const discussion = ref(null)
    const loading = ref(true)

    async function loadDiscussion() {
      loading.value = true
      const result = await getDiscussion(route.params.id)
      if (result.success) {
        discussion.value = result.data
      }
      loading.value = false
    }

    const canEdit = computed(() => {
      return isAdmin.value || user.value?.uid === discussion.value?.authorId
    })

    function formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      loadDiscussion()
    })

    return {
      discussion,
      loading,
      canEdit,
      formatDate,
      loadDiscussion
    }
  }
}
</script>