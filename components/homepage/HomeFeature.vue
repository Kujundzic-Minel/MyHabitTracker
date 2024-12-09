<script setup lang="ts">
interface Feature {
  title: string;
  text: string;
  icon?: { asset: { url: string } };
}

defineProps<{
  features: Feature[];
}>();
</script>

<template>
  <section v-if="features && features.length">
    <h2>Features</h2>
    <div v-for="feature in features" :key="feature.title">
      <div v-if="feature.icon">
        <img :src="feature.icon.asset.url" alt="Feature Icon" />
      </div>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.text }}</p>
    </div>
  </section>
</template>
