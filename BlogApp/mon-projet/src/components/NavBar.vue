<template>
  <nav class="navbar">
    <h2 class="logo">Blog</h2>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
   <li><router-link to="/create">Add Post</router-link></li>

    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; /* Titre à gauche, liens à droite */
  align-items: center;
  padding: 15px 30px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

.logo {
  margin: 0;
  color: #333;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-links li a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
