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
  <section v-if="faq && faq.length" class="faq">
    <h2 class="faq__title">FAQ</h2>
    <div class="faq__list">
      <div v-for="item in faq" 
           :key="item.question" 
           class="faq__item">
        <h3 class="faq__question">{{ item.question }}</h3>
        <p class="faq__answer">{{ item.answer }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq {
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;

  &__title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__item {
    padding: 1.5rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }
  }

  &__question {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  &__answer {
    color: #666;
    line-height: 1.6;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  @media (max-width: 640px) {
    padding: 2rem 1rem;

    &__title {
      font-size: 2rem;
    }

    &__question {
      font-size: 1.1rem;
    }
  }
}
</style>
