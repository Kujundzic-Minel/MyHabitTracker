<template>
  <form class="contact-form">
    <CustomInput
      id="email"
      label="Email"
      placeholder="Entrez votre email"
      variant="primary"
      v-model="email"
    />
    <CustomInput
      id="password"
      label="Mot de passe"
      placeholder="Entrez votre mot de passe"
      variant="primary"
      type="password"
      v-model="password"
    />
    <button class="submit-button">Envoyer</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CustomInput from '../components/Input.vue'

export default defineComponent({
  name: 'ContactForm',
  components: { CustomInput },
  setup() {
    const email = ref('')
    const password = ref('')

    return {
      email,
      password,
    }
  },
})
</script>

<style lang="scss">
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: (#004BFF);
  }
}
</style>
