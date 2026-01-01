<template>
  <b-card>
    <template #header>
      <h4 class="mb-0">Panneau d'administration</h4>
    </template>

    <b-tabs content-class="mt-3">
      <b-tab title="Utilisateurs" active>
        <b-table
          :items="users"
          :fields="userFields"
          striped
          hover
          responsive
        >
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="outline-primary"
              class="me-1"
              @click="editUser(row.item)"
            >
              <b-icon-pencil></b-icon-pencil>
            </b-button>
            <b-button
              size="sm"
              variant="outline-danger"
              @click="deleteUser(row.item.id)"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </template>
        </b-table>
      </b-tab>

      <b-tab title="Discussions">
        <b-table
          :items="adminDiscussions"
          :fields="discussionFields"
          striped
          hover
          responsive
        >
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="outline-danger"
              @click="deleteDiscussion(row.item.id)"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
          </template>
        </b-table>
      </b-tab>

      <b-tab title="Signalements">
        <p>Liste des contenus signalés</p>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../composables/useFirestore'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'AdminPanel',
  setup() {
    const { success, error: showError } = useNotification()
    
    const users = ref([])
    const adminDiscussions = ref([])
    const loading = ref(true)

    const userFields = [
      { key: 'email', label: 'Email' },
      { key: 'displayName', label: 'Nom' },
      { key: 'role', label: 'Rôle' },
      { key: 'createdAt', label: 'Inscrit le' },
      { key: 'actions', label: 'Actions' }
    ]

    const discussionFields = [
      { key: 'title', label: 'Titre' },
      { key: 'authorName', label: 'Auteur' },
      { key: 'category', label: 'Catégorie' },
      { key: 'createdAt', label: 'Date' },
      { key: 'responseCount', label: 'Réponses' },
      { key: 'actions', label: 'Actions' }
    ]

    async function loadUsers() {
      const querySnapshot = await getDocs(collection(db, 'users'))
      users.value = []
      querySnapshot.forEach((doc) => {
        users.value.push({
          id: doc.id,
          ...doc.data()
        })
      })
    }

    async function loadDiscussions() {
      const querySnapshot = await getDocs(collection(db, 'discussions'))
      adminDiscussions.value = []
      querySnapshot.forEach((doc) => {
        adminDiscussions.value.push({
          id: doc.id,
          ...doc.data()
        })
      })
    }

    async function deleteUser(userId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        try {
          await deleteDoc(doc(db, 'users', userId))
          success('Utilisateur supprimé')
          await loadUsers()
        } catch (err) {
          showError(err.message)
        }
      }
    }

    async function deleteDiscussion(discussionId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette discussion ?')) {
        try {
          await deleteDoc(doc(db, 'discussions', discussionId))
          success('Discussion supprimée')
          await loadDiscussions()
        } catch (err) {
          showError(err.message)
        }
      }
    }

    function editUser(user) {
      // TODO: Implémenter l'édition d'utilisateur
      console.log('Éditer utilisateur:', user)
    }

    onMounted(async () => {
      await Promise.all([loadUsers(), loadDiscussions()])
      loading.value = false
    })

    return {
      users,
      adminDiscussions,
      loading,
      userFields,
      discussionFields,
      deleteUser,
      deleteDiscussion,
      editUser
    }
  }
}
</script>