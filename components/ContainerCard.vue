<script setup lang="ts">
const habits = [
  {
    id: 1,
    name: 'Habit 1',
    description: 'Description 1',
  },
  {
    id: 2,
    name: 'Habit 2',
    description: 'Description 2',
  },
  {
    id: 3,
    name: 'Habit 3',
    description: 'Description 3',
  },
]
</script>
<template>
  <div class="containerCard__grid">
    <Habits
      v-for="habit in habits"
      :key="habit.id"
      :name="habit.name"
      :description="habit.description"
    />
  </div>
</template>

<style lang="scss">
.containerCard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
