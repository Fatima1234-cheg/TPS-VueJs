<template>
  <b-card>
    <template #header>
      <h4 class="mb-0">Nouvelle Discussion</h4>
    </template>

    <b-form @submit.prevent="submit">
      <b-form-group label="Titre" label-for="title">
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Entrez le titre de votre discussion"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Catégorie" label-for="category">
        <b-form-select
          id="category"
          v-model="form.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Contenu" label-for="content">
        <b-form-textarea
          id="content"
          v-model="form.content"
          rows="6"
          required
          placeholder="Décrivez votre discussion en détail..."
        ></b-form-textarea>
      </b-form-group>

      <div class="d-grid gap-2">
        <b-button type="submit" variant="primary" :disabled="loading">
          <b-spinner small v-if="loading"></b-spinner>
          Publier la discussion
        </b-button>
        <b-button variant="outline-secondary" @click="$emit('cancel')">
          Annuler
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useFirestore } from '../composables/useFirestore'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'NewDiscussionForm',
  emits: ['cancel'],
  setup(_, { emit }) {
    const router = useRouter()
    const { user } = useAuth()
    const { createDiscussion } = useFirestore()
    const { success, error: showError } = useNotification()
    
    const form = ref({
      title: '',
      category: 'general',
      content: ''
    })
    const loading = ref(false)

    const categories = [
      { value: 'general', text: 'Général' },
      { value: 'technical', text: 'Technique' },
      { value: 'help', text: 'Aide' },
      { value: 'offtopic', text: 'Hors-sujet' }
    ]

    async function submit() {
      loading.value = true
      
      const discussionData = {
        ...form.value,
        authorId: user.value.uid,
        authorName: user.value.displayName,
        authorPhoto: user.value.photoURL
      }
      
      const result = await createDiscussion(discussionData)
      
      if (result.success) {
        success('Discussion créée avec succès')
        router.push(`/discussion/${result.id}`)
      } else {
        showError(result.error)
      }
      
      loading.value = false
    }

    return {
      form,
      loading,
      categories,
      submit
    }
  }
}
</script>