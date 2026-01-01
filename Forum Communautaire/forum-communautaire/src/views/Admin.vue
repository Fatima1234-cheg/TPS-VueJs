<template>
  <div>
    <h2 class="mb-4">Administration</h2>
    
    <AdminPanel />
  </div>
</template>

<script>
import AdminPanel from '../components/AdminPanel.vue'

export default {
  name: 'Admin',
  components: {
    AdminPanel
  }
}
</script>