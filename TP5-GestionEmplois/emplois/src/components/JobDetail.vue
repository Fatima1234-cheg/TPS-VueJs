<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h3>Détails du Job</h3>
      <p><strong>Titre :</strong> {{ job.titre }}</p>
      <p><strong>Description :</strong> {{ job.description }}</p>
      <p><strong>Salaire :</strong> {{ job.salaire }}</p>
      <p><strong>Date de création :</strong> {{ job.dateCreation }}</p>
      <p><strong>Année d'expérience :</strong> {{ job.anneeExperience }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobDetail",
  props: {
    job: Object,
    visible: Boolean
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  position: relative;
}
.close {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
}
</style>
