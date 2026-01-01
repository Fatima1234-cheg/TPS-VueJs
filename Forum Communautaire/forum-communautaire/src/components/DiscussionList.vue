<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Discussions</h4>
      <b-button to="/new-discussion" variant="primary" size="sm">
        <b-icon-plus></b-icon-plus> Nouvelle discussion
      </b-button>
    </div>

    <b-card no-body>
      <b-tabs v-model="activeTab" card>
        <b-tab title="Récentes" active>
          <DiscussionItem
            v-for="discussion in discussions"
            :key="discussion.id"
            :discussion="discussion"
            @delete="deleteDiscussion"
          />
        </b-tab>
        <b-tab title="Populaires">
          <p>Liste des discussions populaires</p>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DiscussionItem from './DiscussionItem.vue'
import { useFirestore } from '../composables/useFirestore'
import { useNotification } from '../composables/useNotification'

export default {
  name: 'DiscussionList',
  components: {
    DiscussionItem
  },
  props: {
    category: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { getDiscussions, deleteDiscussion: deleteDiscussionFirestore } = useFirestore()
    const { success, error: showError } = useNotification()
    const discussions = ref([])
    const activeTab = ref(0)
    const loading = ref(true)

    async function loadDiscussions() {
      loading.value = true
      const filters = {
        orderBy: 'createdAt',
        orderDirection: 'desc'
      }
      
      if (props.category) {
        filters.category = props.category
      }
      
      const result = await getDiscussions(filters)
      if (result.success) {
        discussions.value = result.data
      }
      loading.value = false
    }

    async function deleteDiscussion(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette discussion ?')) {
        const result = await deleteDiscussionFirestore(id)
        if (result.success) {
          success('Discussion supprimée')
          await loadDiscussions()
        } else {
          showError(result.error)
        }
      }
    }

    onMounted(() => {
      loadDiscussions()
    })

    return {
      discussions,
      activeTab,
      loading,
      deleteDiscussion
    }
  }
}
</script>