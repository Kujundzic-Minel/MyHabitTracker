<script setup lang="ts">
type Habit = {
  id: number,
  user_id: number,
  title: string,
  description: string,
  is_global: number,
  created_at: string,
  today_users: number,
  total_users: number,
  total_completions: number,
  total_attempts: number,
  monthly_users: number,
  completedToday: boolean,
  success_rate: number
}

interface DashboardData {
  id: number;
  name: string;
  globalHabits: Habit[];
  personalHabits: Habit[];
}

const dashboardData = ref<DashboardData | null>(null)

const fetchDashboardData = async () => {
  try {
    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    dashboardData.value = await response.json()
    console.log('Dashboard data:', dashboardData.value)
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

fetchDashboardData()

//Supression d'une habitude
const deleteHabit = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/habits/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'habitude');
    }

    await fetchDashboardData();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'habitude:', error);
  }
};

</script>

<template>
  <div>
    <h1>Liste des habitudes</h1>
    <p v-if="!dashboardData">Chargement des données...</p>

    <div v-else>
      <div v-if="Array.isArray(dashboardData.globalHabits)">
        <h2>Habitudes Globales</h2>
        <ul>
          <li v-for="habit in dashboardData.globalHabits" :key="habit.id">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <ProgressBarHabit :progress-habit="habit.success_rate" />
          </li>
        </ul>
      </div>

      <div v-if="Array.isArray(dashboardData.personalHabits)">
        <h2>Habitudes Personnelles</h2>
        <ul>
          <li v-for="habit in dashboardData.personalHabits" :key="habit.id">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <DeleteButton :id="habit.id" @delete="deleteHabit" />
            <ProgressBarHabit :progress-habit="habit.success_rate" />
          </li>
        </ul>
      </div>

      <pre v-else>{{ JSON.stringify(dashboardData, null, 2) }}</pre>
    </div>
  </div>
</template>
