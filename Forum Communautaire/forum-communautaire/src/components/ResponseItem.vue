<template>
  <b-card no-body class="mb-2">
    <b-card-body>
      <div class="d-flex">
        <div class="flex-shrink-0 me-3">
          <b-avatar
            :src="response.authorPhoto"
            :text="response.authorName?.charAt(0)"
          ></b-avatar>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <h6 class="mb-1">{{ response.authorName }}</h6>
            <small class="text-muted">{{ formatDate(response.createdAt) }}</small>
          </div>
          
          <p class="mb-1">{{ response.content }}</p>
          
          <div v-if="canEdit" class="btn-group btn-group-sm">
            <b-button variant="outline-secondary" size="sm" @click="editResponse">
              <b-icon-pencil></b-icon-pencil>
            </b-button>
            <b-button variant="outline-danger" size="sm" @click="deleteResponse">
              <b-icon-trash></b-icon-trash>
            </b-button>
          </div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'ResponseItem',
  props: {
    response: {
      type: Object,
      required: true
    }
  },
  emits: ['response-deleted'],
  setup(props, { emit }) {
    const { user, isAdmin } = useAuth()
    const { deleteResponse: deleteResponseFirestore } = useFirestore()
    const { success, error: showError } = useNotification()

    const canEdit = computed(() => {
      return isAdmin.value || user.value?.uid === props.response.authorId
    })

    function formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    async function deleteResponse() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) {
        const result = await deleteResponseFirestore(props.response.id, props.response.discussionId)
        if (result.success) {
          success('Réponse supprimée')
          emit('response-deleted')
        } else {
          showError(result.error)
        }
      }
    }

    function editResponse() {
      // TODO: Implémenter l'édition
      console.log('Éditer la réponse:', props.response.id)
    }

    return {
      canEdit,
      formatDate,
      deleteResponse,
      editResponse
    }
  }
}
</script>