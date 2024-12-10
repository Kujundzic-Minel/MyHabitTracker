<script setup>
defineProps({
  name: {
    type: String,
    default: 'Nom par défaut',
  },
  description: {
    type: String,
    default: 'Description par défaut', 
  },
})
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <h3>{{ description }}</h3>
  </div>
</template>
