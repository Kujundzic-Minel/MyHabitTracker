<script setup lang="ts">
interface FAQItem {
  question: string;
  answer: string;
}

defineProps<{
  faq: FAQItem[];
}>();
</script>

<template>
  <section v-if="faq && faq.length">
    <h2>FAQ</h2>
    <div v-for="item in faq" :key="item.question">
      <h3>{{ item.question }}</h3>
      <p>{{ item.answer }}</p>
    </div>
  </section>
</template>
