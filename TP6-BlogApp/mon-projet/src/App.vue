<template>
  <div id="app">
   
      <router-view />
   
  </div>
</template>

<script>


export default {
  name: "App",
 
};
</script>

<style>
/* Styles globaux */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* Contenu principal */
main {
  padding: 20px;
}
</style>
