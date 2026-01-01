<template>
  <b-card class="mb-3" :title="category.name">
    <p>{{ category.description }}</p>

    <template #footer>
      <b-button size="sm" variant="primary" :to="'/category/' + category.id" tag="router-link">
        Voir discussions
      </b-button>
    </template>
  </b-card>
</template>

<script>
export default {
  props: ["category"]
};
</script>
