<script setup lang="ts">
defineProps({
  progressHabit: Number,
})
</script>

<template>
  <h1>Progress bar</h1>
  <progress id="habitProgress" max="100" :value="progressHabit"></progress>
</template>
