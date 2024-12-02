<script setup lang="ts">
import HabitsCard from '@/components/HabitsCard.vue'
import CardsCSS from './CardsCSS.vue'

const habits = [
  {
    id: 1,
    name: 'habit 1',
    description: 'Méditation à la maison',
    progressHabit: 70,
  },
  {
    id: 2,
    name: 'habit 2',
    description: 'Méditation à la maison 2',
    progressHabit: 10,
  },
  {
    id: 3,
    name: 'habit 3',
    description: 'Méditation à la maison 3',
    progressHabit: 50,
  },
]
</script>

<template>
  <div>
    <div v-for="habit in habits" :key="habit.id">
      <HabitsCard :name="habit.name" :description="habit.description" />
      <CardsCSS :progressHabit="habit.progressHabit" />
    </div>
  </div>
</template>
