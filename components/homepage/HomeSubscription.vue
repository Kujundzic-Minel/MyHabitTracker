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
  <section v-if="subscriptions && subscriptions.length" class="subscription-section">
    <h2>Subscriptions</h2>
    <div class="cards-container">
      <div v-for="subscription in subscriptions" :key="subscription.title" class="subscription-card">
        <h3>{{ subscription.title }}</h3>
        <div class="price">{{ subscription.price }}</div>
        <p class="description">{{ subscription.description }}</p>
        <ul>
          <li v-for="feature in subscription.features" :key="feature">{{ feature }}</li>
        </ul>
        <div v-if="subscription.cta">
          <a :href="subscription.cta.url" class="cta-button">{{ subscription.cta.label }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.subscription-section {
  padding: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #333;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .subscription-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    h3 {
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 3rem;
      font-weight: bold;
      color: #3498db;
      margin: 1.5rem 0;
    }

    .description {
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 2rem 0;

      li {
        padding: 0.5rem 0;
        color: #555;

        &:before {
          content: "✓";
          color: #2ecc71;
          margin-right: 8px;
        }
      }
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      transition: background 0.3s ease;

      &:hover {
        background: #2980b9;
      }
    }
  }
}
</style>
