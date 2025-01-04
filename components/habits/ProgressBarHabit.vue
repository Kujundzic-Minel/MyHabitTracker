<script setup>
defineProps({
  progressHabit: {
    type: Number,
    default: 0,
  },
}) 
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__header">
      <h2 class="progress-bar__title">Progrès du mois</h2>
      <span class="progress-bar__value">{{ progressHabit }}%</span>
    </div>
    <div class="progress-bar__container">
      <div class="progress-bar__fill" :style="{ '--progress-width': `${progressHabit}%` }" />
    </div>
  </div>
</template>

<style lang="scss">
.progress-bar {
  $root: &;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__title {
    font-family: $font-family-primary;
    font-size: 1.2rem;
    font-weight: $font-weight-semibold;
    color: $textPrimary;
  }

  &__value {
    font-family: $font-family-primary;
    font-size: 1.2rem;
    font-weight: $font-weight-semibold;
    color: $textPrimary;
  }

  &__container {
    width: 100%;
    height: 24px;
    background-color: $skyLight;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  &__fill {
    height: 100%;
    background-color: $primaryColor;
    width: var(--progress-width);
    transition: width 0.3s ease;
    animation: progressAnimation 1s cubic-bezier(0.99, 0, 0.27, 1) forwards;
  }

  @keyframes progressAnimation {
    from {
      width: 0;
    }

    to {
      width: var(--progress-width);
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    &__title,
    &__value {
      font-size: 1rem;
    }

    &__container {
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 10px;

    &__container {
      height: 16px;
    }
  }
}
</style>
