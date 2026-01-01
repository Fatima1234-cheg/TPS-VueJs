<template>
  <b-card no-body class="mb-2">
    <b-card-body>
      <div class="d-flex">
        <div class="flex-shrink-0 me-3">
          <b-avatar
            :src="discussion.authorPhoto"
            :text="discussion.authorName?.charAt(0)"
          ></b-avatar>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="mb-1">
              <router-link :to="`/discussion/${discussion.id}`" class="text-decoration-none">
                {{ discussion.title }}
              </router-link>
            </h5>
            <small class="text-muted">{{ formatDate(discussion.createdAt) }}</small>
          </div>
          
          <p class="mb-1 text-truncate">{{ discussion.content }}</p>
          
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <b-badge variant="secondary" class="me-2">
                {{ discussion.category || 'Général' }}
              </b-badge>
              <small class="text-muted">
                <b-icon-eye></b-icon-eye> {{ discussion.viewCount || 0 }}
                <b-icon-chat class="ms-2"></b-icon-chat> {{ discussion.responseCount || 0 }}
              </small>
            </div>
            
            <div v-if="canEdit" class="btn-group btn-group-sm">
              <b-button variant="outline-secondary" size="sm" @click="$emit('edit', discussion)">
                <b-icon-pencil></b-icon-pencil>
              </b-button>
              <b-button variant="outline-danger" size="sm" @click="$emit('delete', discussion.id)">
                <b-icon-trash></b-icon-trash>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { computed } from 'vue'
import { useAuth } from '../composables/useAuth'

export default {
  name: 'DiscussionItem',
  props: {
    discussion: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const { user, isAdmin } = useAuth()

    const canEdit = computed(() => {
      return isAdmin.value || user.value?.uid === props.discussion.authorId
    })

    function formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    return {
      canEdit,
      formatDate
    }
  }
}
</script>