<script setup>
defineProps({
  name: {
    type: String,
    default: 'Nom par défaut',
  },
  description: {
    type: String,
    default: 'Description par défaut', 
  },
}) 
</script>

<template>
  <div class="habit-card">
    <div class="habit-card__content">
      <h2 class="habit-card__title">{{ name }}</h2>
      <p class="habit-card__description">{{ description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.habit-card {
  background: $backgroundColor;
  border-radius: 12px;
  box-shadow: 0 4px 12px $shadowColor;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-family: $font-family-primary;
    font-size: 1.25rem;
    font-weight: $font-weight-semibold;
    color: $textPrimary;
    margin: 0;
  }

  &__description {
    font-family: $font-family-primary;
    font-size: 0.875rem;
    color: $textSecondary;
    margin: 0;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    &__title {
      font-size: 1.1rem;
    }

    &__description {
      font-size: 0.8rem;
    }
  }
}
</style>
