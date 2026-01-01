<template>
  <b-card>
    <template #header>
      <h4 class="mb-0">Profil Utilisateur</h4>
    </template>

    <b-form @submit.prevent="updateProfile">
      <b-row>
        <b-col md="3" class="text-center mb-3">
          <b-avatar
            :src="user.photoURL"
            size="120"
            class="mb-2"
          ></b-avatar>
          <b-form-file
            v-model="photoFile"
            accept="image/*"
            placeholder="Changer la photo"
            size="sm"
          ></b-form-file>
        </b-col>

        <b-col md="9">
          <b-form-group label="Nom d'affichage" label-for="displayName">
            <b-form-input
              id="displayName"
              v-model="form.displayName"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="user.email"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Bio" label-for="bio">
            <b-form-textarea
              id="bio"
              v-model="form.bio"
              rows="3"
              placeholder="Parlez-nous de vous..."
            ></b-form-textarea>
          </b-form-group>

          <div class="d-grid gap-2">
            <b-button type="submit" variant="primary" :disabled="loading">
              <b-spinner small v-if="loading"></b-spinner>
              Mettre à jour le profil
            </b-button>
          </div>
        </b-col>
      </b-row>
    </form>
  </b-card>
</template>

<script>
import { ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

export default {
  name: 'UserProfile',
  setup() {
    const { user, updateUserProfile, loading } = useAuth()
    const form = ref({
      displayName: user.value?.displayName || '',
      bio: user.value?.bio || ''
    })
    const photoFile = ref(null)

    watch(user, (newUser) => {
      if (newUser) {
        form.value = {
          displayName: newUser.displayName || '',
          bio: newUser.bio || ''
        }
      }
    })

    async function updateProfile() {
      const updateData = { ...form.value }
      
      // TODO: Gérer le téléchargement de photo
      if (photoFile.value) {
        // Implémenter le téléchargement vers Firebase Storage
        console.log('Photo à uploader:', photoFile.value)
      }
      
      await updateUserProfile(updateData)
    }

    return {
      user,
      form,
      photoFile,
      loading,
      updateProfile
    }
  }
}
</script>