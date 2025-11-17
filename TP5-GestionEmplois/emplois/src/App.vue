<template>
  <div>
    <h1>Mon Application de gestion d'emplois </h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add job</router-link>
     
    </nav>

    <!-- Ici s’affichent les composants des routes -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
