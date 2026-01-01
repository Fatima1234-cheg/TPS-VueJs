<template>
  <div>
    <b-jumbotron header="Forum Communautaire" lead="Bienvenue sur notre forum de discussion">
      <p>Partagez vos idées, posez des questions et participez aux discussions.</p>
      <b-button v-if="!user" to="/register" variant="primary" size="lg">
        Rejoindre la communauté
      </b-button>
    </b-jumbotron>

    <DiscussionList />
  </div>
</template>

<script>
import DiscussionList from '../components/DiscussionList.vue'
import { useAuth } from '../composables/useAuth'

export default {
  name: 'Home',
  components: {
    DiscussionList
  },
  setup() {
    const { user } = useAuth()
    
    return {
      user
    }
  }
}
</script>