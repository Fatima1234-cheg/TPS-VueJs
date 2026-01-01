<template>
  <div class="notification-container">
    <b-toast
      v-for="notification in notifications"
      :key="notification.id"
      :model-value="notification.show"
      :variant="notification.type"
      @hide="removeNotification(notification.id)"
      :auto-hide-delay="3000"
      solid
    >
      <template #toast-title>
        <div class="d-flex align-items-center">
          <b-icon
            :icon="getIcon(notification.type)"
            class="me-2"
          ></b-icon>
          <strong class="me-auto">{{ getTitle(notification.type) }}</strong>
        </div>
      </template>
      {{ notification.message }}
    </b-toast>
  </div>
</template>

<script>
import { useNotification } from '../composables/useNotification'

export default {
  name: 'Notification',
  setup() {
    const { notifications, removeNotification } = useNotification()

    function getIcon(type) {
      const icons = {
        success: 'check-circle',
        danger: 'exclamation-triangle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
      }
      return icons[type] || 'info-circle'
    }

    function getTitle(type) {
      const titles = {
        success: 'Succès',
        danger: 'Erreur',
        warning: 'Avertissement',
        info: 'Information'
      }
      return titles[type] || 'Information'
    }

    return {
      notifications,
      removeNotification,
      getIcon,
      getTitle
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>