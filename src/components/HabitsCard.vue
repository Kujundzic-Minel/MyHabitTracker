<script setup lang="ts">
defineProps({
  name: String,
  description: String,
})
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <h3>{{ description }}</h3>
  </div>
</template>
