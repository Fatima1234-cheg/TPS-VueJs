<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <div class="container">
      <b-navbar-brand to="/">Forum Communautaire</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact>Accueil</b-nav-item>
          <b-nav-item-dropdown text="Catégories">
            <b-dropdown-item to="/category/general">Général</b-dropdown-item>
            <b-dropdown-item to="/category/technical">Technique</b-dropdown-item>
            <b-dropdown-item to="/category/help">Aide</b-dropdown-item>
            <b-dropdown-item to="/category/offtopic">Hors-sujet</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">
          <b-nav-form @submit.prevent="search">
            <b-form-input
              v-model="searchQuery"
              size="sm"
              class="me-2"
              placeholder="Rechercher"
            ></b-form-input>
            <b-button size="sm" type="submit" variant="outline-light">
              <b-icon-search></b-icon-search>
            </b-button>
          </b-nav-form>

          <template v-if="user">
            <b-nav-item to="/profile">
              <b-avatar
                v-if="user.photoURL"
                :src="user.photoURL"
                size="sm"
                class="me-2"
              ></b-avatar>
              {{ user.displayName || user.email }}
            </b-nav-item>
            <b-nav-item @click="logout">Déconnexion</b-nav-item>
            <b-nav-item v-if="isAdmin" to="/admin" variant="warning">
              <b-icon-shield></b-icon-shield> Admin
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/login">Connexion</b-nav-item>
            <b-nav-item to="/register">Inscription</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { useAuth } from '../composables/useAuth'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'Navbar',
  setup() {
    const { user, isAdmin, logout: authLogout } = useAuth()
    const { success } = useNotification()
    const searchQuery = ref('')

    async function logout() {
      await authLogout()
      success('Déconnexion réussie')
    }

    function search() {
      if (searchQuery.value.trim()) {
        // Implémenter la recherche
        console.log('Recherche:', searchQuery.value)
      }
    }

    return {
      user,
      isAdmin,
      searchQuery,
      logout,
      search
    }
  }
}
</script>