<template>
  <b-card>
    <template #header>
      <h4 class="mb-0">{{ isLogin ? 'Connexion' : 'Inscription' }}</h4>
    </template>

    <b-form @submit.prevent="submit">
      <b-form-group label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Mot de passe" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        v-if="!isLogin"
        label="Nom d'affichage"
        label-for="displayName"
      >
        <b-form-input
          id="displayName"
          v-model="form.displayName"
          required
          placeholder="Entrez votre nom"
        ></b-form-input>
      </b-form-group>

      <div class="d-grid gap-2">
        <b-button type="submit" variant="primary" :disabled="loading">
          <b-spinner small v-if="loading"></b-spinner>
          {{ isLogin ? 'Se connecter' : "S'inscrire" }}
        </b-button>

        <b-button variant="link" @click="$emit('toggle-mode')">
          {{ isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter' }}
        </b-button>

        <b-button v-if="isLogin" variant="link" @click="$emit('reset-password')">
          Mot de passe oublié ?
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AuthForm',
  props: {
    isLogin: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'toggle-mode', 'reset-password'],
  setup(props, { emit }) {
    const form = ref({
      email: '',
      password: '',
      displayName: ''
    })

    function submit() {
      emit('submit', form.value)
    }

    return {
      form,
      submit
    }
  }
}
</script>