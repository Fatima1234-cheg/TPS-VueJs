<template>
  <div>
    <h1>Modifier un emploi</h1>
    <form @submit.prevent="updateJob">
      <div class="inputtxt">
        <label>Titre :</label>
        <input type="text" v-model="job.titre" required />
      </div>
      <div class="inputtxt">
        <label>Description :</label>
        <input type="text" v-model="job.description" required />
      </div>
      <div class="inputtxt">
        <label>Salaire :</label>
        <input type="number" v-model="job.salaire" required />
      </div>
      <div class="inputtxt">
        <label>Date de création :</label>
        <input type="date" v-model="job.dateCreation" required />
      </div>
      <div class="inputtxt">
        <label>Année d'expérience :</label>
        <input type="number" v-model="job.anneeExperience" required />
      </div>
      <button type="submit">Modifier l'emploi</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditJob",
  props: ["id"], 
  data() {
    return {
      job: {
        titre: "",
        description: "",
        salaire:"",
        dateCreation: "",
        anneeExperience: "",
      },
    };
  },
  mounted() {
    this.getJobById();
  },
  methods: {
    getJobById() {
    fetch(`http://localhost:3000/jobs/${this.id}`) // <-- remplace :id par this.id
      .then(res => {
        if (!res.ok) throw new Error("Job non trouvé");
        return res.json();
      })
      .then(data => {
        this.job = data;
      })
      .catch(err => console.error(err));
  },
   updateJob() {
  fetch(`http://localhost:3000/jobs/${this.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(this.job),
  })
    .then(res => res.json())
    .then(() => {
      alert("Job modifié avec succès");
      this.$router.push("/"); // retour à la liste des jobs
    })
    .catch(err => console.error(err));
}

  },
};
</script>
