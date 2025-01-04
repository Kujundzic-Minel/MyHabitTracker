<script setup lang="ts">
import Header from './components/Header.vue';
</script>
<template>
  <Header />
  <div class="Main">
    <NuxtPage />
  </div>
</template>
<style>
.Main {
  padding-top: 4rem;
}
</style>