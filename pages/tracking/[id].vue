<script setup lang="ts">
const route = useRoute();
const habitId = Number(route.params.id);
</script>

<template>
  <div class="habit-details">
    <CardsContainer :filter-id="habitId" :is-detail-view="true" />
    <Calendar :habit-id="habitId" />
  </div>
</template>

<style lang="scss">
.habit-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
