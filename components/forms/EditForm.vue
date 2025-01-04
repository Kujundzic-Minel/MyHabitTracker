<script setup lang="ts">
const props = defineProps<{
  habitid: string
}>()

const router = useRouter()
const nameEdit = ref('')
const descriptionEdit = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault()
  console.log('Form has submitted')

  try {
    const response = await fetch(`http://localhost:4000/habits/${props.habitid}`, {
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
  <div class="edit-form">
    <h2 class="edit-form__title">Modifier l'habitude</h2>
    <form class="edit-form__form" @submit="onSubmit">
      <div class="edit-form__group">
        <label class="edit-form__label" for="name">Nom de l'habitude</label>
        <textarea
id="name" v-model="nameEdit" class="edit-form__textarea"
          placeholder="Entrez le nouveau nom de l'habitude" required />
      </div>
      <div class="edit-form__group">
        <label class="edit-form__label" for="description">Description</label>
        <textarea
id="description" v-model="descriptionEdit" class="edit-form__textarea"
          placeholder="Décrivez la nouvelle habitude" required />
      </div>
      <button type="submit" class="edit-form__submit">Modifier l'habitude</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.edit-form {
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

  &__input,
  &__textarea {
    padding: 0.75rem;
    border: 1px solid $borderColor;
    border-radius: 8px;
    font-family: $font-family-primary;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: $primaryColor;
      outline: none;
    }
  }

  &__textarea {
    min-height: 100px;
    resize: vertical;
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
