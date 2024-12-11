<script setup lang="ts">
const router = useRouter()
const name = ref('')
const description = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault()
  console.log('Form has submitted')

  try {
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: name.value,
        description: description.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Habit created:', data)

    router.push('/app/dashboard')

    name.value = ''
    description.value = ''
  } catch (error) {
    console.error('Error creating habit:', error)
  }
}
</script>

<template>
  <div class="habit-form">
    <h2 class="habit-form__title">Ajouter une Nouvelle Habitude</h2>
    <form @submit="onSubmit" class="habit-form__form">
      <div class="habit-form__group">
        <label class="habit-form__label" for="name">Nom de l'habitude</label>
        <textarea id="name" v-model="name" class="habit-form__textarea" placeholder="Entrez le nom de l'habitude"
          required />
      </div>
      <div class="habit-form__group">
        <label class="habit-form__label" for="description">Description</label>
        <textarea id="description" v-model="description" class="habit-form__textarea" placeholder="Décrivez l'habitude"
          required />
      </div>
      <button type="submit" class="habit-form__submit">Ajouter l'Habitude</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.habit-form {
  @include form-container;

  &__title {
    font-family: $font-family-primary;
    font-weight: $font-weight-semibold;
    font-size: 1.5rem;
    color: $textPrimary;
    margin-bottom: 2rem;
    text-align: center;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  &__label {
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    color: $textPrimary;
  }

  &__textarea {
    padding: 0.75rem;
    border: 1px solid $borderColor;
    border-radius: 8px;
    font-family: $font-family-primary;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: $primaryColor;
      outline: none;
    }
  }

  &__submit {
    width: 100%;
    padding: 0.75rem;
    background-color: $primaryColor;
    color: $backgroundColor;
    border: none;
    border-radius: 8px;
    font-family: $font-family-primary;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $primaryDark;
    }
  }
}
</style>