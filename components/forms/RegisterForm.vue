<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()
const username = ref('')
const password = ref('')

const onSubmit = async (event: Event) => {
  event.preventDefault();
  console.log('Form has submitted');

  try {
    const responseRegister = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await responseRegister.json();
    console.log(data);

    const cookieJwt = useCookie('api_tracking_jwt')
    cookieJwt.value = data.token

    await router.push('/app/dashboard')

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
  }
};
</script>

<template>
  <form class="register-form" @submit="onSubmit">
    <h2 class="register-form__title">Inscription</h2>
    <div class="register-form__group">
      <label class="register-form__label" for="username">Username</label>
      <input 
        id="username" 
        v-model="username" 
        type="username" 
        class="register-form__input"
        placeholder="Entrez votre username" 
        required 
      />
    </div>
    <div class="register-form__group">
      <label class="register-form__label" for="password">Mot de passe</label>
      <input 
        id="password" 
        v-model="password" 
        type="password" 
        class="register-form__input"
        placeholder="Entrez votre mot de passe" 
        required 
      />
    </div>
    <button type="submit" class="register-form__submit">S'inscrire</button>
  </form>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.register-form {
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

  &__input {
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
