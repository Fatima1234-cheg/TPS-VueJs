<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <AuthForm
        :is-login="false"
        :loading="loading"
        @submit="register"
        @toggle-mode="$router.push('/login')"
      />
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
  name: 'Register',
  components: {
    AuthForm
  },
  setup() {
    const router = useRouter()
    const { register: authRegister } = useAuth()
    const { success, error: showError } = useNotification()
    
    const loading = ref(false)

    async function register(formData) {
      loading.value = true
      const result = await authRegister(
        formData.email,
        formData.password,
        formData.displayName
      )
      
      if (result.success) {
        success('Inscription réussie')
        router.push('/')
      } else {
        showError(result.error)
      }
      
      loading.value = false
    }

    return {
      loading,
      register
    }
  }
}
</script>