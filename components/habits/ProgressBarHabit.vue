<script setup>
defineProps({
  progressHabit: {
    type: Number,
    default: 0,
  },
}) 
</script>
<template>
  <div class="progress">
    <h2 class="progress__title">Progrès :</h2>
    <div class="progress__bar">
      <div class="progress__fill" :style="{ '--WidthProgress': `${progressHabit}%` }" />
    </div>
    <span class="progress__value">{{ progressHabit }}%</span>
  </div>
</template>

<style lang="scss">
.progress {
  &__title {
    font-family: $font-family-primary;
    font-size: 0.875rem;
    color: $textSecondary;
    margin-bottom: 0.5rem;
  }

  &__bar {
    width: 100%;
    height: 8px;
    background-color: $skyLight;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  &__fill {
    height: 100%;
    background-color: $primaryColor;
    transition: width 0.3s ease;
    animation: forwards ProgressBarAnimation 1s cubic-bezier(0.99, 0, 0.27, 1);
  }

  &__value {
    font-family: $font-family-primary;
    font-size: 0.75rem;
    color: $textSecondary;
    margin-left: 0.5rem;
  }

  @keyframes ProgressBarAnimation {
    from {
      width: 0;
    }

    to {
      width: var(--WidthProgress);
    }
  }

  @media (max-width: 768px) {
    &__title {
      font-size: 0.8rem;
    }

    &__bar {
      height: 6px;
    }
  }
}
</style>
