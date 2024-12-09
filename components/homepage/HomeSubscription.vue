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
  <section v-if="subscriptions && subscriptions.length">
    <h2>Subscriptions</h2>
    <div v-for="subscription in subscriptions" :key="subscription.title">
      <h3>{{ subscription.title }}</h3>
      <p>{{ subscription.description }}</p>
      <p>{{ subscription.price }}</p>
      <ul>
        <li v-for="feature in subscription.features" :key="feature">{{ feature }}</li>
      </ul>
      <div v-if="subscription.cta">
        <a :href="subscription.cta.url">{{ subscription.cta.label }}</a>
      </div>
    </div>
  </section>
</template>
