import { ref } from 'vue'

export function useNotification() {
  const notifications = ref([])

  function addNotification(message, type = 'info', duration = 3000) {
    const id = Date.now()
    const notification = {
      id,
      message,
      type,
      show: true
    }
    
    notifications.value.push(notification)
    
    // Supprimer automatiquement après la durée spécifiée
    setTimeout(() => {
      removeNotification(id)
    }, duration)
    
    return id
  }

  function removeNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  function success(message, duration = 3000) {
    return addNotification(message, 'success', duration)
  }

  function error(message, duration = 5000) {
    return addNotification(message, 'danger', duration)
  }

  function warning(message, duration = 4000) {
    return addNotification(message, 'warning', duration)
  }

  function info(message, duration = 3000) {
    return addNotification(message, 'info', duration)
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  }
}