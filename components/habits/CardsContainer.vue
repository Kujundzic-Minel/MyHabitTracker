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


// affichage du formulaire pour editer une habitude
const show = ref(false)

function toggleShow() {
  show.value = !show.value;
}

// Remplacer la ligne "const check = ref(false)" par:
const checkboxStates = ref<{ [key: number]: boolean }>({})

// Initialiser les états des checkboxes quand les données sont chargées
watch(() => dashboardData.value, (newData) => {
  if (newData) {
    // Initialiser les états pour les habitudes globales
    newData.globalHabits.forEach(habit => {
      checkboxStates.value[habit.id] = habit.completedToday || false;
    });
  }
}, { immediate: true })

const toggleCheckbox = async (habitId: number) => {
  try {
    const newState = !checkboxStates.value[habitId];
    checkboxStates.value[habitId] = newState;
    
    // Ici, vous pouvez ajouter un appel API pour persister l'état
    // const response = await fetch(`http://localhost:4000/habits/${habitId}/complete`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`,
    //   },
    //   body: JSON.stringify({ completed: newState }),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to update habit completion status');
    // }
  } catch (error) {
    console.error('Error toggling habit completion:', error);
    // Restaurer l'état précédent en cas d'erreur
    checkboxStates.value[habitId] = !checkboxStates.value[habitId];
  }
}

</script>

<template>
  <div class="habits">
    <h1 class="habits__title">Liste des habitudes</h1>
    <p v-if="!dashboardData" class="habits__loading">Chargement des données...</p>

    <div v-else class="habits__container">
      <div v-if="Array.isArray(dashboardData.globalHabits)" class="habits__section">
        <h2 class="habits__section-title">Habitudes Globales</h2>
        <ul class="habits__list">
          <li v-for="habit in dashboardData.globalHabits" :key="habit.id" class="habits__item">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <div class="habits__progress">
              <ProgressBarHabit :progress-habit="habit.success_rate" />
              <CustomCheckbox :id="habit.id" :ischecked="checkboxStates[habit.id]" @toggle="toggleCheckbox(habit.id)" />
              {{ dashboardData }}
              <p>{{ checkboxStates[habit.id] }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="Array.isArray(dashboardData.personalHabits)" class="habits__section">
        <h2 class="habits__section-title">Habitudes Personnelles</h2>
        <ul class="habits__list">
          <li v-for="habit in dashboardData.personalHabits" :key="habit.id" class="habits__item">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <div class="habits__actions">
              <div class="habits__progress">
                <ProgressBarHabit :progress-habit="habit.success_rate" />
              </div>
              <div class="habits__buttons">
                <DeleteButton :id="habit.id" @delete="deleteHabit" />
                <EditButton @click="toggleShow" />
                <TrackingButton :id="habit.id" />
              </div>
            </div>
            <div v-if="show" class="habits__edit-form">
              <EditForm v-if="show" :habitid="habit.id.toString()" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.habits {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  &__title {
    font-family: $font-family-primary;
    font-size: 2rem;
    font-weight: $font-weight-bold;
    color: $textPrimary;
    margin-bottom: 2rem;
  }

  &__loading {
    font-family: $font-family-primary;
    color: $textSecondary;
    text-align: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__section {
    &-title {
      font-family: $font-family-primary;
      font-size: 1.5rem;
      font-weight: $font-weight-semibold;
      color: $textPrimary;
      margin-bottom: 1rem;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  &__item {
    background: $backgroundColor;
    border-radius: 12px;
    box-shadow: 0 4px 12px $shadowColor;
    padding: 1.5rem;
  }

  &__actions {
    margin-top: 1rem;
  }

  &__progress {
    margin-bottom: 1rem;
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
  }

  &__edit-form {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid $borderColor;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    &__title {
      font-size: 1.5rem;
    }

    &__section-title {
      font-size: 1.25rem;
    }

    &__list {
      grid-template-columns: 1fr;
    }

    &__item {
      padding: 1rem;
    }
  }
}
</style>
