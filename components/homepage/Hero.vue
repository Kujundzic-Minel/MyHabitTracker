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
  <section v-if="hero" class="hero">
    <div v-if="hero.backgroundImage" class="hero__background">
      <img :src="hero.backgroundImage.asset.url" alt="Hero Background" class="hero__background-image" />
    </div>
    <div class="hero__content">
      <h2 class="hero__title">{{ hero.title }}</h2>
      <p class="hero__text">{{ hero.text }}</p>
      <div class="hero__stats">
        <div v-for="stat in hero.stats" :key="stat.title" class="hero__stat">
          <h3 class="hero__stat-title">{{ stat.title }}</h3>
          <p class="hero__stat-value">{{ stat.value }}</p>
        </div>
      </div>
      <div class="hero__ctas">
        <a v-for="cta in hero.cta" :key="cta.label" :href="cta.url" class="hero__cta">
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  overflow: hidden; 
}

.hero__background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.hero__background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.hero__background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero__text {
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero__stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.hero__stat {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 10px;
  min-width: 150px;
}

.hero__stat-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.hero__stat-value {
  font-size: 2rem;
  font-weight: 700;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
}

.hero__cta {
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.hero__cta:hover {
  transform: translateY(-2px);
}
</style>