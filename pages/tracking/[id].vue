<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const habitId = route.params.id;
const show = ref(false);
interface Habit {
  title: string;
  description: string;
  success_rate: number;
  total_completions: number;
  total_attempts: number;
}

const habit = ref<Habit | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchHabitDetails = async () => {
  try {
    const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Impossible de récupérer les détails de l\'habitude');
    }

    habit.value = await response.json();
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = String(err);
    }
  } finally {
    loading.value = false;
  }
};

function toggleShow() {
  show.value = !show.value;
}

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

    // Rediriger vers la page principale après la suppression
    router.push('/dashboard');
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = String(err);
    }
  }
};

onMounted(() => {
  fetchHabitDetails();
});
</script>

<template>
  <div class="habit-details">
    <div v-if="loading" class="loading">
      Chargement des détails de l'habitude...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="habit" class="habit-content">
      <HabitsCard :name="habit.title" :description="habit.description" />
      <ProgressBarHabit :progress-habit="habit.success_rate" />

      <div class="habit-actions">
        <DeleteButton :id="Number(habitId)" @delete="deleteHabit" />
        <EditButton @click="toggleShow" />
        <div v-if="show">
          <EditForm v-if="show" :habitid="habitId.toString()" />
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <h3>Complétions totales</h3>
          <p>{{ habit.total_completions }}</p>
        </div>
        <div class="stat-item">
          <h3>Tentatives totales</h3>
          <p>{{ habit.total_attempts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.habit-details {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;

  .loading,
  .error {
    text-align: center;
    padding: 2rem;
  }

  .error {
    color: red;
  }

  .habit-content {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .description {
      color: #666;
      margin-bottom: 2rem;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      .stat-item {
        text-align: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 6px;

        h3 {
          color: #555;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        p {
          color: #28a745;
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
    }
  }
}

.habit-actions {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;
}
</style>