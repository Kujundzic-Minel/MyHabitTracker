<script setup lang="ts">
const route = useRoute();
const habitId = Number(route.params.id);
const calendarRef = ref(null);

const handleHabitUpdate = () => {
  nextTick(() => {
    console.log('Updating calendar...'); // Debug log
    calendarRef.value?.refreshDays();
  });
};
</script>

<template>
  <div class="habit-details">
    <CardsContainer :filter-id="habitId" :is-detail-view="true" @habit-updated="handleHabitUpdate" />
    <Calendar ref="calendarRef" :habit-id="habitId" />
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
