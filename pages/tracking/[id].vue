<script setup lang="ts">
const route = useRoute();
const habitId = Number(route.params.id);
interface CalendarRef {
  refreshDays: () => void;
  days: { completed: boolean }[];
}

const calendarRef = ref<CalendarRef | null>(null);
const monthlyProgress = ref(0);

// Calculate monthly progress based on calendar data
const calculateMonthlyProgress = () => {
  const calendar = calendarRef.value;
  if (!calendar?.days) return 0;

  const completedDays = calendar.days.filter(day => day.completed).length;
  const totalDays = calendar.days.length;
  monthlyProgress.value = Math.round((completedDays / totalDays) * 100);
};

const handleHabitUpdate = () => {
  nextTick(() => {
    calendarRef.value?.refreshDays();
    calculateMonthlyProgress();
  });
};

// Watch for calendar changes
watch(() => calendarRef.value?.days, calculateMonthlyProgress, { deep: true });
</script>

<template>
  <main class="main">
    <div class="cards-wrapper">
      <CardsContainer :filter-id="habitId" :is-detail-view="true" @habit-updated="handleHabitUpdate" />
    </div>
    <div class="stats-wrapper">
      <ProgressBarHabit :progress-habit="monthlyProgress" />
      <Calendar ref="calendarRef" :habit-id="habitId" />
    </div>
  </main>
</template>

<style lang="scss">
.main {
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.cards-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
}

.stats-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .main {
    padding: 1rem;
    gap: 1.5rem;
  }
}
</style>
