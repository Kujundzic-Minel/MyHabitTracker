<script setup lang="ts">
interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  photo?: { asset: { url: string } };
}

defineProps<{
  testimonials: Testimonial[];
}>();
</script>

<template>
  <section v-if="testimonials && testimonials.length" class="testimonials">
    <h2 class="testimonials__title">Témoignages</h2>
    <div class="testimonials__grid">
      <div v-for="testimonial in testimonials" 
           :key="testimonial.name" 
           class="testimonials__card">
        <div v-if="testimonial.photo" class="testimonials__image-wrapper">
          <img :src="testimonial.photo.asset.url" 
               :alt="testimonial.name" 
               class="testimonials__image" />
        </div>
        <h3 class="testimonials__name">{{ testimonial.name }}</h3>
        <p class="testimonials__role">{{ testimonial.role }}</p>
        <blockquote class="testimonials__quote">{{ testimonial.feedback }}</blockquote>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  &__title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  &__grid {
    display: grid;
    gap: 2rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  &__image-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &__name {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  &__role {
    text-align: center;
    color: #666;
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  &__quote {
    font-style: italic;
    color: #444;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
}
</style>
