<script setup lang="ts">
const props = defineProps<{
  habitId: string
}>()

const router = useRouter()
const nameEdit = ref('')
const descriptionEdit = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault()
  console.log('Form has submitted')

  try {
    const response = await fetch(`http://localhost:4000/habits/${props.habitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: nameEdit.value,
        description: descriptionEdit.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Habit created:', data)

    router.push('/app/dashboard')

    nameEdit.value = ''
    descriptionEdit.value = ''
  } catch (error) {
    console.error('Error creating habit:', error)
  }
}
</script>

<template>
  <div class="add-habit-form">
    <h1>Ajouter une Nouvelle Habitude</h1>

    <form @submit="onSubmit">
      <div class="form-group">
        <label for="name">Nom de l'habitude :</label>
        <textarea id="name" v-model="nameEdit" type="text" placeholder="Entrez le nouveau nom de l'habitude" required />
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea id="description" v-model="descriptionEdit" placeholder="Décrivez la nouvelle habitude" required />
      </div>
      <button type="submit" class="submit-button">Modifier l'Habitude</button>
    </form>
  </div>
</template>

<style lang="scss">
.add-habit-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      resize: vertical;
    }
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: (#004bff);
    }
  }

  .link {
    display: block;
    text-align: center;
    margin-top: 1rem;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
