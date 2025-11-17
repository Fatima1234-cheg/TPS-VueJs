<template>
  <div>
    <h1>Formulaire d'ajout d'un nouvel emploi</h1>
    <form @submit.prevent="addJob">
      <div class="inputtxt">
        <label for="titre">Titre :</label>
        <input type="text" id="titre" v-model="newJob.titre" required />
      </div>

      <div class="inputtxt">
        <label for="description">Description :</label>
        <input type="text" id="description" v-model="newJob.description" required />
      </div>

      <div class="inputtxt">
        <label for="salaire">Salaire :</label>
        <input type="number" id="salaire" v-model="newJob.salaire" required />
      </div>

      <div class="inputtxt">
        <label for="dateCreation">Date de création :</label>
        <input type="date" id="dateCreation" v-model="newJob.dateCreation" required />
      </div>

      <div class="inputtxt">
        <label for="anneeExperience">Année d'expérience :</label>
        <input type="number" id="anneeExperience" v-model="newJob.anneeExperience" required />
      </div>

      <button type="submit">Ajouter l'emploi</button>
        



    </form>
  </div>
  
</template>
<script>

export default {
  data() {
    return {
        jobs: [],
      newJob: {
        titre: "",
        description: "",
        salaire: null,
        dateCreation: "",
        anneeExperience: null
      }
    };
  },
  mounted() {
  fetch("http://localhost:3000/jobs")
    .then(res => res.json())
    .then(data => this.jobs = data)
    .catch(err => console.error(err));
},
 methods:{
   addJob() {
  fetch("http://localhost:3000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.newJob) 
  }) 
  .then(response => response.json())
  alert("job ajoté avec sucés")
  this.newJob = { titre: "", description: "", salaire: null, dateCreation: "", anneeExperience: null };
},

        
  }}
  </script>
  <style>
  .inputtxt{
    border:1px solid black;
    padding:10px;
    margin-top: 5px;

  }
  .inputtxt label{
    width: 200px;padding: 3px;
      margin-right:30px;
  }
  .inputtxt input{
    width: 300px;
  }
  button{
    margin-top: 10px;;
  }
</style>