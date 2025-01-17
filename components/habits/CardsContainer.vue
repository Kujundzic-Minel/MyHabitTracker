<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

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
  success_rate: number,
  completed_dates?: string[]; // Ajout des dates complétées
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
    const token = useCookie('api_tracking_jwt').value || localStorage.getItem('token');

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    dashboardData.value = await response.json();

    if (date.value && dashboardData.value) {
      [...dashboardData.value.globalHabits, ...dashboardData.value.personalHabits].forEach(habit => {
        checkboxStates.value[habit.id] = isHabitCompletedForDate(habit, date.value as string);
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    if (error.message.includes('No authentication token')) {
      // Redirect to login if no token is found
      useRouter().push('/login');
    }
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

// Checkbox progress-bar
const checkboxStates = ref<{ [key: number]: boolean }>({})
const date = ref<string | null>(new Date().toISOString().split('T')[0]);

const toggleCheckbox = (habitId: number) => {
  checkboxStates.value[habitId] = !checkboxStates.value[habitId]
}

// Add new function to handle local storage
const getLocalStorageKey = (habitId: number, date: string) => {
  // Ensure we're using local timezone date
  const localDate = new Date(date);
  const formattedDate = localDate.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
  return `habit_${habitId}_${formattedDate}`;
};

// Ajouter l'émetteur d'événements
const emit = defineEmits(['habit-updated']);

// Modify addCheckboxValue to use localStorage instead of API
async function addCheckboxValue(habitId: number) {
  try {
    const currentDate = date.value as string;
    const storageKey = getLocalStorageKey(habitId, currentDate);

    if (checkboxStates.value[habitId]) {
      localStorage.setItem(storageKey, 'completed');
      console.log(`Marked as completed: ${storageKey}`); // Debug log
    } else {
      localStorage.removeItem(storageKey);
      console.log(`Marked as uncompleted: ${storageKey}`); // Debug log
    }

    emit('habit-updated');
    await fetchDashboardData();
  } catch (error) {
    console.error('Error updating tracking:', error);
  }
}

// Ajout d'une fonction pour gérer le clic du bouton
const handleSubmit = (habitId: number) => {
  if (checkboxStates.value[habitId] !== undefined) {
    addCheckboxValue(habitId)
  }
}

// Fonction pour vérifier si une habitude est complétée pour une date donnée
const isHabitCompletedForDate = (habit: Habit, date: string) => {
  const storageKey = getLocalStorageKey(habit.id, date);
  return localStorage.getItem(storageKey) === 'completed';
}

// Mettre à jour les checkboxes quand la date change
watch(date, (newDate) => {
  if (!dashboardData.value) return;

  [...dashboardData.value.globalHabits, ...dashboardData.value.personalHabits].forEach(habit => {
    checkboxStates.value[habit.id] = isHabitCompletedForDate(habit, newDate as string);
  });
});

// Ajout des props pour le filtrage
defineProps<{
  filterId?: number;
  isDetailView?: boolean;
}>();

</script>

<template>
  <div class="habits">
    <h1 class="habits__title">
      {{ isDetailView ? 'Détail de l\'habitude' : 'Liste des habitudes' }}
    </h1>
    <p v-if="!dashboardData" class="habits__loading">Chargement des données...</p>

    <div v-else class="habits__container">
      <div v-if="Array.isArray(dashboardData.globalHabits)" class="habits__section">
        <h2 v-if="!isDetailView" class="habits__section-title">Habitudes Globales</h2>
        <ul class="habits__list">
          <li v-for="habit in dashboardData.globalHabits.filter(h => !filterId || h.id === filterId)" :key="habit.id"
            class="habits__item">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <div class="habits__tracking">
              <CustomCheckbox :id="habit.id" :ischecked="checkboxStates[habit.id]" @toggle="toggleCheckbox(habit.id)" />
              <VueDatePicker v-model="date" :enable-time-picker="false" model-type="yyyy-MM-dd"
                class="habit-card__date-picker" />
              <button type="button" class="habits__submit-btn" @click="handleSubmit(habit.id)">Valider</button>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="Array.isArray(dashboardData.personalHabits)" class="habits__section">
        <h2 v-if="!isDetailView" class="habits__section-title">Habitudes Personnelles</h2>
        <ul class="habits__list">
          <li v-for="habit in dashboardData.personalHabits.filter(h => !filterId || h.id === filterId)" :key="habit.id"
            class="habits__item">
            <HabitsCard :name="habit.title" :description="habit.description" />
            <div class="habits__actions">
              <div class="habits__tracking">
                <CustomCheckbox :id="habit.id" :ischecked="checkboxStates[habit.id]"
                  @toggle="toggleCheckbox(habit.id)" />
                <VueDatePicker v-model="date" :enable-time-picker="false" model-type="yyyy-MM-dd"
                  class="habit-card__date-picker" />
                <button type="button" class="habits__submit-btn" @click="handleSubmit(habit.id)">Valider</button>
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

  &__tracking {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  &__submit-btn {
    padding: 0.5rem 1rem;
    background-color: $primaryColor;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $primaryDark;
    }
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

.habit-card__date-picker {
  width: 100%;
}
</style>