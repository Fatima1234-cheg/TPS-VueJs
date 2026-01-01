<template>
  <div id="app">
    <Navbar />
    <main class="container mt-4">
      <router-view />
    </main>
    <Notification />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Notification
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>