<script setup lang="ts">
const router = useRouter();
const username = ref('');
const password = ref('');

const onSubmit = async (event: Event) => {
  event.preventDefault();
  console.log('Form has submitted');
  console.log('Username:', username.value);
  console.log('Password:', password.value);
 
  try {
    const responseLogin = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await responseLogin.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Login successful');
      await router.push('/app/dashboard');
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }

};
</script>

<template>
  <form class="login-form" @submit="onSubmit">
    <h2 class="login-form__title">Connexion</h2>
    <div class="login-form__group">
      <label for="username" class="login-form__label">Username</label>
      <input id="username" v-model="username" type="username" placeholder="Entrez votre username" class="login-form__input" required />
    </div>
    <div class="login-form__group">
      <label for="password" class="login-form__label">Mot de passe</label>
      <input id="password" v-model="password" type="password" placeholder="Entrez votre mot de passe" class="login-form__input" required />
    </div>
    <button type="submit" class="login-form__submit">Se connecter</button>
  </form>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

.login-form {
  @include form-container;
  
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
