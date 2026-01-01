<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <AuthForm
        :is-login="true"
        :loading="loading"
        @submit="login"
        @toggle-mode="$router.push('/register')"
        @reset-password="showResetModal = true"
      />

      <b-modal v-model="showResetModal" title="Réinitialisation du mot de passe" hide-footer>
        <b-form @submit.prevent="resetPassword">
          <b-form-group label="Email" label-for="reset-email">
            <b-form-input
              id="reset-email"
              v-model="resetEmail"
              type="email"
              required
              placeholder="Entrez votre email"
            ></b-form-input>
          </b-form-group>
          
          <div class="d-grid gap-2 mt-3">
            <b-button type="submit" variant="primary" :disabled="loading">
              <b-spinner small v-if="loading"></b-spinner>
              Envoyer le lien de réinitialisation
            </b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'
import { useAuth } from '../composables/useAuth'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'Login',
  components: {
    AuthForm
  },
  setup() {
    const router = useRouter()
    const { login: authLogin, resetPassword: authResetPassword } = useAuth()
    const { success, error: showError } = useNotification()
    
    const loading = ref(false)
    const showResetModal = ref(false)
    const resetEmail = ref('')

    async function login(formData) {
      loading.value = true
      const result = await authLogin(formData.email, formData.password)
      
      if (result.success) {
        success('Connexion réussie')
        router.push('/')
      } else {
        showError(result.error)
      }
      
      loading.value = false
    }

    async function resetPassword() {
      if (!resetEmail.value.trim()) return
      
      loading.value = true
      const result = await authResetPassword(resetEmail.value.trim())
      
      if (result.success) {
        success('Email de réinitialisation envoyé')
        showResetModal.value = false
        resetEmail.value = ''
      } else {
        showError(result.error)
      }
      
      loading.value = false
    }

    return {
      loading,
      showResetModal,
      resetEmail,
      login,
      resetPassword
    }
  }
}
</script>