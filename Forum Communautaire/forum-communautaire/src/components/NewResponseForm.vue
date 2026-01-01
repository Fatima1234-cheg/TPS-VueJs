<template>
  <b-card class="mt-4">
    <template #header>
      <h5 class="mb-0">Répondre à la discussion</h5>
    </template>

    <b-form @submit.prevent="submit">
      <b-form-group>
        <b-form-textarea
          v-model="content"
          rows="3"
          required
          placeholder="Votre réponse..."
        ></b-form-textarea>
      </b-form-group>

      <div class="d-grid gap-2">
        <b-button type="submit" variant="primary" :disabled="loading">
          <b-spinner small v-if="loading"></b-spinner>
          Publier la réponse
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'NewResponseForm',
  props: {
    discussionId: {
      type: String,
      required: true
    }
  },
  emits: ['response-created'],
  setup(props, { emit }) {
    const { user } = useAuth()
    const { createResponse } = useFirestore()
    const { success, error: showError } = useNotification()
    
    const content = ref('')
    const loading = ref(false)

    async function submit() {
      if (!content.value.trim()) return
      
      loading.value = true
      
      const responseData = {
        content: content.value.trim(),
        authorId: user.value.uid,
        authorName: user.value.displayName,
        authorPhoto: user.value.photoURL
      }
      
      const result = await createResponse(props.discussionId, responseData)
      
      if (result.success) {
        success('Réponse publiée')
        content.value = ''
        emit('response-created')
      } else {
        showError(result.error)
      }
      
      loading.value = false
    }

    return {
      content,
      loading,
      submit
    }
  }
}
</script>