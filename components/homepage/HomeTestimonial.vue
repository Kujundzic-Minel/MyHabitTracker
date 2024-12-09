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
  <section v-if="testimonials && testimonials.length">
    <h2>Témoignages</h2>
    <div v-for="testimonial in testimonials" :key="testimonial.name">
      <div v-if="testimonial.photo">
        <img :src="testimonial.photo.asset.url" :alt="testimonial.name" />
      </div>
      <h3>{{ testimonial.name }}</h3>
      <p>{{ testimonial.role }}</p>
      <blockquote>{{ testimonial.feedback }}</blockquote>
    </div>
  </section>
</template>
