<template>
  <div>
    <router-link to="/add">
      <button>Ajouter un nouvel emploi</button>
    </router-link>

    <h2>Liste des emplois disponibles :</h2>

    <!-- Barre de recherche -->
    <FilterNav @filter-jobs="filterJobs" />

    <div v-for="job in jobs" :key="job.id" class="job-card">
  <strong>{{ job.titre }} - {{ job.description }}</strong>

  <div>
    <button class="btn-edit" @click="goToEdit(job.id)">Modifier</button>
    <button class="btn-delete" @click="SuppresionJob(job.id)">Supprimer</button>
    <button class="btn-show" @click="showJob(job)">Afficher</button>
  </div>
</div>


    <!-- Popup JobDetail -->
    <JobDetail 
      :job="selectedJob" 
      :visible="isPopupVisible" 
      @close="isPopupVisible = false" 
    />
  </div>
</template>

<script>
import JobDetail from '../components/JobDetail.vue';
import FilterNav from '../components/FilterNav.vue';

export default {
  name: "HomeJob",
  components: {
    JobDetail,
    FilterNav
  },
  data() {
    return {
      jobs: [],
      allJobs: [],
      selectedJob: null,
      isPopupVisible: false
    }
  },
  mounted() {
    this.getJobs();
  },
  methods: {

    getJobs() { 
      fetch("http://localhost:3000/jobs")
      .then(response => response.json())
      .then(data => {
        this.jobs = data;
        this.allJobs = data; 
      })
      .catch(err => console.log(err));
    },

    goToEdit(id) {
      this.$router.push(`/edit/${id}`);
    },

    SuppresionJob(id) {
      fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" })
      .then(() => {
        alert("Job supprimé avec succès");
        this.getJobs();
      })
      .catch(err => console.error(err));
    },

    showJob(job) {
      this.selectedJob = job;
      this.isPopupVisible = true;
    },

    filterJobs(searchText) {
      this.jobs = this.allJobs.filter(job =>
        job.titre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

  }
}
</script>
