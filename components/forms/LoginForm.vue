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
  <form class="contact-form" @submit="onSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="username" type="username" placeholder="Entrez votre username" required />
    </div>
    <div>
      <label for="password">Mot de passe</label>
      <input id="password" v-model="password" type="password" placeholder="Entrez votre mot de passe" required />
    </div>
    <button type="submit" class="submit-button">Envoyer</button>
  </form>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
