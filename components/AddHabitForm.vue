<template>
  <div class="add-habit-form">
    <h1>Ajouter une Nouvelle Habitude</h1>
    <form>
      <div class="form-group">
        <label for="name">Nom de l'habitude :</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Entrez le nom de l'habitude"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Décrivez l'habitude"
          required
        ></textarea>
      </div>
      <button type="button" class="submit-button">Ajouter l'Habitude</button>
    </form>
    <p>
      <a href="/habits.html" class="link">Voir mes habitudes</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AddHabitForm',
  setup() {
    const name = ref('')
    const description = ref('')

    return {
      name,
      description,
    }
  },
})
</script>

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
      background-color: (#004BFF);
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
