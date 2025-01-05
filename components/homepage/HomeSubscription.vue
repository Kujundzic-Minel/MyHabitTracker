<script setup lang="ts">
interface Subscription {
  title: string;
  description: string;
  price: string;
  features: string[];
  cta?: { label: string; url: string };
}

defineProps<{
  subscriptions: Subscription[];
}>();
</script>

<template>
  <section v-if="subscriptions && subscriptions.length" class="subscriptions">
    <h2 class="subscriptions__title">Subscriptions</h2>
    <div class="subscriptions__container">
      <div v-for="subscription in subscriptions" :key="subscription.title" class="subscriptions__card">
        <h3 class="subscriptions__card-title">{{ subscription.title }}</h3>
        <div class="subscriptions__card-price">{{ subscription.price }}</div>
        <p class="subscriptions__card-description">{{ subscription.description }}</p>
        <ul class="subscriptions__card-features">
          <li v-for="feature in subscription.features" :key="feature" class="subscriptions__card-feature">{{ feature }}
          </li>
        </ul>
        <div v-if="subscription.cta" class="subscriptions__card-action">
          <a :href="subscription.cta.url" class="subscriptions__card-button">{{ subscription.cta.label }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.subscriptions {
  font-family: $font-family-primary;
  padding: 2rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: $textPrimary;
    font-weight: $font-weight-bold;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  &__card {
    background: $backgroundColor;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 15px $shadowColor;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 25px rgba($shadowColor, 0.15);
    }

    &-title {
      font-size: 1.8rem;
      color: $textPrimary;
      margin-bottom: 1rem;
      font-weight: $font-weight-semibold;
    }

    &-price {
      font-size: 3rem;
      font-weight: $font-weight-bold;
      color: $primaryColor;
      margin: 1.5rem 0;
    }

    &-description {
      color: $textSecondary;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    &-features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
    }

    &-feature {
      padding: 0.5rem 0;
      color: $textSecondary;

      &::before {
        content: "✓";
        color: $primaryColor;
        margin-right: 8px;
      }
    }

    &-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: $primaryColor;
      color: $backgroundColor;
      text-decoration: none;
      border-radius: 30px;
      font-weight: $font-weight-semibold;
      transition: background 0.3s ease;

      &:hover {
        background: $primaryDark;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    &__title {
      font-size: 2rem;
    }

    &__card {
      &-title {
        font-size: 1.5rem;
      }

      &-price {
        font-size: 2.5rem;
      }
    }
  }
}
</style>
