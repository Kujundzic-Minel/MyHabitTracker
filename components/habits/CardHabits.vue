<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: 'Habit 1',
  },
  description: {
    type: String,
    default: 'Description 1',
  },
})
</script>
<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <h3>{{ description }}</h3>
  </div>
</template>

<style lang="scss">
.card {
  border: solid 1px black;
  border-radius: 5px;
  margin: 1rem;
  padding: 0.5rem;
}
</style>
