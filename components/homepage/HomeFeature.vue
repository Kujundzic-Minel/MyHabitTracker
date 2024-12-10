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
  <section v-if="features && features.length" class="features">
    <h2 class="features__title">Features</h2>
    <div class="features__grid">
      <div v-for="feature in features" 
           :key="feature.title" 
           class="features__card">
        <div v-if="feature.icon" class="features__icon-wrapper">
          <img :src="feature.icon.asset.url" 
               alt="Feature Icon" 
               class="features__icon" />
        </div>
        <h3 class="features__card-title">{{ feature.title }}</h3>
        <p class="features__text">{{ feature.text }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.features {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  max-width: 1200px;
  margin: 0 auto;

  &__title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
  }

  &__grid {
    display: grid;
    gap: 2rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__icon-wrapper {
    width: 60px;
    height: 60px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__card-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  &__text {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: #666;
    line-height: 1.6;
  }
}
</style>
