<script setup lang="ts">
interface Stat {
  title: string;
  value: string;
}

interface CTA {
  label: string;
  url: string;
}

interface Hero {
  title: string;
  text: string;
  backgroundImage?: { asset: { url: string } };
  cta: CTA[];
  stats: Stat[];
}

defineProps<{
  hero: Hero;
}>();
</script>

<template>
  <section v-if="hero">
    <div v-if="hero.backgroundImage">
      <img :src="hero.backgroundImage.asset.url" alt="Hero Background" />
    </div>
    <h2>{{ hero.title }}</h2>
    <p>{{ hero.text }}</p>
    <div v-for="stat in hero.stats" :key="stat.title">
      <h3>{{ stat.title }}</h3>
      <p>{{ stat.value }}</p>
    </div>
    <div v-for="cta in hero.cta" :key="cta.label">
      <a :href="cta.url">{{ cta.label }}</a>
    </div>
  </section>
</template>
